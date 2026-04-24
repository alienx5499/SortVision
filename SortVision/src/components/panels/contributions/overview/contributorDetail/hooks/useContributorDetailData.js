import { useCallback, useEffect, useRef, useState } from 'react';
import {
  API_BASE_URL,
  COMMITS_PAGINATION_CONFIG,
  INITIAL_FETCH_PROGRESS,
  INITIAL_LOADING_PROGRESS,
} from '../constants';
import { readDetailCache, writeDetailCache } from './detailCacheStore';
import {
  fetchCoreContributorData,
  fetchOptimizedPRs,
} from './detailDataFetchers';

export function useContributorDetailData({
  contributor,
  isOpen,
  authenticatedFetch,
  getCachedContributorStats,
  repoOwner,
  repoName,
}) {
  const [profileData, setProfileData] = useState(null);
  const [pullRequests, setPullRequests] = useState([]);
  const [issues, setIssues] = useState([]);
  const [commits, setCommits] = useState([]);
  const [commitsPage, setCommitsPage] = useState(1);
  const [hasMoreCommits, setHasMoreCommits] = useState(true);
  const [loadingMoreCommits, setLoadingMoreCommits] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(
    INITIAL_LOADING_PROGRESS
  );
  const activeRequestIdRef = useRef(0);

  const fetchDetailedData = useCallback(async () => {
    if (!contributor || !authenticatedFetch) return;
    if (!repoOwner || !repoName) {
      console.error(
        'GitHub repository configuration missing for contributor details'
      );
      return;
    }

    const cacheKey = `${repoOwner}/${repoName}/${contributor.login}`;
    const cached = readDetailCache(cacheKey);
    if (cached) {
      setProfileData(cached.profileData);
      setPullRequests(cached.pullRequests);
      setIssues(cached.issues);
      setCommits(cached.commits);
      setCommitsPage(cached.commitsPage || 1);
      setHasMoreCommits(cached.hasMoreCommits !== false);
      setLoading(false);
      setLoadingProgress(INITIAL_LOADING_PROGRESS);
      return;
    }

    const requestId = activeRequestIdRef.current + 1;
    activeRequestIdRef.current = requestId;
    setLoading(true);
    setLoadingProgress(INITIAL_FETCH_PROGRESS);

    try {
      let totalLinesAdded = 0;
      let totalLinesDeleted = 0;
      let hasComprehensiveStats = false;

      if (getCachedContributorStats) {
        const cachedStats = getCachedContributorStats(contributor.login);
        if (cachedStats) {
          totalLinesAdded = cachedStats.totalLinesAdded;
          totalLinesDeleted = cachedStats.totalLinesDeleted;
          hasComprehensiveStats = true;
        }
      }

      setLoadingProgress({
        current: 1,
        total: 3,
        stage: 'Fetching core data...',
      });

      const {
        profileData: profilePayload,
        issues: issuesPayload,
        commits: commitsPayload,
      } = await fetchCoreContributorData({
        authenticatedFetch,
        contributorLogin: contributor.login,
        repoOwner,
        repoName,
        totalLinesAdded,
        totalLinesDeleted,
        hasComprehensiveStats,
        commitsPerPage: COMMITS_PAGINATION_CONFIG.perPage,
      });

      setProfileData(profilePayload);
      setIssues(issuesPayload);
      setCommits(commitsPayload);
      const commitsPagePayload = 1;
      const hasMoreCommitsPayload =
        commitsPayload.length >= COMMITS_PAGINATION_CONFIG.perPage;
      setCommitsPage(commitsPagePayload);
      setHasMoreCommits(hasMoreCommitsPayload);

      setLoadingProgress({
        current: 2,
        total: 3,
        stage: 'Fetching pull requests...',
      });

      const resolvedPullRequests = await fetchOptimizedPRs({
        authenticatedFetch,
        contributorLogin: contributor.login,
        repoOwner,
        repoName,
        setLoadingProgress,
      });
      if (activeRequestIdRef.current !== requestId) return;
      setPullRequests(resolvedPullRequests);
      setLoadingProgress({ current: 3, total: 3, stage: 'Finalizing...' });

      const snapshot = {
        timestamp: Date.now(),
        profileData: profilePayload,
        pullRequests: resolvedPullRequests,
        issues: issuesPayload,
        commits: commitsPayload,
        commitsPage: commitsPagePayload,
        hasMoreCommits: hasMoreCommitsPayload,
      };
      writeDetailCache(cacheKey, snapshot);
    } catch (error) {
      console.error('Error fetching detailed contributor data:', error);
    } finally {
      if (activeRequestIdRef.current === requestId) {
        setLoading(false);
        setLoadingProgress(INITIAL_LOADING_PROGRESS);
      }
    }
  }, [
    authenticatedFetch,
    contributor,
    getCachedContributorStats,
    repoName,
    repoOwner,
  ]);

  const loadMoreCommits = useCallback(async () => {
    if (!contributor || !authenticatedFetch) return;
    if (!repoOwner || !repoName) return;
    if (!hasMoreCommits || loadingMoreCommits) return;

    const nextPage = commitsPage + 1;
    if (nextPage > COMMITS_PAGINATION_CONFIG.maxPages) {
      setHasMoreCommits(false);
      return;
    }

    setLoadingMoreCommits(true);
    try {
      let statsPayload = null;
      if (getCachedContributorStats) {
        statsPayload = getCachedContributorStats(contributor.login);
      }

      const response = await authenticatedFetch(
        `${API_BASE_URL}/repos/${repoOwner}/${repoName}/commits?author=${contributor.login}&per_page=${COMMITS_PAGINATION_CONFIG.perPage}&page=${nextPage}`
      );
      if (!response.ok) {
        setHasMoreCommits(false);
        return;
      }

      const commitsData = await response.json();
      const incomingCommits = Array.isArray(commitsData) ? commitsData : [];

      if (incomingCommits.length === 0) {
        setHasMoreCommits(false);
        return;
      }

      const enhancedIncoming = incomingCommits.map(commit => ({
        ...commit,
        _comprehensiveStats: {
          totalLinesAdded: statsPayload?.totalLinesAdded || 0,
          totalLinesDeleted: statsPayload?.totalLinesDeleted || 0,
          hasComprehensiveStats: !!statsPayload,
        },
      }));

      setCommits(prevCommits => {
        const seen = new Set(prevCommits.map(commit => commit.sha));
        const merged = [...prevCommits];
        for (const commit of enhancedIncoming) {
          if (!seen.has(commit.sha)) {
            merged.push(commit);
          }
        }

        const cacheKey = `${repoOwner}/${repoName}/${contributor.login}`;
        const existingMemory = readDetailCache(cacheKey) || {};
        const nextHasMore =
          incomingCommits.length >= COMMITS_PAGINATION_CONFIG.perPage &&
          nextPage < COMMITS_PAGINATION_CONFIG.maxPages;
        const snapshot = {
          ...existingMemory,
          timestamp: Date.now(),
          commits: merged,
          commitsPage: nextPage,
          hasMoreCommits: nextHasMore,
        };
        writeDetailCache(cacheKey, snapshot);

        return merged;
      });

      setCommitsPage(nextPage);
      setHasMoreCommits(
        incomingCommits.length >= COMMITS_PAGINATION_CONFIG.perPage &&
          nextPage < COMMITS_PAGINATION_CONFIG.maxPages
      );
    } catch {
      // keep silent; user can continue with loaded commits
    } finally {
      setLoadingMoreCommits(false);
    }
  }, [
    authenticatedFetch,
    commitsPage,
    contributor,
    getCachedContributorStats,
    hasMoreCommits,
    loadingMoreCommits,
    repoName,
    repoOwner,
  ]);

  useEffect(() => {
    if (isOpen && contributor && authenticatedFetch) {
      fetchDetailedData();
    }
  }, [isOpen, contributor, authenticatedFetch, fetchDetailedData]);

  return {
    profileData,
    pullRequests,
    issues,
    commits,
    hasMoreCommits,
    loadingMoreCommits,
    loadMoreCommits,
    loading,
    loadingProgress,
  };
}

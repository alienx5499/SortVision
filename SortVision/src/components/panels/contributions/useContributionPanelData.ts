import { useCallback, useEffect, useRef, useState } from 'react';
import type { GitHubContributor } from './githubContributor';
import {
  contributionsDataDebug,
  contributionsDataWarn,
  isContributionsDataVerbose,
} from './contributionsDataLog';
import type {
  ContributionAggregateStats,
  UseContributionPanelDataResult,
} from './contributionsPanelContracts';
import {
  BOT_USERS,
  PROJECT_ADMIN_LOGIN,
  PROJECT_ADMINS,
} from './contributionConstants';
import {
  findContributorLinesInCache,
  getValidCachedContributorStats,
  setContributorStatsCache,
  type ContributorStatEntry,
} from './contributorStatsCache';
import {
  calculateLineTotalsFromContributorStats,
  calculateLineTotalsFromPullRequests,
  sortContributorsByPriority,
  totalCommits,
} from './contributionStatsService';
import {
  createGitHubAuthenticatedFetch,
  fetchContributorStats,
  fetchContributors,
  fetchRecentPullRequests,
  fetchRepoSummary,
  fetchUserProfile,
  REPO_NAME,
  REPO_OWNER,
  type AuthenticatedFetch,
} from './githubContributionsGateway';

export type {
  ContributionAggregateStats,
  UseContributionPanelDataResult,
} from './contributionsPanelContracts';

function fallbackAdmin(): GitHubContributor {
  return {
    login: PROJECT_ADMIN_LOGIN,
    avatar_url: `https://github.com/${PROJECT_ADMIN_LOGIN}.png`,
    html_url: `https://github.com/${PROJECT_ADMIN_LOGIN}`,
    contributions: 0,
    type: 'User',
  };
}

export function useContributionPanelData(): UseContributionPanelDataResult {
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ContributionAggregateStats>({
    totalContributors: 0,
    totalCommits: 0,
    totalStars: 0,
    totalForks: 0,
    totalLinesAdded: 0,
    totalLinesDeleted: 0,
    totalChanges: 0,
  });
  const configWarnedRef = useRef(false);

  const isConfigValid = Boolean(REPO_OWNER && REPO_NAME);

  useEffect(() => {
    if (isConfigValid || configWarnedRef.current) return;
    configWarnedRef.current = true;
    contributionsDataWarn(
      'GitHub repository configuration missing. Set NEXT_PUBLIC_GITHUB_REPO_OWNER and NEXT_PUBLIC_GITHUB_REPO_NAME.'
    );
  }, [isConfigValid]);

  const authenticatedFetch: AuthenticatedFetch = useCallback(
    (url, init) =>
      createGitHubAuthenticatedFetch(
        process.env.NEXT_PUBLIC_DEV_MODE === 'true'
      )(url, init),
    []
  );

  const fetchContributorStatsGlobal = useCallback(async (): Promise<
    ContributorStatEntry[] | null
  > => {
    const now = Date.now();
    const cached = getValidCachedContributorStats(now);
    if (cached) {
      contributionsDataDebug('Using cached contributor stats');
      return cached;
    }

    try {
      contributionsDataDebug('Fetching fresh contributor stats…');
      const response = await fetchContributorStats(authenticatedFetch);

      if (response.ok) {
        if (response.status === 202) {
          setContributorStatsCache([], now);
          return [];
        }

        const data: unknown = await response.json().catch(() => null);
        if (Array.isArray(data)) {
          const rows = data as ContributorStatEntry[];
          setContributorStatsCache(rows, now);
          contributionsDataDebug(
            `Cached contributor stats for ${rows.length} contributors`
          );
          return rows;
        }

        contributionsDataWarn(
          'Contributor stats response is not an array:',
          data
        );

        setContributorStatsCache([], now);
        return [];
      }
    } catch (e) {
      contributionsDataWarn('Could not fetch contributor stats:', e);
    }

    return null;
  }, [authenticatedFetch]);

  const fetchContributorsData = useCallback(async () => {
    if (!isConfigValid) {
      setLoading(false);
      setError(
        'GitHub repository configuration is missing. Please configure NEXT_PUBLIC_GITHUB_REPO_OWNER and NEXT_PUBLIC_GITHUB_REPO_NAME environment variables.'
      );
      return;
    }

    try {
      setLoading(true);

      contributionsDataDebug('Fetching contributors data…');

      const [contributorsData, repoData, contributorStats] = await Promise.all([
        fetchContributors(authenticatedFetch),
        fetchRepoSummary(authenticatedFetch),
        fetchContributorStatsGlobal(),
      ]);

      let lineTotals = { totalLinesAdded: 0, totalLinesDeleted: 0 };
      if (contributorStats && contributorStats.length > 0) {
        lineTotals = calculateLineTotalsFromContributorStats(contributorStats);
        contributionsDataDebug(
          `Repository totals — added: +${lineTotals.totalLinesAdded}, deleted: -${lineTotals.totalLinesDeleted}`
        );
      } else {
        try {
          const prs = await fetchRecentPullRequests(authenticatedFetch);
          lineTotals = calculateLineTotalsFromPullRequests(prs);
          contributionsDataDebug(
            `Fallback stats — added: +${lineTotals.totalLinesAdded}, deleted: -${lineTotals.totalLinesDeleted}`
          );
        } catch (e) {
          contributionsDataWarn('Could not fetch fallback code statistics:', e);
        }
      }

      setStats({
        totalContributors: contributorsData.length,
        totalCommits: totalCommits(contributorsData),
        totalStars: repoData?.stargazers_count || 0,
        totalForks: repoData?.forks_count || 0,
        totalLinesAdded: lineTotals.totalLinesAdded,
        totalLinesDeleted: lineTotals.totalLinesDeleted,
        totalChanges: lineTotals.totalLinesAdded + lineTotals.totalLinesDeleted,
      });

      const sortedContributors = sortContributorsByPriority(
        contributorsData,
        PROJECT_ADMINS
      );
      const existingAdmin = sortedContributors.find(
        c => c.login === PROJECT_ADMIN_LOGIN
      );
      let allContributors = [...sortedContributors];

      if (!existingAdmin) {
        const profile = await fetchUserProfile(
          authenticatedFetch,
          PROJECT_ADMIN_LOGIN
        );
        allContributors.unshift(
          profile
            ? {
                login: profile.login,
                avatar_url: profile.avatar_url,
                html_url: profile.html_url,
                contributions: 0,
                type: 'User',
              }
            : fallbackAdmin()
        );
      }

      setContributors(allContributors);
      setStats(prev => ({
        ...prev,
        totalContributors: allContributors.length,
        totalCommits: totalCommits(allContributors),
      }));
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (isContributionsDataVerbose()) {
        console.error('[contributions] Error fetching contributors:', err);
      }
      setError(message);

      const fallbackContributors: GitHubContributor[] = [
        {
          login: 'alienx5499',
          avatar_url: 'https://github.com/alienx5499.png',
          html_url: 'https://github.com/alienx5499',
          contributions: 230,
          type: 'User',
        },
      ];

      setContributors(fallbackContributors);
      setStats({
        totalContributors: fallbackContributors.length,
        totalCommits: totalCommits(fallbackContributors),
        totalStars: 0,
        totalForks: 0,
        totalLinesAdded: 0,
        totalLinesDeleted: 0,
        totalChanges: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [authenticatedFetch, fetchContributorStatsGlobal, isConfigValid]);

  const getCachedContributorStats = useCallback((login: string) => {
    return findContributorLinesInCache(login);
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(() => void fetchContributorsData(), 500);
    const refreshInterval = setInterval(
      () => void fetchContributorsData(),
      60 * 60 * 1000
    );
    return () => {
      clearTimeout(initialTimer);
      clearInterval(refreshInterval);
    };
  }, [fetchContributorsData]);

  return {
    contributors,
    stats,
    loading,
    error,
    fetchContributors: fetchContributorsData,
    authenticatedFetch,
    getCachedContributorStats,
    projectAdmins: [...PROJECT_ADMINS],
    botUsers: [...BOT_USERS],
  };
}

import { API_BASE_URL, PR_SEARCH_CONFIG } from '../constants';
import type { AuthenticatedFetch } from '../../../githubContributionsGateway';

export type FetchProgress = {
  current: number;
  total: number;
  stage: string;
};

type SearchIssueItem = {
  number: number;
  created_at?: string;
  updated_at?: string;
  merged_at?: string | null;
  merged?: boolean;
  additions?: number;
  deletions?: number;
  changed_files?: number;
  closed_at?: string | null;
  _isBasicInfo?: boolean;
};

export async function fetchCoreContributorData({
  authenticatedFetch,
  contributorLogin,
  repoOwner,
  repoName,
  totalLinesAdded,
  totalLinesDeleted,
  hasComprehensiveStats,
  commitsPerPage,
}: {
  authenticatedFetch: AuthenticatedFetch;
  contributorLogin: string;
  repoOwner: string;
  repoName: string;
  totalLinesAdded: number;
  totalLinesDeleted: number;
  hasComprehensiveStats: boolean;
  commitsPerPage: number;
}): Promise<{
  profileData: unknown;
  issues: unknown[];
  commits: unknown[];
}> {
  const [profileResponse, issuesResponse, recentCommitsResponse] =
    await Promise.all([
      authenticatedFetch(`${API_BASE_URL}/users/${contributorLogin}`),
      authenticatedFetch(
        `${API_BASE_URL}/search/issues?q=author:${contributorLogin}+repo:${repoOwner}/${repoName}+type:issue&sort=updated&per_page=50`
      ),
      authenticatedFetch(
        `${API_BASE_URL}/repos/${repoOwner}/${repoName}/commits?author=${contributorLogin}&per_page=${commitsPerPage}&page=1`
      ),
    ]);

  let profileData: unknown = null;
  if (profileResponse.ok) {
    profileData = await profileResponse.json();
  }

  let issues: unknown[] = [];
  if (issuesResponse.ok) {
    const issuesData = (await issuesResponse.json()) as { items?: unknown[] };
    issues = Array.isArray(issuesData?.items) ? issuesData.items : [];
  }

  let commits: unknown[] = [];
  if (recentCommitsResponse.ok) {
    const commitsData = (await recentCommitsResponse.json()) as unknown[];
    commits = (commitsData || []).map(commit => ({
      ...(commit as object),
      _comprehensiveStats: {
        totalLinesAdded,
        totalLinesDeleted,
        hasComprehensiveStats,
      },
    }));
  }

  return { profileData, issues, commits };
}

export async function fetchOptimizedPRs({
  authenticatedFetch,
  contributorLogin,
  repoOwner,
  repoName,
  setLoadingProgress,
}: {
  authenticatedFetch: AuthenticatedFetch;
  contributorLogin: string;
  repoOwner: string;
  repoName: string;
  setLoadingProgress: (progress: FetchProgress) => void;
}): Promise<SearchIssueItem[]> {
  let allPRs: SearchIssueItem[] = [];
  let page = 1;
  while (page <= PR_SEARCH_CONFIG.maxPages) {
    setLoadingProgress({
      current: 2,
      total: 3,
      stage: `Fetching PRs (page ${page})...`,
    });

    const prResponse = await authenticatedFetch(
      `${API_BASE_URL}/search/issues?q=author:${contributorLogin}+repo:${repoOwner}/${repoName}+type:pr&sort=created&order=desc&per_page=${PR_SEARCH_CONFIG.perPage}&page=${page}`
    );
    if (!prResponse.ok) break;

    const prData = (await prResponse.json()) as { items?: SearchIssueItem[] };
    const items = prData.items || [];
    if (items.length === 0) break;
    allPRs = [...allPRs, ...items];
    if (items.length < PR_SEARCH_CONFIG.perPage) break;
    page += 1;
  }

  const prsToEnrich = allPRs.slice(0, PR_SEARCH_CONFIG.enrichLimit);
  setLoadingProgress({
    current: 2,
    total: 3,
    stage: `Enriching ${prsToEnrich.length} recent PRs...`,
  });

  const prsWithDetails: SearchIssueItem[] = [];
  for (
    let index = 0;
    index < prsToEnrich.length;
    index += PR_SEARCH_CONFIG.enrichConcurrency
  ) {
    const chunk = prsToEnrich.slice(
      index,
      index + PR_SEARCH_CONFIG.enrichConcurrency
    );
    const chunkResults = await Promise.all(
      chunk.map(async pr => {
        try {
          const detailResponse = await authenticatedFetch(
            `${API_BASE_URL}/repos/${repoOwner}/${repoName}/pulls/${pr.number}`
          );
          if (!detailResponse.ok) return pr;

          const detailData = (await detailResponse.json()) as Record<
            string,
            unknown
          >;
          return {
            ...pr,
            merged_at: detailData.merged_at as string | null | undefined,
            merged: detailData.merged as boolean | undefined,
            additions: detailData.additions as number | undefined,
            deletions: detailData.deletions as number | undefined,
            changed_files: detailData.changed_files as number | undefined,
            created_at: detailData.created_at as string | undefined,
            closed_at: detailData.closed_at as string | null | undefined,
          };
        } catch {
          return pr;
        }
      })
    );
    prsWithDetails.push(...chunkResults);
  }

  const remainingPRs = allPRs.slice(PR_SEARCH_CONFIG.enrichLimit).map(pr => ({
    ...pr,
    _isBasicInfo: true,
  }));

  const allPRsWithInfo = [...prsWithDetails, ...remainingPRs];
  allPRsWithInfo.sort(
    (a, b) =>
      new Date(b.created_at || b.updated_at || 0).getTime() -
      new Date(a.created_at || a.updated_at || 0).getTime()
  );
  return allPRsWithInfo;
}

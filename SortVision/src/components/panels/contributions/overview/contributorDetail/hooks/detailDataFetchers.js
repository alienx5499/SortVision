import { API_BASE_URL, PR_SEARCH_CONFIG } from '../constants';

export async function fetchCoreContributorData({
  authenticatedFetch,
  contributorLogin,
  repoOwner,
  repoName,
  totalLinesAdded,
  totalLinesDeleted,
  hasComprehensiveStats,
  commitsPerPage,
}) {
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

  let profileData = null;
  if (profileResponse.ok) {
    profileData = await profileResponse.json();
  }

  let issues = [];
  if (issuesResponse.ok) {
    const issuesData = await issuesResponse.json();
    issues = Array.isArray(issuesData?.items) ? issuesData.items : [];
  }

  let commits = [];
  if (recentCommitsResponse.ok) {
    const commitsData = await recentCommitsResponse.json();
    commits = (commitsData || []).map(commit => ({
      ...commit,
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
}) {
  let allPRs = [];
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

    const prData = await prResponse.json();
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

  const prsWithDetails = [];
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

          const detailData = await detailResponse.json();
          return {
            ...pr,
            merged_at: detailData.merged_at,
            merged: detailData.merged,
            additions: detailData.additions,
            deletions: detailData.deletions,
            changed_files: detailData.changed_files,
            created_at: detailData.created_at,
            closed_at: detailData.closed_at,
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
      new Date(b.created_at || b.updated_at) -
      new Date(a.created_at || a.updated_at)
  );
  return allPRsWithInfo;
}

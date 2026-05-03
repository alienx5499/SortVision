import type {
  RepositoryHealthSnapshot,
  RepositoryReleaseSummary,
} from './repositoryHealthTypes';

type IssueLike = { pull_request?: unknown; updated_at?: string };
type PullLike = { merged_at?: string | null };
type RepoPayload = {
  size?: number;
  language?: string | null;
  stargazers_count?: number;
};

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function isIssueLike(x: unknown): x is IssueLike {
  return typeof x === 'object' && x !== null;
}

function isPullLike(x: unknown): x is PullLike {
  return typeof x === 'object' && x !== null;
}

function isRepoPayload(x: unknown): x is RepoPayload {
  return typeof x === 'object' && x !== null;
}

function parseRelease(x: unknown): RepositoryReleaseSummary | null {
  if (typeof x !== 'object' || x === null) return null;
  const o = x as Record<string, unknown>;
  const tag_name = typeof o.tag_name === 'string' ? o.tag_name : '';
  const published_at = typeof o.published_at === 'string' ? o.published_at : '';
  const html_url = typeof o.html_url === 'string' ? o.html_url : '';
  const name = typeof o.name === 'string' ? o.name : null;
  if (!tag_name || !published_at || !html_url) return null;
  return { name, tag_name, published_at, html_url };
}

async function githubJson(
  url: string,
  authenticatedFetch: (url: string) => Promise<unknown>
): Promise<unknown> {
  return authenticatedFetch(url);
}

function logRateLimit(response: Response) {
  if (process.env.NEXT_PUBLIC_DEV_MODE !== 'true') return;
  const remaining = response.headers.get('X-RateLimit-Remaining');
  const reset = response.headers.get('X-RateLimit-Reset');
  const resetTime = reset
    ? new Date(Number(reset) * 1000).toLocaleTimeString()
    : 'unknown';
  console.log(
    `GitHub API Rate Limit - Remaining: ${remaining}/server-managed, Reset: ${resetTime}`
  );
}

export function createGithubProxyJsonFetch(): (
  resourceUrl: string
) => Promise<unknown> {
  return async (resourceUrl: string) => {
    const headers = { Accept: 'application/vnd.github.v3+json' };
    const response = await fetch(resourceUrl, { headers });
    logRateLimit(response);
    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as {
        message?: string;
      };
      throw new Error(
        `GitHub API Error: ${response.status} - ${
          errorData.message || 'Unknown error'
        }`
      );
    }
    return response.json() as Promise<unknown>;
  };
}

export type FetchRepositoryHealthParams = {
  repoOwner: string;
  repoName: string;
  apiBaseUrl: string;
  authenticatedFetch: (url: string) => Promise<unknown>;
};

export async function fetchRepositoryHealthSnapshot({
  repoOwner,
  repoName,
  apiBaseUrl,
  authenticatedFetch,
}: FetchRepositoryHealthParams): Promise<RepositoryHealthSnapshot> {
  const repoUrl = `${apiBaseUrl}/repos/${repoOwner}/${repoName}`;

  const [
    repoRaw,
    openIssuesRaw,
    closedIssuesRaw,
    openPullsRaw,
    closedPullsRaw,
    releasesRaw,
  ] = await Promise.all([
    githubJson(repoUrl, authenticatedFetch),
    githubJson(`${repoUrl}/issues?state=open&per_page=100`, authenticatedFetch),
    githubJson(
      `${repoUrl}/issues?state=closed&per_page=100`,
      authenticatedFetch
    ),
    githubJson(`${repoUrl}/pulls?state=open&per_page=100`, authenticatedFetch),
    githubJson(
      `${repoUrl}/pulls?state=closed&per_page=100`,
      authenticatedFetch
    ),
    githubJson(`${repoUrl}/releases?per_page=10`, authenticatedFetch),
  ]);

  const openIssuesData = asArray(openIssuesRaw);
  const closedIssuesData = asArray(closedIssuesRaw);
  const openPullsData = asArray(openPullsRaw);
  const closedPullsData = asArray(closedPullsRaw);
  const releasesData = asArray(releasesRaw);

  const actualOpenIssues = openIssuesData.filter(
    (issue): issue is IssueLike => isIssueLike(issue) && !issue.pull_request
  );
  const actualClosedIssues = closedIssuesData.filter(
    (issue): issue is IssueLike => isIssueLike(issue) && !issue.pull_request
  );
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentlyUpdatedIssues = actualOpenIssues.filter(issue => {
    const t = issue.updated_at ? new Date(issue.updated_at).getTime() : NaN;
    return Number.isFinite(t) && t > weekAgo;
  });

  const mergedPRs = closedPullsData.filter(
    (pr): pr is PullLike =>
      isPullLike(pr) && pr.merged_at != null && pr.merged_at !== ''
  );

  const repoData = isRepoPayload(repoRaw) ? repoRaw : {};

  const latestRelease =
    releasesData.length > 0 ? parseRelease(releasesData[0]) : null;

  return {
    issues: {
      open: actualOpenIssues.length,
      closed: actualClosedIssues.length,
      recentlyUpdated: recentlyUpdatedIssues.length,
    },
    pullRequests: {
      open: openPullsData.length,
      merged: mergedPRs.length,
      closed: closedPullsData.length - mergedPRs.length,
    },
    repository: {
      size: Math.round((repoData.size ?? 0) / 1024),
      language: repoData.language || 'JavaScript',
      stars: repoData.stargazers_count ?? 0,
    },
    releases: {
      latest: latestRelease,
    },
  };
}

export function getDefaultRepositoryHealthConfig() {
  return {
    repoOwner: process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER || 'alienx5499',
    repoName: process.env.NEXT_PUBLIC_GITHUB_REPO_NAME || 'SortVision',
    apiBaseUrl: '/api/github',
  };
}

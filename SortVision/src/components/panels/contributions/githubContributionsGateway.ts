import type { GitHubContributor } from './githubContributor';

export type RepoSummary = {
  stargazers_count?: number;
  forks_count?: number;
};

export type AuthenticatedFetch = (
  url: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

export const REPO_OWNER =
  process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER || 'alienx5499';
export const REPO_NAME =
  process.env.NEXT_PUBLIC_GITHUB_REPO_NAME || 'SortVision';
export const API_BASE_URL = '/api/github';

export function createGitHubAuthenticatedFetch(
  enableRateLogging: boolean
): AuthenticatedFetch {
  return async (url, init) => {
    const response = await fetch(url, {
      ...init,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(init?.headers as Record<string, string> | undefined),
      },
    });

    if (enableRateLogging) {
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const reset = response.headers.get('X-RateLimit-Reset');
      const resetSec = reset ? Number(reset) : 0;
      console.log(
        `GitHub API Rate Limit - Remaining: ${remaining}, Reset: ${new Date(
          resetSec * 1000
        ).toLocaleTimeString()}`
      );
    }

    return response;
  };
}

export async function fetchContributors(
  authenticatedFetch: AuthenticatedFetch
): Promise<GitHubContributor[]> {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(
        'GitHub API rate limit exceeded. Please try again later.'
      );
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return (await response.json()) as GitHubContributor[];
}

export async function fetchRepoSummary(
  authenticatedFetch: AuthenticatedFetch
): Promise<RepoSummary | null> {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}`
  );
  if (!response.ok) return null;
  return (await response.json()) as RepoSummary;
}

export async function fetchContributorStats(
  authenticatedFetch: AuthenticatedFetch
): Promise<Response> {
  return authenticatedFetch(
    `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/stats/contributors`
  );
}

export async function fetchRecentPullRequests(
  authenticatedFetch: AuthenticatedFetch
): Promise<{ additions?: number; deletions?: number }[]> {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=all&per_page=100&sort=updated&direction=desc`
  );
  if (!response.ok) return [];
  return (await response.json()) as {
    additions?: number;
    deletions?: number;
  }[];
}

export async function fetchUserProfile(
  authenticatedFetch: AuthenticatedFetch,
  login: string
): Promise<GitHubContributor | null> {
  const response = await authenticatedFetch(`${API_BASE_URL}/users/${login}`);
  if (!response.ok) return null;
  return (await response.json()) as GitHubContributor;
}

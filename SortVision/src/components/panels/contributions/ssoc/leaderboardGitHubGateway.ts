import { getGithubLeaderboardApiConfig } from './config';

/**
 * Low-level JSON fetch for the app's GitHub proxy (`/api/github/...`).
 * Single responsibility: HTTP + parse.
 */
export async function fetchGitHubRepoJson(path: string): Promise<unknown> {
  const { BASE_URL } = getGithubLeaderboardApiConfig();
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return response.json();
}

const GITHUB_API_BASE = '/api/github';
const REPO_OWNER = 'alienx5499';
const REPO_NAME = 'SortVision';

export const GITHUB_REPO_PATH = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`;
export const GITHUB_REPO_URL = 'https://github.com/alienx5499/SortVision';

/**
 * Headers for internal GitHub proxy calls.
 */
export function getGithubApiHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  const ua =
    (typeof process !== 'undefined' &&
      process.env.NEXT_PUBLIC_API_USER_AGENT?.trim()) ||
    'SortVision-App';
  headers['User-Agent'] = ua;
  return headers;
}

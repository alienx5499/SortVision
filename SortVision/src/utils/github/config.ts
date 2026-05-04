import { getGithubRepoSlugs } from '@/config/githubRepos';

const GITHUB_API_BASE = '/api/github';

export function getGithubRepoRestPath(): string {
  const { owner, name } = getGithubRepoSlugs().main;
  return `${GITHUB_API_BASE}/repos/${owner}/${name}`;
}

export function getGithubRepoWebUrl(): string {
  const { owner, name } = getGithubRepoSlugs().main;
  return owner && name ? `https://github.com/${owner}/${name}` : '';
}

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

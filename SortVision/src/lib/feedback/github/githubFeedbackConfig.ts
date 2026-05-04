import { getGithubRepoSlugs } from '@/config/githubRepos';

export const GITHUB_API_BASE = '/api/github';

export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
export const ENABLE_API_LOGGING =
  process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true' || DEV_MODE;

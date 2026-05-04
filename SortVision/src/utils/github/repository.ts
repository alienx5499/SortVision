import { githubCache } from './cache';
import { getGithubApiHeaders, getGithubRepoRestPath } from './config';
import { formatCount } from './format';

type RepoInfo = {
  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  language: string;
  description: string;
  homepage: string;
  lastUpdated: string;
};

const CACHE_KEYS = {
  repoInfo: 'sortvision_repo_info',
  starCount: 'sortvision_star_count',
} as const;

const FALLBACK_REPO_INFO: RepoInfo = {
  stars: 1200,
  forks: 150,
  watchers: 80,
  issues: 5,
  language: 'JavaScript',
  description: 'Interactive visualization of popular sorting algorithms',
  homepage: 'https://www.sortvision.com',
  lastUpdated: new Date().toISOString(),
};

/**
 * Fetch repository information from GitHub API.
 */
export const fetchRepoInfo = async (): Promise<RepoInfo> => {
  const cached = githubCache.get(CACHE_KEYS.repoInfo);
  if (cached) {
    return JSON.parse(cached) as RepoInfo;
  }

  try {
    const response = await fetch(getGithubRepoRestPath(), {
      headers: getGithubApiHeaders(),
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = (await response.json()) as Record<string, unknown>;

    const repoInfo: RepoInfo = {
      stars: Number(data.stargazers_count ?? 0),
      forks: Number(data.forks_count ?? 0),
      watchers: Number(data.watchers_count ?? 0),
      issues: Number(data.open_issues_count ?? 0),
      language: String(data.language ?? 'Unknown'),
      description: String(data.description ?? ''),
      homepage: String(data.homepage ?? ''),
      lastUpdated: String(data.updated_at ?? new Date().toISOString()),
    };

    githubCache.set(CACHE_KEYS.repoInfo, JSON.stringify(repoInfo));
    return repoInfo;
  } catch (error) {
    console.warn('Failed to fetch repo info:', error);
    return FALLBACK_REPO_INFO;
  }
};

/**
 * Fetch just the star count.
 */
export const fetchStarCount = async (): Promise<string> => {
  const cached = githubCache.get(CACHE_KEYS.starCount);
  if (cached) return cached;

  try {
    const repoInfo = await fetchRepoInfo();
    const formattedCount = formatCount(repoInfo.stars);
    githubCache.set(CACHE_KEYS.starCount, formattedCount);
    return formattedCount;
  } catch (error) {
    console.warn('Failed to fetch star count:', error);
    return '1.2k';
  }
};

/**
 * Fetch repository statistics for analytics.
 */
export const fetchRepoStats = async () => {
  try {
    const repoInfo = await fetchRepoInfo();
    return {
      stars: repoInfo.stars,
      forks: repoInfo.forks,
      starFormatted: formatCount(repoInfo.stars),
      forkFormatted: formatCount(repoInfo.forks),
      growth: calculateGrowth(repoInfo.stars),
      lastUpdated: repoInfo.lastUpdated,
    };
  } catch (error) {
    console.warn('Failed to fetch repo stats:', error);
    return null;
  }
};

/**
 * Clear all GitHub-related cache.
 */
export const clearGitHubCache = (): void => {
  githubCache.clear([CACHE_KEYS.repoInfo, CACHE_KEYS.starCount]);
};

const calculateGrowth = (_currentStars: number) => {
  return {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };
};

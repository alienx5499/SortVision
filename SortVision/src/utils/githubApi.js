/**
 * GitHub API utilities for SortVision
 */

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'alienx5499';
const REPO_NAME = 'SortVision';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Format number for display (1000 -> 1k, 1000000 -> 1M)
 */
export const formatCount = count => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace('.0', '') + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1).replace('.0', '') + 'k';
  }
  return count.toString();
};

/**
 * Generic cache management
 */
const cache = {
  get: key => {
    try {
      const data = localStorage.getItem(key);
      const time = localStorage.getItem(`${key}_time`);

      if (data && time) {
        const age = Date.now() - parseInt(time);
        if (age < CACHE_DURATION) {
          return data;
        }
      }
    } catch (error) {
      console.warn('Cache read error:', error);
    }
    return null;
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
      localStorage.setItem(`${key}_time`, Date.now().toString());
    } catch (error) {
      console.warn('Cache write error:', error);
    }
  },
};

/**
 * Fetch repository information from GitHub API
 */
export const fetchRepoInfo = async () => {
  const cacheKey = 'sortvision_repo_info';

  // Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'SortVision-App',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();

    const repoInfo = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
      issues: data.open_issues_count,
      language: data.language,
      description: data.description,
      homepage: data.homepage,
      lastUpdated: data.updated_at,
    };

    // Cache the result
    cache.set(cacheKey, JSON.stringify(repoInfo));

    return repoInfo;
  } catch (error) {
    console.warn('Failed to fetch repo info:', error);

    // Return fallback data
    return {
      stars: 1200, // Fallback star count
      forks: 150,
      watchers: 80,
      issues: 5,
      language: 'JavaScript',
      description: 'Interactive visualization of popular sorting algorithms',
      homepage: 'https://www.sortvision.com',
      lastUpdated: new Date().toISOString(),
    };
  }
};

/**
 * Fetch just the star count (lighter API call)
 */
export const fetchStarCount = async () => {
  const cacheKey = 'sortvision_star_count';

  // Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const repoInfo = await fetchRepoInfo();
    const formattedCount = formatCount(repoInfo.stars);

    // Cache formatted count separately for quick access
    cache.set(cacheKey, formattedCount);

    return formattedCount;
  } catch (error) {
    console.warn('Failed to fetch star count:', error);
    return '1.2k'; // Fallback
  }
};

/**
 * Fetch repository statistics for analytics
 */
export const fetchRepoStats = async () => {
  try {
    const repoInfo = await fetchRepoInfo();

    return {
      stars: repoInfo.stars,
      forks: repoInfo.forks,
      starFormatted: formatCount(repoInfo.stars),
      forkFormatted: formatCount(repoInfo.forks),
      growth: calculateGrowth(repoInfo.stars), // You can implement this
      lastUpdated: repoInfo.lastUpdated,
    };
  } catch (error) {
    console.warn('Failed to fetch repo stats:', error);
    return null;
  }
};

/**
 * Calculate growth rate (placeholder for future implementation)
 */
const calculateGrowth = _currentStars => {
  // This could track historical data and calculate growth
  // For now, return a placeholder
  return {
    daily: 0,
    weekly: 0,
    monthly: 0,
  };
};

/**
 * Clear all GitHub-related cache
 */
export const clearGitHubCache = () => {
  try {
    const keys = ['sortvision_repo_info', 'sortvision_star_count'];
    keys.forEach(key => {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_time`);
    });
  } catch (error) {
    console.warn('Failed to clear GitHub cache:', error);
  }
};

import React, { useState, useEffect, useCallback } from 'react';
import {
  ContributorStats,
  ContributorList,
  RepositoryHealth,
  ContributeGuide,
  QuickReferences,
  BestPractices,
  // LeaderboardList, // SSOC component commented out
} from './contributions';

// Global cache for contributor stats to avoid redundant API calls
let globalContributorStatsCache = [];
let globalCacheTimestamp = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * ContributionPanel Component
 *
 * Main component that orchestrates all contribution-related functionality.
 * Features:
 * - Real-time contributor data fetching
 * - Statistics display
 * - Interactive contributor list
 * - Admin and bot detection
 * - Auto-refresh functionality
 * - Global caching for performance optimization
 */

// Project admin and bot detection (moved outside component to prevent recreation)
const projectAdmin = 'alienx5499';
const projectAdmins = [projectAdmin];
const botUsers = ['dependabot[bot]', 'dependabot'];

const ContributionPanel = ({
  activeTab = 'overview',
  onTabChange: _onTabChange,
}) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true); // unified loading state for all sections
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalContributors: 0,
    totalCommits: 0,
    totalStars: 0,
    totalForks: 0,
    totalLinesAdded: 0,
    totalLinesDeleted: 0,
    totalChanges: 0,
  });

  // Use activeTab prop instead of internal state, with fallback
  const activeSection = activeTab || 'overview';

  // Function to fetch contributors data
  // Get configuration from environment variables
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER;
  const REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const USER_AGENT = process.env.NEXT_PUBLIC_API_USER_AGENT;

  // Validate required configuration
  const isConfigValid = REPO_OWNER && REPO_NAME;

  if (!isConfigValid) {
    console.warn(
      'GitHub repository configuration missing. Please set NEXT_PUBLIC_GITHUB_REPO_OWNER and NEXT_PUBLIC_GITHUB_REPO_NAME environment variables.'
    );
  }

  // Create authenticated fetch function
  const authenticatedFetch = useCallback(
    async url => {
      const headers = {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': USER_AGENT,
      };

      // Add authentication header if token is available
      if (GITHUB_TOKEN && GITHUB_TOKEN.trim()) {
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
      }

      const response = await fetch(url, { headers });

      // Log rate limit info if in development
      if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
        const remaining = response.headers.get('X-RateLimit-Remaining');
        const reset = response.headers.get('X-RateLimit-Reset');
        console.log(
          `GitHub API Rate Limit - Remaining: ${remaining}, Reset: ${new Date(
            reset * 1000
          ).toLocaleTimeString()}`
        );
      }

      return response;
    },
    [GITHUB_TOKEN, USER_AGENT]
  );

  // Optimized function to fetch and cache contributor stats globally
  const fetchContributorStatsGlobal = useCallback(async () => {
    // Check if cache is still valid
    const now = Date.now();
    if (
      globalContributorStatsCache.length > 0 &&
      globalCacheTimestamp &&
      now - globalCacheTimestamp < CACHE_DURATION
    ) {
      console.log('Using cached contributor stats');
      return globalContributorStatsCache;
    }

    try {
      console.log('Fetching fresh contributor stats...');
      const contributorStatsResponse = await authenticatedFetch(
        `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/stats/contributors`
      );

      if (contributorStatsResponse.ok) {
        const contributorStats = await contributorStatsResponse.json();

        // Ensure contributorStats is an array before caching
        if (Array.isArray(contributorStats)) {
          globalContributorStatsCache = contributorStats;
          globalCacheTimestamp = now;
        } else {
          console.warn('Contributor stats response is not an array:', contributorStats);
          globalContributorStatsCache = [];
          globalCacheTimestamp = now;
        }

        console.log(
          `Cached contributor stats for ${globalContributorStatsCache.length} contributors`
        );
        return globalContributorStatsCache;
      }
    } catch (error) {
      console.warn('Could not fetch contributor stats:', error);
    }

    return null;
  }, [authenticatedFetch, API_BASE_URL, REPO_OWNER, REPO_NAME]);

  const fetchContributors = useCallback(async () => {
    // Skip fetch if configuration is missing
    if (!isConfigValid) {
      setLoading(false);
      setError(
        'GitHub repository configuration is missing. Please configure NEXT_PUBLIC_GITHUB_REPO_OWNER and NEXT_PUBLIC_GITHUB_REPO_NAME environment variables.'
      );
      return;
    }

    try {
      setLoading(true);

      // Development-only logging
      if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
        console.log('Contribution Panel: Fetching contributors data...');
      }

      // Batch fetch all required data in parallel to reduce total time
      const [contributorsResponse, repoResponse, contributorStats] =
        await Promise.all([
          authenticatedFetch(
            `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`
          ),
          authenticatedFetch(
            `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}`
          ),
          fetchContributorStatsGlobal(), // Use cached or fresh data
        ]);

      if (!contributorsResponse.ok) {
        if (contributorsResponse.status === 403) {
          throw new Error(
            'GitHub API rate limit exceeded. Please try again later.'
          );
        }
        throw new Error(`GitHub API error: ${contributorsResponse.status}`);
      }

      const contributorsData = await contributorsResponse.json();

      // Development-only logging
      if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
        console.log(
          'Contribution Panel: Contributors fetched:',
          contributorsData.length
        );
      }

      let repoData = null;
      if (repoResponse.ok) {
        repoData = await repoResponse.json();

        // Development-only logging
        if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
          console.log('Contribution Panel: Repository stats fetched:', {
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
          });
        }
      }

      // Calculate comprehensive stats from cached contributor data
      const totalCommits = contributorsData.reduce(
        (sum, contributor) => sum + contributor.contributions,
        0
      );

      let totalLinesAdded = 0;
      let totalLinesDeleted = 0;

      // Use cached contributor stats if available
      if (contributorStats && contributorStats.length > 0) {
        contributorStats.forEach(contributor => {
          if (contributor.weeks) {
            contributor.weeks.forEach(week => {
              totalLinesAdded += week.a || 0;
              totalLinesDeleted += week.d || 0;
            });
          }
        });

        console.log(
          `Repository totals - Added: +${totalLinesAdded}, Deleted: -${totalLinesDeleted}`
        );
      } else {
        // Fallback: fetch recent PRs for approximation
        try {
          const recentPRsResponse = await authenticatedFetch(
            `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=all&per_page=100&sort=updated&direction=desc`
          );

          if (recentPRsResponse.ok) {
            const recentPRs = await recentPRsResponse.json();

            for (const pr of recentPRs) {
              if (pr.additions) totalLinesAdded += pr.additions;
              if (pr.deletions) totalLinesDeleted += pr.deletions;
            }

            console.log(
              `Fallback stats - Added: +${totalLinesAdded}, Deleted: -${totalLinesDeleted}`
            );
          }
        } catch (error) {
          console.warn('Could not fetch fallback code statistics:', error);
        }
      }

      setStats({
        totalContributors: contributorsData.length,
        totalCommits: totalCommits,
        totalStars: repoData?.stargazers_count || 0,
        totalForks: repoData?.forks_count || 0,
        totalLinesAdded: totalLinesAdded,
        totalLinesDeleted: totalLinesDeleted,
        totalChanges: totalLinesAdded + totalLinesDeleted,
      });

      // Include all contributors (humans and bots)
      const filteredContributors = contributorsData;

      // Sort contributors: admins first, then by contributions
      const sortedContributors = filteredContributors.sort((a, b) => {
        if (projectAdmins.includes(a.login)) return -1;
        if (projectAdmins.includes(b.login)) return 1;
        return b.contributions - a.contributions;
      });

      // Ensure admin is in the contributors list (even if no commits yet)
      const existingAdmin = sortedContributors.find(
        c => c.login === projectAdmin
      );
      let allContributors = [...sortedContributors];

      if (!existingAdmin) {
        // Fetch admin profile if not in contributors
        try {
          const response = await authenticatedFetch(
            `${API_BASE_URL}/users/${projectAdmin}`
          );
          if (response.ok) {
            const profile = await response.json();
            const adminProfile = {
              login: profile.login,
              avatar_url: profile.avatar_url,
              html_url: profile.html_url,
              contributions: 0,
              type: 'User',
            };
            allContributors.unshift(adminProfile); // Add admin at the beginning
          }
        } catch (err) {
          // Development-only logging
          if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
            console.warn(
              `Contribution Panel: Could not fetch profile for ${projectAdmin}:`,
              err
            );
          }
          // Fallback profile data
          const fallbackAdmin = {
            login: projectAdmin,
            avatar_url: `https://github.com/${projectAdmin}.png`,
            html_url: `https://github.com/${projectAdmin}`,
            contributions: 0,
            type: 'User',
          };
          allContributors.unshift(fallbackAdmin);
        }
      }

      setContributors(allContributors);

      // Update stats with final contributor count
      setStats(prevStats => ({
        ...prevStats,
        totalContributors: allContributors.length,
        totalCommits: allContributors.reduce(
          (sum, contributor) => sum + contributor.contributions,
          0
        ),
      }));

      setError(null);
    } catch (err) {
      // Development-only logging
      if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
        console.error('Contribution Panel: Error fetching contributors:', err);
      }
      setError(err.message);

      // Enhanced fallback data
      const fallbackContributors = [
        {
          login: 'alienx5499',
          avatar_url: 'https://github.com/alienx5499.png',
          html_url: 'https://github.com/alienx5499',
          contributions: 230,
          type: 'User',
        },
      ];

      setContributors(fallbackContributors);
      setStats({
        totalContributors: fallbackContributors.length,
        totalCommits: fallbackContributors.reduce(
          (sum, contributor) => sum + contributor.contributions,
          0
        ),
        totalStars: 0,
        totalForks: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [
    authenticatedFetch,
    fetchContributorStatsGlobal,
    API_BASE_URL,
    REPO_OWNER,
    REPO_NAME,
    isConfigValid,
  ]);

  // Function to get cached contributor stats for individual contributor
  const getCachedContributorStats = useCallback(login => {
    if (!globalContributorStatsCache || !Array.isArray(globalContributorStatsCache)) return null;

    const contributorStat = globalContributorStatsCache.find(
      stat => stat.author && stat.author.login === login
    );

    if (contributorStat && contributorStat.weeks) {
      let totalLinesAdded = 0;
      let totalLinesDeleted = 0;

      contributorStat.weeks.forEach(week => {
        totalLinesAdded += week.a || 0;
        totalLinesDeleted += week.d || 0;
      });

      return { totalLinesAdded, totalLinesDeleted };
    }

    return null;
  }, []);

  // useEffect for initial load and 60-minute refresh
  useEffect(() => {
    // Initial load with small delay
    const initialTimer = setTimeout(fetchContributors, 500);

    // Set up 60-minute refresh interval (60 * 60 * 1000 = 3,600,000 ms)
    const refreshInterval = setInterval(fetchContributors, 60 * 60 * 1000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(refreshInterval);
    };
  }, [fetchContributors]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <div className="text-red-400 mb-4">{error}</div>
          <button
            onClick={fetchContributors}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Content based on active section - fixed min-height to prevent CLS */}
      <div className="space-y-6 min-h-[600px]">
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Contributor Statistics */}
            <div className="min-h-[120px]">
              <ContributorStats
                stats={stats}
                loading={loading}
                onRefresh={fetchContributors}
              />
            </div>

            {/* Contributor List */}
            <div className="min-h-[200px]">
              <ContributorList
                contributors={contributors}
                loading={loading}
                onRefresh={fetchContributors}
                projectAdmins={projectAdmins}
                botUsers={botUsers}
                authenticatedFetch={authenticatedFetch}
                getCachedContributorStats={getCachedContributorStats}
              />
            </div>

            {/* Repository Health Dashboard */}
            <div className="min-h-[150px]">
              <RepositoryHealth />
            </div>
          </div>
        )}

        {activeSection === 'guide' && (
          <div className="space-y-6">
            {/* Contribution Guide */}
            <div className="min-h-[200px]">
              <ContributeGuide />
            </div>

            {/* Best Practices */}
            <div className="min-h-[150px]">
              <BestPractices />
            </div>

            {/* Quick References */}
            <div className="min-h-[150px]">
              <QuickReferences />
            </div>
          </div>
        )}

        {/* SSOC section commented out
        {activeSection === 'ssoc' && (
          <div className="space-y-6">
            SSOC Leaderboard
            <div className="min-h-[400px]">
              <LeaderboardList
                loading={loading}
                onRefresh={fetchContributors}
              />
            </div>
          </div>
        )}
        */}
      </div>
    </div>
  );
};

export default ContributionPanel;

import React, { useState, useEffect, useCallback } from 'react';
import { ContributorStats, ContributorList, RepositoryHealth, ContributeGuide, QuickReferences, BestPractices, LeaderboardList } from './contributions';

/**
 * ContributionPanel Component
 * 
 * Main component that orchestrates all contribution-related functionality.
 * Features:
 * - Real-time contributor data fetching
 * - Statistics display
 * - Interactive contributor list
 * - Contribution guide
 * - Admin and bot detection
 * - Auto-refresh functionality
 */

// Project admin and bot detection (moved outside component to prevent recreation)
const projectAdmin = "alienx5499";
const projectAdmins = [projectAdmin];
const botUsers = ["dependabot[bot]", "dependabot"];

const ContributionPanel = ({ activeTab = 'overview', onTabChange }) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true); // unified loading state for all sections
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalContributors: 0,
    totalCommits: 0,
    totalStars: 0,
    totalForks: 0
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

  // Create authenticated fetch function
  const authenticatedFetch = useCallback(async (url) => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': USER_AGENT,
    };

    // Add authentication header if token is available
    if (GITHUB_TOKEN && GITHUB_TOKEN !== 'your_github_personal_access_token_here') {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(url, { headers });
    
    // Log rate limit info if in development
    if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const reset = response.headers.get('X-RateLimit-Reset');
      console.log(`GitHub API Rate Limit - Remaining: ${remaining}, Reset: ${new Date(reset * 1000).toLocaleTimeString()}`);
    }

    return response;
  }, [GITHUB_TOKEN, USER_AGENT]);

  const fetchContributors = useCallback(async () => {
    try {
      setLoading(true);
      
      // Development-only logging
      if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
        console.log('Contribution Panel: Fetching contributors data...');
      }
      
      // Fetch contributors with proper error handling
      const contributorsResponse = await authenticatedFetch(
        `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`
      );
      
      if (!contributorsResponse.ok) {
        if (contributorsResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        throw new Error(`GitHub API error: ${contributorsResponse.status}`);
      }
      
      const contributorsData = await contributorsResponse.json();
      
      // Development-only logging
      if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
        console.log('Contribution Panel: Contributors fetched:', contributorsData.length);
      }
      
      // Fetch repository stats
      const repoResponse = await authenticatedFetch(
        `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}`
      );
      
      let repoData = null;
      if (repoResponse.ok) {
        repoData = await repoResponse.json();
        
        // Development-only logging
        if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
          console.log('Contribution Panel: Repository stats fetched:', {
            stars: repoData.stargazers_count,
            forks: repoData.forks_count
          });
        }
      }
      
      // Calculate stats
      const totalCommits = contributorsData.reduce((sum, contributor) => sum + contributor.contributions, 0);
      
      setStats({
        totalContributors: contributorsData.length,
        totalCommits: totalCommits,
        totalStars: repoData?.stargazers_count || 0,
        totalForks: repoData?.forks_count || 0
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
      const existingAdmin = sortedContributors.find(c => c.login === projectAdmin);
      let allContributors = [...sortedContributors];
      
      if (!existingAdmin) {
        // Fetch admin profile if not in contributors
        try {
          const response = await authenticatedFetch(`${API_BASE_URL}/users/${projectAdmin}`);
          if (response.ok) {
            const profile = await response.json();
            const adminProfile = {
              login: profile.login,
              avatar_url: profile.avatar_url,
              html_url: profile.html_url,
              contributions: 0,
              type: "User"
            };
            allContributors.unshift(adminProfile); // Add admin at the beginning
          }
        } catch (err) {
          // Development-only logging
          if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
            console.warn(`Contribution Panel: Could not fetch profile for ${projectAdmin}:`, err);
          }
          // Fallback profile data
          const fallbackAdmin = {
            login: projectAdmin,
            avatar_url: `https://github.com/${projectAdmin}.png`,
            html_url: `https://github.com/${projectAdmin}`,
            contributions: 0,
            type: "User"
          };
          allContributors.unshift(fallbackAdmin);
        }
      }
      
      setContributors(allContributors);
      
      // Update stats with final contributor count
      setStats(prevStats => ({
        ...prevStats,
        totalContributors: allContributors.length,
        totalCommits: allContributors.reduce((sum, contributor) => sum + contributor.contributions, 0)
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
          login: "alienx5499",
          avatar_url: "https://github.com/alienx5499.png",
          html_url: "https://github.com/alienx5499",
          contributions: 230,
          type: "User"
        }
      ];
      
      setContributors(fallbackContributors);
      setStats({
        totalContributors: fallbackContributors.length,
        totalCommits: fallbackContributors.reduce((sum, contributor) => sum + contributor.contributions, 0),
        totalStars: 0,
        totalForks: 0
      });
    } finally {
      setLoading(false);
    }
  }, [authenticatedFetch, API_BASE_URL, REPO_OWNER, REPO_NAME]);

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

  return (
    <div className="space-y-6">
      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
          <p className="text-red-400 font-mono text-sm">
            Unable to fetch live data. Showing cached data.
          </p>
          <p className="text-red-500/70 font-mono text-xs mt-1">
            {error}
          </p>
        </div>
      )}
      
      {/* Internal Tab Navigation for overview.js, guide.js and ssoc.js */}
      <div 
        role="tablist" 
        aria-orientation="horizontal" 
        className="text-muted-foreground h-9 items-center justify-center rounded-lg p-1 grid w-full grid-cols-3 bg-slate-900" 
        tabIndex="0"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'overview'}
          data-state={activeSection === 'overview' ? 'active' : 'inactive'}
          onClick={() => onTabChange && onTabChange('overview')}
          className="data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-mono"
          tabIndex={activeSection === 'overview' ? 0 : -1}
        >
          <span className="text-emerald-400">overview</span>
          <span className="text-slate-400">.js</span>
        </button>
        
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'guide'}
          data-state={activeSection === 'guide' ? 'active' : 'inactive'}
          onClick={() => onTabChange && onTabChange('guide')}
          className="data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-mono"
          tabIndex={activeSection === 'guide' ? 0 : -1}
        >
          <span className="text-emerald-400">guide</span>
          <span className="text-slate-400">.js</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeSection === 'ssoc'}
          data-state={activeSection === 'ssoc' ? 'active' : 'inactive'}
          onClick={() => onTabChange && onTabChange('ssoc')}
          className="data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-mono"
          tabIndex={activeSection === 'ssoc' ? 0 : -1}
        >
          <span className="text-emerald-400">ssoc</span>
          <span className="text-slate-400">.js</span>
        </button>
      </div>
      
      {/* Content based on active section */}
      <div className="space-y-6">
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Contributor Statistics */}
            <ContributorStats stats={stats} loading={loading} onRefresh={fetchContributors} />
            
            {/* Contributor List */}
            <ContributorList 
              contributors={contributors} 
              loading={loading}
              onRefresh={fetchContributors}
              projectAdmins={projectAdmins}
              botUsers={botUsers}
            />

            {/* Repository Health Dashboard */}
            <RepositoryHealth />
          </div>
        )}
        
        {activeSection === 'guide' && (
          <div className="space-y-6">
            {/* Contribution Guide */}
            <ContributeGuide />
            
            {/* Best Practices */}
            <BestPractices />
            
            {/* Quick References */}
            <QuickReferences />
          </div>
        )}

        {activeSection === 'ssoc' && (
          <div className="space-y-6">
            {/* SSOC Leaderboard */}
            <LeaderboardList loading={loading} onRefresh={fetchContributors} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributionPanel; 
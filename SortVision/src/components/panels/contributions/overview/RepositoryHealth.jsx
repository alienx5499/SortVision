import React, { useState, useEffect, useCallback } from 'react';
import { Activity, GitPullRequest, AlertCircle, Package, Tag, RefreshCw } from 'lucide-react';

/**
 * Repository Health Component
 * 
 * Displays key project health metrics:
 * - Issues status (open vs closed vs recently updated)
 * - Pull requests status (open vs merged vs closed)
 * - Repository info (size, language, stars)
 * - Latest release information
 */
const RepositoryHealth = () => {
  const [healthData, setHealthData] = useState({
    issues: { open: 0, closed: 0, recentlyUpdated: 0 },
    pullRequests: { open: 0, merged: 0, closed: 0 },
    repository: { 
      size: 0, 
      language: 'JavaScript', 
      stars: 0
    },
    releases: {
      latest: null
    },
    loading: true,
    error: null
  });

  // Get configuration from environment variables
  const REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER;
  const REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME;
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const USER_AGENT = process.env.NEXT_PUBLIC_API_USER_AGENT;

  // Create authenticated fetch function for direct GitHub API calls
  const authenticatedFetch = useCallback(async (githubUrl) => {
    const headers = {
      'User-Agent': USER_AGENT,
      'Accept': 'application/vnd.github.v3+json'
    };

    // Add authorization if token is available
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
      
      // Development-only logging to confirm token is being used
      if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
        console.log('RepositoryHealth: Using GitHub token for authentication');
      }
    } else {
      // Development-only logging when no token
      if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
        console.log('RepositoryHealth: No GitHub token found, using unauthenticated requests');
      }
    }

    const response = await fetch(githubUrl, { headers });
    
    // Log rate limit info if in development
    if (process.env.NEXT_PUBLIC_DEV_MODE === 'true') {
      const remaining = response.headers.get('X-RateLimit-Remaining');
      const reset = response.headers.get('X-RateLimit-Reset');
      const resetTime = reset ? new Date(reset * 1000).toLocaleTimeString() : 'unknown';
      const limit = GITHUB_TOKEN ? '5000' : '60';
      console.log(`GitHub API Rate Limit - Remaining: ${remaining}/${limit}, Reset: ${resetTime}`);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`GitHub API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    return response.json();
  }, [GITHUB_TOKEN, USER_AGENT]);



  const fetchHealthData = useCallback(async () => {
    try {
      setHealthData(prev => ({ ...prev, loading: true, error: null }));
      
      // Development-only logging
      if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
        console.log('Repository Health: Fetching health data...');
      }

      const repoUrl = `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}`;
      
      // Fetch all data concurrently
      const [
        repoData, 
        openIssuesData, 
        closedIssuesData, 
        openPullsData, 
        closedPullsData,
        releasesData
      ] = await Promise.all([
        authenticatedFetch(repoUrl),
        authenticatedFetch(`${repoUrl}/issues?state=open&per_page=100`),
        authenticatedFetch(`${repoUrl}/issues?state=closed&per_page=100`),
        authenticatedFetch(`${repoUrl}/pulls?state=open&per_page=100`),
        authenticatedFetch(`${repoUrl}/pulls?state=closed&per_page=100`),
        authenticatedFetch(`${repoUrl}/releases?per_page=10`)
      ]);

      // Filter out pull requests from issues (GitHub API returns PRs as issues)
      const actualOpenIssues = openIssuesData.filter(issue => !issue.pull_request);
      const actualClosedIssues = closedIssuesData.filter(issue => !issue.pull_request);
      const recentlyUpdatedIssues = actualOpenIssues.filter(issue => 
        new Date(issue.updated_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
      );

      // Count merged pull requests from closed PRs
      const mergedPRs = closedPullsData.filter(pr => pr.merged_at !== null);

      setHealthData({
        issues: {
          open: actualOpenIssues.length,
          closed: actualClosedIssues.length,
          recentlyUpdated: recentlyUpdatedIssues.length
        },
        pullRequests: {
          open: openPullsData?.length || 0,
          merged: mergedPRs.length,
          closed: closedPullsData.length - mergedPRs.length
        },
        repository: {
          size: Math.round((repoData?.size || 0) / 1024),
          language: repoData?.language || 'JavaScript',
          stars: repoData?.stargazers_count || 0
        },
        releases: {
          latest: releasesData[0] || null
        },
        loading: false,
        error: null
      });

      // Development-only logging
      if (process.env.NEXT_PUBLIC_ENABLE_API_LOGGING === 'true') {
        console.log('Repository Health: Data updated successfully');
      }

    } catch (error) {
      console.error('Repository Health: Error fetching data:', error);
      setHealthData(prev => ({
        ...prev,
        loading: false,
        error: error.message,
        // Fallback data - show 0 for unknown counts
        issues: { open: 0, closed: 0, recentlyUpdated: 0 },
        pullRequests: { open: 0, merged: 0, closed: 0 },
        repository: { 
          size: 2, 
          language: 'JavaScript', 
          stars: 0
        },
        releases: { latest: null }
      }));
    }
  }, [API_BASE_URL, REPO_OWNER, REPO_NAME, authenticatedFetch]);

  useEffect(() => {
    fetchHealthData();
  }, [fetchHealthData]);

  const healthMetrics = [
    {
      title: 'Issues',
      icon: AlertCircle,
      color: 'blue',
      data: [
        { label: 'Open', value: healthData.issues.open, color: 'text-yellow-400' },
        { label: 'Closed', value: healthData.issues.closed, color: 'text-green-400' },
        { label: 'Recent', value: healthData.issues.recentlyUpdated, color: 'text-blue-400' }
      ]
    },
    {
      title: 'Pull Requests', 
      icon: GitPullRequest,
      color: 'purple',
      data: [
        { label: 'Open', value: healthData.pullRequests.open, color: 'text-blue-400' },
        { label: 'Merged', value: healthData.pullRequests.merged, color: 'text-emerald-400' },
        { label: 'Closed', value: healthData.pullRequests.closed, color: 'text-slate-400' }
      ]
    },
    {
      title: 'Repository',
      icon: Package,
      color: 'emerald',
      data: [
        { label: 'Size', value: `${healthData.repository.size}MB`, color: 'text-slate-300' },
        { label: 'Language', value: healthData.repository.language, color: 'text-blue-400' },
        { label: 'Stars', value: healthData.repository.stars, color: 'text-yellow-400' }
      ]
    }
  ];



  return (
    <div className="mb-4 relative group">
      {/* Animated background glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/health overflow-hidden">
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/health:w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>
        
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
          <div className="absolute h-2 w-2 rounded-full bg-blue-500/50 top-[15%] left-[25%] animate-pulse" style={{ animationDuration: '3s' }}></div>
          <div className="absolute h-1 w-1 rounded-full bg-purple-500/50 top-[60%] left-[75%] animate-pulse" style={{ animationDuration: '2.5s' }}></div>
          <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/50 top-[80%] left-[20%] animate-pulse" style={{ animationDuration: '4s' }}></div>
        </div>
        
        {/* Header */}
        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <Activity className="mr-2 h-4 w-4 text-blue-400 animate-pulse" style={{ animationDuration: '3s' }} />
            <span>// repository health</span>
          </div>
          <button 
            onClick={fetchHealthData}
            disabled={healthData.loading}
            className="p-1 hover:bg-slate-800 rounded transition-colors duration-200 disabled:opacity-50"
            title="Refresh health data"
          >
            <RefreshCw className={`h-3 w-3 text-slate-500 hover:text-blue-400 transition-colors ${healthData.loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        {/* Error Message */}
        {healthData.error && (
          <div className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 font-mono relative z-10">
            API limit reached. Showing cached data.
          </div>
        )}



        {/* Health Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 relative z-10">
          {healthMetrics.map((metric, index) => (
            <HealthCard key={metric.title} metric={metric} index={index} loading={healthData.loading} />
          ))}
        </div>

        {/* Additional Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {/* Latest Release */}
          {healthData.releases.latest && (
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center mb-2">
                <Tag className="h-3 w-3 text-emerald-400 mr-2" />
                <span className="font-mono text-xs font-bold text-emerald-400">Latest Release</span>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-sm text-white">{healthData.releases.latest.name || healthData.releases.latest.tag_name}</div>
                <div className="font-mono text-xs text-slate-400">
                  {new Date(healthData.releases.latest.published_at).toLocaleDateString()}
                </div>
                <a 
                  href={healthData.releases.latest.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-2 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded text-emerald-400 hover:text-emerald-300 font-mono text-xs transition-colors duration-200"
                >
                  View Release →
                </a>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

// Health Card Component
const HealthCard = ({ metric, index, loading }) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' }
  };

  const colors = colorClasses[metric.color] || colorClasses.blue;
  const Icon = metric.icon;

  return (
    <div 
      className={`group/card relative p-3 rounded-lg border ${colors.border} ${colors.bg} transition-all duration-300 hover:scale-105 animate-fade-up animate-once overflow-hidden`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Card shimmer effect */}
      <div className="absolute inset-0 w-0 group-hover/card:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="flex items-center mb-3">
        <div className={`p-1.5 rounded-md ${colors.bg} border ${colors.border}`}>
          <Icon className={`w-3 h-3 ${colors.text}`} />
        </div>
        <h3 className={`font-mono text-xs font-bold ${colors.text} ml-2`}>
          {metric.title}
        </h3>
      </div>
      
      <div className="space-y-2">
        {metric.data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">{item.label}:</span>
            <span className={`font-mono text-xs font-bold ${loading ? 'text-slate-500' : item.color}`}>
              {loading ? '...' : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryHealth; 
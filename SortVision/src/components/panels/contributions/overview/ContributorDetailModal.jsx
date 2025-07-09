import React, { useState, useEffect } from 'react';
import { 
  X, Github, ExternalLink, GitPullRequest, Bug, GitCommit, 
  Calendar, MapPin, Users, Building, Mail, Globe, 
  Crown, Bot, Heart, Star, GitFork, Activity,
  TrendingUp, Clock, Code, FileText
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

/**
 * ContributorDetailModal Component
 * 
 * A comprehensive modal showing detailed information about a contributor including:
 * - Profile information and bio
 * - Recent pull requests and status
 * - Issues created and assigned
 * - Commit activity and statistics
 * - Repository contributions
 * - Timeline of activities
 */
const ContributorDetailModal = ({ 
  contributor, 
  isOpen, 
  onClose, 
  isAdmin, 
  isBot,
  authenticatedFetch,
  getCachedContributorStats
}) => {
  const [profileData, setProfileData] = useState(null);
  const [pullRequests, setPullRequests] = useState([]);
  const [issues, setIssues] = useState([]);
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState({ current: 0, total: 0, stage: '' });
  const [activeTab, setActiveTab] = useState('overview');

  // Get environment variables
  const REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_REPO_OWNER;
  const REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO_NAME;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (isOpen && contributor && authenticatedFetch) {
      fetchDetailedData();
    }
  }, [isOpen, contributor, authenticatedFetch, getCachedContributorStats]);

  const fetchDetailedData = async () => {
    if (!contributor || !authenticatedFetch) return;
    
    setLoading(true);
    setLoadingProgress({ current: 0, total: 3, stage: 'Initializing...' });
    
    try {
      // Use cached comprehensive stats first
      let totalLinesAdded = 0;
      let totalLinesDeleted = 0;
      let hasComprehensiveStats = false;
      
      if (getCachedContributorStats) {
        const cachedStats = getCachedContributorStats(contributor.login);
        if (cachedStats) {
          totalLinesAdded = cachedStats.totalLinesAdded;
          totalLinesDeleted = cachedStats.totalLinesDeleted;
          hasComprehensiveStats = true;
          console.log(`Using cached stats for ${contributor.login}: +${totalLinesAdded} -${totalLinesDeleted}`);
        }
      }

      // Batch fetch essential data in parallel - much faster than sequential calls
      setLoadingProgress({ current: 1, total: 3, stage: 'Fetching core data...' });
      
      const [profileResponse, issuesResponse, recentCommitsResponse] = await Promise.all([
        authenticatedFetch(`${API_BASE_URL}/users/${contributor.login}`),
        authenticatedFetch(`${API_BASE_URL}/search/issues?q=author:${contributor.login}+repo:${REPO_OWNER}/${REPO_NAME}+type:issue&sort=updated&per_page=50`),
        authenticatedFetch(`${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/commits?author=${contributor.login}&per_page=10`) // Reduced from 20 to 10
      ]);

      // Process profile data
      if (profileResponse.ok) {
        const profile = await profileResponse.json();
        setProfileData(profile);
      }

      // Process issues data
      if (issuesResponse.ok) {
        const issuesData = await issuesResponse.json();
        setIssues(issuesData.items || []);
      }

      // Process recent commits (without individual detailed fetching - too expensive)
      if (recentCommitsResponse.ok) {
        const commitsData = await recentCommitsResponse.json();
        const enhancedCommits = (commitsData || []).map(commit => ({
          ...commit,
          // Add comprehensive stats as metadata
          _comprehensiveStats: {
            totalLinesAdded,
            totalLinesDeleted,
            hasComprehensiveStats
          }
        }));
        setCommits(enhancedCommits);
      }

      // Fetch PRs efficiently - optimized pagination
      setLoadingProgress({ current: 2, total: 3, stage: 'Fetching pull requests...' });
      
      const fetchOptimizedPRs = async () => {
        let allPRs = [];
        let page = 1;
        const perPage = 100;
        const maxPages = 10; // Limit to 10 pages (1000 PRs) for performance
        
        try {
          while (page <= maxPages) {
            setLoadingProgress({ current: 2, total: 3, stage: `Fetching PRs (page ${page})...` });
            
            const prResponse = await authenticatedFetch(
              `${API_BASE_URL}/search/issues?q=author:${contributor.login}+repo:${REPO_OWNER}/${REPO_NAME}+type:pr&sort=created&order=desc&per_page=${perPage}&page=${page}`
            );
            
            if (!prResponse.ok) break;
            
            const prData = await prResponse.json();
            const items = prData.items || [];
            
            if (items.length === 0) break;
            
            allPRs = [...allPRs, ...items];
            
            // If we got less than perPage items, we've reached the end
            if (items.length < perPage) break;
            
            page++;
          }
          
          // Batch fetch detailed information for PRs (limit to first 50 for performance)
          const prsToEnrich = allPRs.slice(0, 50);
          setLoadingProgress({ current: 2, total: 3, stage: `Enriching ${prsToEnrich.length} recent PRs...` });
          
          const prsWithDetails = await Promise.all(
            prsToEnrich.map(async (pr, _index) => {
              try {
                const detailResponse = await authenticatedFetch(
                  `${API_BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${pr.number}`
                );
                if (detailResponse.ok) {
                  const detailData = await detailResponse.json();
                  return {
                    ...pr,
                    merged_at: detailData.merged_at,
                    merged: detailData.merged,
                    additions: detailData.additions,
                    deletions: detailData.deletions,
                    changed_files: detailData.changed_files,
                    created_at: detailData.created_at,
                    closed_at: detailData.closed_at
                  };
                }
                return pr;
              } catch (error) {
                console.warn(`Failed to fetch details for PR #${pr.number}:`, error);
                return pr;
              }
            })
          );
          
          // Add remaining PRs without detailed info (for count purposes)
          const remainingPRs = allPRs.slice(50).map(pr => ({
            ...pr,
            _isBasicInfo: true // Flag to indicate limited info
          }));
          
          const allPRsWithInfo = [...prsWithDetails, ...remainingPRs];
          
          // Sort by creation date (newest first)
          allPRsWithInfo.sort((a, b) => new Date(b.created_at || b.updated_at) - new Date(a.created_at || a.updated_at));
          
          return allPRsWithInfo;
        } catch (error) {
          console.error('Error fetching PRs:', error);
          return [];
        }
      };
      
      const allPRs = await fetchOptimizedPRs();
      setPullRequests(allPRs);

      setLoadingProgress({ current: 3, total: 3, stage: 'Finalizing...' });

    } catch (error) {
      console.error('Error fetching detailed contributor data:', error);
    } finally {
      setLoading(false);
      setLoadingProgress({ current: 0, total: 0, stage: '' });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getContributorType = () => {
    if (isAdmin) return { label: 'ADMIN', color: 'emerald', icon: Crown };
    if (isBot) return { label: 'BOT', color: 'blue', icon: Bot };
    return { label: 'COMMUNITY', color: 'purple', icon: Users };
  };

  const contributorType = getContributorType();

  if (!isOpen || !contributor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 border-b border-slate-700">
            {/* Terminal window controls */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              {/* Terminal grid pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            <div className="relative z-10 flex items-start justify-between pt-6">
              {/* Terminal-style header */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className={`w-16 h-16 rounded-lg border-2 border-${contributorType.color}-500/50 shadow-lg`}
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-${contributorType.color}-500/20 border-2 border-${contributorType.color}-500 flex items-center justify-center`}>
                    <contributorType.icon className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  {/* Terminal prompt style */}
                  <div className="flex items-center gap-2 mb-2 font-mono text-sm">
                    <span className="text-emerald-400">$</span>
                    <span className="text-slate-400">whoami</span>
                    <span className="text-white">→</span>
                    <span className="text-emerald-400">{contributor.login}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-white font-mono">{contributor.login}</h2>
                    <div className={`px-3 py-1 rounded-md text-xs border border-${contributorType.color}-500/30 bg-${contributorType.color}-500/10 text-${contributorType.color}-400 flex items-center gap-1 font-mono`}>
                      <contributorType.icon className="w-3 h-3" />
                      {contributorType.label}
                    </div>
                  </div>
                  
                  {profileData?.name && (
                    <p className="text-slate-300 font-medium mb-1">{profileData.name}</p>
                  )}
                  {profileData?.bio && (
                    <p className="text-slate-400 text-sm mt-1 max-w-md font-mono">{profileData.bio}</p>
                  )}
                  
                  {/* Terminal-style stats */}
                  <div className="flex items-center gap-6 mt-3 text-sm font-mono">
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="text-emerald-400">commits:</span>
                      <span className="text-white">{contributor.contributions}</span>
                    </div>
                    {profileData?.created_at && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="text-emerald-400">joined:</span>
                        <span className="text-white">{formatDate(profileData.created_at)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="text-emerald-400">status:</span>
                      <span className="text-green-400">active</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-600 bg-slate-800/50"
                title="Close (Esc)"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-700 bg-slate-900/50 relative">
            {/* Terminal prompt for tabs */}
            <div className="absolute left-4 top-0 bottom-0 flex items-center">
              <span className="text-emerald-400 font-mono text-xs">~/contributor</span>
              <span className="text-slate-400 font-mono text-xs ml-1">$</span>
            </div>
            
            <div className="flex ml-32">
              {[
                { id: 'overview', label: 'overview.md', icon: Activity },
                { id: 'pulls', label: 'pulls.json', icon: GitPullRequest },
                { id: 'issues', label: 'issues.log', icon: Bug },
                { id: 'commits', label: 'commits.git', icon: GitCommit }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-mono text-sm transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? 'text-emerald-400 bg-slate-800/80 border-t-2 border-emerald-400'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  
                  {/* Active tab indicator */}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"></div>
                  )}
                  
                  {/* File extension color coding */}
                  <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                    tab.id === 'overview' ? 'bg-blue-400/50' :
                    tab.id === 'pulls' ? 'bg-emerald-400/50' :
                    tab.id === 'issues' ? 'bg-red-400/50' :
                    'bg-purple-400/50'
                  }`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                {/* Terminal-style loading */}
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 font-mono text-sm max-w-md w-full">
                  <div className="flex items-center gap-2 text-emerald-400 mb-4">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span>Loading contributor data...</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{loadingProgress.current}/{loadingProgress.total}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-400 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${(loadingProgress.current / loadingProgress.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Current stage */}
                  <div className="text-slate-300 text-xs">
                    <span className="text-emerald-400">$</span> {loadingProgress.stage}
                    <span className="animate-pulse">|</span>
                  </div>
                  
                  {/* Loading animation */}
                  <div className="flex items-center gap-1 mt-3">
                    <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {activeTab === 'overview' && (
                  <OverviewTab 
                    profileData={profileData} 
                    contributor={contributor}
                    pullRequests={pullRequests}
                    issues={issues}
                    commits={commits}
                  />
                )}
                {activeTab === 'pulls' && (
                  <PullRequestsTab pullRequests={pullRequests} />
                )}
                {activeTab === 'issues' && (
                  <IssuesTab issues={issues} />
                )}
                {activeTab === 'commits' && (
                  <CommitsTab commits={commits} />
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Overview Tab Component
const OverviewTab = ({ profileData, contributor, pullRequests, issues, commits }) => {
  const stats = [
    { label: 'Public Repos', value: profileData?.public_repos || 0, icon: Github },
    { label: 'Followers', value: profileData?.followers || 0, icon: Users },
    { label: 'Following', value: profileData?.following || 0, icon: Heart },
    { label: 'Total Stars', value: profileData?.stargazers_count || 0, icon: Star }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <stat.icon className="w-4 h-4" />
              {stat.label}
            </div>
            <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Profile Details */}
      {profileData && (
        <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            Profile Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {profileData.company && (
              <div className="flex items-center gap-2 text-slate-300">
                <Building className="w-4 h-4 text-slate-400" />
                <span>{profileData.company}</span>
              </div>
            )}
            {profileData.location && (
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{profileData.location}</span>
              </div>
            )}
            {profileData.email && (
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{profileData.email}</span>
              </div>
            )}
            {profileData.blog && (
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-slate-400" />
                <a href={profileData.blog} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  {profileData.blog}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

                {/* Recent Activity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
                <GitPullRequest className="w-4 h-4" />
                Pull Requests
              </div>
              <div className="text-2xl font-bold text-white font-mono">{pullRequests.length}</div>
              <div className="text-xs text-slate-400 mt-1 space-y-1">
                <div>Total: {pullRequests.length}</div>
                {pullRequests.length > 0 && (
                  <div className="flex gap-3">
                    <span className="text-purple-400">
                      {pullRequests.filter(pr => pr.merged === true || pr.merged_at).length} merged
                    </span>
                    <span className="text-green-400">
                      {pullRequests.filter(pr => pr.state === 'open').length} open
                    </span>
                    <span className="text-red-400">
                      {pullRequests.filter(pr => pr.state === 'closed' && !pr.merged && !pr.merged_at).length} closed
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                <Bug className="w-4 h-4" />
                Issues
              </div>
              <div className="text-2xl font-bold text-white font-mono">{issues.length}</div>
              <div className="text-xs text-slate-400 mt-1 space-y-1">
                <div>Total: {issues.length}</div>
                {issues.length > 0 && (
                  <div className="flex gap-3">
                    <span className="text-green-400">
                      {issues.filter(issue => issue.state === 'open').length} open
                    </span>
                    <span className="text-purple-400">
                      {issues.filter(issue => issue.state === 'closed').length} closed
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                Lines Added
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                +{(() => {
                  // Use comprehensive stats if available, otherwise fall back to partial data
                  const comprehensiveStats = commits.length > 0 && commits[0]._comprehensiveStats;
                  if (comprehensiveStats && comprehensiveStats.hasComprehensiveStats) {
                    return comprehensiveStats.totalLinesAdded.toLocaleString();
                  }
                  // Fallback to partial calculation
                  return (pullRequests.reduce((sum, pr) => sum + (pr.additions || 0), 0) + 
                         commits.reduce((sum, commit) => sum + (commit.stats?.additions || 0), 0)).toLocaleString();
                })()}
              </div>
              <div className="text-xs text-slate-400 mt-1 space-y-1">
                <div>{(() => {
                  const comprehensiveStats = commits.length > 0 && commits[0]._comprehensiveStats;
                  if (comprehensiveStats && comprehensiveStats.hasComprehensiveStats) {
                    return 'Total insertions (complete history)';
                  }
                  return 'Total insertions (partial data - cached stats not available)';
                })()}</div>
                <div className="flex gap-2">
                  <span className="text-emerald-400">
                    PRs: +{pullRequests.reduce((sum, pr) => sum + (pr.additions || 0), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <TrendingUp className="w-4 h-4 rotate-180" />
                Lines Deleted
              </div>
              <div className="text-2xl font-bold text-white font-mono">
                -{(() => {
                  // Use comprehensive stats if available, otherwise fall back to partial data
                  const comprehensiveStats = commits.length > 0 && commits[0]._comprehensiveStats;
                  if (comprehensiveStats && comprehensiveStats.hasComprehensiveStats) {
                    return comprehensiveStats.totalLinesDeleted.toLocaleString();
                  }
                  // Fallback to partial calculation
                  return (pullRequests.reduce((sum, pr) => sum + (pr.deletions || 0), 0) + 
                         commits.reduce((sum, commit) => sum + (commit.stats?.deletions || 0), 0)).toLocaleString();
                })()}
              </div>
              <div className="text-xs text-slate-400 mt-1 space-y-1">
                <div>{(() => {
                  const comprehensiveStats = commits.length > 0 && commits[0]._comprehensiveStats;
                  if (comprehensiveStats && comprehensiveStats.hasComprehensiveStats) {
                    return 'Total deletions (complete history)';
                  }
                  return 'Total deletions (partial data - cached stats not available)';
                })()}</div>
                <div className="flex gap-2">
                  <span className="text-red-400">
                    PRs: -{pullRequests.reduce((sum, pr) => sum + (pr.deletions || 0), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

// Pull Requests Tab Component
const PullRequestsTab = ({ pullRequests }) => {
  if (pullRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <GitPullRequest className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-400 font-mono">No pull requests found</p>
      </div>
    );
  }

  const getPRStatus = (pr) => {
    // Check if PR is open
    if (pr.state === 'open') {
      return {
        status: 'OPEN',
        color: 'green',
        icon: 'text-green-400',
        bg: 'bg-green-500/20 text-green-400'
      };
    }
    
    // Check if PR was merged (use merged field or merged_at)
    if (pr.merged === true || pr.merged_at) {
      return {
        status: 'MERGED',
        color: 'purple',
        icon: 'text-purple-400',
        bg: 'bg-purple-500/20 text-purple-400'
      };
    }
    
    // PR was closed without merging
    if (pr.state === 'closed') {
      return {
        status: 'CLOSED',
        color: 'red',
        icon: 'text-red-400',
        bg: 'bg-red-500/20 text-red-400'
      };
    }
    
    // Fallback
    return {
      status: pr.state.toUpperCase(),
      color: 'gray',
      icon: 'text-gray-400',
      bg: 'bg-gray-500/20 text-gray-400'
    };
  };

  return (
    <div className="space-y-3">
      {pullRequests.map((pr, _index) => {
        const prStatus = getPRStatus(pr);
        return (
          <div key={pr.id} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <GitPullRequest className={`w-4 h-4 ${prStatus.icon}`} />
                  <span className={`px-2 py-1 rounded text-xs font-mono ${prStatus.bg}`}>
                    {prStatus.status}
                  </span>
                  {/* Show merge/close date */}
                  {pr.state === 'closed' && (
                    <span className="text-xs text-slate-500 font-mono">
                      {pr.merged_at ? `Merged ${new Date(pr.merged_at).toLocaleDateString()}` : 
                       pr.closed_at ? `Closed ${new Date(pr.closed_at).toLocaleDateString()}` : ''}
                    </span>
                  )}
                </div>
                <h4 className="text-white font-medium mb-1">{pr.title}</h4>
                <div className="text-sm text-slate-400 flex items-center gap-4">
                  <span>#{pr.number}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated {new Date(pr.updated_at).toLocaleDateString()}
                  </span>
                  {/* Show additional PR info */}
                  {(pr.additions || pr.deletions || pr.changed_files) && (
                    <span className="flex items-center gap-2 text-xs">
                      {pr.changed_files && (
                        <span className="text-blue-400">{pr.changed_files} file{pr.changed_files !== 1 ? 's' : ''}</span>
                      )}
                      {pr.additions !== undefined && pr.deletions !== undefined && (
                        <span className="flex items-center gap-1">
                          <span className="text-green-400">+{pr.additions}</span>
                          <span className="text-red-400">-{pr.deletions}</span>
                        </span>
                      )}
                    </span>
                  )}
                </div>
              </div>
              <a
                href={pr.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Issues Tab Component
const IssuesTab = ({ issues }) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-12">
        <Bug className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-400 font-mono">No issues found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {issues.map((issue, _index) => (
        <div key={issue.id} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Bug className={`w-4 h-4 ${issue.state === 'open' ? 'text-green-400' : 'text-purple-400'}`} />
                <span className={`px-2 py-1 rounded text-xs font-mono ${
                  issue.state === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {issue.state.toUpperCase()}
                </span>
                {issue.labels?.map((label) => (
                  <span key={label.id} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: `#${label.color}20`, color: `#${label.color}` }}>
                    {label.name}
                  </span>
                ))}
              </div>
              <h4 className="text-white font-medium mb-1">{issue.title}</h4>
              <div className="text-sm text-slate-400 flex items-center gap-4">
                <span>#{issue.number}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(issue.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

// Commits Tab Component
const CommitsTab = ({ commits }) => {
  if (commits.length === 0) {
    return (
      <div className="text-center py-12">
        <GitCommit className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <p className="text-slate-400 font-mono">No commits found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {commits.map((commit, _index) => (
        <div key={commit.sha} className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors group">
          {/* Terminal-style header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <GitCommit className="w-3 h-3" />
              <span>commit</span>
            </div>
            <code className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300 font-mono border border-slate-600">
              {commit.sha.substring(0, 8)}
            </code>
            <div className="flex-1"></div>
            <a
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors opacity-70 group-hover:opacity-100"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Commit message */}
          <div className="mb-3">
            <h4 className="text-white font-medium font-mono text-sm leading-relaxed">
              {commit.commit.message.split('\n')[0]}
            </h4>
            {commit.commit.message.split('\n').slice(1).join('\n').trim() && (
              <p className="text-slate-400 text-xs mt-1 font-mono">
                {commit.commit.message.split('\n').slice(1).join('\n').trim()}
              </p>
            )}
          </div>

          {/* Commit metadata */}
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(commit.commit.author.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short', 
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(commit.commit.author.date).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            
            {/* File and line statistics */}
            <div className="flex items-center gap-3">
              {commit.stats && (
                <>
                  {commit.stats.total !== undefined && (
                    <span className="text-blue-400 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {(commit.files && commit.files.length) || 'N/A'} files
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <span className="text-green-400 font-bold">+{commit.stats.additions || 0}</span>
                    <span className="text-red-400 font-bold">-{commit.stats.deletions || 0}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* File changes summary (if available) */}
          {commit.files && commit.files.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-700">
              <div className="text-xs text-slate-400 font-mono mb-2">
                Modified files ({commit.files.length}):
              </div>
              <div className="grid grid-cols-1 gap-1 max-h-20 overflow-y-auto">
                {commit.files.slice(0, 5).map((file, fileIndex) => (
                  <div key={fileIndex} className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 truncate flex-1 mr-2">{file.filename}</span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-green-400">+{file.additions || 0}</span>
                      <span className="text-red-400">-{file.deletions || 0}</span>
                    </div>
                  </div>
                ))}
                {commit.files.length > 5 && (
                  <div className="text-xs text-slate-500 font-mono">
                    ... and {commit.files.length - 5} more files
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContributorDetailModal; 
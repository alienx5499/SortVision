import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Search, RefreshCw, Trophy, Filter, Crown, User, Link2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * SSOC Leaderboard List Component
 * 
 * A sophisticated component for displaying and filtering SSOC participants.
 * Features:
 * - Automated GitHub data fetching
 * - Points calculation based on issue labels
 * - Animated background effects and transitions
 * - Filter and search functionality
 * - Points-based ranking system
 * - Terminal-style participant cards
 * - Interactive hover states
 * - Responsive grid layout
 */
const LeaderboardList = ({ loading = false, onRefresh }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Points configuration
  const POINTS_CONFIG = {
    Beginner: 20,
    Intermediate: 30,
    Advanced: 40
  };

  // List of admins/maintainers to exclude
  const EXCLUDED_USERS = ['alienx5499', 'dependabot[bot]', 'dependabot-preview[bot]'];

  // Function to fetch GitHub data with authentication
  const fetchGitHubData = async (endpoint) => {
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      ...(GITHUB_TOKEN && { 'Authorization': `Bearer ${GITHUB_TOKEN}` })
    };
    
    const response = await fetch(`https://api.github.com${endpoint}`, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return response.json();
  };

  // Function to fetch all closed issues for a participant
  const fetchParticipantIssues = async (username) => {
    try {
      const issues = await fetchGitHubData(
        `/repos/${import.meta.env.VITE_GITHUB_REPO_OWNER}/${import.meta.env.VITE_GITHUB_REPO_NAME}/issues?state=closed&assignee=${username}&per_page=100`
      );

      let beginnerIssues = 0;
      let intermediateIssues = 0;
      let advancedIssues = 0;
      let totalPoints = 0;

      issues.forEach(issue => {
        if (!issue.pull_request) { // Only count actual issues, not PRs
          const labels = issue.labels.map(label => label.name);
          
          if (labels.includes('Beginner')) {
            beginnerIssues++;
            totalPoints += POINTS_CONFIG.Beginner;
          } else if (labels.includes('Intermediate')) {
            intermediateIssues++;
            totalPoints += POINTS_CONFIG.Intermediate;
          } else if (labels.includes('Advanced') || labels.includes('Advance')) {
            advancedIssues++;
            totalPoints += POINTS_CONFIG.Advanced;
          }
        }
      });

      return {
        beginnerIssues,
        intermediateIssues,
        advancedIssues,
        totalPoints,
        totalIssues: beginnerIssues + intermediateIssues + advancedIssues
      };
    } catch (error) {
      console.error(`Error fetching issues for ${username}:`, error);
      return {
        beginnerIssues: 0,
        intermediateIssues: 0,
        advancedIssues: 0,
        totalPoints: 0,
        totalIssues: 0
      };
    }
  };

  // Function to fetch all participants and their data
  const fetchLeaderboardData = async () => {
    try {
      setIsLoading(true);

      // First, get all contributors
      const contributors = await fetchGitHubData(
        `/repos/${import.meta.env.VITE_GITHUB_REPO_OWNER}/${import.meta.env.VITE_GITHUB_REPO_NAME}/contributors?per_page=100`
      );

      // Filter out excluded users and map remaining contributors
      const participantPromises = contributors
        .filter(contributor => !EXCLUDED_USERS.includes(contributor.login.toLowerCase()))
        .map(async (contributor) => {
          const [profile, issueStats] = await Promise.all([
            fetchGitHubData(`/users/${contributor.login}`),
            fetchParticipantIssues(contributor.login)
          ]);

          return {
            contributorName: profile.name || contributor.login,
            githubId: contributor.login,
            discordId: 'N/A', // Discord ID not available through GitHub API
            avatarUrl: contributor.avatar_url,
            ...issueStats
          };
        });

      const participantData = await Promise.all(participantPromises);
      
      // Sort by total points
      participantData.sort((a, b) => b.totalPoints - a.totalPoints);
      
      setParticipants(participantData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  // Filter participants based on selected filter and search term
  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = searchTerm === '' || (
      participant.contributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.githubId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    switch (filter) {
      case 'top10':
        return matchesSearch && participants.indexOf(participant) < 10;
      case 'advanced':
        return matchesSearch && participant.advancedIssues > 0;
      case 'intermediate':
        return matchesSearch && participant.intermediateIssues > 0;
      case 'beginner':
        return matchesSearch && participant.beginnerIssues > 0;
      default:
        return matchesSearch;
    }
  });

  const getTopThreeStyles = (index) => {
    switch(index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent';
      case 1:
        return 'bg-gradient-to-r from-slate-400/10 via-transparent to-transparent';
      case 2:
        return 'bg-gradient-to-r from-amber-700/10 via-transparent to-transparent';
      default:
        return '';
    }
  };

  const getRankStyles = (index) => {
    switch(index) {
      case 0:
        return 'text-yellow-400 animate-text-shimmer bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 bg-clip-text text-transparent bg-[length:200%_100%]';
      case 1:
        return 'text-slate-300 animate-text-shimmer bg-gradient-to-r from-slate-500 via-slate-200 to-slate-500 bg-clip-text text-transparent bg-[length:200%_100%]';
      case 2:
        return 'text-amber-600 animate-text-shimmer bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 bg-clip-text text-transparent bg-[length:200%_100%]';
      default:
        return 'text-indigo-300 hover:text-indigo-200 transition-colors duration-200';
    }
  };

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/list overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
            
            {/* Floating particles */}
            <div className="absolute h-2 w-2 rounded-full bg-yellow-500/50 top-[10%] left-[20%] animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute h-1 w-1 rounded-full bg-orange-500/50 top-[30%] left-[70%] animate-pulse" style={{ animationDuration: '2.3s' }}></div>
            <div className="absolute h-1.5 w-1.5 rounded-full bg-red-500/50 top-[70%] left-[30%] animate-pulse" style={{ animationDuration: '4s' }}></div>
            
            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-md group-hover/list:scale-150 transition-transform duration-700"></div>
        
        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/list:w-full bg-gradient-to-r from-yellow-500/50 via-orange-500/50 to-red-500/50 rounded transition-all duration-700"></div>

        {/* Header with Refresh Button */}
        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center relative z-10 group-hover/list:text-yellow-400 transition-colors duration-300">
          <Trophy className="mr-2 h-4 w-4 text-yellow-400 animate-pulse" style={{ animationDuration: '4s' }} />
          <span className="transition-colors duration-300 mr-auto">// ssoc leaderboard</span>
          {onRefresh && (
            <button
              onClick={() => {
                onRefresh();
                fetchLeaderboardData();
              }}
              disabled={loading || isLoading}
              className="p-1 hover:bg-slate-800 rounded transition-colors duration-200 disabled:opacity-50"
              title="Refresh leaderboard data"
            >
              <RefreshCw className={`h-3 w-3 text-slate-500 hover:text-yellow-400 transition-colors ${loading || isLoading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-10">
          {/* Search Input */}
          <div className="flex-1">
            <label className="font-mono text-xs text-slate-400 mb-2 block flex items-center">
              <Search className="mr-2 h-3 w-3 text-yellow-400" />
              search participants
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or GitHub..."
                className="w-full h-10 bg-slate-800/90 border border-slate-700 rounded-md px-3 text-yellow-400 font-mono text-sm placeholder-slate-500 focus:border-yellow-500 focus:outline-none transition-colors"
                disabled={loading || isLoading}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
            </div>
          </div>

          {/* Filter Selector */}
          <div className="flex-1 sm:w-48">
            <label className="font-mono text-xs text-slate-400 mb-2 block flex items-center">
              <Filter className="mr-2 h-3 w-3 text-yellow-400" />
              filter by category
            </label>
            <Select
              value={filter}
              onValueChange={setFilter}
              disabled={loading || isLoading}
            >
              <SelectTrigger className="w-full h-10 bg-slate-800/90 border-slate-700 text-yellow-400 font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/95 border-slate-700 text-yellow-400 font-mono">
                <SelectItem value="all">All Participants</SelectItem>
                <SelectItem value="top10">Top 10</SelectItem>
                <SelectItem value="advanced">Advanced Issues</SelectItem>
                <SelectItem value="intermediate">Intermediate Issues</SelectItem>
                <SelectItem value="beginner">Beginner Issues</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {(loading || isLoading) ? (
          <LoadingState />
        ) : (
          <>
            <div className="font-mono text-xs text-slate-400 mb-4 relative z-10">
              <span className="text-yellow-400">{filteredParticipants.length}</span> participants found
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
              <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
                
                @keyframes shimmer {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
                .animate-text-shimmer {
                  animation: shimmer 6s linear infinite;
                }
                .leaderboard-table {
                  font-family: 'Poppins', sans-serif;
                }
                .beginner-issues {
                  color: #22c55e;
                  font-weight: 500;
                  text-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
                  display: inline-flex;
                  align-items: center;
                  gap: 4px;
                  padding: 4px 8px;
                  border-radius: 4px;
                  transition: all 0.2s;
                  background: transparent;
                  border: none;
                  width: 100%;
                  justify-content: center;
                }
                .beginner-issues:hover {
                  background: rgba(34, 197, 94, 0.1);
                  transform: translateY(-1px);
                }
                .intermediate-issues {
                  color: #eab308;
                  font-weight: 500;
                  text-shadow: 0 0 10px rgba(234, 179, 8, 0.2);
                  display: inline-flex;
                  align-items: center;
                  gap: 4px;
                  padding: 4px 8px;
                  border-radius: 4px;
                  transition: all 0.2s;
                  background: transparent;
                  border: none;
                  width: 100%;
                  justify-content: center;
                }
                .intermediate-issues:hover {
                  background: rgba(234, 179, 8, 0.1);
                  transform: translateY(-1px);
                }
                .advanced-issues {
                  color: #ef4444;
                  font-weight: 500;
                  text-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
                  display: inline-flex;
                  align-items: center;
                  gap: 4px;
                  padding: 4px 8px;
                  border-radius: 4px;
                  transition: all 0.2s;
                  background: transparent;
                  border: none;
                  width: 100%;
                  justify-content: center;
                }
                .advanced-issues:hover {
                  background: rgba(239, 68, 68, 0.1);
                  transform: translateY(-1px);
                }
                .rank-4-plus {
                  background: linear-gradient(45deg, #6366f1, #a855f7);
                  -webkit-background-clip: text;
                  color: transparent;
                  text-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
                }
                .rank-4-plus:hover {
                  background: linear-gradient(45deg, #818cf8, #c084fc);
                  -webkit-background-clip: text;
                  color: transparent;
                }
              `}</style>

              <table className="min-w-full bg-white/5 rounded-lg overflow-hidden leaderboard-table">
                <thead>
                  <tr className="text-left text-sm font-semibold">
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Contributor</th>
                    <th className="px-6 py-4" colSpan="3">
                      <div className="text-center mb-2 font-semibold tracking-wide">Issues</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center beginner-issues">Beginner</div>
                        <div className="text-center intermediate-issues">Intermediate</div>
                        <div className="text-center advanced-issues">Advanced</div>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.map((participant, index) => (
                    <tr 
                      key={participant.githubId}
                      className={`border-t border-white/5 transition-all duration-300 hover:bg-indigo-900/10
                        ${index < 3 ? getTopThreeStyles(index) : ''}`}
                    >
                      <td className="px-6 py-4 w-24">
                        <div className="flex items-center gap-2 font-semibold">
                          {index === 0 && (
                            <Crown className="w-4 h-4 text-yellow-500 animate-pulse" />
                          )}
                          <span className={`${getRankStyles(index)} ${index >= 3 ? 'rank-4-plus' : ''}`}>
                            #{index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <a 
                            href={`https://github.com/${participant.githubId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group hover:scale-105 transition-transform duration-200"
                          >
                            {participant.avatarUrl ? (
                              <img
                                src={participant.avatarUrl}
                                alt={participant.contributorName}
                                className="w-10 h-10 rounded-full ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-200"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ring-2 ring-white/10 group-hover:ring-white/30">
                                <User className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200"></div>
                          </a>
                          <div className="flex flex-col">
                            <a 
                              href={`https://github.com/${participant.githubId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group"
                            >
                              <div className={`font-semibold flex items-center gap-2 ${getRankStyles(index)} ${index >= 3 ? 'rank-4-plus' : ''} group-hover:scale-105 transition-transform duration-200`}>
                                {participant.contributorName}
                                <ExternalLink className="w-3 h-3 transition-all duration-200 group-hover:scale-110 group-hover:rotate-12" />
                              </div>
                              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200 tracking-wide">
                                @{participant.githubId}
                              </div>
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-4 text-center">
                        <div 
                          onClick={() => window.open(`https://github.com/alienx5499/SortVision/issues?q=is%3Aissue+is%3Aclosed+assignee%3A${participant.githubId}+label%3ABeginner`, '_blank')}
                          className="group/btn inline-block w-full py-2 px-4 rounded-md hover:bg-green-500/10 active:bg-green-500/20 cursor-pointer transition-all duration-200"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && window.open(`https://github.com/alienx5499/SortVision/issues?q=is%3Aissue+is%3Aclosed+assignee%3A${participant.githubId}+label%3ABeginner`, '_blank')}
                        >
                          <span className="beginner-issues flex items-center justify-center gap-2 group-hover/btn:scale-105">
                            {participant.beginnerIssues}
                            <Link2 className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-all duration-200" />
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-4 text-center">
                        <div 
                          onClick={() => window.open(`https://github.com/alienx5499/SortVision/issues?q=is%3Aissue+is%3Aclosed+assignee%3A${participant.githubId}+label%3AIntermediate`, '_blank')}
                          className="group/btn inline-block w-full py-2 px-4 rounded-md hover:bg-yellow-500/10 active:bg-yellow-500/20 cursor-pointer transition-all duration-200"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && window.open(`https://github.com/alienx5499/SortVision/issues?q=is%3Aissue+is%3Aclosed+assignee%3A${participant.githubId}+label%3AIntermediate`, '_blank')}
                        >
                          <span className="intermediate-issues flex items-center justify-center gap-2 group-hover/btn:scale-105">
                            {participant.intermediateIssues}
                            <Link2 className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-all duration-200" />
                          </span>
                        </div>
                      </td>
                      <td className="px-2 py-4 text-center">
                        <div 
                          onClick={() => window.open(`https://github.com/alienx5499/SortVision/issues?q=is%3Aissue+is%3Aclosed+assignee%3A${participant.githubId}+label%3AAdvance`, '_blank')}
                          className="group/btn inline-block w-full py-2 px-4 rounded-md hover:bg-red-500/10 active:bg-red-500/20 cursor-pointer transition-all duration-200"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && window.open(`https://github.com/alienx5499/SortVision/issues?q=is%3Aissue+is%3Aclosed+assignee%3A${participant.githubId}+label%3AAdvance`, '_blank')}
                        >
                          <span className="advanced-issues flex items-center justify-center gap-2 group-hover/btn:scale-105">
                            {participant.advancedIssues}
                            <Link2 className="w-3 h-3 opacity-50 group-hover/btn:opacity-100 transition-all duration-200" />
                          </span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-right font-semibold tracking-wider ${getRankStyles(index)} ${index >= 3 ? 'rank-4-plus' : ''}`}>
                        {participant.totalPoints}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredParticipants.length === 0 && (
              <div className="text-center py-12 relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-400 font-mono text-sm">No participants found</p>
                <p className="text-slate-500 font-mono text-xs mt-1">Try adjusting your filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Loading State Component
const LoadingState = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="animate-pulse flex space-x-4">
        <div className="h-10 bg-slate-800 rounded w-full"></div>
      </div>
    ))}
  </div>
);

export default LeaderboardList; 
import React, { useState, useEffect } from 'react';
import {
  Github,
  ExternalLink,
  Search,
  RefreshCw,
  Trophy,
  Filter,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LeaderboardRow from './LeaderboardRow';
import ExportButton from './ExportButton';
import { fetchLeaderboardData } from './githubService';
import { FILTER_OPTIONS } from './config';

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
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await fetchLeaderboardData();
      setParticipants(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Filter participants based on selected filter and search term
  const filteredParticipants = participants
    .filter(participant => participant.totalPoints > 0)
    .sort((a, b) => b.totalPoints - a.totalPoints) // Sort by totalPoints descending
    .map((participant, sortedIndex) => ({
      ...participant,
      originalRank: sortedIndex, // Assign rank based on sorted order
    }))
    .filter(participant => {
      const matchesSearch =
        searchTerm === '' ||
        participant.contributorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        participant.githubId.toLowerCase().includes(searchTerm.toLowerCase());

      switch (filter) {
        case FILTER_OPTIONS.TOP_10:
          return matchesSearch && participant.originalRank < 10;
        case FILTER_OPTIONS.ADVANCED:
          return matchesSearch && participant.advancedIssues > 0;
        case FILTER_OPTIONS.INTERMEDIATE:
          return matchesSearch && participant.intermediateIssues > 0;
        case FILTER_OPTIONS.BEGINNER:
          return matchesSearch && participant.beginnerIssues > 0;
        default:
          return matchesSearch;
      }
    });

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

            {/* Floating particles */}
            <div
              className="absolute h-2 w-2 rounded-full bg-yellow-500/50 top-[10%] left-[20%] animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-orange-500/50 top-[30%] left-[70%] animate-pulse"
              style={{ animationDuration: '2.3s' }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-red-500/50 top-[70%] left-[30%] animate-pulse"
              style={{ animationDuration: '4s' }}
            ></div>

            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-md pointer-events-none"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-yellow-500/50 via-orange-500/50 to-red-500/50 rounded pointer-events-none"></div>

        {/* Header with Refresh Button */}
        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center relative z-10 transition-colors duration-300">
          <Trophy
            className="mr-2 h-4 w-4 text-yellow-400 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <span className="transition-colors duration-300 mr-auto">
            // ssoc leaderboard
          </span>
          <div className="flex items-center gap-3">
            <ExportButton />
            {onRefresh && (
              <button
                onClick={() => {
                  onRefresh();
                  fetchLeaderboardData().then(setParticipants);
                }}
                disabled={loading || isLoading}
                className="p-1 hover:bg-slate-800 rounded transition-colors duration-200 disabled:opacity-50"
                title="Refresh leaderboard data"
              >
                <RefreshCw
                  className={`h-3 w-3 text-slate-500 hover:text-yellow-400 transition-colors ${
                    loading || isLoading ? 'animate-spin' : ''
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-10">
          {/* Search Input */}
          <div className="flex-1">
            <label
              htmlFor="participant-search"
              className="font-mono text-xs text-slate-400 mb-2 block flex items-center"
            >
              <Search className="mr-2 h-3 w-3 text-yellow-400" />
              search participants
            </label>
            <div className="relative">
              <input
                type="text"
                id="participant-search"
                name="participant-search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by name or GitHub..."
                className="w-full h-10 bg-slate-800/90 border border-slate-700 rounded-md px-3 text-yellow-400 font-mono text-sm placeholder-slate-500 focus:border-yellow-500 focus:outline-none transition-colors"
                disabled={loading || isLoading}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
            </div>
          </div>

          {/* Filter Selector */}
          <div className="flex-1 sm:w-48">
            <label
              htmlFor="category-filter"
              className="font-mono text-xs text-slate-400 mb-2 block flex items-center"
            >
              <Filter className="mr-2 h-3 w-3 text-yellow-400" />
              filter by category
            </label>
            <Select
              id="category-filter"
              value={filter}
              onValueChange={setFilter}
              disabled={loading || isLoading}
            >
              <SelectTrigger className="w-full h-10 bg-slate-800/90 border-slate-700 text-yellow-400 font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/95 border-slate-700 text-yellow-400 font-mono">
                <SelectItem value={FILTER_OPTIONS.ALL}>
                  All Participants
                </SelectItem>
                <SelectItem value={FILTER_OPTIONS.TOP_10}>Top 10</SelectItem>
                <SelectItem value={FILTER_OPTIONS.ADVANCED}>
                  Advanced Issues
                </SelectItem>
                <SelectItem value={FILTER_OPTIONS.INTERMEDIATE}>
                  Intermediate Issues
                </SelectItem>
                <SelectItem value={FILTER_OPTIONS.BEGINNER}>
                  Beginner Issues
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {loading || isLoading ? (
          <LoadingState />
        ) : (
          <>
            <div className="font-mono text-xs text-slate-400 mb-4 relative z-10">
              <span className="text-yellow-400">
                {filteredParticipants.length}
              </span>{' '}
              participants found
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
              <style>{`
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
                .leaderboard-table tbody tr {
                  isolation: isolate;
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
                  transition: all 0.2s ease-in-out;
                  background: transparent;
                  border: none;
                  width: 100%;
                  justify-content: center;
                }
                .beginner-issues:hover {
                  background: rgba(34, 197, 94, 0.1);
                  transform: translateY(-1px);
                  z-index: 10;
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
                  transition: all 0.2s ease-in-out;
                  background: transparent;
                  border: none;
                  width: 100%;
                  justify-content: center;
                }
                .intermediate-issues:hover {
                  background: rgba(234, 179, 8, 0.1);
                  transform: translateY(-1px);
                  z-index: 10;
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
                  transition: all 0.2s ease-in-out;
                  background: transparent;
                  border: none;
                  width: 100%;
                  justify-content: center;
                }
                .advanced-issues:hover {
                  background: rgba(239, 68, 68, 0.1);
                  transform: translateY(-1px);
                  z-index: 10;
                }
                .rank-4-plus {
                  background: linear-gradient(45deg, #6366f1, #a855f7);
                  -webkit-background-clip: text;
                  color: transparent;
                  text-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
                  transition: all 0.2s ease-in-out;
                }
                .rank-4-plus:hover {
                  background: linear-gradient(45deg, #818cf8, #c084fc);
                  -webkit-background-clip: text;
                  color: transparent;
                  transform: scale(1.05);
                }
              `}</style>

              <table className="w-full leaderboard-table">
                <thead>
                  <tr className="text-left text-xs font-semibold text-slate-400 border-b border-white/5">
                    <th className="px-6 py-3">Rank</th>
                    <th className="px-6 py-3">Participant</th>
                    <th className="px-2 py-3 text-center">Beginner</th>
                    <th className="px-2 py-3 text-center">Intermediate</th>
                    <th className="px-2 py-3 text-center">Advanced</th>
                    <th className="px-6 py-3 text-right">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.map(participant => (
                    <LeaderboardRow
                      key={participant.githubId}
                      participant={participant}
                      index={participant.originalRank}
                    />
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
                <p className="text-slate-400 font-mono text-sm">
                  No participants found
                </p>
                <p className="text-slate-500 font-mono text-xs mt-1">
                  Try adjusting your filters
                </p>
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

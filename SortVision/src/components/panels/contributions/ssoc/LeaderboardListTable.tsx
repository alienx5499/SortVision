import React from 'react';
import { Trophy } from 'lucide-react';
import LeaderboardRow from './LeaderboardRow';
import { LeaderboardTableStyles } from './LeaderboardTableStyles';
import type { RankedLeaderboardParticipant } from './leaderboardTypes';

type LeaderboardListTableProps = {
  participants: RankedLeaderboardParticipant[];
};

export const LeaderboardListTable = ({
  participants,
}: LeaderboardListTableProps) => (
  <>
    <div className="font-mono text-xs text-slate-400 mb-4 relative z-10">
      <span className="text-yellow-400">{participants.length}</span>{' '}
      participants found
    </div>

    <div className="overflow-x-auto w-full">
      <LeaderboardTableStyles />
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
          {participants.map(participant => (
            <LeaderboardRow
              key={participant.githubId}
              participant={participant}
              index={participant.originalRank}
            />
          ))}
        </tbody>
      </table>
    </div>

    {participants.length === 0 && (
      <div className="text-center py-12 relative z-10">
        <div className="size-16 mx-auto mb-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
          <Trophy className="size-8 text-slate-500" />
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
);

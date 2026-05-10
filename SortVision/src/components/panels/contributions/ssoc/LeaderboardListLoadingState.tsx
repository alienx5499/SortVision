import React from 'react';

export const LeaderboardListLoadingState = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="animate-pulse flex gap-x-4">
        <div className="h-10 bg-slate-800 rounded w-full"></div>
      </div>
    ))}
  </div>
);

import React from 'react';

export const LeaderboardTableStyles = () => (
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
);

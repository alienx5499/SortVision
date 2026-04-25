import React from 'react';

const RankingCardMetricsRow = ({ Icon, label, value }) => {
  return (
    <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex items-center relative z-10">
        <Icon className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
        <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
          {label}
        </span>
      </div>
      <span className="text-amber-400 font-mono group-hover:text-amber-300 transition-colors duration-300">
        {value}
      </span>
    </div>
  );
};

export default RankingCardMetricsRow;

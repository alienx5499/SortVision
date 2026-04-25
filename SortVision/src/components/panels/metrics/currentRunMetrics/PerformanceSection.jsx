import React from 'react';
import { BarChart, TrendingDown } from 'lucide-react';

const PerformanceSection = ({ metrics, algorithm, derived, t }) => {
  if (!(metrics.time > 0)) {
    return null;
  }

  return (
    <div className="mt-4 pt-3 border-t border-slate-700">
      <div className="text-xs text-slate-400 mb-2 flex items-center group cursor-pointer hover:text-emerald-400 transition-colors">
        <BarChart className="mr-1 h-3 w-3 text-emerald-400 group-hover:animate-spin" />{' '}
        {t('metrics.performanceBreakdown')}
      </div>
      <div className="flex h-6 rounded overflow-hidden bg-slate-800 border border-slate-700 hover:shadow-lg transition-all duration-300 group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-slate-700/30 to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>

        <div
          className="bg-emerald-600/70 h-full flex items-center justify-center text-[9px] text-white font-mono group-hover:bg-emerald-600/90 transition-colors duration-300 relative z-10"
          style={{ width: `${30}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 animate-shimmer"></div>
          <span className="relative z-10">{t('metrics.swaps')}</span>
        </div>
        <div
          className="bg-blue-600/70 h-full flex items-center justify-center text-[9px] text-white font-mono group-hover:bg-blue-600/90 transition-colors duration-300 relative z-10"
          style={{ width: `${30}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 animate-shimmer"></div>
          <span className="relative z-10">{t('metrics.comparisons')}</span>
        </div>
        <div
          className="bg-purple-600/70 h-full flex items-center justify-center text-[9px] text-white font-mono group-hover:bg-purple-600/90 transition-colors duration-300 relative z-10"
          style={{ width: `${40}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 animate-shimmer"></div>
          <span className="relative z-10">{t('metrics.time')}</span>
        </div>
      </div>

      {derived.bestAlgorithm && algorithm !== derived.bestAlgorithm.algo && (
        <div className="mt-2 text-xs flex items-center bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-500/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-green-500/50 rounded transition-all duration-700"></div>

          <div className="flex items-center relative z-10">
            <TrendingDown className="h-3 w-3 text-green-500 mr-1 group-hover:text-green-400 transition-colors duration-300" />
            <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              {t('metrics.potentialImprovement')}{' '}
            </span>
            <span className="text-green-500 ml-1 font-mono group-hover:text-green-400 transition-colors duration-300">
              {derived.improvementPercent}%
            </span>
            <span className="text-slate-500 ml-1 text-[10px] group-hover:text-slate-400 transition-colors duration-300">
              using {derived.bestAlgorithm.algo}_sort()
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceSection;

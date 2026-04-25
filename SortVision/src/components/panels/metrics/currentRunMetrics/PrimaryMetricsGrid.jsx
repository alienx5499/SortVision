import React from 'react';
import { ArrowUpDown, BarChart2, Zap } from 'lucide-react';

const PrimaryMetricsGrid = ({ metrics, t }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>

        <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
          <ArrowUpDown className="mr-1 h-3 w-3 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />{' '}
          {t('metrics.swaps')}
        </div>
        <div className="text-xl text-emerald-400 font-mono group-hover:text-emerald-300 transition-colors duration-300 relative z-10">
          {metrics.swaps}
        </div>
        <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">
          {t('metrics.memoryOperations')}
        </div>
      </div>

      <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 rounded transition-all duration-700"></div>

        <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
          <BarChart2 className="mr-1 h-3 w-3 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />{' '}
          {t('metrics.comparisons')}
        </div>
        <div className="text-xl text-blue-400 font-mono group-hover:text-blue-300 transition-colors duration-300 relative z-10">
          {metrics.comparisons}
        </div>
        <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">
          {t('metrics.cpuOperations')}
        </div>
      </div>

      <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-purple-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
          <Zap className="mr-1 h-3 w-3 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />{' '}
          {t('metrics.timeMs')}
        </div>
        <div className="text-xl text-purple-400 font-mono group-hover:text-purple-300 transition-colors duration-300 relative z-10">
          {metrics.time}
        </div>
        <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">
          {t('metrics.executionDuration')}
        </div>
      </div>
    </div>
  );
};

export default PrimaryMetricsGrid;

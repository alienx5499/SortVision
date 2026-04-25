import React from 'react';
import { Award, Clock, Cpu, Percent } from 'lucide-react';

const AdvancedMetricsGrid = ({ derived, t }) => {
  return (
    <div className="flex flex-wrap sm:grid sm:grid-cols-4 gap-3">
      <div className="flex-1 min-w-[120px] bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>

        <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
          <Percent className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />{' '}
          {t('metrics.swapRatio')}
        </div>
        <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
          {derived.swapRatio}
          <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
            {t('metrics.swapsComp')}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-[120px] bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>

        <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
          <Clock className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />{' '}
          {t('metrics.timeElement')}
        </div>
        <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
          {derived.timePerElement}
          <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
            {t('metrics.msElem')}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-[120px] bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>

        <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
          <Cpu className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />{' '}
          {t('metrics.opsMs')}
        </div>
        <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
          {derived.operationsPerMs}
          <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
            {t('metrics.opsMsUnit')}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-[120px] bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>

        <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
          <Award className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />{' '}
          {t('metrics.score')}
        </div>
        <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
          {derived.performanceScore}
          <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
            {t('metrics.points')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMetricsGrid;

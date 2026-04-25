import React from 'react';
import { Timer, Clock, Hourglass } from 'lucide-react';

const ComplexityInfoTimeSection = ({ complexity, t }) => {
  return (
    <div className="mb-3">
      <div className="text-xs text-slate-400 mb-1 flex items-center group/time">
        <Timer
          className="mr-1 h-3 w-3 text-yellow-400 animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <span className="transition-colors duration-300 group-hover:text-yellow-400">
          {t('visualizer.complexity.timeComplexity')}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-green-500/30 hover:bg-slate-800/60 group/best relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover/best:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 w-0 group-hover/best:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-green-400/5 to-transparent"></div>

          <div className="text-[10px] text-slate-500 mb-1 transition-colors duration-300 group-hover:text-slate-400">
            {t('visualizer.complexity.bestCase')}
          </div>
          <div className="flex items-center">
            <div className="relative mr-1">
              <div className="absolute inset-0 opacity-20">
                <Clock
                  className="h-3 w-3 text-green-500 animate-ping"
                  style={{ animationDuration: '3s' }}
                />
              </div>
              <Clock className="h-3 w-3 text-green-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
            </div>
            <span className="text-green-500 font-mono text-xs transition-all duration-300 group-hover:text-green-400 group-hover:scale-105">
              {complexity.best}
            </span>
          </div>
        </div>
        <div className="bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-yellow-500/30 hover:bg-slate-800/60 group/avg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover/avg:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 w-0 group-hover/avg:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent"></div>

          <div className="text-[10px] text-slate-500 mb-1 transition-colors duration-300 group-hover:text-slate-400">
            {t('visualizer.complexity.average')}
          </div>
          <div className="flex items-center">
            <div className="relative mr-1">
              <div className="absolute inset-0 opacity-20">
                <Clock
                  className="h-3 w-3 text-yellow-500 animate-ping"
                  style={{ animationDuration: '3s' }}
                />
              </div>
              <Clock className="h-3 w-3 text-yellow-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
            </div>
            <span className="text-yellow-500 font-mono text-xs transition-all duration-300 group-hover:text-yellow-400 group-hover:scale-105">
              {complexity.average}
            </span>
          </div>
        </div>
        <div className="bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-red-500/30 hover:bg-slate-800/60 group/worst relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover/worst:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 w-0 group-hover/worst:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-red-400/5 to-transparent"></div>

          <div className="text-[10px] text-slate-500 mb-1 transition-colors duration-300 group-hover:text-slate-400">
            {t('visualizer.complexity.worstCase')}
          </div>
          <div className="flex items-center">
            <div className="relative mr-1">
              <div className="absolute inset-0 opacity-20">
                <Hourglass
                  className="h-3 w-3 text-red-500 animate-ping"
                  style={{ animationDuration: '3s' }}
                />
              </div>
              <Hourglass className="h-3 w-3 text-red-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-180" />
            </div>
            <span className="text-red-500 font-mono text-xs transition-all duration-300 group-hover:text-red-400 group-hover:scale-105">
              {complexity.worst}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexityInfoTimeSection;

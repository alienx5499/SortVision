import React from 'react';
import { Database } from 'lucide-react';

const ComplexityInfoSpaceSection = ({ complexity, t }) => {
  return (
    <div className="mb-3">
      <div className="text-xs text-slate-400 mb-1 flex items-center group/space">
        <Database
          className="mr-1 h-3 w-3 text-blue-400 animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <span className="transition-colors duration-300 group-hover:text-blue-400">
          {t('visualizer.complexity.spaceComplexity')}
        </span>
      </div>
      <div className="bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-800/60 group/space relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover/space:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 w-0 group-hover/space:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-blue-400/5 to-transparent"></div>

        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[20%] left-[10%] text-[8px] text-blue-500/20 font-mono">
            10101
          </div>
          <div className="absolute top-[50%] left-[60%] text-[8px] text-blue-500/20 font-mono">
            01010
          </div>
          <div className="absolute top-[70%] left-[30%] text-[8px] text-blue-500/20 font-mono">
            11001
          </div>
        </div>

        <span className="text-blue-400 font-mono text-xs transition-all duration-300 group-hover:text-blue-300 group-hover:scale-105 relative z-10">
          {complexity.space}
        </span>
      </div>
    </div>
  );
};

export default ComplexityInfoSpaceSection;

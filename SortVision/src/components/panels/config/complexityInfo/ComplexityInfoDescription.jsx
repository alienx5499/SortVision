import React from 'react';

const ComplexityInfoDescription = ({ complexity }) => {
  return (
    <div className="text-[10px] text-slate-400 italic border-t border-slate-800 pt-2 mt-2 transition-all duration-300 hover:text-slate-300 group/desc relative">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/0 via-slate-700/5 to-slate-800/0 opacity-0 group-hover/desc:opacity-100 transition-opacity duration-500 -z-10"></div>

      <span className="text-emerald-400 mr-1 opacity-80">// </span>
      <span className="relative inline-block">
        {complexity.description}
        <span className="absolute bottom-0 left-0 w-0 group-hover/desc:w-full h-px bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 transition-all duration-1000"></span>
      </span>
    </div>
  );
};

export default ComplexityInfoDescription;

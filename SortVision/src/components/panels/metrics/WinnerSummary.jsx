import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  ArrowUpDown,
  BarChart2,
  Zap,
  BarChart,
  Maximize2,
  Minimize2
} from 'lucide-react';

const WinnerSummary = ({ sortedMetrics }) => {
  // Get algorithm category
  const getAlgorithmCategory = (algo) => {
    switch(algo) {
      case 'quick':
      case 'merge':
      case 'heap':
        return {
          name: 'Efficient Sorts',
          color: 'text-green-500',
          hover: 'text-green-400'
        };
      case 'radix':
      case 'bucket':
        return {
          name: 'Special Sorts',
          color: 'text-cyan-500',
          hover: 'text-cyan-400'
        };
      case 'insertion':
      case 'selection':
      case 'bubble':
        return {
          name: 'Basic Sorts',
          color: 'text-red-500',
          hover: 'text-red-400'
        };
      default:
        return {
          name: 'Other Sorts',
          color: 'text-slate-500',
          hover: 'text-slate-400'
        };
    }
  };

  const winnerCategory = getAlgorithmCategory(sortedMetrics[0]?.algo);
  const slowestCategory = getAlgorithmCategory(sortedMetrics[sortedMetrics.length - 1]?.algo);

  return (
    <div className="mt-4 pt-4 border-t border-slate-700">
      <div className="bg-slate-800 p-3 rounded border border-yellow-500 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-yellow-500/50 via-amber-500/50 to-yellow-500/50 rounded transition-all duration-700"></div>

        <div className="text-sm text-slate-400 font-mono flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <Crown className="mr-2 h-5 w-5 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300"
              style={{ animation: 'bounce 1s ease-in-out infinite' }}
            />
            <span className="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300">
              {sortedMetrics[0]?.algo}_sort()
            </span>
            <span className={`ml-2 text-xs ${winnerCategory.color} group-hover:${winnerCategory.hover} transition-colors duration-300`}>
              ({winnerCategory.name})
            </span>
          </div>
          <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 group-hover:bg-yellow-500/30 transition-colors duration-300">WINNER</Badge>
        </div>

        {/* Winner metrics */}
        <div className="grid grid-cols-3 gap-2 text-xs relative z-10 mt-3">
          <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex items-center relative z-10">
              <ArrowUpDown className="mr-1 h-3 w-3 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
              <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Swaps:</span>
            </div>
            <span className="text-yellow-500 font-mono group-hover:text-yellow-400 transition-colors duration-300">
              {sortedMetrics[0]?.metrics.swaps}
            </span>
          </div>

          <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex items-center relative z-10">
              <BarChart2 className="mr-1 h-3 w-3 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
              <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Comps:</span>
            </div>
            <span className="text-yellow-500 font-mono group-hover:text-yellow-400 transition-colors duration-300">
              {sortedMetrics[0]?.metrics.comparisons}
            </span>
          </div>

          <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex items-center relative z-10">
              <Zap className="mr-1 h-3 w-3 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
              <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Time:</span>
            </div>
            <span className="text-yellow-500 font-mono group-hover:text-yellow-400 transition-colors duration-300">
              {sortedMetrics[0]?.metrics.time}ms
            </span>
          </div>
        </div>
      </div>

      {/* Performance summary */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="bg-slate-800 p-2 rounded border border-slate-700 flex items-center justify-between relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-500/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-green-500/50 rounded transition-all duration-700"></div>

          <div className="flex items-center relative z-10">
            <Maximize2 className="h-3 w-3 text-green-500 mr-1 group-hover:text-green-400 transition-colors duration-300" />
            <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Fastest:</span>
          </div>
          <div className="flex items-center">
            <span className="text-[10px] text-green-500 font-mono group-hover:text-green-400 transition-colors duration-300">
              {sortedMetrics[0]?.algo}_sort()
            </span>
            <span className={`ml-1 text-[8px] ${winnerCategory.color} group-hover:${winnerCategory.hover} transition-colors duration-300`}>
              ({winnerCategory.name})
            </span>
          </div>
        </div>

        <div className="bg-slate-800 p-2 rounded border border-slate-700 flex items-center justify-between relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-red-500/10 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-red-500/50 via-rose-500/50 to-red-500/50 rounded transition-all duration-700"></div>

          <div className="flex items-center relative z-10">
            <Minimize2 className="h-3 w-3 text-red-500 mr-1 group-hover:text-red-400 transition-colors duration-300" />
            <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Slowest:</span>
          </div>
          <div className="flex items-center">
            <span className="text-[10px] text-red-500 font-mono group-hover:text-red-400 transition-colors duration-300">
              {sortedMetrics[sortedMetrics.length - 1]?.algo}_sort()
            </span>
            <span className={`ml-1 text-[8px] ${slowestCategory.color} group-hover:${slowestCategory.hover} transition-colors duration-300`}>
              ({slowestCategory.name})
            </span>
          </div>
        </div>
      </div>

      {/* Speed difference */}
      {sortedMetrics.length > 1 && (
        <div className="mt-2 bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center">
              <BarChart className="h-3 w-3 text-amber-400 mr-1 group-hover:text-amber-300 transition-colors duration-300" />
              <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                Speed difference:
              </span>
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-mono group-hover:text-amber-300 transition-colors duration-300">
                {Math.round(parseFloat(sortedMetrics[sortedMetrics.length - 1]?.metrics.time) /
                  parseFloat(sortedMetrics[0]?.metrics.time))}x
              </span>
              <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
                ({parseFloat(sortedMetrics[sortedMetrics.length - 1]?.metrics.time) -
                  parseFloat(sortedMetrics[0]?.metrics.time)}ms)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinnerSummary;

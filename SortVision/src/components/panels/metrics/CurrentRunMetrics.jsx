import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  BarChart2,
  Zap,
  TrendingDown,
  Percent,
  Clock,
  Cpu,
  BarChart,
  ArrowUpDown,
  Award
} from 'lucide-react';

const CurrentRunMetrics = ({
  metrics,
  sortedMetrics,
  algorithm,
  array
}) => {
  // Calculate efficiency ratios
  const swapRatio = metrics.comparisons > 0 ? (metrics.swaps / metrics.comparisons).toFixed(2) : 0;
  const timePerElement = array.length > 0 ? (metrics.time / array.length).toFixed(2) : 0;
  const operationsPerMs = metrics.time > 0 ? ((metrics.swaps + metrics.comparisons) / metrics.time).toFixed(2) : 0;

  // Calculate performance score (lower is better)
  const performanceScore = metrics.time > 0 ?
    Math.round((metrics.swaps * 0.3 + metrics.comparisons * 0.3 + parseFloat(metrics.time) * 0.4)) : 0;

  // Get the best algorithm if available
  const bestAlgorithm = sortedMetrics.length > 0 ? sortedMetrics[0] : null;

  // Calculate improvement percentage if there's a best algorithm
  const improvementPercent = bestAlgorithm && metrics.time > 0 && algorithm !== bestAlgorithm.algo ?
    Math.round((metrics.time - parseFloat(bestAlgorithm.metrics.time)) / metrics.time * 100) : 0;

  // Get algorithm color based on efficiency
  const getAlgorithmColor = (algo) => {
    switch(algo) {
      case 'quick':
      case 'merge':
      case 'heap':
        return 'text-green-500 hover:text-green-400';
      case 'radix':
      case 'bucket':
        return 'text-cyan-500 hover:text-cyan-400';
      case 'insertion':
      case 'selection':
      case 'bubble':
        return 'text-red-500 hover:text-red-400';
      default:
        return 'text-slate-400 hover:text-slate-300';
    }
  };

  return (
    <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] bg-[length:200%_100%]"></div>

      {/* Animated corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

      {/* Animated bottom line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

      <div className="font-mono text-sm text-slate-400 mb-4 flex items-center justify-between relative z-10">
        <div className="flex items-center group cursor-pointer hover:text-emerald-400 transition-colors">
          <Terminal className="mr-2 h-4 w-4 text-emerald-400 group-hover:animate-spin" />
          // current run metrics
        </div>
        <Badge variant="outline" className="bg-slate-800/50 text-emerald-400 font-mono border-emerald-500/30 group-hover:bg-slate-800 transition-all duration-300">
          {algorithm}_sort()
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>

          <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <ArrowUpDown className="mr-1 h-3 w-3 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" /> SWAPS
          </div>
          <div className="text-xl text-emerald-400 font-mono group-hover:text-emerald-300 transition-colors duration-300 relative z-10">{metrics.swaps}</div>
          <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">Memory operations</div>
        </div>

        <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50 rounded transition-all duration-700"></div>

          <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <BarChart2 className="mr-1 h-3 w-3 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" /> COMPARISONS
          </div>
          <div className="text-xl text-blue-400 font-mono group-hover:text-blue-300 transition-colors duration-300 relative z-10">{metrics.comparisons}</div>
          <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">CPU operations</div>
        </div>

        <div className="bg-slate-800 p-3 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-purple-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

          <div className="text-xs text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <Zap className="mr-1 h-3 w-3 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" /> TIME (MS)
          </div>
          <div className="text-xl text-purple-400 font-mono group-hover:text-purple-300 transition-colors duration-300 relative z-10">{metrics.time}</div>
          <div className="text-[10px] text-slate-500 mt-1 group-hover:text-slate-400 transition-colors duration-300 relative z-10">Execution duration</div>
        </div>
      </div>

      {/* Advanced Metrics */}
      <div className="flex flex-wrap sm:grid sm:grid-cols-4 gap-3">
        <div className="flex-1 min-w-[120px] bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>

          <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <Percent className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" /> SWAP RATIO
          </div>
          <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
            {swapRatio}
            <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">swaps/comp</span>
          </div>
        </div>

        <div className="flex-1 min-w-[120px] bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>

          <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <Clock className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" /> TIME/ELEMENT
          </div>
          <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
            {timePerElement}
            <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">ms/elem</span>
          </div>
        </div>

        <div className="flex-1 min-w-[120px] bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>

          <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <Cpu className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" /> OPS/MS
          </div>
          <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
            {operationsPerMs}
            <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">ops/ms</span>
          </div>
        </div>

        <div className="flex-1 min-w-[120px] bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-500/50 via-yellow-500/50 to-amber-500/50 rounded transition-all duration-700"></div>

          <div className="text-[10px] text-slate-400 mb-1 flex items-center group-hover:text-slate-300 transition-colors duration-300 relative z-10">
            <Award className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" /> SCORE
          </div>
          <div className="text-sm text-amber-400 font-mono flex items-center group-hover:text-amber-300 transition-colors duration-300 relative z-10">
            {performanceScore}
            <span className="text-[10px] text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">points</span>
          </div>
        </div>
      </div>

      {/* Performance Visualization */}
      {metrics.time > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-700">
          <div className="text-xs text-slate-400 mb-2 flex items-center group cursor-pointer hover:text-emerald-400 transition-colors">
            <BarChart className="mr-1 h-3 w-3 text-emerald-400 group-hover:animate-spin" /> PERFORMANCE BREAKDOWN
          </div>
          <div className="flex h-6 rounded overflow-hidden bg-slate-800 border border-slate-700 hover:shadow-lg transition-all duration-300 group relative">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-slate-700/30 to-slate-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Add animated gradient line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 rounded transition-all duration-700"></div>

            <div
              className="bg-emerald-600/70 h-full flex items-center justify-center text-[9px] text-white font-mono group-hover:bg-emerald-600/90 transition-colors duration-300 relative z-10"
              style={{ width: `${30}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0 animate-shimmer"></div>
              <span className="relative z-10">Swaps</span>
            </div>
            <div
              className="bg-blue-600/70 h-full flex items-center justify-center text-[9px] text-white font-mono group-hover:bg-blue-600/90 transition-colors duration-300 relative z-10"
              style={{ width: `${30}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 animate-shimmer"></div>
              <span className="relative z-10">Comparisons</span>
            </div>
            <div
              className="bg-purple-600/70 h-full flex items-center justify-center text-[9px] text-white font-mono group-hover:bg-purple-600/90 transition-colors duration-300 relative z-10"
              style={{ width: `${40}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 animate-shimmer"></div>
              <span className="relative z-10">Time</span>
            </div>
          </div>

          {/* Improvement potential */}
          {bestAlgorithm && algorithm !== bestAlgorithm.algo && (
            <div className="mt-2 text-xs flex items-center bg-slate-800 p-2 rounded border border-slate-700 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-500/10 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Animated corner accent */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

              {/* Animated bottom line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-green-500/50 rounded transition-all duration-700"></div>

              <div className="flex items-center relative z-10">
                <TrendingDown className="h-3 w-3 text-green-500 mr-1 group-hover:text-green-400 transition-colors duration-300" />
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">Potential improvement: </span>
                <span className="text-green-500 ml-1 font-mono group-hover:text-green-400 transition-colors duration-300">{improvementPercent}%</span>
                <span className="text-slate-500 ml-1 text-[10px] group-hover:text-slate-400 transition-colors duration-300">
                  using {bestAlgorithm.algo}_sort()
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentRunMetrics;

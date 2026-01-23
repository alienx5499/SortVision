import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Crown,
  ArrowUpDown,
  BarChart2,
  Zap,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

const RankingCard = ({
  algo,
  metrics: algoMetrics,
  rank,
  algorithm,
  currentAlgoMetrics,
}) => {
  // Get color scheme based on algorithm efficiency
  const getColorScheme = algo => {
    switch (algo) {
      case 'quick':
      case 'merge':
      case 'heap':
        return {
          bg: 'from-green-500/5 via-green-500/10 to-green-500/5',
          accent: 'from-green-500/10 to-emerald-500/10',
          border: 'border-green-500',
          text: 'text-green-500',
          hover: {
            bg: 'from-green-500/20 via-green-500/30 to-green-500/20',
            text: 'text-green-400',
          },
        };
      case 'radix':
      case 'bucket':
        return {
          bg: 'from-cyan-500/5 via-cyan-500/10 to-cyan-500/5',
          accent: 'from-cyan-500/10 to-blue-500/10',
          border: 'border-cyan-500',
          text: 'text-cyan-500',
          hover: {
            bg: 'from-cyan-500/20 via-cyan-500/30 to-cyan-500/20',
            text: 'text-cyan-400',
          },
        };
      case 'insertion':
      case 'selection':
      case 'bubble':
        return {
          bg: 'from-red-500/5 via-red-500/10 to-red-500/5',
          accent: 'from-red-500/10 to-orange-500/10',
          border: 'border-red-500',
          text: 'text-red-500',
          hover: {
            bg: 'from-red-500/20 via-red-500/30 to-red-500/20',
            text: 'text-red-400',
          },
        };
      default:
        return {
          bg: 'from-slate-500/5 via-slate-500/10 to-slate-500/5',
          accent: 'from-slate-500/10 to-slate-400/10',
          border: 'border-slate-500',
          text: 'text-slate-500',
          hover: {
            bg: 'from-slate-500/20 via-slate-500/30 to-slate-500/20',
            text: 'text-slate-400',
          },
        };
    }
  };

  const colorScheme = getColorScheme(algo);

  return (
    <div
      className={`bg-slate-800 p-3 rounded border ${
        rank === 1 ? 'border-yellow-500' : colorScheme.border
      } relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
    >
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          rank === 1
            ? 'from-yellow-500/5 via-yellow-500/10 to-yellow-500/5'
            : colorScheme.bg
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      {/* Animated corner accent */}
      <div
        className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${
          rank === 1 ? 'from-yellow-500/10 to-amber-500/10' : colorScheme.accent
        } rounded-full blur-md group-hover:scale-150 transition-transform duration-700`}
      ></div>

      {/* Animated bottom line */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${
          rank === 1
            ? 'from-yellow-500/50 via-amber-500/50 to-yellow-500/50'
            : colorScheme.bg
        } rounded transition-all duration-700`}
      ></div>

      {/* Algorithm name and rank */}
      <div className="flex items-center justify-between relative z-10">
        <div
          className={`text-sm ${colorScheme.text} font-mono mb-2 flex items-center group-hover:${colorScheme.hover.text} transition-colors duration-300`}
        >
          {algo}_sort()
          {/* Crown icon for the winner */}
          {rank === 1 && (
            <Crown
              className="inline-block ml-2 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300"
              style={{
                animation: 'bounce 1s ease-in-out infinite',
                height: '16px',
                width: '16px',
              }}
            />
          )}
          {/* Highlight current algorithm */}
          {algo === algorithm && (
            <Badge className="ml-2 bg-slate-700 text-[10px] group-hover:bg-slate-600 transition-colors duration-300">
              CURRENT
            </Badge>
          )}
        </div>

        {/* Rank badge */}
        <Badge
          variant="outline"
          className={`
            ${
              rank === 1
                ? 'bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500/20 group-hover:text-yellow-400'
                : `bg-${colorScheme.text}/10 text-${colorScheme.text} group-hover:bg-${colorScheme.text}/20 group-hover:${colorScheme.hover.text}`
            } transition-colors duration-300 relative z-10
          `}
        >
          #{rank}
        </Badge>
      </div>

      {/* Performance visualization */}
      <div className="mt-2 h-2 w-full bg-slate-700 rounded-full overflow-hidden relative z-10 group-hover:bg-slate-600 transition-colors duration-300">
        <div
          className={`h-full ${
            rank === 1
              ? 'bg-yellow-500 group-hover:bg-yellow-400'
              : `bg-${colorScheme.text} group-hover:${colorScheme.hover.text}`
          } transition-all duration-500`}
          style={{
            width: `${Math.max(5, 100 - (rank - 1) * 15)}%`,
          }}
        ></div>
      </div>

      {/* Algorithm metrics grid */}
      <div className="grid grid-cols-3 gap-2 text-xs relative z-10 mt-2">
        <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="flex items-center relative z-10">
            <ArrowUpDown className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
            <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              Swaps:
            </span>
          </div>
          <span className="text-amber-400 font-mono group-hover:text-amber-300 transition-colors duration-300">
            {algoMetrics.swaps}
          </span>
        </div>

        <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="flex items-center relative z-10">
            <BarChart2 className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
            <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              Comps:
            </span>
          </div>
          <span className="text-amber-400 font-mono group-hover:text-amber-300 transition-colors duration-300">
            {algoMetrics.comparisons}
          </span>
        </div>

        <div className="bg-slate-700/50 p-1.5 rounded flex items-center justify-between group-hover:bg-slate-700 transition-colors duration-300 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="flex items-center relative z-10">
            <Zap className="mr-1 h-3 w-3 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
            <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              Time:
            </span>
          </div>
          <span className="text-amber-400 font-mono group-hover:text-amber-300 transition-colors duration-300">
            {algoMetrics.time}ms
          </span>
        </div>
      </div>

      {/* Comparison with current algorithm */}
      {algo !== algorithm && currentAlgoMetrics && algoMetrics.time > 0 && (
        <div className="mt-2 text-xs flex items-center bg-slate-700/50 p-1.5 rounded relative overflow-hidden group">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700/30 via-slate-600/20 to-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="flex items-center relative z-10">
            {parseFloat(algoMetrics.time) <
            parseFloat(currentAlgoMetrics.time) ? (
              <>
                <TrendingDown className="h-3 w-3 text-green-500 mr-1 group-hover:text-green-400 transition-colors duration-300" />
                <span className="text-green-500 group-hover:text-green-400 transition-colors duration-300">
                  {Math.round(
                    (parseFloat(algoMetrics.time) /
                      parseFloat(currentAlgoMetrics.time) -
                      1) *
                      -100
                  )}
                  % faster
                </span>
                <span className="text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
                  than current algorithm
                </span>
              </>
            ) : (
              <>
                <TrendingUp className="h-3 w-3 text-red-500 mr-1 group-hover:text-red-400 transition-colors duration-300" />
                <span className="text-red-500 group-hover:text-red-400 transition-colors duration-300">
                  {Math.round(
                    (parseFloat(algoMetrics.time) /
                      parseFloat(currentAlgoMetrics.time) -
                      1) *
                      100
                  )}
                  % slower
                </span>
                <span className="text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
                  than current algorithm
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RankingCard;

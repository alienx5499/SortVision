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
import RankingCardMetricsRow from './rankingCard/RankingCardMetricsRow';
import {
  getComparisonDelta,
  getPerformanceBarWidth,
  getRankingColorScheme,
} from './rankingCard/helpers';

const RankingCard = ({
  algo,
  metrics: algoMetrics,
  rank,
  algorithm,
  currentAlgoMetrics,
}) => {
  const colorScheme = getRankingColorScheme(algo, rank);
  const comparison =
    algo !== algorithm
      ? getComparisonDelta(algoMetrics, currentAlgoMetrics)
      : null;

  return (
    <div
      className={`bg-slate-800 p-3 rounded border ${colorScheme.border} relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorScheme.panelBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      <div
        className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${colorScheme.accent} rounded-full blur-md group-hover:scale-150 transition-transform duration-700`}
      ></div>

      <div
        className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${colorScheme.bottomLine} rounded transition-all duration-700`}
      ></div>

      <div className="flex items-center justify-between relative z-10">
        <div
          className={`text-sm ${colorScheme.text} font-mono mb-2 flex items-center ${colorScheme.hoverText} transition-colors duration-300`}
        >
          {algo}_sort()
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
          {algo === algorithm && (
            <Badge className="ml-2 bg-slate-700 text-[10px] group-hover:bg-slate-600 transition-colors duration-300">
              CURRENT
            </Badge>
          )}
        </div>

        <Badge
          variant="outline"
          className={`${colorScheme.rankBadge} transition-colors duration-300 relative z-10`}
        >
          #{rank}
        </Badge>
      </div>

      <div className="mt-2 h-2 w-full bg-slate-700 rounded-full overflow-hidden relative z-10 group-hover:bg-slate-600 transition-colors duration-300">
        <div
          className={`h-full ${colorScheme.perfBar} transition-all duration-500`}
          style={{
            width: getPerformanceBarWidth(rank),
          }}
        ></div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs relative z-10 mt-2">
        <RankingCardMetricsRow
          Icon={ArrowUpDown}
          label="Swaps:"
          value={algoMetrics.swaps}
        />
        <RankingCardMetricsRow
          Icon={BarChart2}
          label="Comps:"
          value={algoMetrics.comparisons}
        />
        <RankingCardMetricsRow
          Icon={Zap}
          label="Time:"
          value={`${algoMetrics.time}ms`}
        />
      </div>

      {comparison && (
        <div className="mt-2 text-xs flex items-center bg-slate-700/50 p-1.5 rounded relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-700/30 via-slate-600/20 to-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="flex items-center relative z-10">
            {comparison.faster ? (
              <>
                <TrendingDown className="h-3 w-3 text-green-500 mr-1 group-hover:text-green-400 transition-colors duration-300" />
                <span className="text-green-500 group-hover:text-green-400 transition-colors duration-300">
                  {comparison.percent}% faster
                </span>
                <span className="text-slate-500 ml-1 group-hover:text-slate-400 transition-colors duration-300">
                  than current algorithm
                </span>
              </>
            ) : (
              <>
                <TrendingUp className="h-3 w-3 text-red-500 mr-1 group-hover:text-red-400 transition-colors duration-300" />
                <span className="text-red-500 group-hover:text-red-400 transition-colors duration-300">
                  {comparison.percent}% slower
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

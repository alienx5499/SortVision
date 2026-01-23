import React from 'react';
import { RankingCard } from './';
import { WinnerSummary } from './';
import { TestControls } from './';
import { useLanguage } from '@/context/LanguageContext';

const AlgorithmComparison = ({
  sortedMetrics,
  isSorting,
  currentTestingAlgo,
  testAllAlgorithms,
  stopSorting,
  algorithm,
}) => {
  const { t } = useLanguage();
  // Find the current algorithm's metrics in sortedMetrics
  const currentAlgoMetrics = sortedMetrics.find(
    item => item.algo === algorithm
  )?.metrics;

  // Sort metrics by efficiency (time)
  const sortedByEfficiency = [...sortedMetrics].sort((a, b) => {
    const timeA = parseFloat(a.metrics.time);
    const timeB = parseFloat(b.metrics.time);
    return timeA - timeB;
  });

  return (
    <div className="bg-slate-900 p-4 rounded border border-slate-800 relative overflow-hidden group">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-[gradient_8s_ease_infinite] bg-[length:200%_100%]"></div>

      {/* Animated corner accent */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

      {/* Animated bottom line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-rose-500/50 rounded transition-all duration-700"></div>

      <TestControls
        isSorting={isSorting}
        currentTestingAlgo={currentTestingAlgo}
        testAllAlgorithms={testAllAlgorithms}
        stopSorting={stopSorting}
      />

      {/* Testing status */}
      {currentTestingAlgo && (
        <div className="mb-4 bg-slate-800 p-3 rounded border border-purple-500/50 flex items-center justify-between relative overflow-hidden group">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          {/* Animated bottom line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-rose-500/50 rounded transition-all duration-700"></div>

          <div className="flex items-center relative z-10">
            <div className="animate-pulse mr-2 h-3 w-3 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50"></div>
            <span className="text-sm text-slate-300">
              {t('metrics.testingAlgorithm')}:{' '}
              <span className="text-purple-400 font-mono font-bold">
                {currentTestingAlgo}_sort()
              </span>
            </span>
          </div>
          <div className="text-xs text-slate-400 bg-slate-700/50 py-1 px-2 rounded-full relative z-10">
            {t('metrics.runningTests')}
          </div>
        </div>
      )}

      {/* Algorithm Ranking Cards */}
      <div className="space-y-2 relative z-10">
        {sortedByEfficiency.map(({ algo, metrics: algoMetrics }, index) => (
          <RankingCard
            key={algo}
            algo={algo}
            metrics={algoMetrics}
            rank={index + 1}
            algorithm={algorithm}
            currentAlgoMetrics={currentAlgoMetrics}
          />
        ))}
      </div>

      {/* No data message */}
      {sortedMetrics.length === 0 && (
        <div className="bg-slate-800 p-4 rounded border border-slate-700 text-center relative overflow-hidden group hover:bg-slate-700 transition-colors duration-300">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700/5 via-slate-700/10 to-slate-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Animated corner accent */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-slate-700/10 to-slate-600/10 rounded-full blur-md group-hover:scale-150 transition-transform duration-700"></div>

          <div className="relative z-10">
            <div className="text-slate-400 text-sm mb-2 group-hover:text-slate-300 transition-colors duration-300">
              {t('metrics.noComparisonData')}
            </div>
            <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
              {t('metrics.runTestAll')}
            </div>
          </div>
        </div>
      )}

      {/* Winner summary */}
      {sortedMetrics.length > 0 && (
        <WinnerSummary sortedMetrics={sortedByEfficiency} />
      )}
    </div>
  );
};

export default AlgorithmComparison;

'use client';

import { useState } from 'react';
import {
  algorithmBackgroundTintClass,
  getArrayVizWatermarkClasses,
} from '../arrayVisualizationTheme';
import type { ArrayVisualizationProps } from '../arrayVisualizationContracts';
import {
  getBarLayoutMetrics,
  getBarStyleState,
} from '../utils/arrayBarPresentation';
import { formatSortAlgorithmTitle } from '../utils/formatSortAlgorithmTitle';
import { useLanguage } from '@/context/language';

export function ArrayVisualizationView({
  algorithm,
  array,
  currentBar,
  isSorting,
  isPaused = false,
  currentTestingAlgo,
  isStopped,
  height = 'h-96',
}: ArrayVisualizationProps) {
  const { t } = useLanguage();
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const displayedAlgorithm = currentTestingAlgo ?? algorithm;
  const watermark = getArrayVizWatermarkClasses(displayedAlgorithm);
  const bgTint = algorithmBackgroundTintClass(displayedAlgorithm);

  return (
    <div className="relative group">
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/viz overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
            <div
              className="absolute h-2 w-2 rounded-full bg-blue-500/50 top-[10%] left-[20%] animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-indigo-500/50 top-[30%] left-[70%] animate-pulse"
              style={{ animationDuration: '2.3s' }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-purple-500/50 top-[70%] left-[30%] animate-pulse"
              style={{ animationDuration: '4s' }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-cyan-500/50 top-[60%] left-[80%] animate-pulse"
              style={{ animationDuration: '3.5s' }}
            ></div>
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-md group-hover/viz:scale-150 transition-transform duration-700"></div>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/viz:w-full bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <div className={`w-full ${height || 'h-64'} relative z-10`}>
          <div
            className={`absolute inset-0 opacity-10 transition-opacity duration-500 ${
              isSorting ? 'opacity-20' : ''
            }`}
          >
            {bgTint && <div className={`absolute inset-0 ${bgTint}`}></div>}
          </div>

          <div
            className={`absolute top-2 right-2 font-mono text-xs opacity-20 ${watermark.text}`}
          >
            {displayedAlgorithm}_sort()
          </div>

          <div className="flex justify-evenly items-end h-[calc(100%-24px)] relative z-10 pb-2">
            {array.map((value, index) => {
              const { barColor, barGlow } = getBarStyleState(
                index,
                currentBar,
                displayedAlgorithm,
                hoveredBarIndex
              );
              const { widthPercent, heightPx } = getBarLayoutMetrics(
                value,
                array.length
              );

              return (
                <div
                  key={index}
                  className={`rounded-t ${barColor} ${barGlow} transition-all duration-200 relative hover:z-20 group/bar`}
                  style={{
                    width: `${widthPercent}%`,
                    height: `${heightPx}px`,
                    transition:
                      'height 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  }}
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {hoveredBarIndex === index && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 shadow-md z-30 whitespace-nowrap pointer-events-none border border-slate-700 animate-fadeIn">
                      {value}
                    </div>
                  )}

                  <div className="absolute inset-x-0 top-0 h-1 bg-white/30 rounded-t"></div>

                  <div
                    className={`absolute inset-0 bg-white/10 ${
                      hoveredBarIndex === index ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-200 rounded-t`}
                  ></div>

                  <div className="absolute inset-0 w-0 group-hover/bar:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t"></div>
                </div>
              );
            })}
          </div>

          {isSorting && (
            <div className="absolute top-2 left-2 flex items-center bg-slate-800/80 rounded px-2 py-1 text-xs text-slate-300 backdrop-blur-sm border border-slate-700/50 shadow-md transition-all duration-300">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${isPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`}
              ></div>
              <span className="font-mono">
                {isPaused
                  ? t('visualizer.controls.sortingPausedBadge')
                  : t('visualizer.controls.sortingInProgress')}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-slate-900/90 backdrop-blur-sm text-xs text-slate-500 font-mono border-t border-slate-800/50 z-20 transition-all duration-300 group-hover/viz:bg-slate-800/90">
            <div className="flex justify-between items-center">
              <div>
                // {array.length} elements |{' '}
                {currentTestingAlgo ? (
                  <span className="text-indigo-400">{`${formatSortAlgorithmTitle(currentTestingAlgo)} Sort (Testing)`}</span>
                ) : (
                  <span className="text-blue-400">{`${formatSortAlgorithmTitle(displayedAlgorithm)} Sort`}</span>
                )}
                {isStopped && (
                  <span className="text-red-400 ml-2">// terminated</span>
                )}
              </div>

              <div className="flex items-center">
                {isSorting ? (
                  <span
                    className={`flex items-center ${isPaused ? 'text-amber-400' : 'text-emerald-400'}`}
                  >
                    <span
                      className={`inline-block w-1 h-1 rounded-full mr-1 ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping'}`}
                    ></span>
                    {isPaused
                      ? t('visualizer.controls.enginePaused')
                      : t('visualizer.controls.engineExecuting')}
                  </span>
                ) : (
                  <span className="text-amber-400">ready</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

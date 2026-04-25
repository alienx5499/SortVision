import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AlgorithmBadge from './AlgorithmBadge';
import AlgorithmVisualization from './AlgorithmVisualization';
import AlgorithmSelectOptionIcon from './AlgorithmSelectOptionIcon';
import { ALGORITHM_OPTIONS } from './algorithmUiConfig';

/**
 * Algorithm Selector Card
 *
 * Preserves existing visual and interaction behavior.
 */
const AlgorithmSelectorCard = ({
  algorithm,
  setAlgorithm,
  isSorting,
  audio,
}) => {
  const { t } = useLanguage();

  return (
    <div className="mb-4 relative group">
      {/* Animated background glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/algo overflow-hidden h-full">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>

            {/* Floating particles */}
            <div
              className="absolute h-2 w-2 rounded-full bg-emerald-500/50 top-[10%] left-[20%] animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className="absolute h-1 w-1 rounded-full bg-blue-500/50 top-[30%] left-[70%] animate-pulse"
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

            {/* Animated code lines */}
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/algo:scale-150 transition-transform duration-700"></div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/algo:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700"></div>

        <label
          className="font-mono text-sm text-slate-400 mb-3 flex items-center relative z-10 group-hover/algo:text-emerald-400 transition-colors duration-300"
          id="algorithm-selector-label"
        >
          <Terminal
            className="mr-2 h-4 w-4 text-emerald-400 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <span className="transition-colors duration-300">
            // {t('visualizer.controls.selectAlgorithm')}
          </span>
        </label>

        <div className="group/select relative overflow-hidden rounded-md mb-5">
          <Select
            value={algorithm}
            onValueChange={value => {
              setAlgorithm(value);
              audio.playAccessSound();
            }}
            disabled={isSorting}
            aria-labelledby="algorithm-selector-label"
          >
            <SelectTrigger
              className="w-full h-10 bg-slate-800/90 border-slate-700 text-emerald-400 font-mono relative overflow-hidden group/trigger shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all duration-300"
              aria-label="Select sorting algorithm"
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 w-0 group-hover/trigger:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent"></div>
              <SelectValue placeholder={t('visualizer.controls.algorithm')} />
            </SelectTrigger>

            <SelectContent className="bg-slate-800/95 border-slate-700 text-emerald-400 font-mono shadow-xl shadow-purple-500/10 backdrop-blur-sm">
              {ALGORITHM_OPTIONS.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="hover:bg-slate-700/50 transition-all duration-200 flex items-center hover:scale-[1.02] group/item relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 w-0 group-hover/item:w-full transition-all duration-1000 bg-gradient-to-r from-transparent ${option.shimmerClass} to-transparent`}
                  ></div>
                  <div className="flex items-center relative z-10">
                    <AlgorithmSelectOptionIcon algorithm={option.value} />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Enhanced Algorithm Badge */}
        <AlgorithmBadge algorithm={algorithm} />

        {/* Visual representation of the algorithm */}
        <AlgorithmVisualization algorithm={algorithm} />
      </div>
    </div>
  );
};

export default AlgorithmSelectorCard;

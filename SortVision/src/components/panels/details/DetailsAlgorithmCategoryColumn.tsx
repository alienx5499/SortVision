'use client';

import type { SortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';
import type { DetailsTranslate } from './detailsPanelContracts';
import type { DetailsAlgorithmCategoryDefinition } from './detailsAlgorithmSelectorTypes';

function groupHoverClasses(group: DetailsAlgorithmCategoryDefinition['group']) {
  if (group === 'basic') {
    return {
      scale: 'group-hover/basic:scale-150',
      shimmer: 'group-hover/basic:w-full',
      bottomLine: 'group-hover/basic:w-full',
    };
  }
  if (group === 'efficient') {
    return {
      scale: 'group-hover/efficient:scale-150',
      shimmer: 'group-hover/efficient:w-full',
      bottomLine: 'group-hover/efficient:w-full',
    };
  }
  return {
    scale: 'group-hover/special:scale-150',
    shimmer: 'group-hover/special:w-full',
    bottomLine: 'group-hover/special:w-full',
  };
}

export type DetailsAlgorithmCategoryColumnProps = {
  category: DetailsAlgorithmCategoryDefinition;
  algorithm: SortingAlgorithmId;
  setAlgorithm: (id: SortingAlgorithmId) => void;
  t: DetailsTranslate;
};

export function DetailsAlgorithmCategoryColumn({
  category,
  algorithm,
  setAlgorithm,
  t,
}: DetailsAlgorithmCategoryColumnProps) {
  const hover = groupHoverClasses(category.group);
  const isBoxActive = category.activeWhen.includes(algorithm);

  return (
    <div
      className={`p-5 rounded-lg cursor-pointer transition-all duration-500 overflow-hidden relative ${category.groupClass} ${
        isBoxActive ? category.boxActive : category.boxIdle
      }`}
    >
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
          <div
            className={`absolute h-1.5 w-1.5 rounded-full ${category.particleClasses[0]} top-[10%] left-[20%] animate-pulse`}
            style={{ animationDuration: '3s' }}
          ></div>
          <div
            className={`absolute h-1 w-1 rounded-full ${category.particleClasses[1]} top-[30%] left-[70%] animate-pulse`}
            style={{ animationDuration: '2.3s' }}
          ></div>
          <div
            className={`absolute h-1 w-1 rounded-full ${category.particleClasses[2]} top-[70%] left-[30%] animate-pulse`}
            style={{ animationDuration: '4s' }}
          ></div>
          <div
            className={`absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent ${category.line1Via} to-transparent animate-[moveRight_15s_linear_infinite]`}
          ></div>
          <div
            className={`absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent ${category.line2Via} to-transparent animate-[moveRight_12s_linear_infinite]`}
          ></div>
        </div>
      </div>

      <div
        className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${category.cornerGradient} rounded-full blur-md ${hover.scale} transition-transform duration-700`}
      ></div>

      <div
        className={`absolute bottom-0 left-0 h-0.5 w-0 ${hover.bottomLine} bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50 rounded transition-all duration-700`}
      ></div>

      <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
        <span
          className={`tracking-widest relative ${category.titleHoverClass} transition-colors duration-300 flex items-center`}
        >
          <span
            className={`${category.titleAccentClass} mr-1 opacity-80 transition-opacity duration-300`}
          >
            //{' '}
          </span>
          {t(category.titleKey)}
          <span
            className={`absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r ${category.underlineGradient}`}
          ></span>
        </span>
        <div className="flex space-x-2">
          {category.algorithms.map(alg => (
            <div
              key={alg.id}
              role="button"
              tabIndex={0}
              onClick={() => setAlgorithm(alg.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setAlgorithm(alg.id);
                }
              }}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 transform ${
                algorithm === alg.id ? alg.dotSelected : alg.dotIdle
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-2 w-full justify-between">
          {category.algorithms.map(alg => (
            <button
              key={alg.id}
              type="button"
              onClick={() => setAlgorithm(alg.id)}
              className={`relative text-xs ${alg.padClass} py-1.5 rounded-md transition-all duration-500 overflow-hidden ${
                algorithm === alg.id ? alg.btnSelected : alg.btnIdle
              }`}
            >
              <div
                className={`absolute inset-0 w-0 ${hover.shimmer} transition-all duration-1000 bg-gradient-to-r from-transparent ${alg.shimmerVia} to-transparent`}
              ></div>
              <span className="relative">{alg.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

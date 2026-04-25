import React from 'react';
import AlgorithmIcon from './AlgorithmIcon';
import {
  BADGE_COMPLEXITY_TEXT_MAP,
  BADGE_GRADIENT_MAP,
  BADGE_THEME_MAP,
} from './algorithmUiConfig';

// Algorithm Badge Component
const AlgorithmBadge = ({ algorithm }) => {
  const badgeTheme = BADGE_THEME_MAP[algorithm] || BADGE_THEME_MAP.bucket;
  const badgeGradient =
    BADGE_GRADIENT_MAP[algorithm] || BADGE_GRADIENT_MAP.bucket;
  const complexityText =
    BADGE_COMPLEXITY_TEXT_MAP[algorithm] || BADGE_COMPLEXITY_TEXT_MAP.bucket;

  return (
    <div className="mt-6 flex justify-center">
      <div
        className={`
        px-4 py-2 rounded-lg font-mono text-sm
        ${badgeTheme}
        flex items-center gap-3 transform hover:scale-105 transition-all duration-300 relative overflow-hidden
      `}
      >
        {/* Animated background effect based on algorithm */}
        <div
          className={`absolute inset-0 opacity-20 ${badgeGradient} animate-pulse`}
          style={{ animationDuration: '3s' }}
        ></div>

        {/* Algorithm icon */}
        <AlgorithmIcon algorithm={algorithm} />

        <div className="flex flex-col">
          <span className="font-bold">
            {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort
          </span>
          <span className="text-xs opacity-70 mt-0.5">{complexityText}</span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmBadge;

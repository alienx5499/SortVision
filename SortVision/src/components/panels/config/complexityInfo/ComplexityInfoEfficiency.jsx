import React from 'react';
import {
  EFFICIENCY_ICON_CONFIG,
  EFFICIENCY_LEVEL_DOTS,
  EFFICIENCY_TEXT_COLOR_CLASSES,
} from './complexityConfig';

const ComplexityInfoEfficiency = ({ complexity, t }) => {
  const colorClass =
    EFFICIENCY_TEXT_COLOR_CLASSES[complexity.color] ||
    EFFICIENCY_TEXT_COLOR_CLASSES.default;
  const iconConfig = EFFICIENCY_ICON_CONFIG[complexity.efficiency];
  const Icon = iconConfig?.Icon;

  return (
    <div className="mb-3 bg-slate-800/80 p-2 rounded border border-slate-700 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/60 relative overflow-hidden group/eff">
      <div className="absolute inset-0 w-0 group-hover/eff:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-slate-400/5 to-transparent"></div>

      <div className="text-xs text-slate-400 mb-1 transition-colors duration-300 group-hover:text-slate-300">
        {t('visualizer.complexity.efficiencyRating')}
      </div>
      <div className="flex items-center">
        <div
          className={`font-bold text-sm flex items-center transition-all duration-300 hover:scale-105 ${colorClass}`}
        >
          {Icon && (
            <div className="relative mr-2">
              <div className="absolute inset-0 opacity-30">
                <Icon
                  className={`h-4 w-4 ${iconConfig.iconClass} animate-pulse`}
                  style={{ animationDuration: '3s' }}
                />
              </div>
              <Icon
                className={`h-4 w-4 transition-transform duration-300 ${iconConfig.hoverClass}`}
              />
            </div>
          )}
          {complexity.efficiency.charAt(0).toUpperCase() +
            complexity.efficiency.slice(1)}
        </div>
        <div className="ml-auto">
          <div className="flex space-x-1">
            {EFFICIENCY_LEVEL_DOTS.map(dot => (
              <div
                key={dot.key}
                className={`h-2 w-2 rounded-full transition-all duration-300 hover:scale-125 ${
                  dot.levels.includes(complexity.efficiency)
                    ? dot.className
                    : 'bg-slate-700'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexityInfoEfficiency;

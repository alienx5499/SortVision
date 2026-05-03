import React from 'react';
import type { HealthMetricGroup } from './buildRepositoryHealthMetrics';

const COLOR_CLASSES: Record<
  HealthMetricGroup['color'],
  { bg: string; border: string; text: string }
> = {
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    text: 'text-purple-400',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
  },
};

type RepositoryHealthCardProps = {
  metric: HealthMetricGroup;
  index: number;
  loading: boolean;
};

export const RepositoryHealthCard = ({
  metric,
  index,
  loading,
}: RepositoryHealthCardProps) => {
  const colors = COLOR_CLASSES[metric.color];
  const Icon = metric.icon;

  return (
    <div
      className={`group/card relative p-3 rounded-lg border ${colors.border} ${colors.bg} transition-all duration-300 hover:scale-105 animate-fade-up animate-once overflow-hidden`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 w-0 group-hover/card:w-full transition-all duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      <div className="flex items-center mb-3">
        <div
          className={`p-1.5 rounded-md ${colors.bg} border ${colors.border}`}
        >
          <Icon className={`w-3 h-3 ${colors.text}`} />
        </div>
        <h3 className={`font-mono text-xs font-bold ${colors.text} ml-2`}>
          {metric.title}
        </h3>
      </div>

      <div className="space-y-2">
        {metric.data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">
              {item.label}:
            </span>
            <span
              className={`font-mono text-xs font-bold ${
                loading ? 'text-slate-500' : item.color
              }`}
            >
              {loading ? '...' : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

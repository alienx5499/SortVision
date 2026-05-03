'use client';

import { AlertTriangle, CheckCircle, ChevronDown } from 'lucide-react';
import type { PanelTranslate } from '@/components/panels/shared/panelTranslate';
import type { BestPracticeCategory } from './buildBestPracticeCategories';

const COLOR_CLASSES: Record<
  BestPracticeCategory['color'],
  { bg: string; border: string; text: string }
> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-400',
  },
};

export type BestPracticeCollapsibleSectionProps = {
  category: BestPracticeCategory;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
  t: PanelTranslate;
};

export function BestPracticeCollapsibleSection({
  category,
  isExpanded,
  onToggle,
  index,
  t,
}: BestPracticeCollapsibleSectionProps) {
  const colors = COLOR_CLASSES[category.color] ?? COLOR_CLASSES.emerald;
  const Icon = category.icon;

  return (
    <div
      className={`rounded-lg border ${colors.border} ${colors.bg} transition-all duration-300 animate-fade-up animate-once`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-3 flex items-center justify-between hover:bg-slate-800/20 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div
            className={`p-1.5 rounded-md ${colors.bg} border ${colors.border}`}
          >
            <Icon className={`w-3 h-3 ${colors.text}`} />
          </div>
          <div className="text-left">
            <h3 className={`font-mono text-sm font-bold ${colors.text}`}>
              {category.title}
            </h3>
            <p className="font-mono text-xs text-slate-500 mt-0.5">
              {category.summary}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 border-t border-slate-700/50 animate-fade-down animate-once">
          <div className="pt-3 space-y-2">
            {category.practices.map((practice, practiceIndex) => (
              <div
                key={practiceIndex}
                className="flex items-start space-x-2 p-2 rounded bg-slate-800/30"
              >
                {practice.type === 'do' ? (
                  <CheckCircle className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <div
                    className={`font-mono text-xs font-medium ${
                      practice.type === 'do'
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
                    {t(
                      practice.type === 'do'
                        ? 'contributions.guide.do'
                        : 'contributions.guide.dont'
                    )}{' '}
                    {practice.text}
                  </div>
                  <div className="font-mono text-xs text-slate-500 mt-1 bg-slate-900/50 p-1 rounded border-l-2 border-slate-600">
                    {practice.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

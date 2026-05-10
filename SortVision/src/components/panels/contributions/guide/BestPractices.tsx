'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/language';
import { buildBestPracticeCategories } from './buildBestPracticeCategories';
import { BestPracticeCollapsibleSection } from './BestPracticeCollapsibleSection';

export default function BestPractices() {
  const { t } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const practiceCategories = buildBestPracticeCategories(t);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="mb-4 relative group">
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-yellow-500/20 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative bg-slate-900 p-4 rounded border border-slate-800 transition-all duration-500 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50 group/practices overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:8px_8px] opacity-30"></div>
            <div
              className="absolute size-2 rounded-full bg-emerald-500/50 top-[10%] left-[20%] animate-pulse"
              style={{ animationDuration: '3s' }}
            ></div>
            <div
              className="absolute size-1 rounded-full bg-blue-500/50 top-[30%] left-[70%] animate-pulse"
              style={{ animationDuration: '2.3s' }}
            ></div>
            <div
              className="absolute h-1.5 w-1.5 rounded-full bg-yellow-500/50 top-[70%] left-[30%] animate-pulse"
              style={{ animationDuration: '4s' }}
            ></div>
            <div className="absolute top-[15%] left-0 h-px w-[30%] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-[45%] left-0 h-px w-[20%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-[moveRight_12s_linear_infinite]"></div>
            <div className="absolute top-[75%] left-0 h-px w-[40%] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent animate-[moveRight_18s_linear_infinite]"></div>
          </div>
        </div>

        <div className="absolute -top-10 -right-10 size-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-md group-hover/practices:scale-150 transition-transform duration-700"></div>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover/practices:w-full bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-yellow-500/50 rounded transition-all duration-700"></div>

        <div className="font-mono text-sm text-slate-400 mb-4 flex items-center relative z-10 group-hover/practices:text-emerald-400 transition-colors duration-300">
          <CheckCircle
            className="mr-2 size-4 text-emerald-400 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <span className="transition-colors duration-300">
            // {t('contributions.guide.bestPractices')}
          </span>
        </div>

        <div className="space-y-3 relative z-10">
          {practiceCategories.map((category, index) => (
            <BestPracticeCollapsibleSection
              key={category.id}
              category={category}
              isExpanded={!!expandedSections[category.id]}
              onToggle={() => toggleSection(category.id)}
              index={index}
              t={t}
            />
          ))}
        </div>

        <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700 relative z-10">
          <h4 className="font-mono text-xs font-bold text-emerald-400 mb-2">
            {t('contributions.guide.quickGuidelines')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
            <div>{t('contributions.guide.followPatterns')}</div>
            <div>{t('contributions.guide.clearCommits')}</div>
            <div>{t('contributions.guide.testChanges')}</div>
            <div>{t('contributions.guide.keepFocused')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import type { GuidePhase, TranslateFn } from './contributeGuideTypes';

type ContributeGuidePhaseSectionProps = {
  t: TranslateFn;
  visiblePhase: number;
  currentPhase: GuidePhase | undefined;
  phases: GuidePhase[];
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  checkedCount: number;
  totalSteps: number;
};

export const ContributeGuidePhaseSection = ({
  t,
  visiblePhase,
  currentPhase,
  phases,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  checkedCount,
  totalSteps,
}: ContributeGuidePhaseSectionProps) => (
  <div className="mb-6 relative z-10">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="font-mono text-lg font-bold text-white mb-1">
          {t('contributions.guide.phase')} {visiblePhase}: {currentPhase?.title}
        </h3>
        <p className="font-mono text-sm text-slate-400">
          {currentPhase?.description}
        </p>
      </div>
      <div className="flex space-x-2">
        {canGoPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded font-mono text-xs transition-all duration-300"
          >
            {t('contributions.guide.previous')}
          </button>
        )}
        {canGoNext && (
          <button
            type="button"
            onClick={onNext}
            className="px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 rounded font-mono text-xs transition-all duration-300"
          >
            {t('contributions.guide.nextPhase')}
          </button>
        )}
      </div>
    </div>

    <div className="flex items-center space-x-4 mb-4">
      {phases.map(phase => (
        <div key={phase.id} className="flex items-center space-x-2">
          <div
            className={`size-3 rounded-full transition-all duration-300 ${
              phase.id <= visiblePhase
                ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                : 'bg-slate-600'
            }`}
          ></div>
          <span
            className={`font-mono text-xs transition-colors duration-300 ${
              phase.id === visiblePhase ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            {phase.title}
          </span>
          {phase.id < 3 && (
            <div
              className={`w-8 h-px transition-colors duration-300 ${
                phase.id < visiblePhase ? 'bg-emerald-500/50' : 'bg-slate-600'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between mb-2">
      <span className="font-mono text-xs text-slate-400">Overall Progress</span>
      <span className="font-mono text-xs text-emerald-400">
        {checkedCount}/{totalSteps} steps completed
      </span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-500 ease-out"
        style={{
          width: `${(checkedCount / Math.max(1, totalSteps)) * 100}%`,
        }}
      ></div>
    </div>
  </div>
);

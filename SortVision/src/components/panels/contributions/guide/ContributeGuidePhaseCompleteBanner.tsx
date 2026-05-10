import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { GuidePhase, TranslateFn } from './contributeGuideTypes';

type ContributeGuidePhaseCompleteBannerProps = {
  t: TranslateFn;
  visiblePhase: number;
  phases: GuidePhase[];
  onContinue: () => void;
};

export const ContributeGuidePhaseCompleteBanner = ({
  t,
  visiblePhase,
  phases,
  onContinue,
}: ContributeGuidePhaseCompleteBannerProps) => (
  <div className="mb-6 relative z-10 animate-fade-up animate-once">
    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
      <div className="flex items-center justify-center mb-2">
        <CheckCircle className="size-5 text-emerald-400 mr-2" />
        <span className="font-mono text-sm font-bold text-emerald-400">
          {t('contributions.guide.phaseComplete', { phase: visiblePhase })}
        </span>
      </div>
      <p className="text-slate-300 font-mono text-xs mb-3">
        {t('contributions.guide.greatWork')}
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 rounded font-mono text-sm transition-all duration-300 animate-pulse"
      >
        {t('contributions.guide.continueTo', {
          phase: phases.find(p => p.id === visiblePhase + 1)?.title ?? '',
        })}
      </button>
    </div>
  </div>
);

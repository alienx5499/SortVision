import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ContributeGuideFrame } from './ContributeGuideFrame';
import { ContributeGuidePhaseSection } from './ContributeGuidePhaseSection';
import { ContributeGuidePhaseCompleteBanner } from './ContributeGuidePhaseCompleteBanner';
import { ContributeGuideStepCard } from './ContributeGuideStepCard';
import { useContributeGuideState } from './useContributeGuideState';

const ContributeGuide = () => {
  const { t } = useLanguage();
  const {
    steps,
    phases,
    checkedSteps,
    expandedSteps,
    visiblePhase,
    visibleSteps,
    currentPhase,
    canGoNext,
    canGoPrev,
    currentPhaseCompleted,
    toggleStep,
    toggleExpanded,
    nextPhase,
    prevPhase,
  } = useContributeGuideState(t);

  return (
    <ContributeGuideFrame title={t('contributions.guide.contributionGuide')}>
      <ContributeGuidePhaseSection
        t={t}
        visiblePhase={visiblePhase}
        currentPhase={currentPhase}
        phases={phases}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onPrev={prevPhase}
        onNext={nextPhase}
        checkedCount={checkedSteps.size}
        totalSteps={steps.length}
      />

      <div className="space-y-4 mb-8 relative z-10">
        {visibleSteps.map((step, index) => (
          <ContributeGuideStepCard
            key={step.id}
            step={step}
            index={index}
            isChecked={checkedSteps.has(step.id)}
            isExpanded={expandedSteps.has(step.id)}
            onToggle={() => toggleStep(step.id)}
            onToggleExpanded={() => toggleExpanded(step.id)}
          />
        ))}
      </div>

      {currentPhaseCompleted && canGoNext && (
        <ContributeGuidePhaseCompleteBanner
          t={t}
          visiblePhase={visiblePhase}
          phases={phases}
          onContinue={nextPhase}
        />
      )}
    </ContributeGuideFrame>
  );
};

export default ContributeGuide;

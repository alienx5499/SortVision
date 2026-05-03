import { useMemo, useState, useCallback } from 'react';
import {
  buildContributeGuidePhases,
  buildContributeGuideSteps,
} from './buildContributeGuideSteps';
import type { TranslateFn } from './contributeGuideTypes';

export function useContributeGuideState(t: TranslateFn) {
  const steps = useMemo(() => buildContributeGuideSteps(t), [t]);
  const phases = useMemo(() => buildContributeGuidePhases(t), [t]);

  const [checkedSteps, setCheckedSteps] = useState(() => new Set<string>());
  const [expandedSteps, setExpandedSteps] = useState(() => new Set<string>());
  const [visiblePhase, setVisiblePhase] = useState(1);

  const toggleStep = useCallback((stepId: string) => {
    setCheckedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  }, []);

  const toggleExpanded = useCallback((stepId: string) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  }, []);

  const nextPhase = useCallback(() => {
    setVisiblePhase(p => (p < 3 ? p + 1 : p));
  }, []);

  const prevPhase = useCallback(() => {
    setVisiblePhase(p => (p > 1 ? p - 1 : p));
  }, []);

  const visibleSteps = useMemo(
    () => steps.filter(step => step.phase <= visiblePhase),
    [steps, visiblePhase]
  );

  const currentPhase = useMemo(
    () => phases.find(p => p.id === visiblePhase),
    [phases, visiblePhase]
  );

  const canGoNext = visiblePhase < 3;
  const canGoPrev = visiblePhase > 1;

  const currentPhaseSteps = useMemo(
    () => steps.filter(step => step.phase === visiblePhase),
    [steps, visiblePhase]
  );

  const currentPhaseCompleted =
    currentPhaseSteps.length > 0 &&
    currentPhaseSteps.every(step => checkedSteps.has(step.id));

  return {
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
  };
}

export type ContributeGuideState = ReturnType<typeof useContributeGuideState>;

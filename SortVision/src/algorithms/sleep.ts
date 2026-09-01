import type { SortStepDelayRefs } from '@/algorithms/types';

const POLL_MS = 32;

/**
 * Non-blocking delay between visualization steps.
 * Honors {@link SortStepDelayRefs.shouldStopRef} (abort) and {@link SortStepDelayRefs.sortPausedRef} (pause).
 */
export function delayStep(ms: number, refs: SortStepDelayRefs): Promise<void> {
  const start = performance.now();
  return new Promise(resolve => {
    const step = () => {
      if (refs.shouldStopRef.current) {
        resolve();
        return;
      }
      if (refs.sortPausedRef.current) {
        setTimeout(step, POLL_MS);
        return;
      }
      const now = performance.now();
      const currentDelay = refs.delayRef?.current ?? ms;
      const elapsed = now - start;
      if (elapsed >= currentDelay) {
        resolve();
        return;
      }
      setTimeout(step, Math.min(POLL_MS, currentDelay - elapsed));
    };
    step();
  });
}

import { afterEach, describe, expect, it, vi } from 'vitest';
import { delayStep } from '@/algorithms/sleep';
import type { SortStepDelayRefs } from '@/algorithms/types';

const createDelayRefs = (delay: number): SortStepDelayRefs => ({
  shouldStopRef: { current: false },
  sortPausedRef: { current: false },
  delayRef: { current: delay },
});

describe('delayStep', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('uses updated delayRef values while waiting', async () => {
    vi.useFakeTimers();
    const refs = createDelayRefs(1000);
    const wait = delayStep(1000, refs);

    await vi.advanceTimersByTimeAsync(40);
    refs.delayRef!.current = 10;
    await vi.advanceTimersByTimeAsync(32);

    await expect(wait).resolves.toBeUndefined();
  });
});

/**
 * Radix Sort — non-comparative; sorts by digit using counting sort per digit.
 *
 * Time: O(d · (n + k)) where d is digit count, k radix (10 here).
 * Space: O(n + k).
 */
import { delayStep } from '@/algorithms/sleep';
import type {
  CurrentBarState,
  SortingAlgorithm,
  SortingAlgorithmAudio,
  SortStepDelayRefs,
  SortStepMetrics,
} from '@/algorithms/types';
import type { Dispatch, SetStateAction } from 'react';

async function countingSort(
  arr: number[],
  exp: number,
  visualizeArray: Dispatch<SetStateAction<number[]>>,
  delay: number,
  setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>,
  delayRefs: SortStepDelayRefs,
  audio: SortingAlgorithmAudio,
  metrics: SortStepMetrics
): Promise<void> {
  const output = new Array<number>(arr.length);
  const count = new Array<number>(10).fill(0);

  for (let i = 0; i < arr.length; i++) {
    metrics.comparisons++;
    setCurrentBar({ compare: i, swap: null });
    audio.playCompareSound(arr[i]);
    count[Math.floor(arr[i] / exp) % 10]++;
    await delayStep(delay, delayRefs);
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
    visualizeArray([...output]);
    setCurrentBar({ compare: i, swap: null });
    audio.playAccessSound(arr[i]);
    await delayStep(delay, delayRefs);

    if (delayRefs.shouldStopRef.current) {
      metrics.swaps += arr.length;
      return;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
    audio.playSwapSound(arr[i]);
  }

  metrics.swaps += arr.length;
}

export const radixSort: SortingAlgorithm = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  sortPausedRef,
  audio
) => {
  const delayRefs: SortStepDelayRefs = { shouldStopRef, sortPausedRef };
  const metrics: SortStepMetrics = { swaps: 0, comparisons: 0 };

  if (array.length === 0) {
    setCurrentBar({ compare: null, swap: null });
    audio.playCompleteSound();
    return metrics;
  }

  let max = Math.max(...array);
  let exp = 1;

  while (Math.floor(max / exp) > 0) {
    await countingSort(
      array,
      exp,
      visualizeArray,
      delay,
      setCurrentBar,
      delayRefs,
      audio,
      metrics
    );

    if (shouldStopRef.current) {
      setCurrentBar({ compare: null, swap: null });
      return metrics;
    }

    exp *= 10;
  }

  setCurrentBar({ compare: null, swap: null });
  audio.playCompleteSound();
  return metrics;
};

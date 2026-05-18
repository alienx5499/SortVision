import { delayStep } from '@/algorithms/sleep';
import type {
  CurrentBarState,
  SortingAlgorithm,
  SortingAlgorithmAudio,
  SortStepDelayRefs,
  SortStepMetrics,
} from '@/algorithms/types';
import type { Dispatch, SetStateAction } from 'react';

async function heapify(
  arr: number[],
  n: number,
  i: number,
  visualizeArray: Dispatch<SetStateAction<number[]>>,
  delay: number,
  setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>,
  delayRefs: SortStepDelayRefs,
  audio: SortingAlgorithmAudio,
  metrics: SortStepMetrics
): Promise<void> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    if (delayRefs.shouldStopRef.current) {
      return;
    }

    metrics.comparisons++;
    setCurrentBar({ compare: largest, swap: left });
    audio.playCompareSound(arr[left]);
    await delayStep(delay, delayRefs);

    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    if (delayRefs.shouldStopRef.current) {
      return;
    }

    metrics.comparisons++;
    setCurrentBar({ compare: largest, swap: right });
    audio.playCompareSound(arr[right]);
    await delayStep(delay, delayRefs);

    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    metrics.swaps++;
    audio.playSwapSound(arr[i]);
    visualizeArray([...arr]);
    await delayStep(delay, delayRefs);

    // react-doctor-disable-next-line -- intentionally sequential for visualization, react-doctor/async-await-in-loop
    await heapify(
      arr,
      n,
      largest,
      visualizeArray,
      delay,
      setCurrentBar,
      delayRefs,
      audio,
      metrics
    );
  }
}

export const heapSort: SortingAlgorithm = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  sortPausedRef,
  audio,
  delayRef
) => {
  const delayRefs: SortStepDelayRefs = {
    shouldStopRef,
    sortPausedRef,
    delayRef,
  };
  const metrics: SortStepMetrics = { swaps: 0, comparisons: 0 };
  const arr = [...array];
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (shouldStopRef.current) {
      return metrics;
    }
    // react-doctor-disable-next-line -- intentionally sequential for visualization, react-doctor/async-await-in-loop
    await heapify(
      arr,
      n,
      i,
      visualizeArray,
      delay,
      setCurrentBar,
      delayRefs,
      audio,
      metrics
    );
  }

  for (let i = n - 1; i > 0; i--) {
    if (shouldStopRef.current) {
      return metrics;
    }

    [arr[0], arr[i]] = [arr[i], arr[0]];
    metrics.swaps++;
    audio.playSwapSound(arr[0]);
    visualizeArray([...arr]);
    // react-doctor-disable-next-line -- intentionally sequential for visualization, react-doctor/async-await-in-loop
    await delayStep(delay, delayRefs);

    // react-doctor-disable-next-line -- intentionally sequential for visualization, react-doctor/async-await-in-loop
    await heapify(
      arr,
      i,
      0,
      visualizeArray,
      delay,
      setCurrentBar,
      delayRefs,
      audio,
      metrics
    );
  }

  if (shouldStopRef.current) {
    return metrics;
  }

  setCurrentBar({ compare: null, swap: null });
  audio.playCompleteSound();
  return metrics;
};

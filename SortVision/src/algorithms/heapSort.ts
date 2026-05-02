import { delayStep } from '@/algorithms/sleep';
import type {
  CurrentBarState,
  ShouldStopRef,
  SortingAlgorithm,
  SortingAlgorithmAudio,
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
  shouldStopRef: ShouldStopRef,
  audio: SortingAlgorithmAudio,
  metrics: SortStepMetrics
): Promise<void> {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    if (shouldStopRef.current) {
      return;
    }

    metrics.comparisons++;
    setCurrentBar({ compare: largest, swap: left });
    audio.playCompareSound(arr[left]);
    await delayStep(delay);

    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    if (shouldStopRef.current) {
      return;
    }

    metrics.comparisons++;
    setCurrentBar({ compare: largest, swap: right });
    audio.playCompareSound(arr[right]);
    await delayStep(delay);

    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    metrics.swaps++;
    audio.playSwapSound(arr[i]);
    visualizeArray([...arr]);
    await delayStep(delay);

    await heapify(
      arr,
      n,
      largest,
      visualizeArray,
      delay,
      setCurrentBar,
      shouldStopRef,
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
  audio
) => {
  const metrics: SortStepMetrics = { swaps: 0, comparisons: 0 };
  const arr = [...array];
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (shouldStopRef.current) {
      return metrics;
    }
    await heapify(
      arr,
      n,
      i,
      visualizeArray,
      delay,
      setCurrentBar,
      shouldStopRef,
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
    await delayStep(delay);

    await heapify(
      arr,
      i,
      0,
      visualizeArray,
      delay,
      setCurrentBar,
      shouldStopRef,
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

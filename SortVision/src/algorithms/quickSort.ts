import { delayStep } from '@/algorithms/sleep';
import type {
  CurrentBarState,
  ShouldStopRef,
  SortingAlgorithm,
  SortingAlgorithmAudio,
  SortStepMetrics,
} from '@/algorithms/types';
import type { Dispatch, SetStateAction } from 'react';

async function partition(
  arr: number[],
  low: number,
  high: number,
  visualizeArray: Dispatch<SetStateAction<number[]>>,
  delay: number,
  setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>,
  shouldStopRef: ShouldStopRef,
  audio: SortingAlgorithmAudio,
  metrics: SortStepMetrics
): Promise<number> {
  const pivot = arr[high];
  let i = low - 1;

  setCurrentBar({ compare: high, swap: null });
  audio.playPivotSound(pivot);
  await delayStep(delay);

  for (let j = low; j < high; j++) {
    if (shouldStopRef.current) {
      return i + 1;
    }

    metrics.comparisons++;
    setCurrentBar({ compare: j, swap: high });
    audio.playCompareSound(arr[j]);
    await delayStep(delay);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      metrics.swaps++;
      audio.playSwapSound(arr[i]);
      visualizeArray([...arr]);
      await delayStep(delay);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  metrics.swaps++;
  audio.playSwapSound(arr[i + 1]);
  visualizeArray([...arr]);
  await delayStep(delay);

  return i + 1;
}

async function quickSortHelper(
  arr: number[],
  low: number,
  high: number,
  visualizeArray: Dispatch<SetStateAction<number[]>>,
  delay: number,
  setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>,
  shouldStopRef: ShouldStopRef,
  audio: SortingAlgorithmAudio,
  metrics: SortStepMetrics
): Promise<void> {
  if (low < high) {
    const pi = await partition(
      arr,
      low,
      high,
      visualizeArray,
      delay,
      setCurrentBar,
      shouldStopRef,
      audio,
      metrics
    );
    if (shouldStopRef.current) {
      return;
    }
    await quickSortHelper(
      arr,
      low,
      pi - 1,
      visualizeArray,
      delay,
      setCurrentBar,
      shouldStopRef,
      audio,
      metrics
    );
    await quickSortHelper(
      arr,
      pi + 1,
      high,
      visualizeArray,
      delay,
      setCurrentBar,
      shouldStopRef,
      audio,
      metrics
    );
  }
}

export const quickSort: SortingAlgorithm = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  audio
) => {
  const metrics: SortStepMetrics = { swaps: 0, comparisons: 0 };
  const arr = [...array];

  await quickSortHelper(
    arr,
    0,
    arr.length - 1,
    visualizeArray,
    delay,
    setCurrentBar,
    shouldStopRef,
    audio,
    metrics
  );

  if (shouldStopRef.current) {
    return metrics;
  }

  setCurrentBar({ compare: null, swap: null });
  audio.playCompleteSound();
  return metrics;
};

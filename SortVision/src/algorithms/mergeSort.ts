import { delayStep } from '@/algorithms/sleep';
import type {
  CurrentBarState,
  SortingAlgorithm,
  SortingAlgorithmAudio,
  SortStepDelayRefs,
  SortStepMetrics,
} from '@/algorithms/types';
import type { Dispatch, SetStateAction } from 'react';

async function merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  visualizeArray: Dispatch<SetStateAction<number[]>>,
  delay: number,
  setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>,
  delayRefs: SortStepDelayRefs,
  audio: SortingAlgorithmAudio,
  metrics: SortStepMetrics
): Promise<void> {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (delayRefs.shouldStopRef.current) {
      return;
    }

    metrics.comparisons++;
    setCurrentBar({ compare: left + i, swap: mid + 1 + j });
    audio.playCompareSound(leftArr[i]);
    await delayStep(delay, delayRefs);

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
      metrics.swaps++;
    }

    audio.playMergeSound(arr[k]);
    visualizeArray([...arr]);
    await delayStep(delay, delayRefs);
    k++;
  }

  while (i < leftArr.length) {
    if (delayRefs.shouldStopRef.current) {
      return;
    }
    arr[k] = leftArr[i];
    audio.playMergeSound(arr[k]);
    visualizeArray([...arr]);
    await delayStep(delay, delayRefs);
    i++;
    k++;
  }

  while (j < rightArr.length) {
    if (delayRefs.shouldStopRef.current) {
      return;
    }
    arr[k] = rightArr[j];
    audio.playMergeSound(arr[k]);
    visualizeArray([...arr]);
    await delayStep(delay, delayRefs);
    j++;
    k++;
  }
}

async function mergeSortHelper(
  arr: number[],
  left: number,
  right: number,
  visualizeArray: Dispatch<SetStateAction<number[]>>,
  delay: number,
  setCurrentBar: Dispatch<SetStateAction<CurrentBarState>>,
  delayRefs: SortStepDelayRefs,
  audio: SortingAlgorithmAudio,
  metrics: SortStepMetrics
): Promise<void> {
  if (left >= right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);

  await mergeSortHelper(
    arr,
    left,
    mid,
    visualizeArray,
    delay,
    setCurrentBar,
    delayRefs,
    audio,
    metrics
  );
  await mergeSortHelper(
    arr,
    mid + 1,
    right,
    visualizeArray,
    delay,
    setCurrentBar,
    delayRefs,
    audio,
    metrics
  );
  await merge(
    arr,
    left,
    mid,
    right,
    visualizeArray,
    delay,
    setCurrentBar,
    delayRefs,
    audio,
    metrics
  );
}

export const mergeSort: SortingAlgorithm = async (
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
  const arr = [...array];

  await mergeSortHelper(
    arr,
    0,
    arr.length - 1,
    visualizeArray,
    delay,
    setCurrentBar,
    delayRefs,
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

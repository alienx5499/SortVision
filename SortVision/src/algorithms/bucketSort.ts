/**
 * Bucket Sort — distributes into buckets, insertion-sorts each, concatenates.
 *
 * Time: O(n + n²/k) average; O(n²) worst when one bucket holds all.
 * Space: O(n + k).
 */
import { delayStep } from '@/algorithms/sleep';
import type {
  ShouldStopRef,
  SortingAlgorithm,
  SortingAlgorithmAudio,
  SortStepDelayRefs,
  SortStepMetrics,
} from '@/algorithms/types';

async function insertionSortBucket(
  bucket: number[],
  shouldStopRef: ShouldStopRef,
  audio: SortingAlgorithmAudio,
  metrics: SortStepMetrics
): Promise<void> {
  for (let i = 1; i < bucket.length; i++) {
    if (shouldStopRef.current) {
      return;
    }

    const key = bucket[i];
    let j = i - 1;

    while (j >= 0 && bucket[j] > key) {
      metrics.comparisons++;
      audio.playCompareSound(bucket[j]);
      bucket[j + 1] = bucket[j];
      j--;
      metrics.swaps++;
    }
    bucket[j + 1] = key;
    audio.playSwapSound(key);
  }
}

export const bucketSort: SortingAlgorithm = async (
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

  if (array.length === 1) {
    setCurrentBar({ compare: null, swap: null });
    audio.playCompleteSound();
    return metrics;
  }

  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min;
  const bucketCount = Math.max(1, Math.floor(Math.sqrt(array.length)));
  const bucketSpan = range === 0 ? 1 : range / bucketCount;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  for (let i = 0; i < array.length; i++) {
    if (shouldStopRef.current) {
      setCurrentBar({ compare: null, swap: null });
      return metrics;
    }

    const bucketIndex = Math.floor((array[i] - min) / bucketSpan);
    const safeIndex = Math.min(Math.max(0, bucketIndex), bucketCount - 1);
    buckets[safeIndex].push(array[i]);

    setCurrentBar({ compare: i, swap: null });
    visualizeArray([...array]);
    audio.playAccessSound(array[i]);
    // react-doctor-disable-next-line -- intentionally sequential for visualization, react-doctor/async-await-in-loop
    await delayStep(delay, delayRefs);
  }

  for (let i = 0; i < buckets.length; i++) {
    if (shouldStopRef.current) {
      setCurrentBar({ compare: null, swap: null });
      return metrics;
    }
    // react-doctor-disable-next-line -- intentionally sequential for visualization, react-doctor/async-await-in-loop
    await insertionSortBucket(buckets[i], shouldStopRef, audio, metrics);
  }

  let index = 0;
  for (let i = 0; i < buckets.length; i++) {
    if (shouldStopRef.current) {
      setCurrentBar({ compare: null, swap: null });
      return metrics;
    }

    for (let j = 0; j < buckets[i].length; j++) {
      array[index] = buckets[i][j];
      setCurrentBar({ compare: null, swap: index });
      visualizeArray([...array]);
      audio.playAccessSound(array[index]);
      // react-doctor-disable-next-line -- intentionally sequential for visualization, react-doctor/async-await-in-loop
      await delayStep(delay, delayRefs);
      index++;
    }
  }

  setCurrentBar({ compare: null, swap: null });
  audio.playCompleteSound();
  return metrics;
};

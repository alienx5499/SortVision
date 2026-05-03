import { delayStep } from '@/algorithms/sleep';
import type { SortingAlgorithm, SortStepDelayRefs } from '@/algorithms/types';

export const insertionSort: SortingAlgorithm = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  sortPausedRef,
  audio
) => {
  const delayRefs: SortStepDelayRefs = { shouldStopRef, sortPausedRef };
  let swaps = 0;
  let comparisons = 0;
  const arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      if (shouldStopRef.current) {
        return { swaps, comparisons };
      }

      comparisons++;
      setCurrentBar({ compare: j, swap: j + 1 });
      audio.playCompareSound(arr[j]);
      await delayStep(delay, delayRefs);

      arr[j + 1] = arr[j];
      swaps++;
      audio.playSwapSound(arr[j]);
      visualizeArray([...arr]);
      await delayStep(delay, delayRefs);

      j--;
    }

    arr[j + 1] = key;
    visualizeArray([...arr]);
    await delayStep(delay, delayRefs);
  }

  setCurrentBar({ compare: null, swap: null });
  audio.playCompleteSound();
  return { swaps, comparisons };
};

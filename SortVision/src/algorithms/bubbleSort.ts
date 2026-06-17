import { delayStep } from '@/algorithms/sleep';
import type { SortingAlgorithm, SortStepDelayRefs } from '@/algorithms/types';

export const bubbleSort: SortingAlgorithm = async (
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
  let swaps = 0;
  let comparisons = 0;
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (shouldStopRef.current) {
        return { swaps, comparisons };
      }

      comparisons++;
      setCurrentBar({ compare: j, swap: j + 1 });
      audio.playCompareSound(arr[j]);
      // react-doctor-disable-next-line -- intentionally sequential for visualization, react-doctor/async-await-in-loop
      await delayStep(delay, delayRefs);

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        audio.playSwapSound(arr[j]);
        visualizeArray([...arr]);
        // react-doctor-disable-next-line -- intentionally sequential for visualization, react-doctor/async-await-in-loop
        await delayStep(delay, delayRefs);
      }
    }
  }

  setCurrentBar({ compare: null, swap: null });
  audio.playCompleteSound();
  return { swaps, comparisons };
};

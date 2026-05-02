import { delayStep } from '@/algorithms/sleep';
import type { SortingAlgorithm } from '@/algorithms/types';

export const selectionSort: SortingAlgorithm = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  audio
) => {
  let swaps = 0;
  let comparisons = 0;
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (shouldStopRef.current) {
        return { swaps, comparisons };
      }

      comparisons++;
      setCurrentBar({ compare: minIndex, swap: j });
      audio.playCompareSound(arr[j]);
      await delayStep(delay);

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      swaps++;
      audio.playSwapSound(arr[i]);
      visualizeArray([...arr]);
      await delayStep(delay);
    }
  }

  setCurrentBar({ compare: null, swap: null });
  audio.playCompleteSound();
  return { swaps, comparisons };
};

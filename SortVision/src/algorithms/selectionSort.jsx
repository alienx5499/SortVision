/**
 * Selection Sort Algorithm
 *
 * Time Complexity:
 * - Best Case: O(n²)
 * - Average Case: O(n²)
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1) - in-place sorting
 *
 * Description:
 * Selection Sort is an in-place comparison sorting algorithm that divides the input
 * list into two parts: a sorted sublist and an unsorted sublist. The algorithm
 * repeatedly finds the minimum element from the unsorted part and puts it at the
 * beginning of the sorted part.
 *
 */
export const selectionSort = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  audio
) => {
  let swaps = 0;
  let comparisons = 0;
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < length; j++) {
      comparisons++;
      setCurrentBar({ compare: j, swap: minIdx });
      visualizeArray(array);
      audio.playCompareSound(array[j]);
      await new Promise(resolve => setTimeout(resolve, delay));

      if (shouldStopRef.current) return { swaps, comparisons }; // Stop if shouldStopRef is true

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]]; // Swap
      swaps++;
      setCurrentBar({ compare: null, swap: i });
      visualizeArray(array);
      audio.playSwapSound(array[i]);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  audio.playCompleteSound();
  return { swaps, comparisons };
};

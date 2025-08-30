/**
 * Insertion Sort Algorithm
 *
 * Time Complexity:
 * - Best Case: O(n) - when array is already sorted
 * - Average Case: O(n²)
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1) - in-place sorting
 *
 * Description:
 * Insertion Sort is a simple sorting algorithm that builds the final sorted array
 * one item at a time. It is much less efficient on large lists than more advanced
 * algorithms such as quicksort, heapsort, or merge sort. However, it performs well
 * for small lists and is often used as part of more sophisticated algorithms.
 *
 */
export const insertionSort = async (
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
  for (let i = 1; i < length; i++) {
    let current = array[i];
    let j = i - 1;

    setCurrentBar({ compare: i, swap: null });
    visualizeArray(array);
    audio.playAccessSound(array[i]); // Play sound for accessing current element
    await new Promise(resolve => setTimeout(resolve, delay));

    while (j >= 0 && array[j] > current) {
      comparisons++;
      setCurrentBar({ compare: j, swap: null });
      visualizeArray(array);
      audio.playCompareSound(array[j]); // Play comparison sound
      await new Promise(resolve => setTimeout(resolve, delay));

      array[j + 1] = array[j];
      j--;
    }
    swaps++;
    array[j + 1] = current;
    setCurrentBar({ compare: null, swap: j + 1 });
    visualizeArray(array);
    audio.playSwapSound(array[j + 1]); // Play swap sound
    await new Promise(resolve => setTimeout(resolve, delay));

    if (shouldStopRef.current) return { swaps, comparisons }; // Stop if shouldStopRef is true
  }
  audio.playCompleteSound(); // Play completion sound
  return { swaps, comparisons };
};

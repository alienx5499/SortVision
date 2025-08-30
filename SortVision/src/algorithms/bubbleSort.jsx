/**
 * Bubble Sort Algorithm
 *
 * Time Complexity:
 * - Best Case: O(n) - when array is already sorted
 * - Average Case: O(n²)
 * - Worst Case: O(n²)
 *
 * Space Complexity: O(1) - in-place sorting
 *
 * Description:
 * Bubble Sort is a simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order.
 * The pass through the list is repeated until the list is sorted.
 *
 */
export const bubbleSort = async (
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
    for (let j = 0; j < length - i - 1; j++) {
      comparisons++;
      setCurrentBar({ compare: j, swap: null }); // Highlight the bars being compared
      visualizeArray(array);
      audio.playCompareSound(array[j]); // Play compare sound with pitch based on value
      await new Promise(resolve => setTimeout(resolve, delay));

      if (shouldStopRef.current) return { swaps, comparisons }; // Stop if shouldStopRef is true

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
        swaps++;
        setCurrentBar({ compare: null, swap: j }); // Highlight the bar being swapped
        visualizeArray(array);
        audio.playSwapSound(array[j]); // Play swap sound with pitch based on value
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  audio.playCompleteSound(); // Play completion sound
  return { swaps, comparisons };
};

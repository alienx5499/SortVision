/**
 * Radix Sort Algorithm
 *
 * Time Complexity:
 * - Best Case: O(d * (n + k)) - where d is the number of digits, n is the number of elements, and k is the range of input
 * - Average Case: O(d * (n + k))
 * - Worst Case: O(d * (n + k))
 *
 * Space Complexity: O(n + k) - where k is the range of input
 *
 * Description:
 * Radix Sort is a non-comparative sorting algorithm that sorts numbers by processing
 * individual digits. It works by sorting the numbers digit by digit, starting from
 * the least significant digit to the most significant digit. This implementation
 * uses counting sort as a subroutine to sort the digits.
 *
 */
// Radix Sort
export const radixSort = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  audio
) => {
  let max = Math.max(...array);
  let exp = 1;
  let swaps = 0;
  let comparisons = 0;

  while (Math.floor(max / exp) > 0) {
    const { swaps: radixSwaps, comparisons: radixComparisons } =
      await countingSort(
        array,
        exp,
        visualizeArray,
        delay,
        setCurrentBar,
        shouldStopRef,
        audio
      );
    swaps += radixSwaps;
    comparisons += radixComparisons;
    exp *= 10;

    if (shouldStopRef.current) break; // Stop if shouldStopRef is true
  }

  audio.playCompleteSound(); // Play completion sound
  return { swaps, comparisons };

  async function countingSort(
    arr,
    exp,
    visualizeArray,
    delay,
    setCurrentBar,
    shouldStopRef,
    audio
  ) {
    let output = new Array(arr.length);
    let count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      setCurrentBar({ compare: i, swap: null });
      audio.playCompareSound(arr[i]); // Play compare sound
      count[Math.floor(arr[i] / exp) % 10]++;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
      visualizeArray(output); // Update the visualization
      setCurrentBar({ compare: i, swap: null });
      audio.playAccessSound(arr[i]); // Play access sound
      await new Promise(resolve => setTimeout(resolve, delay)); // Control speed

      if (shouldStopRef.current) return { swaps: arr.length, comparisons }; // Stop if shouldStopRef is true
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      audio.playSwapSound(arr[i]); // Play swap sound
    }

    return { swaps: arr.length, comparisons };
  }
};

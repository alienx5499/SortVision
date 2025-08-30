/**
 * Merge Sort Algorithm
 *
 * Time Complexity:
 * - Best Case: O(n log n)
 * - Average Case: O(n log n)
 * - Worst Case: O(n log n)
 *
 * Space Complexity: O(n) - requires additional space for merging
 *
 * Description:
 * Merge Sort is a divide-and-conquer algorithm that divides the input array into
 * two halves, recursively sorts each half, and then merges the sorted halves.
 * It is a stable sorting algorithm that performs well on large datasets and
 * is often used as a standard sorting algorithm in many programming languages.
 *
 */
export const mergeSort = async (
  array,
  visualizeArray,
  delay,
  setCurrentBar,
  shouldStopRef,
  audio
) => {
  const merge = async (left, right) => {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      audio.playCompareSound(left[i]); // Play compare sound with pitch based on value
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
      visualizeArray([...result, ...left.slice(i), ...right.slice(j)]); // Update the visualization
      setCurrentBar({ compare: i, swap: null }); // Update active compare bars
      audio.playMergeSound(result[result.length - 1]); // Play merge sound with pitch based on value
      await new Promise(resolve => setTimeout(resolve, delay));

      if (shouldStopRef.current) return result; // Stop if shouldStopRef is true
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
  };

  const mergeSortHelper = async arr => {
    if (arr.length <= 1) return arr;
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return await merge(
      await mergeSortHelper(left),
      await mergeSortHelper(right)
    );
  };

  await mergeSortHelper(array);
  audio.playCompleteSound(); // Play completion sound
  return { swaps: 0, comparisons: 0 }; // Merge sort is hard to track comparisons/swaps easily
};

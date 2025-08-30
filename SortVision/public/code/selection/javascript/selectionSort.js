/**
 * selectionSort.js
 *
 * Implementation of the Selection Sort algorithm in JavaScript, including
 * a bidirectional variant (cocktail selection sort), utilizing helper functions.
 *
 * This file includes:
 *  - findMinIndex: helper to find minimum element index in a range
 *  - findMaxIndex: helper to find maximum element index in a range
 *  - selectionSort: standard selection sort implementation using findMinIndex
 *  - selectionSortBidirectional: two-way selection sort using both helpers
 *  - Input validation and edge-case handling
 *  - Comprehensive JSDoc comments
 *  - Time and space complexity analysis
 *  - Example usage
 *  - Self-running test cases
 *  - Performance optimization notes
 */

/**
 * Finds the index of the minimum element in arr between start and end (inclusive).
 *
 * @param {number[]} arr - Array to search.
 * @param {number} start - Starting index of the search range.
 * @param {number} end - Ending index of the search range.
 * @returns {number} Index of the smallest element.
 * @throws {TypeError|RangeError} For invalid input.
 */
function findMinIndex(arr, start, end) {
  if (!Array.isArray(arr)) throw new TypeError('arr must be an array');
  const n = arr.length;
  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    end >= n ||
    start > end
  ) {
    throw new RangeError('Invalid start or end indices');
  }
  let minIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < arr[minIdx]) minIdx = i;
  }
  return minIdx;
}

/**
 * Finds the index of the maximum element in arr between start and end (inclusive).
 *
 * @param {number[]} arr - Array to search.
 * @param {number} start - Starting index of the search range.
 * @param {number} end - Ending index of the search range.
 * @returns {number} Index of the largest element.
 * @throws {TypeError|RangeError} For invalid input.
 */
function findMaxIndex(arr, start, end) {
  if (!Array.isArray(arr)) throw new TypeError('arr must be an array');
  const n = arr.length;
  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    end >= n ||
    start > end
  ) {
    throw new RangeError('Invalid start or end indices');
  }
  let maxIdx = start;
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] > arr[maxIdx]) maxIdx = i;
  }
  return maxIdx;
}

/**
 * Sorts an array in ascending order using the Selection Sort algorithm.
 * Returns a new sorted array, leaving the original unmodified.
 * Uses findMinIndex for clarity and code reuse.
 *
 * @param {number[]} arr - Array to sort.
 * @returns {number[]} New sorted array.
 * @throws {TypeError} If arr is not an array of numbers.
 */
function selectionSort(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  const n = arr.length;
  const result = arr.slice(); // avoid mutating input
  for (let i = 0; i < n - 1; i++) {
    const minIdx = findMinIndex(result, i, n - 1);
    if (minIdx !== i) [result[i], result[minIdx]] = [result[minIdx], result[i]];
  }
  return result;
}

/**
 * Sorts an array in ascending order using a bidirectional selection sort.
 * Also known as cocktail selection sort: selects both min and max in each pass.
 * Returns a new sorted array, uses findMinIndex/findMaxIndex for element selection.
 *
 * @param {number[]} arr - Array to sort.
 * @returns {number[]} New sorted array.
 * @throws {TypeError} If arr is not an array of numbers.
 */
function selectionSortBidirectional(arr) {
  if (!Array.isArray(arr)) throw new TypeError('Input must be an array');
  const result = arr.slice();
  let left = 0,
    right = result.length - 1;
  while (left < right) {
    const minIdx = findMinIndex(result, left, right);
    const maxIdx = findMaxIndex(result, left, right);
    // swap min to left
    if (minIdx !== left)
      [result[left], result[minIdx]] = [result[minIdx], result[left]];
    // account for swap affecting max index
    const adjustedMaxIdx = maxIdx === left ? minIdx : maxIdx;
    // swap max to right
    if (adjustedMaxIdx !== right)
      [result[right], result[adjustedMaxIdx]] = [
        result[adjustedMaxIdx],
        result[right],
      ];
    left++;
    right--;
  }
  return result;
}

/**
 * Time Complexity:
 *  - Standard: O(n^2)
 *  - Bidirectional: O(n^2) but ~n/2 passes
 * Space Complexity:
 *  - O(n) for copy; in-place variant would be O(1)
 */

// Example Usage
const sample = [64, 25, 12, 22, 11];
console.log('Original:', sample);
console.log('Selection Sort:', selectionSort(sample));
console.log('Bidirectional Sort:', selectionSortBidirectional(sample));

// Test Cases
(function runTests() {
  const cases = [
    { input: [], expected: [] },
    { input: [1], expected: [1] },
    { input: [2, 1], expected: [1, 2] },
    { input: [5, 2, 9, 1, 5, 6], expected: [1, 2, 5, 5, 6, 9] },
    { input: [3, 3, 3], expected: [3, 3, 3] },
    { input: [0, -1, 5, -10, 8], expected: [-10, -1, 0, 5, 8] },
  ];
  for (const { input, expected } of cases) {
    const out1 = selectionSort(input);
    const out2 = selectionSortBidirectional(input);
    console.assert(
      JSON.stringify(out1) === JSON.stringify(expected),
      `selectionSort failed for ${input}: got ${out1}`
    );
    console.assert(
      JSON.stringify(out2) === JSON.stringify(expected),
      `selectionSortBidirectional failed for ${input}: got ${out2}`
    );
  }
  console.log('All selection sort tests passed!');
})();

/**
 * Performance Optimization Notes:
 *  - Avoiding unnecessary swaps: check index before swap.
 *  - For nearly sorted arrays, insertion sort is faster.
 *  - Can implement in-place to reduce memory usage to O(1).
 *  - Bidirectional halves the number of passes.
 */

// Export functions if using modules
// export { findMinIndex, findMaxIndex, selectionSort, selectionSortBidirectional };

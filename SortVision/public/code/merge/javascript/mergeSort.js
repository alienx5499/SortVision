/**
 * @file SortVision/public/code/merge/javascript/mergeSort.js
 * @description Implementation of the Merge Sort algorithm in JavaScript.
 *
 * @task_title Implement Merge Sort Algorithm in JavaScript
 * @category Algorithm Implementation
 * @language JavaScript
 * @difficulty Intermediate
 */

// -----------------------------------------------------------------------------
// 📜 Algorithm Description
// -----------------------------------------------------------------------------

/**
 * Merge Sort is a highly efficient, stable, comparison-based sorting algorithm.
 * It's based on the "Divide and Conquer" paradigm.
 *
 * 1.  **Divide**: The unsorted array is divided into n subarrays, each containing one element.
 * 2.  **Conquer**: Subarrays are repeatedly merged to produce new sorted subarrays until
 *     there is only one sorted array remaining.
 */

// -----------------------------------------------------------------------------
// 💡 Implementation Details
// -----------------------------------------------------------------------------

/**
 * Merges two sorted portions of an array.
 * This is the core "conquer" step of the algorithm.
 *
 * @param {number[]} arr - The array containing the portions to merge.
 * @param {number} left - The starting index of the first portion.
 * @param {number} mid - The ending index of the first portion.
 * @param {number} right - The ending index of the second portion.
 */
function merge(arr, left, mid, right) {
  // Calculate the sizes of the two subarrays to be merged.
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Create temporary arrays to hold the data of the two halves.
  let leftArray = new Array(n1);
  let rightArray = new Array(n2);

  // Copy data from the main array into the temporary left and right arrays.
  for (let i = 0; i < n1; i++) {
    leftArray[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    rightArray[j] = arr[mid + 1 + j];
  }

  // Initialize pointers for the two temporary arrays and the main merged array.
  let i = 0; // Initial index for leftArray
  let j = 0; // Initial index for rightArray
  let k = left; // Initial index for the merged subarray in arr

  // Merge the temporary arrays back into the original array (arr).
  // Compare elements from leftArray and rightArray and place the smaller one into arr.
  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }
    k++;
  }

  // Copy any remaining elements from leftArray, if any.
  // This happens if rightArray was exhausted first.
  while (i < n1) {
    arr[k] = leftArray[i];
    i++;
    k++;
  }

  // Copy any remaining elements from rightArray, if any.
  // This happens if leftArray was exhausted first.
  while (j < n2) {
    arr[k] = rightArray[j];
    j++;
    k++;
  }
}

/**
 * The recursive core of the merge sort algorithm.
 * It divides the array into halves until the base case is reached.
 *
 * @param {number[]} arr - The array to sort.
 * @param {number} left - The starting index of the portion to sort.
 * @param {number} right - The ending index of the portion to sort.
 */
function mergeSortRecursive(arr, left, right) {
  // Base case: If the subarray has one or zero elements, it's already sorted.
  if (left >= right) {
    return;
  }

  // Find the middle point to divide the array into two halves.
  // Using Math.floor to avoid issues with floating-point numbers.
  const mid = left + Math.floor((right - left) / 2);

  // Recursively call mergeSort for the left half.
  mergeSortRecursive(arr, left, mid);

  // Recursively call mergeSort for the right half.
  mergeSortRecursive(arr, mid + 1, right);

  // Merge the two sorted halves.
  merge(arr, left, mid, right);
}

/**
 * Performs merge sort on an array. This is the main function that users will call.
 * It handles input validation and initiates the recursive sorting process.
 *
 * @param {number[]} arr - The array to sort.
 * @returns {number[]} The sorted array.
 */
function mergeSort(arr) {
  // Input validation: Check if the input is a valid array.
  if (!Array.isArray(arr)) {
    console.error('Error: Input is not an array.');
    return [];
  }

  // Handle edge cases: Empty or single-element arrays are already sorted.
  if (arr.length <= 1) {
    return arr;
  }

  // Create a copy to avoid modifying the original array (best practice).
  const arrayToSort = [...arr];

  // Start the recursive sorting process.
  mergeSortRecursive(arrayToSort, 0, arrayToSort.length - 1);

  return arrayToSort;
}

// -----------------------------------------------------------------------------
// 📊 Complexity Analysis
// -----------------------------------------------------------------------------

/**
 * **Time Complexity: O(n log n)**
 * - **Best Case:** O(n log n)
 * - **Average Case:** O(n log n)
 * - **Worst Case:** O(n log n)
 *
 * The algorithm always divides the array into two halves, which results in `log n`
 * levels of recursion. At each level, the `merge` function performs `n` comparisons
 * and assignments to merge the subarrays. Therefore, the total time complexity is
 * consistently O(n * log n).
 *
 * **Space Complexity: O(n)**
 * The space complexity is determined by the temporary arrays created in the `merge`
 * function. In the worst case, the temporary `leftArray` and `rightArray` will

 * have a combined size of `n` (the size of the original array). This is because
 * the merging happens at each level of the recursion, but the memory for the temp
 * arrays is released after each merge, so the maximum space used at any one time
 * is proportional to `n`.
 */

// -----------------------------------------------------------------------------
// ⚡ Performance Optimization Notes
// -----------------------------------------------------------------------------

/**
 * 1.  **Small Subarray Optimization**: For very small subarrays (e.g., length < 16),
 *     switching to a simpler algorithm like Insertion Sort can be faster due to
 *     lower overhead. The constant factors in Insertion Sort are smaller than Merge Sort.
 *
 * 2.  **Pre-check for Sorted Data**: Before merging, one could add a check:
 *     `if (arr[mid] <= arr[mid + 1])`. If this condition is true, the two halves
 *     are already in sorted order relative to each other, and the `merge` call
 *     can be skipped. This optimization makes the best-case time complexity O(n)
 *     for an already-sorted array.
 *
 * 3.  **Memory Management**: This implementation uses O(n) auxiliary space. An "in-place"
 *     merge sort is possible but is significantly more complex to implement and often
 *     loses the time efficiency that makes Merge Sort attractive. For most practical
 *     applications, the O(n) space trade-off is acceptable.
 */

// -----------------------------------------------------------------------------
// 🚀 Example Usage
// -----------------------------------------------------------------------------

const exampleArray = [38, 27, 43, 3, 9, 82, 10];
console.log('Original Array:', exampleArray);

const sortedArray = mergeSort(exampleArray);
console.log('Sorted Array:', sortedArray);
console.log('----------------------------------------');

// -----------------------------------------------------------------------------
// ✅ Test Cases
// -----------------------------------------------------------------------------

function runTestCases() {
  const testCases = [
    {
      desc: 'Empty array',
      input: [],
      expected: [],
    },
    {
      desc: 'Single element array',
      input: [42],
      expected: [42],
    },
    {
      desc: 'Already sorted array',
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 5],
    },
    {
      desc: 'Reverse sorted array',
      input: [5, 4, 3, 2, 1],
      expected: [1, 2, 3, 4, 5],
    },
    {
      desc: 'Array with duplicate elements',
      input: [5, 2, 8, 2, 5, 9, 8],
      expected: [2, 2, 5, 5, 8, 8, 9],
    },
    {
      desc: 'Array with negative numbers',
      input: [-10, 5, -20, 0, 15],
      expected: [-20, -10, 0, 5, 15],
    },
    {
      desc: 'Typical unsorted array',
      input: [38, 27, 43, 3, 9, 82, 10],
      expected: [3, 9, 10, 27, 38, 43, 82],
    },
  ];

  let allTestsPassed = true;

  testCases.forEach((test, index) => {
    const result = mergeSort(test.input);
    const passed = JSON.stringify(result) === JSON.stringify(test.expected);

    console.log(`Test Case ${index + 1}: ${test.desc}`);
    console.log(`Input: [${test.input}]`);
    console.log(`Output: [${result}]`);
    console.log(`Expected: [${test.expected}]`);
    console.log(`Status: ${passed ? '✅ Passed' : '❌ Failed'}`);
    console.log('----------------------------------------');

    if (!passed) {
      allTestsPassed = false;
    }
  });

  if (allTestsPassed) {
    console.log('🎉 All test cases passed!');
  } else {
    console.log('🔥 Some test cases failed.');
  }
}

// Uncomment the line below to run the test suite
// runTestCases();

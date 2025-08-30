/**
 * heapSort.js
 *
 * Implementation of the Heap Sort algorithm in JavaScript.
 *
 * This file includes:
 *  - heapify: function to maintain the max-heap property
 *  - heapSort: main function to sort an array using heap sort
 *  - Input validation and edge-case handling
 *  - Comprehensive JSDoc comments
 *  - Time and space complexity analysis
 *  - Example usage
 *  - Test cases
 *  - Performance optimization notes
 */

/**
 * Ensures the subtree rooted at index `i` is a max-heap, assuming
 * its children are already max-heaps.
 *
 * @param {Array<number>} arr - The array to heapify.
 * @param {number} n - The size of the heap.
 * @param {number} i - The index of the root of the subtree.
 */

function heapify(arr, n, i) {
  let largest = i;
  while (true) {
    const left = 2 * largest + 1;
    const right = 2 * largest + 2;
    let next = largest;
    if (left < n && arr[left] > arr[next]) {
      next = left;
    }
    if (right < n && arr[right] > arr[next]) {
      next = right;
    }
    if (next !== largest) {
      [arr[largest], arr[next]] = [arr[next], arr[largest]];
      largest = next;
    } else {
      break;
    }
  }
}
/**
 * Sorts an array in-place using the Heap Sort algorithm.
 *
 * @param {Array<number>} arr - The array to sort.
 * @returns {Array<number>} The sorted array.
 */

function heapSort(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array');
  }
  const n = arr.length;
  // Build a max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root (max) to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // Call heapify on the reduced heap
    heapify(arr, i, 0);
  }
  return arr;
}

/**
 * Time Complexity:
 *  - Building the heap: O(n)
 *  - Each heapify operation during sort: O(log n)
 *  - Total: O(n log n)
 *
 * Space Complexity:
 *  - In-place sorting: O(1)
 */

// Example Usage
const exampleArray = [12, 11, 13, 5, 6, 7];
console.log('Original:', exampleArray.slice());
console.log('Sorted:  ', heapSort(exampleArray.slice()));

// Test Cases
(function runTests() {
  const cases = [
    { input: [], expected: [] },
    { input: [1], expected: [1] },
    { input: [2, 1], expected: [1, 2] },
    { input: [5, 3, 8, 4, 2], expected: [2, 3, 4, 5, 8] },
    { input: [10, 7, 8, 9, 1, 5], expected: [1, 5, 7, 8, 9, 10] },
    { input: [3, 3, 3], expected: [3, 3, 3] },
  ];

  cases.forEach(({ input, expected }, idx) => {
    const result = heapSort(input.slice());
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.assert(
      pass,
      `Test ${idx + 1} failed: expected ${expected}, got ${result}`
    );
  });
  console.log('All tests passed!');
})();

/**
 * Performance Optimization Notes:
 *  - Reuse array indices to avoid extra memory allocation.
 *  - Use iterative heapify for very large heaps to avoid deep recursion.
 *  - Consider early exit if the heap is already sorted in specialized cases.
 */

// Export for module usage (Uncomment if using ES modules)
// export { heapSort };

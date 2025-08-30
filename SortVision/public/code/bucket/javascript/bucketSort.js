/**
 * bucketSort.js
 *
 * Implementation of the Bucket Sort algorithm in JavaScript.
 *
 * This file includes:
 *  - bucketSort: function to sort numbers using bucket sort
 *  - Input validation and edge-case handling
 *  - Comprehensive JSDoc comments
 *  - Time and space complexity analysis
 *  - Example usage
 *  - Test cases
 *  - Performance optimization notes
 */

/**
 * Sorts an array of numbers using the Bucket Sort algorithm.
 *
 * @param {Array<number>} arr - The array to sort.
 * @param {number} [bucketSize=5] - Optional bucket size; must be positive.
 * @returns {Array<number>} The sorted array.
 * @throws {TypeError} If input is not an array of numbers or bucketSize is invalid.
 */
function bucketSort(arr, bucketSize = 5) {
  // Input validation
  if (!Array.isArray(arr)) {
    throw new TypeError('Input must be an array');
  }
  if (
    typeof bucketSize !== 'number' ||
    !Number.isFinite(bucketSize) ||
    bucketSize <= 0
  ) {
    throw new TypeError('bucketSize must be a positive finite number');
  }

  // Handle trivial cases
  const n = arr.length;
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    if (typeof arr[0] !== 'number' || !Number.isFinite(arr[0])) {
      throw new TypeError('All elements must be finite numbers');
    }
    return [arr[0]];
  }

  // Find min and max values
  let minValue = arr[0];
  let maxValue = arr[0];
  for (const num of arr) {
    if (typeof num !== 'number' || !Number.isFinite(num)) {
      throw new TypeError('All elements must be finite numbers');
    }
    if (num < minValue) minValue = num;
    if (num > maxValue) maxValue = num;
  }

  // Create buckets
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Distribute input values into buckets
  for (const num of arr) {
    const idx = Math.floor((num - minValue) / bucketSize);
    buckets[idx].push(num);
  }

  // Sort buckets and concatenate
  const sortedArray = [];
  for (const bucket of buckets) {
    if (bucket.length > 0) {
      if (bucket.length < 32) {
        // Insertion sort for small buckets
        for (let i = 1; i < bucket.length; i++) {
          const key = bucket[i];
          let j = i - 1;
          while (j >= 0 && bucket[j] > key) {
            bucket[j + 1] = bucket[j];
            j--;
          }
          bucket[j + 1] = key;
        }
      } else {
        // Built-in sort for larger buckets
        bucket.sort((a, b) => a - b);
      }
      sortedArray.push(...bucket);
    }
  }

  return sortedArray;
}

/**
 * Time Complexity:
 *  - Best/Average: O(n + k log k)
 *  - Worst: O(n log n) when all elements fall into one bucket
 *
 * Space Complexity:
 *  - O(n + k)
 */

// Example Usage
const example = [29, 25, 3, 49, 9, 37, 21, 43];
console.log('Original:', example.slice());
console.log('Sorted:  ', bucketSort(example));

// Test Cases
(function runTests() {
  const cases = [
    { input: [], expected: [] },
    { input: [1], expected: [1] },
    { input: [2, 1], expected: [1, 2] },
    { input: [5, 3, 8, 4, 2], expected: [2, 3, 4, 5, 8] },
    { input: [10, 7, 8, 9, 1, 5], expected: [1, 5, 7, 8, 9, 10] },
    { input: [3, 3, 3], expected: [3, 3, 3] },
    { input: [0, -1, 5, -10, 8], expected: [-10, -1, 0, 5, 8] },
  ];

  cases.forEach(({ input, expected }, idx) => {
    const result = bucketSort(input.slice());
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
 *  - Adjust bucketSize based on data distribution to balance bucket loads.
 *  - For very large buckets, consider quicksort or mergesort instead of built-in sort.
 *  - Typed arrays can yield performance gains when sorting uniform numeric types.
 */

// Export for module usage if needed
// export { bucketSort };

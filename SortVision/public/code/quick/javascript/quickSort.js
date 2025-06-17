// File: SortVision/public/code/quick/javascript/quickSort.js

/**
 * @enum {'first' | 'last' | 'random' | 'median'} PivotStrategy
 */

/**
 * Swap two elements in an array.
 * @param {number[]} arr
 * @param {number} i
 * @param {number} j
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Choose pivot index according to strategy.
 * @param {number[]} arr
 * @param {number} low
 * @param {number} high
 * @param {PivotStrategy} strategy
 * @returns {number}
 */
function choosePivot(arr, low, high, strategy) {
  switch (strategy) {
    case 'first':
      return low;
    case 'last':
      return high;
    case 'random':
      return low + Math.floor(Math.random() * (high - low + 1));
    case 'median': {
      const mid = Math.floor((low + high) / 2);
      const trio = [
        { i: low, v: arr[low] },
        { i: mid, v: arr[mid] },
        { i: high, v: arr[high] }
      ].sort((a, b) => a.v - b.v);
      return trio[1].i;
    }
    default:
      return high;
  }
}

/**
 * Partition using Lomuto scheme.
 * @param {number[]} arr
 * @param {number} low
 * @param {number} high
 * @param {PivotStrategy} strategy
 * @returns {number} pivot index
 */
function partition(arr, low, high, strategy) {
  const pivotIndex = choosePivot(arr, low, high, strategy);
  const pivotValue = arr[pivotIndex];
  swap(arr, pivotIndex, high);

  let storeIndex = low;
  for (let i = low; i < high; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, storeIndex);
      storeIndex++;
    }
  }

  swap(arr, storeIndex, high);
  return storeIndex;
}

/**
 * Quick Sort main function (in-place).
 *
 * Time Complexity:
 * - Best/Average: O(n log n)
 * - Worst: O(n²) when input is already (reversely) sorted and pivot is bad
 *
 * Space Complexity:
 * - O(log n) average due to recursion; worst O(n) in skewed tree
 *
 * @param {number[]} arr - array to sort
 * @param {number} [low=0]
 * @param {number} [high=arr?.length - 1]
 * @param {PivotStrategy} [strategy='last']
 * @returns {number[]} sorted input array (in-place)
 */
export function quickSort(arr, low = 0, high = arr.length - 1, strategy = 'last') {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected array');
  }
  if (low < high) {
    const p = partition(arr, low, high, strategy);
    quickSort(arr, low, p - 1, strategy);
    quickSort(arr, p + 1, high, strategy);
  }
  return arr;
}

// Example usage
console.log(quickSort([3, 6, 1, 2, 5, 4], 0, 5, 'median')); // e.g. [1,2,3,4,5,6]
console.log(quickSort([3, 6, 1, 2, 5, 4], 0, 5, 'random')); // random-strategy sorted output

// ---------------------------
// 🧪 Simple tests
const tests = [
  { input: [], expected: [] },
  { input: [1], expected: [1] },
  { input: [2, 1], expected: [1, 2] },
  { input: [3, 3, 1, 2], expected: [1, 2, 3, 3] },
  { input: [5, -1, 4, 0, 3], expected: [-1, 0, 3, 4, 5] },
];
tests.forEach(({ input, expected }, i) => {
  const result = quickSort([...input], 0, input.length - 1, 'median');
  console.log(`Test ${i}:`, JSON.stringify(result) === JSON.stringify(expected) ? '✅' : `❌ got ${result}`);
});

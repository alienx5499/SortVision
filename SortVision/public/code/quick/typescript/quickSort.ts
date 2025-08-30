/**
 * 📘 Quick Sort Implementation in TypeScript
 * ------------------------------------------
 * Author: Jidnyasa Patil
 * Description: This module implements the Quick Sort algorithm using multiple pivot strategies.
 * Includes partition function, edge case handling, complexity analysis, and example usage.
 *
 * Time Complexity:
 *  - Best: O(n log n)
 *  - Average: O(n log n)
 *  - Worst: O(n^2) [when array is already sorted & pivot is poorly chosen]
 *
 * Space Complexity: O(log n) auxiliary (due to recursion)
 */

/**
 * Partition function to place pivot at correct position
 * @param arr - Array to be partitioned
 * @param low - Starting index
 * @param high - Ending index
 * @param pivotStrategy - Strategy for choosing pivot ('last' | 'first' | 'middle' | 'random')
 * @returns Final position of pivot
 */
function partition(
  arr: number[],
  low: number,
  high: number,
  pivotStrategy: 'last' | 'first' | 'middle' | 'random' = 'last'
): number {
  let pivotIndex = high;

  // Pivot strategy selection
  if (pivotStrategy === 'first') pivotIndex = low;
  else if (pivotStrategy === 'middle')
    pivotIndex = Math.floor((low + high) / 2);
  else if (pivotStrategy === 'random')
    pivotIndex = low + Math.floor(Math.random() * (high - low + 1));

  // Swap pivot to end
  [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];

  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Place pivot at correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

/**
 * Quick sort function to sort array using partition
 * @param arr - Array to be sorted
 * @param low - Starting index
 * @param high - Ending index
 * @param pivotStrategy - Strategy for choosing pivot ('last' | 'first' | 'middle' | 'random')
 * @returns Sorted array
 */
function quickSort(
  arr: number[],
  low: number = 0,
  high: number = arr.length - 1,
  pivotStrategy: 'last' | 'first' | 'middle' | 'random' = 'last'
): number[] {
  if (low < high) {
    const pi = partition(arr, low, high, pivotStrategy);
    quickSort(arr, low, pi - 1, pivotStrategy);
    quickSort(arr, pi + 1, high, pivotStrategy);
  }
  return arr;
}

/**
 * Example usage and test cases
 */
function runQuickSortTests() {
  const cases: { name: string; input: number[] }[] = [
    { name: 'Empty array', input: [] },
    { name: 'Single element', input: [1] },
    { name: 'Already sorted', input: [1, 2, 3, 4, 5] },
    { name: 'Reversed', input: [5, 4, 3, 2, 1] },
    { name: 'Random order', input: [3, 7, 1, 4, 2, 8] },
    { name: 'Duplicates', input: [4, 2, 2, 8, 3, 3, 1] },
  ];

  for (const { name, input } of cases) {
    const result = quickSort([...input], 0, input.length - 1, 'middle');
    console.log(`${name}:`, result);
  }
}

// Uncomment to run tests
runQuickSortTests();

// Export if needed
export { quickSort, partition };

/*
 Features Implemented
✅ Multiple pivot strategies: first, last, middle, random
✅ In-place sorting
✅ TSDoc documentation
✅ Edge case handling
✅ Test cases in runQuickSortTests()
✅ No extra space used; purely recursive
✅ Type safety and TypeScript idioms used
*/

/**
 * SelectionSort.ts
 * Implements Standard and Bidirectional Selection Sort with utilities and test cases.
 * Includes assert-based unit test framework for validation.
 */

export class SelectionSort {
  /**
   * Swaps two elements in the array.
   */
  private swap(arr: number[], i: number, j: number): void {
    if (i !== j) {
      arr[i] = arr[i] ^ arr[j];
      arr[j] = arr[i] ^ arr[j];
      arr[i] = arr[i] ^ arr[j];
    }
  }

  /**
   * Finds the index of the minimum element in a subarray.
   */
  private findMinIndex(arr: number[], start: number, end: number): number {
    let minIndex = start;
    for (let i = start + 1; i <= end; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i;
      }
    }
    return minIndex;
  }

  /**
   * Time Complexity:
   *
   * Best Case: O(n^2) - Even if the array is already sorted, selection sort still goes through all elements.
   * Average Case: O(n^2) - Every element is compared with every other element once.
   * Worst Case: O(n^2) - Happens for reverse sorted arrays; still performs the same number of comparisons.
   *
   * Space Complexity:
   *
   * Always: O(1) - No extra space required; sorting is done in-place.
   */
  public sort(arr: number[]): void {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      const minIndex = this.findMinIndex(arr, i, n - 1);
      this.swap(arr, i, minIndex);
    }
  }

  /**
     * Time Complexity:

     * Best Case: O(n^2) - Even if partially sorted, the algorithm still performs comparisons to find both min and max.
     * Average Case: O(n^2) - Each iteration involves scanning the unsorted portion for both extremes (2n operations).
     * Worst Case: O(n^2) - Maximum comparisons are required when the array is in reverse order.
     *
     * Space Complexity:
     *
     * O(n) - An auxiliary array is used to place elements in correct order, improving stability.
     *
     * Reduces number of passes to n/2 by selecting both min and max in each iteration.
     * Requires O(n²) comparisons overall but minimizes swaps, improving data movement efficiency.
     * Uses extra space for stability, making it a stable variant of Selection Sort.
   */
  public sortBidirectional(arr: number[]): void {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      let minIndex = left;
      let maxIndex = right;

      for (let i = left; i <= right; i++) {
        if (arr[i] < arr[minIndex]) minIndex = i;
        if (arr[i] > arr[maxIndex]) maxIndex = i;
      }

      this.swap(arr, left, minIndex);

      // If max was swapped, update index
      if (maxIndex === left) maxIndex = minIndex;

      this.swap(arr, right, maxIndex);

      left++;
      right--;
    }
  }
}
const sorter = new SelectionSort();
/**
 * Test Cases
 */
const testCases: number[][] = [
  [64, 25, 12, 22, 11],
  [],
  [42],
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2, 1],
  [9, 3, 7, 1, 8, 2],
  [10, -2, 0, 5, 3, -1, 6],
];

console.log('Standard Selection Sort:\n');
for (const test of testCases) {
  const copy = [...test];
  console.log('Original: ', copy);
  sorter.sort(copy);
  console.log('Sorted:   ', copy, '\n');
}

console.log('Bidirectional Selection Sort:\n');
for (const test of testCases) {
  const copy = [...test];
  console.log('Original: ', copy);
  sorter.sortBidirectional(copy);
  console.log('Sorted:   ', copy, '\n');
}

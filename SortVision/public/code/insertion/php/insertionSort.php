<?php

/**
 * Sorts an array using the Insertion Sort algorithm
 *
 * @param array &$arr The input array to be sorted (passed by reference)
 *
 * Time Complexity:
 *   - Best Case: O(n)   [when array is already sorted]
 *   - Average Case: O(n²)
 *   - Worst Case: O(n²) [when array is reverse sorted]
 *
 * Space Complexity: O(1) [in-place sorting]
 */
function insertionSort(array &$arr): void
{
    $n = count($arr);

    // Handle edge cases: empty array or single element
    if ($n <= 1) {
        return;
    }

    // Start from the second element (index 1)
    for ($i = 1; $i < $n; $i++) {
        $key = $arr[$i];  // Current element to be positioned
        $j = $i - 1;      // Start comparing with left neighbor

        // Shift elements greater than $key to the right
        while ($j >= 0 && $arr[$j] > $key) {
            $arr[$j + 1] = $arr[$j];  // Shift element to the right
            $j--;
        }

        // Insert $key at its correct position
        $arr[$j + 1] = $key;
    }
}

// Example Usage
echo "Example Usage:\n";
$data = [9, 5, 7, 3, 1, 8];
echo "Original Array: " . implode(', ', $data) . "\n";

insertionSort($data);
echo "Sorted Array:   " . implode(', ', $data) . "\n\n";

// Test Cases
function runTests(): void
{
    $testCases = [
        // Description => [input, expected]
        'Sorted Ascending'  => [[1, 2, 3, 4], [1, 2, 3, 4]],
        'Sorted Descending' => [[4, 3, 2, 1], [1, 2, 3, 4]],
        'Random Order'      => [[3, 1, 4, 2], [1, 2, 3, 4]],
        'Single Element'    => [[5], [5]],
        'Empty Array'       => [[], []],
        'Duplicate Values'  => [[2, 1, 2, 3, 1], [1, 1, 2, 2, 3]],
        'Negative Numbers'  => [[-3, -1, -2], [-3, -2, -1]],
        'Mixed Numbers'     => [[0, -5, 3, -1], [-5, -1, 0, 3]],
    ];

    foreach ($testCases as $description => $testCase) {
        $input = $testCase[0];
        $expected = $testCase[1];
        $output = $input;
        insertionSort($output);

        if ($output === $expected) {
            echo "PASS: {$description}\n";
        } else {
            echo "FAIL: {$description}\n";
            echo "  Expected: " . implode(', ', $expected) . "\n";
            echo "  Actual:   " . implode(', ', $output) . "\n";
        }
    }
}

echo "Test Cases:\n";
runTests();

// Performance Optimization Notes:
/*
1. Efficient for Small Datasets:
   - Insertion Sort is efficient for small arrays (n ≤ 100) due to low constant factors

2. Adaptive Nature:
   - Performs well with partially sorted data (O(n) comparisons when nearly sorted)

3. In-Place Sorting:
   - Requires only O(1) additional memory space

4. Stable Sorting:
   - Maintains relative order of equal elements

5. Practical Optimizations:
   - Binary Insertion Sort: Reduces comparison count to O(n log n) using binary search
     (but still O(n²) shifts due to element movement)
   - Shell Sort: Uses insertion sort on widely spaced elements first

6. Hybrid Usage:
   - Often used as the base case in divide-and-conquer sorts (e.g., Timsort) for small subarrays

7. Avoid for Large Datasets:
   - Use more efficient algorithms (e.g., QuickSort, MergeSort) for n > 1000
*/

<?php
/**
 * Quick Sort Algorithm Implementation in PHP
 *
 * This file contains an implementation of the quick sort algorithm using
 * the divide and conquer strategy with different pivot selection strategies.
 *
 * @author
 * @version 1.0
 */

/**
 * Quick sort function using divide and conquer.
 *
 * @param array &$arr The array to be sorted (passed by reference).
 * @param int $low The starting index.
 * @param int|null $high The ending index.
 * @return void
 */
function quickSort(array &$arr, int $low = 0, ?int $high = null): void {
    if ($high === null) {
        $high = count($arr) - 1;
    }

    // Base condition
    if ($low < $high) {
        // Partition the array and get the pivot index
        $pi = partition($arr, $low, $high);

        // Recursively sort elements before and after partition
        quickSort($arr, $low, $pi - 1);
        quickSort($arr, $pi + 1, $high);
    }
}

/**
 * Partition function to place pivot at correct position.
 *
 * @param array &$arr The array to partition.
 * @param int $low Starting index.
 * @param int $high Ending index.
 * @return int The index of the pivot after partition.
 */
function partition(array &$arr, int $low, int $high): int {
    // Pivot selection strategy: use the last element as pivot
    $pivot = $arr[$high];
    $i = $low - 1; // index of smaller element

    for ($j = $low; $j < $high; $j++) {
        if ($arr[$j] <= $pivot) {
            $i++;
            // Swap arr[i] and arr[j]
            [$arr[$i], $arr[$j]] = [$arr[$j], $arr[$i]];
        }
    }

    // Swap arr[i + 1] and arr[high] (pivot)
    [$arr[$i + 1], $arr[$high]] = [$arr[$high], $arr[$i + 1]];

    return $i + 1;
}

/**
 * Example usage
 */
echo "Quick Sort Example:\n";
$sample = [10, 7, 8, 9, 1, 5];
quickSort($sample);
print_r($sample);

/**
 * Test cases
 */
function runTests(): void {
    echo "\nRunning Test Cases:\n";

    $tests = [
        'empty array' => [],
        'single element' => [42],
        'sorted array' => [1, 2, 3, 4, 5],
        'reverse array' => [5, 4, 3, 2, 1],
        'duplicates' => [3, 1, 2, 3, 3],
        'negative numbers' => [-1, 3, 0, -7, 8],
    ];

    foreach ($tests as $name => $array) {
        quickSort($array);
        echo "$name: " . implode(', ', $array) . "\n";
    }
}

runTests();

/**
 * Performance Notes:
 * - Time Complexity:
 *   Best/Average Case: O(n log n)
 *   Worst Case: O(n^2) (e.g., already sorted array with poor pivot selection)
 * - Space Complexity: O(log n) auxiliary stack space due to recursion
 *
 * Optimization Suggestions:
 * - Use randomized pivot selection to avoid worst-case scenario
 * - Tail call optimization (TCO) where supported
 * - Use insertion sort for small partitions
 */
?>

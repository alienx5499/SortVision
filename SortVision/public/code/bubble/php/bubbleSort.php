<?php
/**
 * Bubble Sort Implementation in PHP
 *
 * This script defines a function to sort an array using the Bubble Sort algorithm.
 *
 * Time Complexity:
 * - Worst/Average: O(n^2)
 * - Best (already sorted): O(n)
 *
 * Space Complexity:
 * - O(1) (In-place sorting)
 *
 * @author
 * @license MIT
 */

/**
 * Sorts an array in ascending order using the Bubble Sort algorithm.
 *
 * @param array &$arr The array to be sorted (by reference)
 *
 * @return void
 */
function bubbleSort(array &$arr): void
{
    $n = count($arr);
    if ($n <= 1) {
        return; // Already sorted or empty
    }

    for ($i = 0; $i < $n - 1; $i++) {
        $swapped = false;

        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                // Swap if elements are in the wrong order
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
                $swapped = true;
            }
        }

        // Optimization: Stop if the array is already sorted
        if (!$swapped) {
            break;
        }
    }
}

/**
 * Example usage and test cases
 */
function testBubbleSort(): void
{
    $testCases = [
        "Empty Array" => [],
        "Single Element" => [42],
        "Already Sorted" => [1, 2, 3, 4, 5],
        "Reverse Order" => [5, 4, 3, 2, 1],
        "Random Order" => [10, 7, 3, 8, 2],
        "With Duplicates" => [4, 5, 4, 3, 1, 2, 3]
    ];

    foreach ($testCases as $desc => $array) {
        echo "Before - $desc: ";
        print_r($array);
        bubbleSort($array);
        echo "After  - $desc: ";
        print_r($array);
        echo str_repeat('-', 30) . PHP_EOL;
    }
}

// Run test cases
testBubbleSort();
?>

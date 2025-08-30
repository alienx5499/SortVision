<?php

/**
 * Implements the Heap Sort algorithm.
 *
 * Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.
 * It's an in-place algorithm (mostly) and is known for its O(n log n) time complexity.
 *
 * Time Complexity: O(n log n) in all cases (best, average, worst)
 * Space Complexity: O(1) for an in-place implementation (excluding recursion stack for build_max_heapify)
 *
 * @param array $arr The array to be sorted. Passed by reference to sort in-place.
 */
function heapSort(array &$arr) {
    $n = count($arr);

    // Step 1: Build a max-heap from the input data.
    // We start from the last non-leaf node and heapify upwards.
    // The last non-leaf node is at index floor(n/2) - 1.
    for ($i = floor($n / 2) - 1; $i >= 0; $i--) {
        heapify($arr, $n, $i);
    }

    // Step 2: Extract elements one by one from the heap.
    // After each extraction, the largest element is at the root (index 0).
    // We swap it with the last element of the unsorted part of the array,
    // and then reduce the heap size and heapify the new root.
    for ($i = $n - 1; $i > 0; $i--) {
        // Move current root to end
        $temp = $arr[0];
        $arr[0] = $arr[$i];
        $arr[$i] = $temp;

        // Call max heapify on the reduced heap
        heapify($arr, $i, 0);
    }
}

/**
 * A helper function to maintain the max-heap property in a subtree rooted at `i`.
 * This function assumes that the subtrees at `left_child(i)` and `right_child(i)` are already heaps.
 *
 * @param array $arr The array representing the heap. Passed by reference.
 * @param int $n The size of the heap (number of elements in the current consideration).
 * @param int $i The index of the root of the subtree to heapify.
 */
function heapify(array &$arr, int $n, int $i) {
    $largest = $i; // Initialize largest as root
    $left = 2 * $i + 1; // Left child
    $right = 2 * $i + 2; // Right child

    // If left child is larger than root
    if ($left < $n && $arr[$left] > $arr[$largest]) {
        $largest = $left;
    }

    // If right child is larger than current largest
    if ($right < $n && $arr[$right] > $arr[$largest]) {
        $largest = $right;
    }

    // If largest is not root
    if ($largest != $i) {
        // Swap the largest element with the root
        $temp = $arr[$i];
        $arr[$i] = $arr[$largest];
        $arr[$largest] = $temp;

        // Recursively heapify the affected sub-tree
        heapify($arr, $n, $largest);
    }
}

// --- Example Usage ---

echo "--- Heap Sort Examples ---<br><br>";

$array1 = [12, 11, 13, 5, 6, 7];
echo "Original Array 1: " . implode(", ", $array1) . "<br>";
heapSort($array1);
echo "Sorted Array 1: " . implode(", ", $array1) . "<br><br>";

$array2 = [4, 10, 3, 5, 1];
echo "Original Array 2: " . implode(", ", $array2) . "<br>";
heapSort($array2);
echo "Sorted Array 2: " . implode(", ", $array2) . "<br><br>";

$array3 = [9, 8, 7, 6, 5, 4, 3, 2, 1]; // Reverse sorted
echo "Original Array 3: " . implode(", ", $array3) . "<br>";
heapSort($array3);
echo "Sorted Array 3: " . implode(", ", $array3) . "<br><br>";

$array4 = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Already sorted
echo "Original Array 4: " . implode(", ", $array4) . "<br>";
heapSort($array4);
echo "Sorted Array 4: " . implode(", ", $array4) . "<br><br>";

$array5 = [7]; // Single element
echo "Original Array 5: " . implode(", ", $array5) . "<br>";
heapSort($array5);
echo "Sorted Array 5: " . implode(", ", $array5) . "<br><br>";

$array6 = []; // Empty array
echo "Original Array 6: " . implode(", ", $array6) . "<br>";
heapSort($array6);
echo "Sorted Array 6: " . implode(", ", $array6) . "<br><br>";

?>

<?php
// Merge Sort implementation in PHP with detailed comments

// Main function to perform merge sort
function mergeSort($arr) {
    // Base case: if the array has 0 or 1 element, it is already sorted
    if (count($arr) <= 1) {
        return $arr;
    }

    // Find the middle index to split the array
    $middle = (int) (count($arr) / 2);

    // Split the array into left and right halves
    $left = array_slice($arr, 0, $middle);
    $right = array_slice($arr, $middle);

    // Recursively sort both halves
    $left = mergeSort($left);
    $right = mergeSort($right);

    // Merge the sorted halves
    return merge($left, $right);
}

// Helper function to merge two sorted arrays
function merge($left, $right) {
    $result = array();
    $i = 0; // Pointer for left array
    $j = 0; // Pointer for right array

    // Compare elements from both arrays and add the smaller one to the result
    while ($i < count($left) && $j < count($right)) {
        if ($left[$i] <= $right[$j]) {
            $result[] = $left[$i];
            $i++;
        } else {
            $result[] = $right[$j];
            $j++;
        }
    }

    // If there are remaining elements in the left array, add them to the result
    while ($i < count($left)) {
        $result[] = $left[$i];
        $i++;
    }

    // If there are remaining elements in the right array, add them to the result
    while ($j < count($right)) {
        $result[] = $right[$j];
        $j++;
    }

    // Return the merged sorted array
    return $result;
}
?>

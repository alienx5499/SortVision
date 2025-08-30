<?php
/**
 * Radix Sort Implementation
 * @param array &$arr Array to sort (passed by reference)
 * @return array Sorted array
 */
function radixSort(&$arr) {
    // Find the maximum number to know the number of digits
    $max = getMax($arr);

    // Do counting sort for every digit. exp is 10^i where i is current digit number
    for ($exp = 1; $max / $exp >= 1; $exp *= 10) {
        countingSort($arr, $exp);
    }
    return $arr;
}

/**
 * Counting sort for radix sort
 * @param array &$arr Array to sort
 * @param int $exp Current exponent (1, 10, 100, ...)
 */
function countingSort(&$arr, $exp) {
    $n = count($arr);
    $output = array_fill(0, $n, 0); // Output array
    $count = array_fill(0, 10, 0);  // Count array for digits 0-9

    // Store count of occurrences in count[]
    for ($i = 0; $i < $n; $i++) {
        $index = (int)(($arr[$i] / $exp) % 10);
        $count[$index]++;
    }

    // Change count[i] so that count[i] contains actual position of this digit in output[]
    for ($i = 1; $i < 10; $i++) {
        $count[$i] += $count[$i - 1];
    }

    // Build the output array (stable sort)
    for ($i = $n - 1; $i >= 0; $i--) {
        $index = (int)(($arr[$i] / $exp) % 10);
        $output[$count[$index] - 1] = $arr[$i];
        $count[$index]--;
    }

    // Copy the output array to arr[], so that arr[] now contains sorted numbers according to current digit
    for ($i = 0; $i < $n; $i++) {
        $arr[$i] = $output[$i];
    }
}

/**
 * Get maximum value in array
 * @param array $arr Input array
 * @return int Maximum value
 */
function getMax($arr) {
    // Initialize max as the first element
    $max = $arr[0];
    // Traverse array elements to find the maximum
    foreach ($arr as $value) {
        if ($value > $max) {
            $max = $value;
        }
    }
    return $max;
}
?>

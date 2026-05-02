<?php
// Heap Sort (in-place, max-heap)
// Time: Best/Avg/Worst O(n log n), Space: O(1)
function heapSort(array &$arr): void {
    $n = count($arr);

    for ($i = intdiv($n, 2) - 1; $i >= 0; $i--) heapify($arr, $n, $i);
    for ($i = $n - 1; $i > 0; $i--) {
        [$arr[0], $arr[$i]] = [$arr[$i], $arr[0]];
        heapify($arr, $i, 0);
    }
}

function heapify(array &$arr, int $n, int $i): void {
    $largest = $i;
    $left = 2 * $i + 1;
    $right = 2 * $i + 2;

    if ($left < $n && $arr[$left] > $arr[$largest]) $largest = $left;
    if ($right < $n && $arr[$right] > $arr[$largest]) $largest = $right;

    if ($largest !== $i) {
        [$arr[$i], $arr[$largest]] = [$arr[$largest], $arr[$i]];
        heapify($arr, $n, $largest);
    }
}

$arr = [64, 25, 12, 22, 11];
heapSort($arr);
echo implode(', ', $arr) . PHP_EOL;
?>

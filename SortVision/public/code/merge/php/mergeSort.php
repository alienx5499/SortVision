<?php
// Merge Sort
// Time: Best/Avg/Worst O(n log n), Space: O(n)
function mergeSort(array $arr): array {
    if (count($arr) <= 1) return $arr;

    $mid = intdiv(count($arr), 2);
    $left = mergeSort(array_slice($arr, 0, $mid));
    $right = mergeSort(array_slice($arr, $mid));

    return merge($left, $right);
}

function merge(array $left, array $right): array {
    $result = [];
    $i = $j = 0;

    while ($i < count($left) && $j < count($right)) {
        $result[] = ($left[$i] <= $right[$j]) ? $left[$i++] : $right[$j++];
    }
    while ($i < count($left)) $result[] = $left[$i++];
    while ($j < count($right)) $result[] = $right[$j++];

    return $result;
}

$arr = [64, 25, 12, 22, 11];
echo implode(', ', mergeSort($arr)) . PHP_EOL;
?>

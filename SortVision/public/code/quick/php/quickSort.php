<?php
// Quick Sort (in-place, Lomuto partition)
// Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
function quickSort(array &$arr, int $low, int $high): void {
    if ($low < $high) {
        $p = partition($arr, $low, $high);
        quickSort($arr, $low, $p - 1);
        quickSort($arr, $p + 1, $high);
    }
}

function partition(array &$arr, int $low, int $high): int {
    $pivot = $arr[$high];
    $i = $low - 1;

    for ($j = $low; $j < $high; $j++) {
        if ($arr[$j] <= $pivot) {
            $i++;
            [$arr[$i], $arr[$j]] = [$arr[$j], $arr[$i]];
        }
    }
    [$arr[$i + 1], $arr[$high]] = [$arr[$high], $arr[$i + 1]];
    return $i + 1;
}

$arr = [64, 25, 12, 22, 11];
quickSort($arr, 0, count($arr) - 1);
echo implode(', ', $arr) . PHP_EOL;
?>

<?php
// Bubble Sort (in-place)
// Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
function bubbleSort(array &$arr): void {
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        $swapped = false;
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                [$arr[$j], $arr[$j + 1]] = [$arr[$j + 1], $arr[$j]];
                $swapped = true;
            }
        }
        if (!$swapped) break;
    }
}

$arr = [64, 34, 25, 12, 22, 11, 90];
bubbleSort($arr);
echo implode(', ', $arr) . PHP_EOL;
?>

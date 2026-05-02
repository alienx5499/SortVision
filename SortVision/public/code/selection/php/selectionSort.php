<?php
// Selection Sort (in-place)
// Time: Best/Avg/Worst O(n^2), Space: O(1)
function selectionSort(array &$arr): void {
    $n = count($arr);
    for ($i = 0; $i < $n - 1; $i++) {
        $minIdx = $i;
        for ($j = $i + 1; $j < $n; $j++) {
            if ($arr[$j] < $arr[$minIdx]) $minIdx = $j;
        }
        if ($minIdx !== $i) {
            [$arr[$i], $arr[$minIdx]] = [$arr[$minIdx], $arr[$i]];
        }
    }
}

$arr = [64, 25, 12, 22, 11];
selectionSort($arr);
echo implode(', ', $arr) . PHP_EOL;
?>

<?php
// Insertion Sort (in-place)
// Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
function insertionSort(array &$arr): void {
    for ($i = 1; $i < count($arr); $i++) {
        $key = $arr[$i];
        $j = $i - 1;

        while ($j >= 0 && $arr[$j] > $key) {
            $arr[$j + 1] = $arr[$j];
            $j--;
        }
        $arr[$j + 1] = $key;
    }
}

$arr = [64, 25, 12, 22, 11];
insertionSort($arr);
echo implode(', ', $arr) . PHP_EOL;
?>

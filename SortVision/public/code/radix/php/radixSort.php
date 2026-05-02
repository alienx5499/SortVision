<?php
// Radix Sort (LSD, base 10, non-negative integers)
// Time: O(d * (n + k)), Space: O(n + k)
function radixSort(array &$arr): void {
    if (count($arr) <= 1) return;

    $maxVal = max($arr);
    for ($exp = 1; intdiv($maxVal, $exp) > 0; $exp *= 10) {
        countingSortByExp($arr, $exp);
    }
}

function countingSortByExp(array &$arr, int $exp): void {
    $n = count($arr);
    $output = array_fill(0, $n, 0);
    $count = array_fill(0, 10, 0);

    foreach ($arr as $x) $count[intdiv($x, $exp) % 10]++;
    for ($i = 1; $i < 10; $i++) $count[$i] += $count[$i - 1];

    for ($i = $n - 1; $i >= 0; $i--) {
        $digit = intdiv($arr[$i], $exp) % 10;
        $output[$count[$digit] - 1] = $arr[$i];
        $count[$digit]--;
    }

    for ($i = 0; $i < $n; $i++) $arr[$i] = $output[$i];
}

$arr = [170, 45, 75, 90, 802, 24, 2, 66];
radixSort($arr);
echo implode(', ', $arr) . PHP_EOL;
?>

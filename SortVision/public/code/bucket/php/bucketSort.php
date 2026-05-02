<?php
// Bucket Sort (for numbers in [0, 1))
// Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
function bucketSort(array &$arr): void {
    if (count($arr) <= 1) return;

    $n = count($arr);
    $buckets = array_fill(0, $n, []);

    foreach ($arr as $x) {
        $idx = min($n - 1, (int)($x * $n));
        $buckets[$idx][] = $x;
    }

    $k = 0;
    foreach ($buckets as &$bucket) {
        sort($bucket);
        foreach ($bucket as $x) $arr[$k++] = $x;
    }
}

$arr = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];
bucketSort($arr);
echo implode(', ', $arr) . PHP_EOL;
?>

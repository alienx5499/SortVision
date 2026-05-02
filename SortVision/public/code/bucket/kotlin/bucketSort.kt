fun bucketSort(arr: DoubleArray): DoubleArray {
    // Bucket Sort (for numbers in [0, 1))
    // Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
    if (arr.size <= 1) return arr

    val n = arr.size
    val buckets = Array(n) { mutableListOf<Double>() }

    for (x in arr) {
        val idx = minOf(n - 1, (x * n).toInt())
        buckets[idx].add(x)
    }

    var k = 0
    for (bucket in buckets) {
        bucket.sort()
        for (x in bucket) arr[k++] = x
    }
    return arr
}

fun main() {
    val arr = doubleArrayOf(0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51)
    println(bucketSort(arr).joinToString())
}

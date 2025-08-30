/**
 * Bucket Sort implementation in Kotlin.
 *
 * Time Complexity:
 * - Best: O(n + k)
 * - Average: O(n + k)
 * - Worst: O(n^2) [when all elements land in the same bucket]
 *
 * Space Complexity: O(n + k)
 */

class BucketSort {
    companion object {
        fun sort(arr: IntArray) {
            if (arr.isEmpty()) return

            val max = arr.maxOrNull() ?: return
            val min = arr.minOrNull() ?: return

            val bucketCount = Math.max(1, arr.size / 2)
            val buckets = Array(bucketCount) { mutableListOf<Int>() }

            // Distribute elements into buckets
            for (num in arr) {
                val index = ((num - min) * (bucketCount - 1) / (max - min + 1))
                buckets[index].add(num)
            }

            // Sort each bucket and concatenate results
            var i = 0
            for (bucket in buckets) {
                bucket.sort()
                for (num in bucket) {
                    arr[i++] = num
                }
            }
        }
    }
}

// Example usage
fun main() {
    val data = intArrayOf(29, 25, 3, 49, 9, 37, 21, 43)
    println("Original Array: ${data.joinToString()}")
    BucketSort.sort(data)
    println("Sorted Array:   ${data.joinToString()}")
}

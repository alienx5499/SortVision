fun mergeSort(arr: IntArray): IntArray {
    // Time: Best/Avg/Worst O(n log n), Space: O(n)
    if (arr.size <= 1) return arr

    val mid = arr.size / 2
    val left = mergeSort(arr.copyOfRange(0, mid))
    val right = mergeSort(arr.copyOfRange(mid, arr.size))

    return merge(left, right)
}

private fun merge(left: IntArray, right: IntArray): IntArray {
    val result = IntArray(left.size + right.size)
    var i = 0
    var j = 0
    var k = 0

    while (i < left.size && j < right.size) {
        result[k++] = if (left[i] <= right[j]) left[i++] else right[j++]
    }
    while (i < left.size) result[k++] = left[i++]
    while (j < right.size) result[k++] = right[j++]

    return result
}

fun main() {
    val arr = intArrayOf(64, 25, 12, 22, 11)
    println(mergeSort(arr).joinToString())
}

fun quickSort(arr: IntArray, low: Int = 0, high: Int = arr.size - 1): IntArray {
    // Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
    if (low < high) {
        val p = partition(arr, low, high)
        quickSort(arr, low, p - 1)
        quickSort(arr, p + 1, high)
    }
    return arr
}

private fun partition(arr: IntArray, low: Int, high: Int): Int {
    val pivot = arr[high]
    var i = low - 1

    for (j in low until high) {
        if (arr[j] <= pivot) {
            i++
            val t = arr[i]
            arr[i] = arr[j]
            arr[j] = t
        }
    }

    val t = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = t
    return i + 1
}

fun main() {
    val arr = intArrayOf(64, 25, 12, 22, 11)
    println(quickSort(arr).joinToString())
}

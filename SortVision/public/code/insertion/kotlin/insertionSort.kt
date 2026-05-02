fun insertionSort(arr: IntArray): IntArray {
    // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
    for (i in 1 until arr.size) {
        val key = arr[i]
        var j = i - 1

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = key
    }
    return arr
}

fun main() {
    val arr = intArrayOf(64, 25, 12, 22, 11)
    println(insertionSort(arr).joinToString())
}

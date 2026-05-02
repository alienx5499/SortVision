fun bubbleSort(arr: IntArray): IntArray {
    // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
    for (i in 0 until arr.size - 1) {
        var swapped = false
        for (j in 0 until arr.size - i - 1) {
            if (arr[j] > arr[j + 1]) {
                val t = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = t
                swapped = true
            }
        }
        if (!swapped) break
    }
    return arr
}

fun main() {
    val arr = intArrayOf(64, 34, 25, 12, 22, 11, 90)
    println(bubbleSort(arr).joinToString())
}

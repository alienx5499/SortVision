fun selectionSort(arr: IntArray): IntArray {
    // Time: Best/Avg/Worst O(n^2), Space: O(1)
    for (i in 0 until arr.size - 1) {
        var minIdx = i
        for (j in i + 1 until arr.size) {
            if (arr[j] < arr[minIdx]) minIdx = j
        }
        if (minIdx != i) {
            val t = arr[i]
            arr[i] = arr[minIdx]
            arr[minIdx] = t
        }
    }
    return arr
}

fun main() {
    val arr = intArrayOf(64, 25, 12, 22, 11)
    println(selectionSort(arr).joinToString())
}

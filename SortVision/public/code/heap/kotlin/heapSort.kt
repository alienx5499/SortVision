fun heapSort(arr: IntArray): IntArray {
    // Time: Best/Avg/Worst O(n log n), Space: O(1)
    val n = arr.size

    for (i in n / 2 - 1 downTo 0) heapify(arr, n, i)
    for (i in n - 1 downTo 1) {
        val t = arr[0]
        arr[0] = arr[i]
        arr[i] = t
        heapify(arr, i, 0)
    }
    return arr
}

private fun heapify(arr: IntArray, n: Int, i: Int) {
    var largest = i
    val left = 2 * i + 1
    val right = 2 * i + 2

    if (left < n && arr[left] > arr[largest]) largest = left
    if (right < n && arr[right] > arr[largest]) largest = right

    if (largest != i) {
        val t = arr[i]
        arr[i] = arr[largest]
        arr[largest] = t
        heapify(arr, n, largest)
    }
}

fun main() {
    val arr = intArrayOf(64, 25, 12, 22, 11)
    println(heapSort(arr).joinToString())
}

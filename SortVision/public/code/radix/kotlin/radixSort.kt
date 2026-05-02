fun radixSort(arr: IntArray): IntArray {
    // Radix Sort (LSD, base 10, non-negative integers)
    // Time: O(d * (n + k)), Space: O(n + k)
    if (arr.size <= 1) return arr

    var maxVal = arr.maxOrNull() ?: 0
    var exp = 1
    while (maxVal / exp > 0) {
        countingSortByExp(arr, exp)
        exp *= 10
    }
    return arr
}

private fun countingSortByExp(arr: IntArray, exp: Int) {
    val output = IntArray(arr.size)
    val count = IntArray(10)

    for (x in arr) count[(x / exp) % 10]++
    for (i in 1 until 10) count[i] += count[i - 1]

    for (i in arr.lastIndex downTo 0) {
        val digit = (arr[i] / exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit]--
    }

    for (i in arr.indices) arr[i] = output[i]
}

fun main() {
    val arr = intArrayOf(170, 45, 75, 90, 802, 24, 2, 66)
    println(radixSort(arr).joinToString())
}

/**
 * Selection Sort Implementation in Kotlin
 *
 * This function sorts an integer array in ascending order using the Selection Sort algorithm.
 *
 * Time Complexity:
 *   - Best case: O(n^2)
 *   - Average case: O(n^2)
 *   - Worst case: O(n^2)
 *
 * Space Complexity: O(1)
 *
 * Selection Sort is not stable but is simple and easy to understand.
 */

fun selectionSort(arr: IntArray): IntArray {
    val n = arr.size

    // Handle edge case: empty or single-element array
    if (n <= 1) return arr

    for (i in 0 until n - 1) {
        var minIndex = i
        for (j in i + 1 until n) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        // Swap the minimum element with the first unsorted element
        if (minIndex != i) {
            val temp = arr[i]
            arr[i] = arr[minIndex]
            arr[minIndex] = temp
        }
    }
    return arr
}

/**
 * Main function to run test cases.
 */
fun main() {
    val testCases = listOf(
        intArrayOf(),                        // Edge case: empty array
        intArrayOf(5),                       // Edge case: single element
        intArrayOf(3, 1, 2, 5, 4),           // Unsorted array
        intArrayOf(10, 9, 8, 7, 6),          // Reverse sorted array
        intArrayOf(1, 2, 3, 4, 5),           // Already sorted array
        intArrayOf(4, 4, 2, 1, 3, 2, 1)      // Array with duplicates
    )

    println("Selection Sort Test Cases:")
    for ((index, test) in testCases.withIndex()) {
        val sorted = selectionSort(test.copyOf())
        println("Test ${index + 1}: ${sorted.joinToString(", ")}")
    }
}

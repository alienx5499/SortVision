package quick
/**
 * Implements the Quick Sort algorithm.
 *
 * Time Complexity:
 *   - Average Case: O(n log n)
 *   - Worst Case: O(n^2) (e.g., when the array is already sorted and the pivot is always the smallest or largest element)
 * Space Complexity:
 *   - Average Case: O(log n) (due to the recursion stack)
 *   - Worst Case: O(n) (due to the recursion stack in the worst-case scenario for partitioning)
 */
class QuickSort {
    companion object {
        /**
         * Public method to sort an array using Quick Sort.
         * This is the entry point for the algorithm.
         * @param arr The integer array to be sorted.
         */
        fun sort(arr: IntArray) {
            if (arr.isEmpty() || arr.size == 1) {
                return
            }
            quickSort(arr, 0, arr.size - 1)
        }
        /**
         * Helper function to swap two elements in an array.
         * @param arr The array in which elements are swapped.
         * @param i The index of the first element.
         * @param j The index of the second element.
         */
        private fun swap(arr: IntArray, i: Int, j: Int) {
            val temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        /**
         * The core recursive Quick Sort logic.
         * @param arr The array to be sorted.
         * @param low The starting index of the partition.
         * @param high The ending index of the partition.
         */
        private fun quickSort(arr: IntArray, low: Int, high: Int) {
            if (low < high) {
                val pi = partition(arr, low, high)
                quickSort(arr, low, pi - 1)
                quickSort(arr, pi + 1, high)
            }
        }
        /**
         * This function takes the last element as pivot, places
         * the pivot element at its correct position in the sorted
         * array, and places all smaller (smaller than pivot)
         * to left of pivot and all greater elements to right of pivot.
         * @param arr The array to be partitioned.
         * @param low The starting index of the partition.
         * @param high The ending index of the partition (pivot element index).
         * @return The partitioning index.
         */
        private fun partition(arr: IntArray, low: Int, high: Int): Int {
            val pivot = arr[high] 
            var i = low - 1 
            for (j in low until high) {
                if (arr[j] < pivot) {
                    i++ 
                    swap(arr, i, j)
                }
            }
            swap(arr, i + 1, high)
            return i + 1
        }
    }
}
/**
 * Main function to demonstrate the QuickSort algorithm.
 * Includes various test cases.
 */
fun main() {
    println("QuickSort in Kotlin")
    println("--------------------")

    val testCases = listOf(
        Pair("Empty Array", intArrayOf()),
        Pair("Single Element Array", intArrayOf(42)),
        Pair("Already Sorted Array", intArrayOf(1, 2, 3, 4, 5)),
        Pair("Reverse Sorted Array", intArrayOf(5, 4, 3, 2, 1)),
        Pair("Array with Duplicate Values", intArrayOf(4, 1, 3, 4, 2, 3, 1)),
        Pair("Unsorted Array", intArrayOf(10, 7, 8, 9, 1, 5)),
        Pair("Array with Negative Numbers", intArrayOf(-3, -1, -4, -1, -5, -9, -2, -6)),
        Pair("Array with Mixed Positive and Negative Numbers", intArrayOf(4, -2, 7, -5, 1, 0, 3, -1))
    )

    for ((description, arr) in testCases) {
        println("\nTest Case: $description")
        println("Original array: ${arr.joinToString()}")
        QuickSort.sort(arr)
        println("Sorted array:   ${arr.joinToString()}")
    }

    // Example with a slightly larger random array
    val randomArray = IntArray(15) { (0..100).random() }
    println("\nTest Case: Random Array")
    println("Original array: ${randomArray.joinToString()}")
    QuickSort.sort(randomArray)
    println("Sorted array:   ${randomArray.joinToString()}")

    println("\n--------------------")
    println("QuickSort demonstration complete.")
}
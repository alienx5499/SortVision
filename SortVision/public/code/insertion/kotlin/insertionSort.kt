/**
 * Insertion Sort Algorithm Implementation in Kotlin
 *
 * Insertion Sort is a simple sorting algorithm that builds the final sorted array
 * one item at a time. It is much less efficient on large lists than more advanced
 * algorithms such as quicksort, heapsort, or merge sort.
 *
 * How it works:
 * 1. Start with the second element (index 1) and compare it with the first element
 * 2. If the second element is smaller, swap them
 * 3. Move to the third element and insert it into the correct position among the
 *    first three elements
 * 4. Continue this process for all elements
 * 5. At each step, the left portion of the array is sorted
 *
 * Time Complexity:
 * - Best Case: O(n) - when array is already sorted
 * - Average Case: O(n²) - when array is randomly ordered
 * - Worst Case: O(n²) - when array is sorted in reverse order
 *
 * Space Complexity: O(1) - in-place sorting algorithm
 *
 * Advantages:
 * - Simple to understand and implement
 * - Efficient for small data sets
 * - Adaptive: if the array is already sorted, it runs in O(n) time
 * - Stable: maintains relative order of equal elements
 * - In-place: requires only O(1) additional memory space
 *
 * Disadvantages:
 * - Inefficient for large data sets
 * - Generally performs worse than advanced algorithms like quicksort, heapsort, or merge sort
 */
class InsertionSort {
    companion object {
        /**
         * Sorts an integer array using the Insertion Sort algorithm
         *
         * @param arr The integer array to be sorted (modified in-place)
         */
        fun sort(arr: IntArray) {
            val n = arr.size

            // Start from the second element (index 1) since the first element is considered sorted
            for (i in 1 until n) {
                // Store the current element as the key to be inserted
                val key = arr[i]

                // Initialize j to point to the element before the current one
                var j = i - 1

                // Move elements of arr[0..i-1] that are greater than key
                // to one position ahead of their current position
                // This creates space for the key to be inserted
                while (j >= 0 && arr[j] > key) {
                    // Shift the larger element to the right
                    arr[j + 1] = arr[j]
                    // Move left to check the previous element
                    j--
                }

                // Insert the key in its correct position
                // j + 1 is the correct position because we decremented j in the while loop
                arr[j + 1] = key
            }
        }
    }
}

// Example usage and test
fun main() {
    val arr = intArrayOf(64, 34, 25, 12, 22, 11, 90)
    println("Original array: ${arr.contentToString()}")

    InsertionSort.sort(arr)
    println("Sorted array: ${arr.contentToString()}")
}

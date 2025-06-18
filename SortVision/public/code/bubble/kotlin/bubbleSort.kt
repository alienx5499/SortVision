package com.sortvision

import java.util.Arrays

/**
 * Implements the Bubble Sort algorithm.
 *
 * Time Complexity:
 * - Best Case: O(n) - Occurs when the array is already sorted.
 *   The algorithm makes one pass through the array to confirm it's sorted, thanks to the `swapped` flag optimization.
 * - Average Case: O(n^2) - Occurs when the elements are in a jumbled order.
 * - Worst Case: O(n^2) - Occurs when the array is sorted in reverse order.
 *
 * Space Complexity: O(1) - Bubble sort is an in-place sorting algorithm.
 *   It requires a constant amount of extra space for temporary variables (e.g., for swapping elements).
 *   The space used by the input array itself is not counted in this O(1) complexity.
 */
class BubbleSort {
    /**
     * Sorts an array of integers using the Bubble Sort algorithm.
     *
     * @param arr The array to be sorted.
     * @return The sorted array.
     */
    fun sort(arr: IntArray): IntArray {
        if (arr.size <= 1) {
            return arr
        }
        val n = arr.size
        var swapped: Boolean
        for (i in 0 until n - 1) {
            swapped = false
            for (j in 0 until n - i - 1) {
                if (arr[j] > arr[j + 1]) {
                    val temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                    swapped = true
                }
            }
            if (!swapped) {
                break
            }
        }
        return arr
    }
}

fun main() {
    val sorter = BubbleSort()
    var testArray: IntArray
    var sortedArray: IntArray

    // Test case 1: Empty array
    testArray = intArrayOf()
    println("Original array: ${Arrays.toString(testArray)}")
    sortedArray = sorter.sort(testArray.copyOf())
    println("Sorted array: ${Arrays.toString(sortedArray)}")
    println("---")

    // Test case 2: Single-element array
    testArray = intArrayOf(5)
    println("Original array: ${Arrays.toString(testArray)}")
    sortedArray = sorter.sort(testArray.copyOf())
    println("Sorted array: ${Arrays.toString(sortedArray)}")
    println("---")

    // Test case 3: Already sorted array
    testArray = intArrayOf(1, 2, 3, 4, 5)
    println("Original array: ${Arrays.toString(testArray)}")
    sortedArray = sorter.sort(testArray.copyOf())
    println("Sorted array: ${Arrays.toString(sortedArray)}")
    println("---")

    // Test case 4: Reverse-sorted array
    testArray = intArrayOf(5, 4, 3, 2, 1)
    println("Original array: ${Arrays.toString(testArray)}")
    sortedArray = sorter.sort(testArray.copyOf())
    println("Sorted array: ${Arrays.toString(sortedArray)}")
    println("---")

    // Test case 5: Array with duplicate elements
    testArray = intArrayOf(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5)
    println("Original array: ${Arrays.toString(testArray)}")
    sortedArray = sorter.sort(testArray.copyOf())
    println("Sorted array: ${Arrays.toString(sortedArray)}")
    println("---")

    // Test case 6: Array with negative numbers
    testArray = intArrayOf(-5, -2, -8, -1, -4)
    println("Original array: ${Arrays.toString(testArray)}")
    sortedArray = sorter.sort(testArray.copyOf())
    println("Sorted array: ${Arrays.toString(sortedArray)}")
    println("---")

    // Test case 7: Mixed array of positive and negative numbers
    testArray = intArrayOf(0, 5, -2, 8, -1, 4, -4)
    println("Original array: ${Arrays.toString(testArray)}")
    sortedArray = sorter.sort(testArray.copyOf())
    println("Sorted array: ${Arrays.toString(sortedArray)}")
    println("---")
}

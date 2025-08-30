package SortVision.public.code.radix.kotlin

import kotlin.math.max

// MARK: - RadixSort Class

/**
 * A class that implements the Radix Sort algorithm for non-negative integers.
 *
 * Radix Sort is a non-comparative integer sorting algorithm that sorts integers
 * by processing individual digits. It sorts digit by digit, from the least
 * significant digit to the most significant digit, using a stable sorting
 * algorithm (like Counting Sort) for each digit.
 *
 * - Time Complexity: O(d * (n + k))
 *   - d: The number of digits in the maximum number (or maximum number of passes).
 *   - n: The number of elements in the array.
 *   - k: The range of possible digit values (the base, e.g., 10 for decimal digits).
 *   If k (base) is considered constant (e.g., 10 for decimal), complexity is often cited as O(d * n).
 *
 * - Space Complexity: O(n + k)
 *   - Due to the auxiliary arrays used by Counting Sort (e.g., count array and output array).
 */
class RadixSort {
    companion object {
        /**
         * Sorts an array of non-negative integers in ascending order using the Radix Sort algorithm.
         *
         * Important: This implementation is designed for NON-NEGATIVE integers only.
         * Supplying negative numbers will lead to incorrect sorting or errors.
         *
         * - Parameter arr: An IntArray of non-negative integers to be sorted. The array is modified in place.
         *
         * ### Example Usage:
         * ```kotlin
         * fun main() {
         *     val numbers = intArrayOf(170, 45, 75, 90, 802, 24, 2, 66)
         *     RadixSort.sort(numbers)
         *     println("Sorted array: ${numbers.joinToString()}") // Output: [2, 24, 45, 66, 75, 90, 170, 802]
         * }
         * ```
         */
        fun sort(arr: IntArray) {
            if (arr.size <= 1) {
                return
            }
            val maxVal = getMax(arr)
            if (maxVal == 0 && arr.all { it == 0 }) {
                return
            }
            if (arr.any { it < 0 }) {
                println("Warning: RadixSort current implementation expects non-negative integers. Array contains negative values. Results will be incorrect.")
            }
            var exp = 1
            while (maxVal / exp > 0) {
                countSort(arr, exp)
                if (exp > Int.MAX_VALUE / 10) {
                    break
                }
                exp *= 10
            }
        }

        /**
         * Helper function to find the maximum value in an array of non-negative integers.
         * Required to determine the number of passes (digits) for Radix Sort.
         *
         * - Parameter arr: The input IntArray (assumed to contain non-negative integers as per `sort`'s contract).
         * - Returns: The maximum integer in the array. Returns 0 if the array is empty or all elements are 0.
         */
        private fun getMax(arr: IntArray): Int {
            if (arr.isEmpty()) {
                return 0
            }
            var maxVal = 0
            for (value in arr) {
                if (value < 0) {
                }
                if (value > maxVal) {
                    maxVal = value
                }
            }
            return maxVal
        }

        /**
         * Performs Counting Sort on the input array based on the digit represented by `exp`.
         * Counting Sort is used as a subroutine because it is a stable sort, which is essential for Radix Sort.
         * This version is for base 10.
         *
         * - Parameters:
         *   - arr: The IntArray to be sorted based on the current digit.
         *   - exp: The exponent representing the current digit's place (1 for units, 10 for tens, etc.).
         */
        private fun countSort(arr: IntArray, exp: Int) {
            val n = arr.size
            val output = IntArray(n)
            val count = IntArray(10)
            for (i in 0 until n) {
                val digitIndex = (arr[i] / exp) % 10
                count[digitIndex]++
            }
            for (i in 1 until 10) {
                count[i] += count[i - 1]
            }
            for (i in n - 1 downTo 0) {
                val digitIndex = (arr[i] / exp) % 10
                output[count[digitIndex] - 1] = arr[i]
                count[digitIndex]--
            }
            System.arraycopy(output, 0, arr, 0, n)
        }
    }
}

// MARK: - Test Cases
fun runRadixSortTests() {
    println("Running RadixSort Tests (for Non-Negative Integers)...\n")

    data class TestCase(val input: IntArray, val expected: IntArray, val description: String) {
        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as TestCase
            if (!input.contentEquals(other.input)) return false
            if (!expected.contentEquals(other.expected)) return false
            return description == other.description
        }

        override fun hashCode(): Int {
            var result = input.contentHashCode()
            result = 31 * result + expected.contentHashCode()
            result = 31 * result + description.hashCode()
            return result
        }
    }

    val testCases = listOf(
        TestCase(intArrayOf(), intArrayOf(), "Empty array"),
        TestCase(intArrayOf(1), intArrayOf(1), "Single element array"),
        TestCase(intArrayOf(0), intArrayOf(0), "Single zero"),
        TestCase(intArrayOf(170, 45, 75, 90, 802, 24, 2, 66), intArrayOf(2, 24, 45, 66, 75, 90, 170, 802), "Standard case from example"),
        TestCase(intArrayOf(0, 0, 0, 0), intArrayOf(0, 0, 0, 0), "All zeros"),
        TestCase(intArrayOf(5, 4, 3, 2, 1), intArrayOf(1, 2, 3, 4, 5), "Reverse sorted small numbers"),
        TestCase(intArrayOf(1, 2, 3, 4, 5), intArrayOf(1, 2, 3, 4, 5), "Already sorted small numbers"),
        TestCase(intArrayOf(100, 10, 1), intArrayOf(1, 10, 100), "Different number of digits, reverse order by magnitude"),
        TestCase(intArrayOf(1, 10, 100), intArrayOf(1, 10, 100), "Different number of digits, sorted order"),
        TestCase(intArrayOf(9, 8, 7, 6, 5, 4, 3, 2, 1, 0), intArrayOf(0, 1, 2, 3, 4, 5, 6, 7, 8, 9), "Single digits 0-9 reverse sorted"),
        TestCase(intArrayOf(121, 432, 564, 23, 1, 45, 788), intArrayOf(1, 23, 45, 121, 432, 564, 788), "Mixed digits example"),
        TestCase(intArrayOf(Int.MAX_VALUE, 0, 100), intArrayOf(0, 100, Int.MAX_VALUE), "Including Int.MAX_VALUE"),
        TestCase(intArrayOf(4, 80, 600, 2000, 30000), intArrayOf(4, 80, 600, 2000, 30000), "Numbers with increasing digits"),
        TestCase(intArrayOf(10000, 2000, 300, 40, 5), intArrayOf(5, 40, 300, 2000, 10000), "Numbers with decreasing digits (reverse magnitude)")
    )

    var testsPassed = 0
    var testsFailed = 0

    for (testCase in testCases) {
        val arrayToSort = testCase.input.copyOf()
        val originalArrayForLog = testCase.input.copyOf()
        val containsNegative = originalArrayForLog.any { it < 0 }
        if (containsNegative) {
            println("ℹ️ Test Skipped (designed for non-negative, input has negatives): ${testCase.description} - Input: ${originalArrayForLog.joinToString()}")
            continue
        }

        try {
            RadixSort.sort(arrayToSort)
            if (arrayToSort.contentEquals(testCase.expected)) {
                println("✅ Test Passed: ${testCase.description}")
                testsPassed++
            } else {
                println("❌ Test Failed: ${testCase.description} - Input: ${originalArrayForLog.joinToString()}")
                println("   Expected: ${testCase.expected.joinToString()}")
                println("   Got:      ${arrayToSort.joinToString()}")
                testsFailed++
            }
        } catch (e: Exception) {
            println("💥 Test Errored: ${testCase.description} - Input: ${originalArrayForLog.joinToString()} - Error: ${e.message}")
            testsFailed++
        }
    }

    println("\n--- RadixSort Test Summary (Non-Negative Integers) ---")
    if (testsFailed == 0 && testsPassed > 0) {
        println("🎉 All $testsPassed RadixSort tests passed!")
    } else if (testsPassed == 0 && testsFailed == 0) {
        println("🤔 No applicable RadixSort tests were run or all were skipped.")
    } else {
        println("⚠️ $testsFailed RadixSort test(s) failed or errored out of ${testsPassed + testsFailed} attempted tests.")
    }
    println("-----------------------------------------------------\n")
}


// MARK: - Example Usage
fun exampleUsageOfRadixSort() {
    println("--- Example Usage of RadixSort (for Non-Negative Integers) ---")
    val numbers1 = intArrayOf(170, 45, 75, 90, 802, 24, 2, 66)
    println("Original array 1: ${numbers1.joinToString()}")
    RadixSort.sort(numbers1)
    println("Sorted array 1:   ${numbers1.joinToString()}\n")

    val numbers2 = intArrayOf(10, 1, 900, 2, 80, 300, 7, 40, 6, 55, 0)
    println("Original array 2: ${numbers2.joinToString()}")
    RadixSort.sort(numbers2)
    println("Sorted array 2:   ${numbers2.joinToString()}\n")

    val emptyArray = intArrayOf()
    println("Original empty array: ${emptyArray.joinToString()}")
    RadixSort.sort(emptyArray)
    println("Sorted empty array:   ${emptyArray.joinToString()}\n")

    val singleElementArray = intArrayOf(42)
    println("Original single element array: ${singleElementArray.joinToString()}")
    RadixSort.sort(singleElementArray)
    println("Sorted single element array:   ${singleElementArray.joinToString()}\n")

    val allZerosArray = intArrayOf(0,0,0,0)
    println("Original all zeros array: ${allZerosArray.joinToString()}")
    RadixSort.sort(allZerosArray)
    println("Sorted all zeros array:   ${allZerosArray.joinToString()}\n")

    println("Note: This RadixSort implementation is for non-negative integers. Negative numbers in input will lead to incorrect results or warnings.")
    println("------------------------------------------------------------------\n")
}

fun main() {
    println("radixSort.kt execution started.")
    exampleUsageOfRadixSort()
    runRadixSortTests()
    println("radixSort.kt execution finished.")
}

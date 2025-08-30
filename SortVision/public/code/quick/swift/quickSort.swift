import Foundation

// MARK: - QuickSort Class

/// A class that implements the Quick Sort algorithm.
///
/// Quick Sort is a highly efficient, divide-and-conquer sorting algorithm.
/// It works by selecting a 'pivot' element from the array and partitioning the other
/// elements into two sub-arrays, according to whether they are less than or greater
/// than the pivot. The sub-arrays are then sorted recursively.
///
/// - Time Complexity:
///   - Best Case: O(n log n) - Occurs when the pivot element always divides the array into two nearly equal halves.
///   - Average Case: O(n log n) - Generally performs very well in practice.
///   - Worst Case: O(n^2) - Occurs when the pivot element is repeatedly the smallest or largest element
///     (e.g., for an already sorted or reverse-sorted array with a naive pivot selection like always choosing the first/last element).
///
/// - Space Complexity:
///   - O(log n) on average (due to the recursion stack depth).
///   - O(n) in the worst case (e.g., for a poorly chosen pivot leading to unbalanced partitions).
///
/// This implementation uses the Lomuto partition scheme with the last element as the pivot.
public class QuickSort {

    /// Sorts an array of integers in ascending order using the Quick Sort algorithm.
    /// This is a wrapper function that initiates the recursive quick sort process.
    ///
    /// - Parameter arr: An array of integers to be sorted. The array is modified in place.
    ///
    /// ### Example Usage:
    /// ```swift
    /// var numbers = [8, 3, 5, 4, 7, 6, 1, 2]
    /// QuickSort.sort(&numbers)
    /// print(numbers) // Output: [1, 2, 3, 4, 5, 6, 7, 8]
    /// ```
    public static func sort(_ arr: inout [Int]) {
        // Edge case: If the array has 0 or 1 element, it's already sorted.
        guard arr.count > 1 else {
            return
        }
        // Calls the recursive quickSort function with the initial bounds of the array.
        quickSort(&arr, low: 0, high: arr.count - 1)
    }

    /// Recursively sorts the subarrays.
    ///
    /// - Parameters:
    ///   - arr: The array to be sorted (passed by reference).
    ///   - low: The starting index of the subarray.
    ///   - high: The ending index of the subarray.
    private static func quickSort(_ arr: inout [Int], low: Int, high: Int) {
        if low < high {
            let pivotIndex = partition(&arr, low: low, high: high)
            quickSort(&arr, low: low, high: pivotIndex - 1)
            quickSort(&arr, low: pivotIndex + 1, high: high)
        }
    }
    /// - Parameters:
    ///   - arr: The array to be partitioned (passed by reference).
    ///   - low: The starting index of the subarray.
    ///   - high: The ending index of the subarray (and index of the pivot).
    /// - Returns: The index of the pivot element after partitioning.
    private static func partition(_ arr: inout [Int], low: Int, high: Int) -> Int {
        let pivot = arr[high]
        var i = low - 1
        for j in low..<high {
            if arr[j] <= pivot {
                i += 1
                arr.swapAt(i, j)
            }
        }
        arr.swapAt(i + 1, high)

        return i + 1
    }
}

// MARK: - Test Cases

/// Runs test cases for the QuickSort implementation.
func runQuickSortTests() {
    print("Running QuickSort Tests...\n")

    struct TestCase {
        let input: [Int]
        let expected: [Int]
        let description: String
    }

    let testCases: [TestCase] = [
        TestCase(input: [], expected: [], description: "Empty array"),
        TestCase(input: [1], expected: [1], description: "Single element array"),
        TestCase(input: [2, 1], expected: [1, 2], description: "Two elements, unsorted"),
        TestCase(input: [1, 2], expected: [1, 2], description: "Two elements, sorted"),
        TestCase(input: [3, 1, 2], expected: [1, 2, 3], description: "Three elements, unsorted"),
        TestCase(input: [8, 3, 5, 4, 7, 6, 1, 2], expected: [1, 2, 3, 4, 5, 6, 7, 8], description: "Multiple elements, unsorted"),
        TestCase(input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5], description: "Already sorted array"),
        TestCase(input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5], description: "Reverse sorted array"),
        TestCase(input: [3, 3, 1, 1, 2, 2], expected: [1, 1, 2, 2, 3, 3], description: "Array with duplicate elements"),
        TestCase(input: [2, 2, 2, 2, 2], expected: [2, 2, 2, 2, 2], description: "Array with all same elements"),
        TestCase(input: [10, -2, 0, 5, -8], expected: [-8, -2, 0, 5, 10], description: "Array with negative numbers"),
        TestCase(input: [0, 0, 0, 0], expected: [0, 0, 0, 0], description: "Array with all zeros"),
        TestCase(input: [1000, 2000, 500, 1500], expected: [500, 1000, 1500, 2000], description: "Array with larger numbers"),
        TestCase(input: [6, 1, 2, 7, 9, 3, 4, 5, 10, 8], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], description: "Slightly larger unsorted array")
    ]

    var testsPassed = 0
    var testsFailed = 0

    for testCase in testCases {
        var arrayToSort = testCase.input
        let originalArrayForLog = arrayToSort
        QuickSort.sort(&arrayToSort)
        if arrayToSort == testCase.expected {
            print("✅ Test Passed: \(testCase.description)")
            testsPassed += 1
        } else {
            print("❌ Test Failed: \(testCase.description) - Input: \(originalArrayForLog)")
            print("   Expected: \(testCase.expected)")
            print("   Got:      \(arrayToSort)")
            testsFailed += 1
        }
    }

    print("\n--- QuickSort Test Summary ---")
    if testsFailed == 0 {
        print("🎉 All \(testsPassed) QuickSort tests passed!")
    } else {
        print("⚠️ \(testsFailed) QuickSort test(s) failed out of \(testsPassed + testsFailed) total tests.")
    }
    print("---------------------------\n")
}

func exampleUsageOfQuickSort() {
    print("--- Example Usage of QuickSort ---")
    var numbers1 = [8, 3, 5, 4, 7, 6, 1, 2, 9, 0, -1, 15, -5]
    print("Original array 1: \(numbers1)")
    QuickSort.sort(&numbers1)
    print("Sorted array 1:   \(numbers1)\n")

    var numbers2 = [10, 1, 9, 2, 8, 3, 7, 4, 6, 5]
    print("Original array 2: \(numbers2)")
    QuickSort.sort(&numbers2)
    print("Sorted array 2:   \(numbers2)\n")

    var emptyArray: [Int] = []
    print("Original empty array: \(emptyArray)")
    QuickSort.sort(&emptyArray)
    print("Sorted empty array:   \(emptyArray)\n")

    var singleElementArray = [42]
    print("Original single element array: \(singleElementArray)")
    QuickSort.sort(&singleElementArray)
    print("Sorted single element array:   \(singleElementArray)\n")

    var sortedArray = [1, 2, 3, 4, 5, 6]
    print("Original sorted array: \(sortedArray)")
    QuickSort.sort(&sortedArray)
    print("Sorted 'sorted' array: \(sortedArray)\n")

    var reverseSortedArray = [6, 5, 4, 3, 2, 1]
    print("Original reverse sorted array: \(reverseSortedArray)")
    QuickSort.sort(&reverseSortedArray)
    print("Sorted 'reverse sorted' array: \(reverseSortedArray)")
    print("--------------------------------\n")
}
print("QuickSort.swift loaded. Call exampleUsageOfQuickSort() and runQuickSortTests() to see it in action.")

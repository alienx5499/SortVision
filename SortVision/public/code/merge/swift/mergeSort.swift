import Foundation
/// - Time Complexity: O(n log n) in all cases (worst, average, and best).
///   - The division step takes O(log n) levels of recursion.
///   - The merge step takes O(n) time at each level.
/// - Space Complexity: O(n) due to the temporary arrays used during the merge process.
///   For sorting linked lists, Merge Sort can be implemented with O(log n) space.
public class MergeSort {
    /// Sorts an array of integers in ascending order using the Merge Sort algorithm.
    /// This is a wrapper function that initiates the recursive merge sort process.
    ///
    /// - Parameter arr: An array of integers to be sorted. The array is modified in place.
    ///
    /// ### Example Usage:
    /// ```swift
    /// var numbers = [8, 3, 5, 4, 7, 6, 1, 2]
    /// MergeSort.sort(&numbers)
    /// print(numbers) // Output: [1, 2, 3, 4, 5, 6, 7, 8]
    /// ```
    public static func sort(_ arr: inout [Int]) {
        guard arr.count > 1 else {
            return
        }
        mergeSort(&arr, left: 0, right: arr.count - 1)
    }
    /// Recursively divides the array and sorts the subarrays.
    ///
    /// - Parameters:
    ///   - arr: The array to be sorted (passed by reference).
    ///   - left: The starting index of the subarray.
    ///   - right: The ending index of the subarray.
    private static func mergeSort(_ arr: inout [Int], left: Int, right: Int) {
        guard left < right else {
            return
        }
        let middle = left + (right - left) / 2
        mergeSort(&arr, left: left, right: middle)
        mergeSort(&arr, left: middle + 1, right: right)
        merge(&arr, left: left, middle: middle, right: right)
    }
    /// - Parameters:
    ///   - arr: The array containing the subarrays to be merged (passed by reference).
    ///   - left: The starting index of the first subarray.
    ///   - middle: The ending index of the first subarray.
    ///   - right: The ending index of the second subarray.
    private static func merge(_ arr: inout [Int], left: Int, middle: Int, right: Int) {
        let n1 = middle - left + 1
        let n2 = right - middle
        var L = [Int](repeating: 0, count: n1)
        var R = [Int](repeating: 0, count: n2)
        for i in 0..<n1 {
            L[i] = arr[left + i]
        }
        for j in 0..<n2 {
            R[j] = arr[middle + 1 + j]
        }
        var i = 0
        var j = 0
        var k = left

        while i < n1 && j < n2 {
            if L[i] <= R[j] {
                arr[k] = L[i]
                i += 1
            } else {
                arr[k] = R[j]
                j += 1
            }
            k += 1
        }
        while i < n1 {
            arr[k] = L[i]
            i += 1
            k += 1
        }
        while j < n2 {
            arr[k] = R[j]
            j += 1
            k += 1
        }
    }
}

// MARK: - Test Cases

/// Runs test cases for the MergeSort implementation.
func runMergeSortTests() {
    print("Running MergeSort Tests...\n")

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
        TestCase(input: [10, -2, 0, 5, -8], expected: [-8, -2, 0, 5, 10], description: "Array with negative numbers"),
        TestCase(input: [0, 0, 0, 0], expected: [0, 0, 0, 0], description: "Array with all zeros"),
        TestCase(input: [1000, 2000, 500, 1500], expected: [500, 1000, 1500, 2000], description: "Array with larger numbers"),
        TestCase(input: [6, 1, 2, 7, 9, 3, 4, 5, 10, 8], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], description: "Slightly larger unsorted array")
    ]

    var testsPassed = 0
    var testsFailed = 0

    for testCase in testCases {
        var arrayToSort = testCase.input
        MergeSort.sort(&arrayToSort)
        if arrayToSort == testCase.expected {
            print("✅ Test Passed: \(testCase.description) - Input: \(testCase.input) -> Output: \(arrayToSort)")
            testsPassed += 1
        } else {
            print("❌ Test Failed: \(testCase.description) - Input: \(testCase.input)")
            print("   Expected: \(testCase.expected)")
            print("   Got:      \(arrayToSort)")
            testsFailed += 1
        }
    }

    print("\n--- MergeSort Test Summary ---")
    if testsFailed == 0 {
        print("🎉 All \(testsPassed) MergeSort tests passed! 🎉")
    } else {
        print("⚠️ \(testsFailed) MergeSort test(s) failed out of \(testsPassed + testsFailed) total tests.")
    }
    print("---------------------------\n")
}

// MARK: - Example Usage
func exampleUsageOfMergeSort() {
    print("--- Example Usage of MergeSort ---")
    var numbers1 = [8, 3, 5, 4, 7, 6, 1, 2, 9, 0, -1]
    print("Original array 1: \(numbers1)")
    MergeSort.sort(&numbers1)
    print("Sorted array 1:   \(numbers1)\n")

    var numbers2 = [10, 1, 9, 2, 8, 3, 7, 4, 6, 5]
    print("Original array 2: \(numbers2)")
    MergeSort.sort(&numbers2)
    print("Sorted array 2:   \(numbers2)\n")

    var emptyArray: [Int] = []
    print("Original empty array: \(emptyArray)")
    MergeSort.sort(&emptyArray)
    print("Sorted empty array:   \(emptyArray)\n")

    var singleElementArray = [42]
    print("Original single element array: \(singleElementArray)")
    MergeSort.sort(&singleElementArray)
    print("Sorted single element array:   \(singleElementArray)")
    print("--------------------------------\n")
}

print("MergeSort.swift loaded. Call exampleUsageOfMergeSort() and runMergeSortTests() to see it in action.")

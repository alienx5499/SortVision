/// Insertion sort is a simple sorting algorithm that builds the final sorted array
/// one item at a time. It works by iterating through the array and for each element,
/// placing it in its correct position among the already sorted elements.
///
/// Time Complexity:
///   - Best Case: O(n)       → when the array is already sorted
///   - Average Case: O(n²)
///   - Worst Case: O(n²)     → when the array is reverse sorted
///
/// Space Complexity:
///   - O(1) → In-place sorting
///
/// Stability:
///   - Stable → maintains relative order of equal elements

class InsertionSort {

    /// Sorts an array of integers in ascending order using the insertion sort algorithm.
    ///
    /// - Parameter arr: The array of integers (passed by reference) to sort.
    static func sort(_ arr: inout [Int]) {
        let n = arr.count

        // Edge Case: No need to sort an empty or single-element array
        guard n > 1 else {
            return
        }

        // Loop through the array starting from the second element
        for i in 1..<n {
            let key = arr[i]
            var j = i - 1

            // Move elements that are greater than key to one position ahead
            while j >= 0 && arr[j] > key {
                arr[j + 1] = arr[j]
                j -= 1
            }

            // Place key at its correct sorted position
            arr[j + 1] = key
        }
    }
}

// Example usage

var exampleArray = [9, 5, 1, 4, 3]
print("Original array: \(exampleArray)")
InsertionSort.sort(&exampleArray)
print("Sorted array: \(exampleArray)")

// Test Cases

func testInsertionSort() {
    var test1 = [5, 2, 9, 1, 5, 6]
    InsertionSort.sort(&test1)
    assert(test1 == [1, 2, 5, 5, 6, 9], "Test 1 Failed")

    var test2: [Int] = []
    InsertionSort.sort(&test2)
    assert(test2 == [], "Test 2 Failed")

    var test3 = [42]
    InsertionSort.sort(&test3)
    assert(test3 == [42], "Test 3 Failed")

    var test4 = [2, 1]
    InsertionSort.sort(&test4)
    assert(test4 == [1, 2], "Test 4 Failed")

    var test5 = [10, -2, 33, 0, 5]
    InsertionSort.sort(&test5)
    assert(test5 == [-2, 0, 5, 10, 33], "Test 5 Failed")

    print("All test cases passed.")
}

testInsertionSort()

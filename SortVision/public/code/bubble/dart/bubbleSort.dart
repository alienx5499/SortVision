/*
Bubble Sort Implementation in Dart

Description: Sorts a list of integers using the bubble sort algorithm.

What this file includes:
- Implemented Bubble Sort Algorithm
- Comments to make code clear
- Time and Space Complexity Analysis
- Example usage
- Test cases
- Performance Optimization Notes

Bubble Sort Algorithm - Compares adjacent elements over n-1 iterations
and swaps the numbers to increasing order.
*/

/// Bubble Sort class containing the sorting algorithm
class BubbleSort {
  /// Sorts a list of integers using the Bubble Sort algorithm.
  ///
  /// Args:
  ///   arr: List of integers to sort
  ///
  /// Returns:
  ///   void: Sorts the list in-place
  ///
  /// Time Complexity: O(n^2) in worst and average cases, O(n) in best case (already sorted)
  /// Space Complexity: O(1) as it's an in-place sorting algorithm
  ///
  /// Examples:
  ///   var myList = [64, 34, 25, 12, 22, 11, 90];
  ///   BubbleSort.sort(myList);
  ///   print(myList); // [11, 12, 22, 25, 34, 64, 90]
  ///
  ///   var emptyList = <int>[];
  ///   BubbleSort.sort(emptyList);
  ///   print(emptyList); // []
  ///
  ///   var sortedList = [1, 2, 3];
  ///   BubbleSort.sort(sortedList);
  ///   print(sortedList); // [1, 2, 3]
  static void sort(List<int> arr) {
    int n = arr.length;

    // If array is empty or has one element, it's already sorted
    if (n <= 1) {
      return;
    }

    // Traverse through all array elements
    for (int i = 0; i < n - 1; i++) {
      bool swapped = false; // To optimize: stop if no swaps in inner loop

      // Last i elements are already in place
      for (int j = 0; j < n - i - 1; j++) {
        // Swap if the element found is greater than the next element
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
        }
      }

      // If no elements were swapped, array is sorted
      if (!swapped) {
        break;
      }
    }
  }
}

/*
Time Complexity Analysis:
- Iterations: O(n)
- Comparisons: O(n)
- Overall Time complexity: O(n * n) = O(n^2)

Space Complexity:
- In-place sorting: O(1)
*/

/// Example usage and test cases
void main() {
  // Example usage
  var example = [4, 1, 3, 2, 10, 7];
  print("Original: $example");
  BubbleSort.sort(example);
  print("Sorted: $example");

  // Test cases
  runTestCases();
}

/// Runs comprehensive test cases for the bubble sort algorithm
void runTestCases() {
  print("\n=== Running Test Cases ===");

  // Test case 1: Empty array
  var test1 = <int>[];
  var expected1 = <int>[];
  BubbleSort.sort(test1);
  print("Test 1 (Empty array): ${_arraysEqual(test1, expected1) ? 'Passed!' : 'Failed!'}");

  // Test case 2: Single element
  var test2 = [1];
  var expected2 = [1];
  BubbleSort.sort(test2);
  print("Test 2 (Single element): ${_arraysEqual(test2, expected2) ? 'Passed!' : 'Failed!'}");

  // Test case 3: Two elements
  var test3 = [2, 1];
  var expected3 = [1, 2];
  BubbleSort.sort(test3);
  print("Test 3 (Two elements): ${_arraysEqual(test3, expected3) ? 'Passed!' : 'Failed!'}");

  // Test case 4: Already sorted
  var test4 = [1, 2, 3, 4, 5];
  var expected4 = [1, 2, 3, 4, 5];
  BubbleSort.sort(test4);
  print("Test 4 (Already sorted): ${_arraysEqual(test4, expected4) ? 'Passed!' : 'Failed!'}");

  // Test case 5: Duplicate elements
  var test5 = [2, 2, 2];
  var expected5 = [2, 2, 2];
  BubbleSort.sort(test5);
  print("Test 5 (Duplicate elements): ${_arraysEqual(test5, expected5) ? 'Passed!' : 'Failed!'}");

  // Test case 6: Random array
  var test6 = [10, 3, 1, 2, 4, 11, 7, 6];
  var expected6 = [1, 2, 3, 4, 6, 7, 10, 11];
  BubbleSort.sort(test6);
  print("Test 6 (Random array): ${_arraysEqual(test6, expected6) ? 'Passed!' : 'Failed!'}");

  // Test case 7: Alternating elements
  var test7 = [1, 2, 1, 2, 1, 2, 1];
  var expected7 = [1, 1, 1, 1, 2, 2, 2];
  BubbleSort.sort(test7);
  print("Test 7 (Alternating elements): ${_arraysEqual(test7, expected7) ? 'Passed!' : 'Failed!'}");

  // Test case 8: Large array
  var test8 = [64, 34, 25, 12, 22, 11, 90];
  var expected8 = [11, 12, 22, 25, 34, 64, 90];
  BubbleSort.sort(test8);
  print("Test 8 (Large array): ${_arraysEqual(test8, expected8) ? 'Passed!' : 'Failed!'}");

  print("=== Test Cases Complete ===\n");
}

/// Helper function to compare two arrays
bool _arraysEqual(List<int> arr1, List<int> arr2) {
  if (arr1.length != arr2.length) return false;
  for (int i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) return false;
  }
  return true;
}

/*
Performance Optimization Notes:
- Stop early if array is already sorted using boolean swapped variable.
- This is best case as this is O(n) time complexity.
- After every pass, the largest unsorted element is at the correct position.
- No need to check the last i elements again—they are already sorted.
- The algorithm is stable, meaning equal elements maintain their relative order.
*/

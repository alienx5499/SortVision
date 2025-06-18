// File: quickSort.dart
// Path: SortVision/public/code/quick/dart/quickSort.dart
// Description: Efficient Quick Sort implementation in Dart with comprehensive comments,
//              time & space complexity analysis, example usage, and test cases.

class QuickSort {
  /// Public wrapper to sort the entire list [arr] in-place using Quick Sort.
  /// Handles edge cases: null, empty list, single-element list.
  static void sort(List<int>? arr) {
    if (arr == null || arr.length <= 1) {
      // Nothing to sort
      return;
    }
    _quickSort(arr, 0, arr.length - 1);
  }

  /// Internal recursive Quick Sort implementation.
  /// Sorts the sublist arr[low..high] in-place.
  static void _quickSort(List<int> arr, int low, int high) {
    if (low < high) {
      int pivotIndex = _partition(arr, low, high);
      _quickSort(arr, low, pivotIndex - 1);
      _quickSort(arr, pivotIndex + 1, high);
    }
  }

  /// Partition step using Lomuto’s scheme:
  /// - Chooses last element as pivot
  /// - Rearranges elements so that those <= pivot come before it,
  ///   and those > pivot come after.
  /// Returns the final pivot index.
  static int _partition(List<int> arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1; // boundary for elements <= pivot

    for (int j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        _swap(arr, i, j);
      }
    }
    _swap(arr, i + 1, high);
    return i + 1;
  }

  /// Swaps elements at indices i and j in the list.
  static void _swap(List<int> arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

/// === Time & Space Complexity ===
///
/// - Average Time Complexity: O(n log n)
/// - Worst-case Time Complexity: O(n²)  (when the pivot is always max/min)
/// - Best-case Time Complexity: O(n log n)
/// - Space Complexity: O(log n) on average (due to recursion stack)
///                   O(n) in worst-case recursion depth

void main() {
  // === Example Usage ===
  List<int> sample = [10, 7, 8, 9, 1, 5];
  print('Original: $sample');
  QuickSort.sort(sample);
  print('Sorted:   $sample\n');

  // === Test Cases ===

  // 1. Already sorted
  var sorted = [1, 2, 3, 4, 5];
  QuickSort.sort(sorted);
  assert(sorted.join(',') == '1,2,3,4,5');

  // 2. Reverse sorted
  var reversed = [5, 4, 3, 2, 1];
  QuickSort.sort(reversed);
  assert(reversed.join(',') == '1,2,3,4,5');

  // 3. Duplicates
  var withDuplicates = [3, 6, 2, 3, 1, 2];
  QuickSort.sort(withDuplicates);
  assert(withDuplicates.join(',') == '1,2,2,3,3,6');

  // 4. Single element
  var single = [42];
  QuickSort.sort(single);
  assert(single.length == 1 && single[0] == 42);

  // 5. Empty & null
  var empty = <int>[];
  QuickSort.sort(empty);
  assert(empty.isEmpty);
  List<int>? nullList;
  QuickSort.sort(nullList);
  // no exception should be thrown

  print('All test cases passed!');
}

/// === Performance Optimization Notes ===
/// - Using Lomuto’s partition is simple and efficient for typical inputs.
/// - To avoid worst-case on already sorted data, consider:
///     • Randomizing pivot (swap a random element with arr[high] before partition)
///     • Using “median-of-three” (median of low, mid, high indices) as pivot
/// - In-place sorting reduces memory overhead compared to other divide-and-conquer sorts.

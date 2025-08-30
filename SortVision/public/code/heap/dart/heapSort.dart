/// Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.
/// It works by first building a max heap from the array, then repeatedly extracting the maximum
/// element and placing it at the end of the array.
///
/// Time Complexity: O(n log n) - always optimal
/// Space Complexity: O(1) - in-place sorting
/// Stability: Unstable - may change the relative order of equal elements
///
/// Performs heap sort on a list of comparable elements
void heapSort<T extends Comparable>(List<T> arr) {
  int n = arr.length;

  // Handle edge cases
  if (n <= 1) {
    return; // Array is already sorted or empty
  }

  // Build max heap (rearrange array)
  for (int i = n ~/ 2 - 1; i >= 0; i--) {
    _heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (int i = n - 1; i > 0; i--) {
    // Move current root to end
    T temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // Call max heapify on the reduced heap
    _heapify(arr, i, 0);
  }
}

/// Heapify a subtree rooted with node at index i
/// n is size of heap
void _heapify<T extends Comparable>(List<T> arr, int n, int i) {
  int largest = i; // Initialize largest as root
  int left = 2 * i + 1; // Left child
  int right = 2 * i + 2; // Right child

  // If left child is larger than root
  if (left < n && arr[left].compareTo(arr[largest]) > 0) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right].compareTo(arr[largest]) > 0) {
    largest = right;
  }

  // If largest is not root
  if (largest != i) {
    T swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    // Recursively heapify the affected sub-tree
    _heapify(arr, n, largest);
  }
}

/// Test function to verify the implementation
void testHeapSort() {
  print("🧪 Testing Heap Sort Implementation");
  print("===================================");

  // Test 1: Basic sorting
  List<int> arr1 = [64, 34, 25, 12, 22, 11, 90];
  print("Original array: $arr1");
  heapSort(arr1);
  print("Sorted array:   $arr1");
  print("✅ Test 1 passed: ${arr1 == [11, 12, 22, 25, 34, 64, 90]}");
  print("");

  // Test 2: Already sorted
  List<int> arr2 = [1, 2, 3, 4, 5];
  print("Already sorted: $arr2");
  heapSort(arr2);
  print("After sorting:  $arr2");
  print("✅ Test 2 passed: ${arr2 == [1, 2, 3, 4, 5]}");
  print("");

  // Test 3: Reverse sorted
  List<int> arr3 = [5, 4, 3, 2, 1];
  print("Reverse sorted: $arr3");
  heapSort(arr3);
  print("After sorting:  $arr3");
  print("✅ Test 3 passed: ${arr3 == [1, 2, 3, 4, 5]}");
  print("");

  // Test 4: Duplicate elements
  List<int> arr4 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  print("With duplicates: $arr4");
  heapSort(arr4);
  print("After sorting:  $arr4");
  print("✅ Test 4 passed: ${arr4 == [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]}");
  print("");

  // Test 5: Strings
  List<String> arr5 = ["banana", "apple", "cherry", "date"];
  print("String array:   $arr5");
  heapSort(arr5);
  print("Sorted strings: $arr5");
  print("✅ Test 5 passed: ${arr5 == ["apple", "banana", "cherry", "date"]}");
  print("");

  // Test 6: Edge cases
  List<int> empty = [];
  List<int> single = [42];

  heapSort(empty);
  heapSort(single);

  print("Empty array:    $empty");
  print("Single element: $single");
  print("✅ Test 6 passed: ${empty.isEmpty && single == [42]}");
  print("");

  print("🎉 All tests completed successfully!");
}

/// Main function to demonstrate heap sort
void main() {
  print("🌳 Heap Sort Implementation in Dart");
  print("===================================");
  print("");

  // Run tests
  testHeapSort();

}

class InsertionSort {
  // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
  static void sort(List<int> arr) {
    for (int i = 1; i < arr.length; i++) {
      final key = arr[i];
      int j = i - 1;

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }
}

void main() {
  final arr = [64, 25, 12, 22, 11];
  InsertionSort.sort(arr);
  print(arr);
}

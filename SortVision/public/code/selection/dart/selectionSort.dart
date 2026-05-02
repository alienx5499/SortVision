class SelectionSort {
  // Time: Best/Avg/Worst O(n^2), Space: O(1)
  static void sort(List<int> arr) {
    for (int i = 0; i < arr.length - 1; i++) {
      int minIdx = i;
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx != i) {
        final t = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = t;
      }
    }
  }
}

void main() {
  final arr = [64, 25, 12, 22, 11];
  SelectionSort.sort(arr);
  print(arr);
}

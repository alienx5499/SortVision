class BubbleSort {
  // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
  static void sort(List<int> arr) {
    for (int i = 0; i < arr.length - 1; i++) {
      bool swapped = false;
      for (int j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          final t = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = t;
          swapped = true;
        }
      }
      if (!swapped) break;
    }
  }
}

void main() {
  final arr = [64, 34, 25, 12, 22, 11, 90];
  BubbleSort.sort(arr);
  print(arr);
}

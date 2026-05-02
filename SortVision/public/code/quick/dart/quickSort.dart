class QuickSort {
  // Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
  static void sort(List<int> arr) {
    if (arr.length <= 1) return;
    _sort(arr, 0, arr.length - 1);
  }

  static void _sort(List<int> arr, int low, int high) {
    if (low >= high) return;
    final p = _partition(arr, low, high);
    _sort(arr, low, p - 1);
    _sort(arr, p + 1, high);
  }

  static int _partition(List<int> arr, int low, int high) {
    final pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        final t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
    }

    final t = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = t;
    return i + 1;
  }
}

void main() {
  final arr = [64, 25, 12, 22, 11];
  QuickSort.sort(arr);
  print(arr);
}

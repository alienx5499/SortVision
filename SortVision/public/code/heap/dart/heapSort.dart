class HeapSort {
  // Time: Best/Avg/Worst O(n log n), Space: O(1)
  static void sort(List<int> arr) {
    final n = arr.length;
    for (int i = n ~/ 2 - 1; i >= 0; i--) {
      _heapify(arr, n, i);
    }
    for (int i = n - 1; i > 0; i--) {
      final t = arr[0];
      arr[0] = arr[i];
      arr[i] = t;
      _heapify(arr, i, 0);
    }
  }

  static void _heapify(List<int> arr, int n, int i) {
    int largest = i;
    final left = 2 * i + 1;
    final right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest != i) {
      final t = arr[i];
      arr[i] = arr[largest];
      arr[largest] = t;
      _heapify(arr, n, largest);
    }
  }
}

void main() {
  final arr = [64, 25, 12, 22, 11];
  HeapSort.sort(arr);
  print(arr);
}

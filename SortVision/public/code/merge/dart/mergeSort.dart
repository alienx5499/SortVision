class MergeSort {
  // Time: Best/Avg/Worst O(n log n), Space: O(n)
  static void sort(List<int> arr) {
    if (arr.length <= 1) return;
    _sort(arr, 0, arr.length - 1);
  }

  static void _sort(List<int> arr, int left, int right) {
    if (left >= right) return;
    final mid = left + (right - left) ~/ 2;
    _sort(arr, left, mid);
    _sort(arr, mid + 1, right);
    _merge(arr, left, mid, right);
  }

  static void _merge(List<int> arr, int left, int mid, int right) {
    final temp = <int>[];
    int i = left, j = mid + 1;

    while (i <= mid && j <= right) {
      temp.add(arr[i] <= arr[j] ? arr[i++] : arr[j++]);
    }
    while (i <= mid) temp.add(arr[i++]);
    while (j <= right) temp.add(arr[j++]);

    for (int k = 0; k < temp.length; k++) arr[left + k] = temp[k];
  }
}

void main() {
  final arr = [64, 25, 12, 22, 11];
  MergeSort.sort(arr);
  print(arr);
}

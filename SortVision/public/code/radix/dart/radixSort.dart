class RadixSort {
  // Radix Sort (LSD, base 10, non-negative integers)
  // Time: O(d * (n + k)), Space: O(n + k)
  static void sort(List<int> arr) {
    if (arr.length <= 1) return;

    int maxVal = arr.reduce((a, b) => a > b ? a : b);
    for (int exp = 1; maxVal ~/ exp > 0; exp *= 10) {
      _countingSortByExp(arr, exp);
    }
  }

  static void _countingSortByExp(List<int> arr, int exp) {
    final output = List<int>.filled(arr.length, 0);
    final count = List<int>.filled(10, 0);

    for (final x in arr) count[(x ~/ exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];

    for (int i = arr.length - 1; i >= 0; i--) {
      final digit = (arr[i] ~/ exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }

    for (int i = 0; i < arr.length; i++) arr[i] = output[i];
  }
}

void main() {
  final arr = [170, 45, 75, 90, 802, 24, 2, 66];
  RadixSort.sort(arr);
  print(arr);
}

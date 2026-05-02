class BucketSort {
  // Bucket Sort (for floats in [0, 1))
  // Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
  static void sort(List<double> arr) {
    if (arr.length <= 1) return;

    final n = arr.length;
    final buckets = List.generate(n, (_) => <double>[]);

    for (final x in arr) {
      final idx = (x * n).floor().clamp(0, n - 1);
      buckets[idx].add(x);
    }

    int k = 0;
    for (final bucket in buckets) {
      bucket.sort();
      for (final x in bucket) arr[k++] = x;
    }
  }
}

void main() {
  final arr = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];
  BucketSort.sort(arr);
  print(arr);
}

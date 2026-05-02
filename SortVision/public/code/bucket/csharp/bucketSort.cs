using System;
using System.Collections.Generic;

public static class BucketSort {
    // Bucket Sort (for floats in [0, 1))
    // Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
    public static void Sort(float[] arr) {
        if (arr == null || arr.Length <= 1) return;

        int n = arr.Length;
        var buckets = new List<float>[n];
        for (int i = 0; i < n; i++) buckets[i] = new List<float>();

        foreach (float x in arr) {
            int idx = Math.Min(n - 1, (int)(x * n));
            buckets[idx].Add(x);
        }

        int k = 0;
        foreach (var bucket in buckets) {
            bucket.Sort();
            foreach (float x in bucket) arr[k++] = x;
        }
    }

    public static void Main() {
        float[] arr = {0.42f, 0.32f, 0.23f, 0.52f, 0.25f, 0.47f, 0.51f};
        Sort(arr);
        Console.WriteLine(string.Join(", ", arr));
    }
}

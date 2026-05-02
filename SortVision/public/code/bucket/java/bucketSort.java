import java.util.ArrayList;
import java.util.Collections;

public class BucketSort {
    // Bucket Sort (for floats in [0, 1))
    // Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
    public static void bucketSort(float[] arr) {
        if (arr == null || arr.length <= 1) return;

        int n = arr.length;
        ArrayList<Float>[] buckets = new ArrayList[n];
        for (int i = 0; i < n; i++) buckets[i] = new ArrayList<>();

        for (float x : arr) {
            int idx = Math.min(n - 1, (int)(x * n));
            buckets[idx].add(x);
        }

        int k = 0;
        for (ArrayList<Float> bucket : buckets) {
            Collections.sort(bucket);
            for (float x : bucket) arr[k++] = x;
        }
    }

    public static void main(String[] args) {
        float[] arr = {0.42f, 0.32f, 0.23f, 0.52f, 0.25f, 0.47f, 0.51f};
        bucketSort(arr);
        for (float x : arr) System.out.print(x + " ");
        System.out.println();
    }
}

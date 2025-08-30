package bucket.java;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * BucketSort class implements the bucket sort algorithm for sorting float arrays.
 *
 * Time Complexity: Average O(n + k), Worst O(n^2) where k is number of buckets.
 * Space Complexity: O(n + k)
 *
 * @author YourName
 */
public class BucketSort {

    /**
     * Sorts an array of floats using bucket sort algorithm.
     * @param arr The array of floats to be sorted
     */
    @SuppressWarnings("unchecked") // Suppress unchecked cast warning for generic array
    public static void bucketSort(float[] arr) {
        if (arr == null || arr.length <= 1) {
            return; // Already sorted or invalid input
        }

        int n = arr.length;

        // Create buckets: This cast causes unchecked warning, so suppressed above
        List<Float>[] buckets = (List<Float>[]) new ArrayList[n];

        for (int i = 0; i < n; i++) {
            buckets[i] = new ArrayList<>();
        }

        // Find max and min values to normalize the data
        float max = arr[0];
        float min = arr[0];
        for (float num : arr) {
            if (num > max) max = num;
            if (num < min) min = num;
        }

        float range = max - min;

        // Distribute input array values into buckets
        for (float num : arr) {
            int bucketIndex = (int) ((num - min) / range * (n - 1));
            buckets[bucketIndex].add(num);
        }

        // Sort individual buckets using Collections.sort()
        for (List<Float> bucket : buckets) {
            Collections.sort(bucket);
        }

        // Concatenate buckets back to original array
        int index = 0;
        for (List<Float> bucket : buckets) {
            for (float num : bucket) {
                arr[index++] = num;
            }
        }
    }

    /**
     * Example usage and basic test cases
     */
    public static void main(String[] args) {
        float[] arr = {0.42f, 0.32f, 0.23f, 0.52f, 0.25f, 0.47f, 0.51f};
        System.out.println("Before sorting:");
        printArray(arr);

        bucketSort(arr);

        System.out.println("After sorting:");
        printArray(arr);

        // Additional test cases
        testBucketSort();
    }

    /**
     * Utility method to print array
     */
    private static void printArray(float[] arr) {
        for (float num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    /**
     * Simple test cases to validate bucket sort
     */
    private static void testBucketSort() {
        // Test empty array
        float[] empty = {};
        bucketSort(empty);
        assert empty.length == 0;

        // Test single element
        float[] single = {0.5f};
        bucketSort(single);
        assert single[0] == 0.5f;

        // Test sorted array
        float[] sorted = {0.1f, 0.2f, 0.3f};
        bucketSort(sorted);
        assert sorted[0] <= sorted[1] && sorted[1] <= sorted[2];

        // Test reversed array
        float[] reversed = {0.9f, 0.7f, 0.5f};
        bucketSort(reversed);
        assert reversed[0] <= reversed[1] && reversed[1] <= reversed[2];

        System.out.println("All test cases passed!");
    }
}

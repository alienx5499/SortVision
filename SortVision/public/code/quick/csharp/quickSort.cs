using System;

public static class QuickSort {
    // Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
    public static void Sort(int[] arr) {
        if (arr == null || arr.Length <= 1) return;
        SortRange(arr, 0, arr.Length - 1);
    }

    private static void SortRange(int[] arr, int low, int high) {
        if (low >= high) return;
        int p = Partition(arr, low, high);
        SortRange(arr, low, p - 1);
        SortRange(arr, p + 1, high);
    }

    private static int Partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                (arr[i], arr[j]) = (arr[j], arr[i]);
            }
        }

        (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);
        return i + 1;
    }

    public static void Main() {
        int[] arr = {64, 25, 12, 22, 11};
        Sort(arr);
        Console.WriteLine(string.Join(", ", arr));
    }
}

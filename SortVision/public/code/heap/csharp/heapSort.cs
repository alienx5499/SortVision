using System;

public static class HeapSort {
    // Time: Best/Avg/Worst O(n log n), Space: O(1)
    public static void Sort(int[] arr) {
        if (arr == null || arr.Length <= 1) return;

        int n = arr.Length;
        for (int i = n / 2 - 1; i >= 0; i--) Heapify(arr, n, i);
        for (int i = n - 1; i > 0; i--) {
            (arr[0], arr[i]) = (arr[i], arr[0]);
            Heapify(arr, i, 0);
        }
    }

    private static void Heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            (arr[i], arr[largest]) = (arr[largest], arr[i]);
            Heapify(arr, n, largest);
        }
    }

    public static void Main() {
        int[] arr = {64, 25, 12, 22, 11};
        Sort(arr);
        Console.WriteLine(string.Join(", ", arr));
    }
}

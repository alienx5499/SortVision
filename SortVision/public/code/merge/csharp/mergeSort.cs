using System;

public static class MergeSort {
    // Time: Best/Avg/Worst O(n log n), Space: O(n)
    public static void Sort(int[] arr) {
        if (arr == null || arr.Length <= 1) return;
        SortRange(arr, 0, arr.Length - 1);
    }

    private static void SortRange(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        SortRange(arr, left, mid);
        SortRange(arr, mid + 1, right);
        Merge(arr, left, mid, right);
    }

    private static void Merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right) {
            temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        for (int x = 0; x < temp.Length; x++) arr[left + x] = temp[x];
    }

    public static void Main() {
        int[] arr = {64, 25, 12, 22, 11};
        Sort(arr);
        Console.WriteLine(string.Join(", ", arr));
    }
}

using System;

public static class InsertionSort {
    // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
    public static void Sort(int[] arr) {
        if (arr == null || arr.Length <= 1) return;

        for (int i = 1; i < arr.Length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void Main() {
        int[] arr = {64, 25, 12, 22, 11};
        Sort(arr);
        Console.WriteLine(string.Join(", ", arr));
    }
}

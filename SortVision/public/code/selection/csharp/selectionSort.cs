using System;

public static class SelectionSort {
    // Time: Best/Avg/Worst O(n^2), Space: O(1)
    public static void Sort(int[] arr) {
        if (arr == null || arr.Length <= 1) return;

        for (int i = 0; i < arr.Length - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.Length; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx != i) (arr[i], arr[minIdx]) = (arr[minIdx], arr[i]);
        }
    }

    public static void Main() {
        int[] arr = {64, 25, 12, 22, 11};
        Sort(arr);
        Console.WriteLine(string.Join(", ", arr));
    }
}

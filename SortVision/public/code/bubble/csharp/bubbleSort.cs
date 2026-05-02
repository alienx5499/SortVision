using System;

public static class BubbleSort {
    // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
    public static void Sort(int[] arr) {
        if (arr == null || arr.Length <= 1) return;

        for (int i = 0; i < arr.Length - 1; i++) {
            bool swapped = false;
            for (int j = 0; j < arr.Length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void Main() {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        Sort(arr);
        Console.WriteLine(string.Join(", ", arr));
    }
}

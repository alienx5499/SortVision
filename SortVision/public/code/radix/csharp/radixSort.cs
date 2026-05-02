using System;

public static class RadixSort {
    // Radix Sort (LSD, base 10, non-negative integers)
    // Time: O(d * (n + k)), Space: O(n + k)
    public static void Sort(int[] arr) {
        if (arr == null || arr.Length <= 1) return;

        int maxVal = GetMax(arr);
        for (int exp = 1; maxVal / exp > 0; exp *= 10) {
            CountingSortByExp(arr, exp);
        }
    }

    private static int GetMax(int[] arr) {
        int mx = arr[0];
        foreach (int x in arr) if (x > mx) mx = x;
        return mx;
    }

    private static void CountingSortByExp(int[] arr, int exp) {
        int n = arr.Length;
        int[] output = new int[n];
        int[] count = new int[10];

        for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
        for (int i = 1; i < 10; i++) count[i] += count[i - 1];

        for (int i = n - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        for (int i = 0; i < n; i++) arr[i] = output[i];
    }

    public static void Main() {
        int[] arr = {170, 45, 75, 90, 802, 24, 2, 66};
        Sort(arr);
        Console.WriteLine(string.Join(", ", arr));
    }
}

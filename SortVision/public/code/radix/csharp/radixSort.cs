using System;
using System.Collections.Generic;

public class RadixSort {
    private static int _radix = 10;

    public static int Radix {
        get { return _radix; }
        set {
            if (value < 2) {
                throw new ArgumentException("Radix must be at least 2");
            }
            _radix = value;
        }
    }

    public static void Sort(int[] arr) {
        if (arr == null || arr.Length <= 1) {
            return;
        }

        List<int> negatives = new List<int>();
        List<int> nonNegatives = new List<int>();

        foreach (int num in arr) {
            if (num < 0) {
                negatives.Add(-num);
            } else {
                nonNegatives.Add(num);
            }
        }

        int[] negativesArr = negatives.ToArray();
        int[] nonNegativesArr = nonNegatives.ToArray();

        if (nonNegativesArr.Length > 0) {
            RadixSortHelper(nonNegativesArr);
        }

        if (negativesArr.Length > 0) {
            RadixSortHelper(negativesArr);
            Array.Reverse(negativesArr);
            for (int i = 0; i < negativesArr.Length; i++) {
                negativesArr[i] = -negativesArr[i];
            }
        }

        int index = 0;
        foreach (int num in negativesArr) {
            arr[index++] = num;
        }
        foreach (int num in nonNegativesArr) {
            arr[index++] = num;
        }
    }

    private static void RadixSortHelper(int[] arr) {
        int max = GetMax(arr);
        int exp = 1;

        while (max / exp > 0) {
            CountingSort(arr, exp);
            exp *= Radix;
        }
    }

    private static int GetMax(int[] arr) {
        if (arr == null || arr.Length == 0) {
            throw new ArgumentException("Array must not be null or empty");
        }

        int max = arr[0];
        for (int i = 1; i < arr.Length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }

    private static void CountingSort(int[] arr, int exp) {
        int n = arr.Length;
        int[] output = new int[n];
        int[] count = new int[Radix];

        for (int i = 0; i < Radix; i++) {
            count[i] = 0;
        }

        for (int i = 0; i < n; i++) {
            int digit = (arr[i] / exp) % Radix;
            count[digit]++;
        }

        for (int i = 1; i < Radix; i++) {
            count[i] += count[i - 1];
        }

        for (int i = n - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % Radix;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        for (int i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }

    private static int GetDigitCount(int number) {
        if (number == 0) {
            return 1;
        }
        int count = 0;
        int n = Math.Abs(number);
        while (n > 0) {
            count++;
            n /= Radix;
        }
        return count;
    }

    private static int GetDigit(int number, int position) {
        int n = Math.Abs(number);
        for (int i = 0; i < position; i++) {
            n /= Radix;
        }
        return n % Radix;
    }

    public static void Main() {
        RunTests();
    }

    private static void RunTests() {
        Test("Test1: Random positives", new int[] { 170, 45, 75, 90, 802, 24, 2, 66 });
        Test("Test2: Mixed negatives", new int[] { -5, -10, 3, 2, -1, 0 });
        Test("Test3: Already sorted", new int[] { -10, -5, -1, 0, 2, 3 });
        Test("Test4: Reverse sorted", new int[] { 3, 2, 0, -1, -5, -10 });
        Test("Test5: Single element", new int[] { 1 });
        Test("Test6: Empty array", new int[] { });
        Test("Test7: All negatives", new int[] { -5, -1, -10, -2 });
        Test("Test8: All zeros", new int[] { 0, 0, 0, 0 });
        Test("Test9: Radix 16", new int[] { 0x1A, 0x2B, 0x3C, 0x4D, 0x5E }, 16);
    }

    private static void Test(string testName, int[] arr, int? radix = null) {
        Console.WriteLine($"Running {testName}");
        Console.WriteLine($"Original Array: {string.Join(", ", arr)}");
        int originalRadix = Radix;
        if (radix.HasValue) {
            Radix = radix.Value;
        }

        try {
            Sort(arr);
            Console.WriteLine($"Sorted Array: {string.Join(", ", arr)}");
            Console.WriteLine($"Is Sorted: {IsSorted(arr)}");
        } catch (Exception ex) {
            Console.WriteLine($"Error: {ex.Message}");
        } finally {
            Radix = originalRadix;
        }
        Console.WriteLine();
    }

    private static bool IsSorted(int[] arr) {
        if (arr.Length <= 1) {
            return true;
        }

        for (int i = 1; i < arr.Length; i++) {
            if (arr[i - 1] > arr[i]) {
                return false;
            }
        }
        return true;
    }
}

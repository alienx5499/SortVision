// File: selectionSort.cs
// Path: SortVision/public/code/selection/csharp/selectionSort.cs
// Description: Clean and efficient Selection Sort implementation in C#
//                • Handles edge cases (null, empty, single-element arrays)
//                • In-place sorting
//                • Detailed comments and complexity analysis
//                • Example usage and test cases

using System;

public class SelectionSort
{
    /// <summary>
    /// Sorts the given integer array in ascending order using Selection Sort.
    /// </summary>
    /// <param name="arr">The array to sort. If null or length ≤ 1, no action is taken.</param>
    public static void Sort(int[] arr)
    {
        // Edge-case handling
        if (arr == null || arr.Length <= 1)
            return;

        int n = arr.Length;

        // One by one move boundary of unsorted subarray
        for (int i = 0; i < n - 1; i++)
        {
            // Assume the minimum element is at the current position
            int minIndex = i;

            // Find the index of the minimum element in the rest of the array
            for (int j = i + 1; j < n; j++)
            {
                if (arr[j] < arr[minIndex])
                {
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the first element
            if (minIndex != i)
            {
                Swap(arr, i, minIndex);
            }
        }
    }

    /// <summary>
    /// Swaps two elements in the array.
    /// </summary>
    private static void Swap(int[] arr, int i, int j)
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    /// <summary>
    /// Example usage and basic test cases for Selection Sort.
    /// </summary>
    public static void Main()
    {
        Console.WriteLine("Selection Sort Demo\n");

        // Test 1: Normal array
        int[] test1 = { 64, 25, 12, 22, 11 };
        Console.WriteLine("Original: " + string.Join(", ", test1));
        Sort(test1);
        Console.WriteLine("Sorted:   " + string.Join(", ", test1));
        Console.WriteLine();

        // Test 2: Already sorted array
        int[] test2 = { 1, 2, 3, 4, 5 };
        Console.WriteLine("Original: " + string.Join(", ", test2));
        Sort(test2);
        Console.WriteLine("Sorted:   " + string.Join(", ", test2));
        Console.WriteLine();

        // Test 3: Reverse sorted
        int[] test3 = { 5, 4, 3, 2, 1 };
        Console.WriteLine("Original: " + string.Join(", ", test3));
        Sort(test3);
        Console.WriteLine("Sorted:   " + string.Join(", ", test3));
        Console.WriteLine();

        // Test 4: Single-element and empty/null arrays
        int[] single = { 42 };
        int[] empty = new int[0];
        int[] nullArr = null;

        Console.WriteLine("Single-element before: " + string.Join(", ", single));
        Sort(single);
        Console.WriteLine("Single-element after:  " + string.Join(", ", single));
        Console.WriteLine("Empty array sorting completes without error.");
        Sort(empty);
        Console.WriteLine("Null array sorting completes without error.");
        Sort(nullArr);
    }
}

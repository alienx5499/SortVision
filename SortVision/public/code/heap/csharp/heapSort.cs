using System;

public class HeapSort
{
    // Main sorting method
    public static void Sort(int[] arr)
    {
        // Validate input
        if (arr == null)
            throw new ArgumentNullException(nameof(arr), "Input array cannot be null");

        int n = arr.Length;
        if (n <= 1) return;  // Already sorted for empty/single-element arrays

        // Build initial max-heap
        BuildMaxHeap(arr);

        // Extract elements one by one from heap
        for (int i = n - 1; i > 0; i--)
        {
            // Move current root to end
            Swap(arr, 0, i);

            // Heapify the reduced heap
            Heapify(arr, i, 0);
        }
    }

    // Maintain max-heap property for a subtree
    private static void Heapify(int[] arr, int heapSize, int index)
    {
        int largest = index;            // Initialize largest as root
        int leftChild = 2 * index + 1;  // Left child index
        int rightChild = 2 * index + 2; // Right child index

        // If left child is larger than root
        if (leftChild < heapSize && arr[leftChild] > arr[largest])
            largest = leftChild;

        // If right child is larger than current largest
        if (rightChild < heapSize && arr[rightChild] > arr[largest])
            largest = rightChild;

        // If largest is not root
        if (largest != index)
        {
            Swap(arr, index, largest);

            // Recursively heapify the affected subtree
            Heapify(arr, heapSize, largest);
        }
    }

    // Build max-heap from unordered array
    private static void BuildMaxHeap(int[] arr)
    {
        int n = arr.Length;

        // Start from last non-leaf node and work backwards
        for (int i = n / 2 - 1; i >= 0; i--)
        {
            Heapify(arr, n, i);
        }
    }

    // Swap array elements
    private static void Swap(int[] arr, int i, int j)
    {
        // Skip swap if indices are identical
        if (i == j) return;

        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

class Program
{
    static void Main()
    {
        // Example usage
        int[] arr = { 12, 11, 13, 5, 6, 7 };
        Console.WriteLine("Original array:");
        PrintArray(arr);

        HeapSort.Sort(arr);

        Console.WriteLine("\nSorted array:");
        PrintArray(arr);

        // Execute test cases
        RunTestCases();
    }

    static void PrintArray(int[] arr)
    {
        Console.WriteLine(string.Join(" ", arr));
    }

    static void RunTestCases()
    {
        Console.WriteLine("\nRunning test cases...");

        TestCase(new int[] { }, "Empty array");
        TestCase(new int[] {1}, "Single element");
        TestCase(new int[] {5, 1, 4, 2, 8}, "Unsorted array");
        TestCase(new int[] {1, 2, 3, 4, 5}, "Already sorted");
        TestCase(new int[] {5, 4, 3, 2, 1}, "Reverse sorted");
        TestCase(new int[] {3, 1, 4, 1, 5, 9, 2, 6}, "Array with duplicates");
        TestCase(new int[] {-5, -1, -3, 2, 0}, "Array with negatives");
    }

    static void TestCase(int[] arr, string description)
    {
        Console.Write($"\n{description}: ");
        PrintArray(arr);

        try
        {
            int[] original = (int[])arr.Clone();
            HeapSort.Sort(arr);

            if (IsSorted(arr))
                Console.WriteLine("PASS");
            else
                Console.WriteLine($"FAIL - Sorted: {string.Join(" ", arr)}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"ERROR: {ex.Message}");
        }
    }

    static bool IsSorted(int[] arr)
    {
        for (int i = 1; i < arr.Length; i++)
            if (arr[i] < arr[i - 1])
                return false;
        return true;
    }
}

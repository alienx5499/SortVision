using System;

namespace SortVision
{
    public class MergeSort
    {

        /// Public method to sort an array using Merge Sort.


        public static void Sort(int[] arr)
        {
            if (arr == null || arr.Length <= 1)
                return;

            MergeSortRecursive(arr, 0, arr.Length - 1);
        }


        /// Recursively splits the array and merges the sorted halves.

        private static void MergeSortRecursive(int[] arr, int left, int right)
        {
            if (left < right)
            {
                int mid = (left + right) / 2;
                MergeSortRecursive(arr, left, mid);
                MergeSortRecursive(arr, mid + 1, right);
                Merge(arr, left, mid, right);
            }
        }


        /// Merges two sorted subarrays: arr[left..mid] and arr[mid+1..right]

        private static void Merge(int[] arr, int left, int mid, int right)
        {
            int n1 = mid - left + 1;
            int n2 = right - mid;

            int[] leftArr = new int[n1];
            int[] rightArr = new int[n2];

            Array.Copy(arr, left, leftArr, 0, n1);
            Array.Copy(arr, mid + 1, rightArr, 0, n2);

            int i = 0, j = 0, k = left;

            while (i < n1 && j < n2)
            {
                if (leftArr[i] <= rightArr[j])
                    arr[k++] = leftArr[i++];
                else
                    arr[k++] = rightArr[j++];
            }

            while (i < n1)
                arr[k++] = leftArr[i++];

            while (j < n2)
                arr[k++] = rightArr[j++];
        }


        /// Example usage and test cases.

        public static void Main(string[] args)
        {
            int[] test1 = { 5, 2, 4, 6, 1, 3 };
            int[] test2 = { };
            int[] test3 = { 7 };
            int[] test4 = { 10, 9, 8, 7, 6, 5 };

            Console.WriteLine("Original: " + string.Join(", ", test1));
            Sort(test1);
            Console.WriteLine("Sorted:   " + string.Join(", ", test1));
            Console.WriteLine();

            Console.WriteLine("Original: " + string.Join(", ", test2));
            Sort(test2);
            Console.WriteLine("Sorted:   " + string.Join(", ", test2));
            Console.WriteLine();

            Console.WriteLine("Original: " + string.Join(", ", test3));
            Sort(test3);
            Console.WriteLine("Sorted:   " + string.Join(", ", test3));
            Console.WriteLine();

            Console.WriteLine("Original: " + string.Join(", ", test4));
            Sort(test4);
            Console.WriteLine("Sorted:   " + string.Join(", ", test4));
            Console.WriteLine();
        }
    }
}

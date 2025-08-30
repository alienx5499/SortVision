/*
Insertion Sort Algorithm in C#

What this file includes :-

-Implemented Insertion Sort Algorithm
-Comments to make code clear
-Time and Space Complexity Analysis
-Example usage
-Test cases
-Performance Optimization Notes

Insertion Sort Algorithm - In this we take one element at a time and arrange it to it's correct position.

*/

//Implementation

using System;

namespace SortVision
{
  public class InsertionSortAlgorithm
  {
    //Insertion Sort
    public static void InsertionSort(int[] arr)
    {
      int n = arr.Length;

      if (arr == null || n <= 1)
      {
        // Array is null, empty, or has a single element; no sorting needed.
        return;
      }

      //Running Iterations from 2nd Element assuming first as sorted
      for (int i = 1; i < n; i++)
      {
        int currElement = arr[i];
        int prev = i - 1;

        //Comaring Elements and position them on their correct position
        while (prev >= 0 && arr[prev] > currElement)
        {
          arr[prev + 1] = arr[prev];
          prev--;
        }

        arr[prev + 1] = currElement;
      }
    }

    // Method to print an array
    public static void PrintArray(int[] arr)
    {
      foreach (int num in arr)
      {
        Console.Write(num + " ");
      }
      Console.WriteLine();
    }

    // Time Complexity

    // -Iterations - O(n)
    // -Assigning - O(n)
    // -Overall Time complexity as they are loops
    // O(n*n) = O(n^2)

    // Space Complexity

    // -In place substitutions - O(1)

    //Test Cases
    public static void Tests()
    {
      int[][] testCases = {
        new int[] { },                       //Empty Array
        new int[] {1},                       //Single Element
        new int[] {10, 1, 9, 3, 8, 4, 2, 7}, //Standard Case
        new int[] {1, 2, 3, 4, 5},           //Already Sorted
        new int[] {2, 2, 2, 3, 1, 1, 1},     //Repeated Elements
        new int[] {5, 4, 3, 2, 1}            //Reverse Sorted
      };

      Console.WriteLine("Insertion Sort Test Cases");

      for (int i = 0; i < testCases.Length; i++)
      {
        Console.Write("Original: ");
        PrintArray(testCases[i]);

        InsertionSort(testCases[i]);

        Console.Write("Sorted: ");
        PrintArray(testCases[i]);
      }
    }

    public static void Main(string[] args)
    {
      //Example Case
      Console.WriteLine("Example: ");
      int[] arr = { 4, 1, 3, 2, 10, 7 };

      Console.WriteLine("Original: ");
      PrintArray(arr);

      InsertionSort(arr);

      Console.WriteLine("Sorted: ");
      PrintArray(arr);

      Console.WriteLine();

      //Running Tests

      Tests();
    }
  }
}

/*Performance Optimization Notes

-Instead of swapping every time, shift elements and insert once.
-Add a condition of breaking if no sorting is needed./

*/

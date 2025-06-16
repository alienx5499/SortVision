/**
 * BubbleSort.java
 *
 * A clean, well-documented Java implementation of the Bubble Sort algorithm.
 * Demonstrates sorting logic, input validation, optimization, and example test cases.
 *
 * Author: YourName
 * Version: 1.0
 */

public class BubbleSort {

    /**
     * Sorts an integer array using the Bubble Sort algorithm.
     *
     * @param arr the array to be sorted
     *
     * Time Complexity:
     *   - Best Case: O(n) when already sorted
     *   - Average/Worst Case: O(n^2)
     * Space Complexity:
     *   - O(1) (in-place)
     */
    public static void bubbleSort(int[] arr) {
        if (arr == null || arr.length <= 1) return;

        int n = arr.length;
        boolean swapped;

        // Outer loop for passes
        for (int i = 0; i < n - 1; i++) {
            swapped = false;

            // Inner loop for comparisons
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap adjacent elements if they are in the wrong order
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    swapped = true;
                }
            }

            // If no two elements were swapped in inner loop, array is sorted
            if (!swapped) break;
        }
    }

    /**
     * Utility method to print array contents.
     *
     * @param arr the array to print
     */
    public static void printArray(int[] arr) {
        if (arr == null) {
            System.out.println("null");
            return;
        }
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    /**
     * Main method - Demonstrates bubble sort with example test cases.
     */
    public static void main(String[] args) {
        // Test Case 1: Random values
        int[] test1 = {64, 25, 12, 22, 11};
        System.out.println("Test 1: Random values");
        System.out.print("Original: ");
        printArray(test1);
        bubbleSort(test1);
        System.out.print("Sorted:   ");
        printArray(test1);

        // Test Case 2: Already sorted
        int[] test2 = {1, 2, 3, 4, 5};
        System.out.println("\nTest 2: Already sorted");
        System.out.print("Original: ");
        printArray(test2);
        bubbleSort(test2);
        System.out.print("Sorted:   ");
        printArray(test2);

        // Test Case 3: Reverse sorted
        int[] test3 = {9, 7, 5, 3, 1};
        System.out.println("\nTest 3: Reverse sorted");
        System.out.print("Original: ");
        printArray(test3);
        bubbleSort(test3);
        System.out.print("Sorted:   ");
        printArray(test3);

        // Test Case 4: All elements same
        int[] test4 = {5, 5, 5, 5};
        System.out.println("\nTest 4: All elements same");
        System.out.print("Original: ");
        printArray(test4);
        bubbleSort(test4);
        System.out.print("Sorted:   ");
        printArray(test4);

        // Test Case 5: Single element
        int[] test5 = {42};
        System.out.println("\nTest 5: Single element");
        System.out.print("Original: ");
        printArray(test5);
        bubbleSort(test5);
        System.out.print("Sorted:   ");
        printArray(test5);

        // Test Case 6: Empty array
        int[] test6 = {};
        System.out.println("\nTest 6: Empty array");
        System.out.print("Original: ");
        printArray(test6);
        bubbleSort(test6);
        System.out.print("Sorted:   ");
        printArray(test6);

        // Test Case 7: Null input
        int[] test7 = null;
        System.out.println("\nTest 7: Null array");
        System.out.print("Original: ");
        printArray(test7);
        bubbleSort(test7);
        System.out.print("Sorted:   ");
        printArray(test7);
    }
}

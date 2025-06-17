/**
 * A utility class to implement the Bubble Sort algorithm in Java.
 * 
 * <p>This class provides a method to sort an integer array in ascending order
 * using the Bubble Sort algorithm with early-exit optimization.</p>
 * 
 * Time Complexity:
 * - Worst case: O(n^2)
 * - Best case (optimized with no swaps): O(n)
 * 
 * Space Complexity: O(1) (in-place sorting)
 */
public class BubbleSort {

    /**
     * Sorts the input array in ascending order using the Bubble Sort algorithm.
     *
     * @param arr the array to be sorted
     * @throws IllegalArgumentException if the input array is null
     */
    public static void bubbleSort(int[] arr) {
        if (arr == null) {
            throw new IllegalArgumentException("Input array cannot be null.");
        }

        int n = arr.length;

        // No need to sort if array has 0 or 1 elements
        if (n <= 1) {
            return;
        }

        // Outer loop for each pass
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;

            // Inner loop for comparing adjacent elements
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements if they are in the wrong order
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // Optimization: If no swaps were made, array is already sorted
            if (!swapped) {
                break;
            }
        }
    }

    /**
     * Prints the contents of an array.
     * 
     * @param arr the array to print
     */
    public static void printArray(int[] arr) {
        if (arr == null || arr.length == 0) {
            System.out.println("[]");
            return;
        }

        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println("]");
    }

    /**
     * Demonstrates example usage and test cases for the BubbleSort class.
     *
     * Includes:
     * - Empty array
     * - Single element
     * - Already sorted array
     * - Reverse sorted array
     * - Random unordered array
     */
    public static void main(String[] args) {
        // Test case 1: Empty array
        int[] test1 = {};
        bubbleSort(test1);
        System.out.print("Test 1 (Empty): ");
        printArray(test1); // []

        // Test case 2: Single element
        int[] test2 = {42};
        bubbleSort(test2);
        System.out.print("Test 2 (Single): ");
        printArray(test2); // [42]

        // Test case 3: Already sorted
        int[] test3 = {1, 2, 3, 4, 5};
        bubbleSort(test3);
        System.out.print("Test 3 (Sorted): ");
        printArray(test3); // [1, 2, 3, 4, 5]

        // Test case 4: Reverse sorted
        int[] test4 = {9, 7, 5, 3, 1};
        bubbleSort(test4);
        System.out.print("Test 4 (Reverse): ");
        printArray(test4); // [1, 3, 5, 7, 9]

        // Test case 5: Random order
        int[] test5 = {5, 2, 8, 3, 1};
        bubbleSort(test5);
        System.out.print("Test 5 (Random): ");
        printArray(test5); // [1, 2, 3, 5, 8]
    }
}


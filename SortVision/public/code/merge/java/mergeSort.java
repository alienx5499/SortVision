/**
 * Implements the Merge Sort algorithm for sorting an array of integers.
 * Merge Sort is a divide-and-conquer algorithm that divides an array into two halves,
 * recursively sorts them, and then merges the two sorted halves.
 *
 * <p>Time Complexity: O(N log N) in all cases (best, average, worst) due to its
 * consistent divide-and-conquer approach.
 * <br>Space Complexity: O(N) due to the temporary array used in the merge operation.
 *
 * <p>Key characteristics:
 * <ul>
 * <li>Stable sort: Preserves the relative order of equal elements.</li>
 * <li>Not in-place: Requires additional memory proportional to the input size.</li>
 * <li>Efficient for large datasets and external sorting.</li>
 * </ul>
 */
public class mergeSort {

    /**
     * Merges two sorted portions of an array into a single sorted portion.
     * This private helper method is the core of the merge sort algorithm.
     * It assumes that the subarrays arr[left...mid] and arr[mid+1...right] are already sorted.
     *
     * @param arr The array containing the portions to merge.
     * @param left The starting index of the first sorted portion.
     * @param mid The ending index of the first sorted portion (and mid+1 is the start of the second).
     * @param right The ending index of the second sorted portion.
     */
    private void merge(int[] arr, int left, int mid, int right) {
        // Calculate the sizes of the two subarrays to be merged
        int size1 = mid - left + 1;
        int size2 = right - mid;

        // Create temporary arrays to hold the elements of the two subarrays
        // Performance Optimization Note: Using a single temporary array for the entire merge sort
        // process could slightly reduce object creation overhead in some scenarios, but typically
        // this approach is clear and efficient enough.
        int[] leftArray = new int[size1];
        int[] rightArray = new int[size2];

        // Copy data from the main array into the temporary left array
        for (int i = 0; i < size1; i++) {
            leftArray[i] = arr[left + i];
        }
        // Copy data from the main array into the temporary right array
        for (int i = 0; i < size2; i++) {
            rightArray[i] = arr[mid + 1 + i];
        }

        // Initial indices for merging:
        // i for leftArray, j for rightArray, k for the main array (arr)
        int i = 0, j = 0;
        int k = left; // k starts at the 'left' boundary of the current merge segment

        // Merge the temporary arrays back into the main array (arr[left...right])
        // Compare elements from leftArray and rightArray and place the smaller one
        // into the correct position in the main array.
        while (i < size1 && j < size2) {
            if (leftArray[i] <= rightArray[j]) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }
            k++;
        }

        // Copy any remaining elements of leftArray (if any)
        while (i < size1) {
            arr[k] = leftArray[i];
            i++;
            k++;
        }

        // Copy any remaining elements of rightArray (if any)
        while (j < size2) {
            arr[k] = rightArray[j];
            j++;
            k++;
        }
    }

    /**
     * Performs merge sort on a specified portion of an array.
     * This is the recursive function that divides the array into halves and then merges them.
     *
     * @param arr The array to be sorted.
     * @param left The starting index of the portion to be sorted.
     * @param right The ending index of the portion to be sorted.
     */
    public void sort(int[] arr, int left, int right) {
        // Base case for recursion: if the array segment has one or zero elements, it's already sorted.
        if (left < right) {
            // Find the middle point to divide the array into two halves
            int mid = left + (right - left) / 2; // Prevents potential overflow for very large left/right values

            // Recursively sort the first half
            sort(arr, left, mid);
            // Recursively sort the second half
            sort(arr, mid + 1, right);

            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }

    /**
     * Main method for demonstrating the MergeSort algorithm and running test cases.
     */
    public static void main(String[] args) {
        mergeSort sorter = new mergeSort();

        // --- Example Usage ---
        System.out.println("--- Example Usage ---");
        int[] exampleArray = {12, 11, 13, 5, 6, 7};
        System.out.println("Original Array: " + java.util.Arrays.toString(exampleArray));
        sorter.sort(exampleArray, 0, exampleArray.length - 1);
        System.out.println("Sorted Array: " + java.util.Arrays.toString(exampleArray));
        System.out.println();

        // --- Test Cases ---
        System.out.println("--- Running Test Cases ---");

        // Test Case 1: Normal array
        runTestCase(sorter, "Normal Array", new int[]{8, 4, 2, 1, 7, 3, 6, 5});

        // Test Case 2: Already sorted array
        runTestCase(sorter, "Already Sorted Array", new int[]{1, 2, 3, 4, 5});

        // Test Case 3: Reverse sorted array
        runTestCase(sorter, "Reverse Sorted Array", new int[]{5, 4, 3, 2, 1});

        // Test Case 4: Array with duplicate elements
        runTestCase(sorter, "Array with Duplicates", new int[]{4, 2, 2, 8, 1, 4, 3, 1});

        // Test Case 5: Empty array (edge case)
        runTestCase(sorter, "Empty Array", new int[]{});

        // Test Case 6: Single element array (edge case)
        runTestCase(sorter, "Single Element Array", new int[]{42});

        // Test Case 7: Array with negative numbers
        runTestCase(sorter, "Array with Negative Numbers", new int[]{-5, 0, -10, 3, -2});

        // Test Case 8: Large array (demonstrates performance for larger N)
        // Note: For very large arrays (e.g., millions), consider increasing JVM heap space
        int[] largeArray = new int[10000];
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = (int) (Math.random() * 100000); // Random numbers up to 99999
        }
        runTestCase(sorter, "Large Random Array (10,000 elements)", largeArray);
    }

    /**
     * Helper method to run a single test case, print its status, and verify correctness.
     * @param sorter The MergeSort instance.
     * @param testName A descriptive name for the test case.
     * @param input An array to be sorted.
     */
    private static void runTestCase(mergeSort sorter, String testName, int[] input) {
        int[] originalArray = java.util.Arrays.copyOf(input, input.length); // Keep original for printing
        int[] expectedSorted = java.util.Arrays.copyOf(input, input.length);
        java.util.Arrays.sort(expectedSorted); // Use Java's built-in sort for comparison

        System.out.println("Test Case: " + testName);
        System.out.println("  Input: " + java.util.Arrays.toString(originalArray));

        try {
            sorter.sort(input, 0, input.length - 1);
            System.out.println("  Sorted: " + java.util.Arrays.toString(input));

            if (java.util.Arrays.equals(input, expectedSorted)) {
                System.out.println("  Status: PASSED");
            } else {
                System.out.println("  Status: FAILED - Expected: " + java.util.Arrays.toString(expectedSorted));
            }
        } catch (Exception e) {
            // Import necessary classes for capturing stack trace
            java.io.StringWriter sw = new java.io.StringWriter();
            java.io.PrintWriter pw = new java.io.PrintWriter(sw);
            e.printStackTrace(pw); // Print stack trace to the StringWriter
            String stackTrace = sw.toString();

            System.out.println("  Status: FAILED - Exception: " + e.getClass().getSimpleName() + ": " + e.getMessage());
            System.out.println("  Stack Trace:\n" + stackTrace); // Print the captured stack trace
        }
        System.out.println("---");
    }
}

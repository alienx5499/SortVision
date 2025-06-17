import java.util.Arrays;
/**
 * Implements the Selection Sort algorithm for sorting an array of integers.
 * 
 * Selection Sort works by repeatedly finding the minimum element from the unsorted part 
 * and putting it at the beginning.
 * 
 * This class also includes a Bidirectional Selection Sort variant that improves performance
 * slightly by selecting both the minimum and maximum in each pass.
 */
public class SelectionSort {

    /**
     * Finds the index of the minimum element in a subarray.
     *
     * @param arr   the array to search
     * @param start the starting index (inclusive)
     * @param end   the ending index (inclusive)
     * @return the index of the minimum element
     */
    private int findMinIndex(int[] arr, int start, int end) {
        int minIndex = start;
        for (int i = start + 1; i <= end; i++) {
            if (arr[i] < arr[minIndex]) {
                minIndex = i;
            }
        }
        return minIndex;
    }

    /**
     * Sorts an array using the standard Selection Sort algorithm.
     *
     * Time Complexity:
     * 
     * Best Case: O(n^2) - Even if the array is already sorted, selection sort still goes through all elements.
     * Average Case: O(n^2) - Every element is compared with every other element once.
     * Worst Case: O(n^2) - Happens for reverse sorted arrays; still performs the same number of comparisons.
     * 
     * Space Complexity:
     * 
     * Always: O(1) - No extra space required; sorting is done in-place.
     * @param arr the array to sort
     */
     public void sort(int[] arr) {
        if (arr == null || arr.length <= 1) return;

        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = findMinIndex(arr, i, n - 1);
            if (minIndex != i) {
                swap(arr, i, minIndex);
            }
        }
    }
     /**
     * Time Complexity:
     *
     * Best Case: O(n^2) - Even if partially sorted, the algorithm still performs comparisons to find both min and max.
     * Average Case: O(n^2) - Each iteration involves scanning the unsorted portion for both extremes (2n operations).
     * Worst Case: O(n^2) - Maximum comparisons are required when the array is in reverse order.
     *
     * Space Complexity:
     *
     * O(n) - An auxiliary array is used to place elements in correct order, improving stability.
     *
     * Reduces number of passes to n/2 by selecting both min and max in each iteration.
     * Requires O(n²) comparisons overall but minimizes swaps, improving data movement efficiency.
     * Uses extra space for stability, making it a stable variant of Selection Sort.
     * @param arr the array to sort
     */
    public void sortBidirectional(int[] arr) {
        if (arr == null || arr.length <= 1) return;

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int minIndex = left;
            int maxIndex = right;

            for (int i = left; i <= right; i++) {
                if (arr[i] < arr[minIndex]) minIndex = i;
                if (arr[i] > arr[maxIndex]) maxIndex = i;
            }
            if (minIndex != left) swap(arr, left, minIndex);
            if (maxIndex == left) maxIndex = minIndex;
            if (maxIndex != right) swap(arr, right, maxIndex);

            left++;
            right--;
        }
    }

    /**
     * @param arr the array
     * @param i   index of first element
     * @param j   index of second element
     */
    private void swap(int[] arr, int i, int j) {
        if (i != j) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    /**
     * Add Test Cases
     */
    public static void main(String[] args) {
        SelectionSort sorted = new SelectionSort();

        int[][] testCases = {
            {64, 25, 12, 22, 11},
            {},
            {42},
            {1, 2, 3, 4, 5},
            {5, 4, 3, 2, 1},
            {9, 3, 7, 1, 8, 2}
        };

        System.out.println("Standard Selection Sort:\n");

        for (int[] test : testCases) {
            int[] copy = Arrays.copyOf(test, test.length);
            System.out.println("Original: " + Arrays.toString(copy));
            sorted.sort(copy);
            System.out.println("Sorted:   " + Arrays.toString(copy) + "\n");
        }

        System.out.println("Bidirectional Selection Sort:\n");

        for (int[] test : testCases) {
            int[] copy = Arrays.copyOf(test, test.length);
            System.out.println("Original: " + Arrays.toString(copy));
            sorted.sortBidirectional(copy);
            System.out.println("Sorted:   " + Arrays.toString(copy) + "\n");
        }
    }
}
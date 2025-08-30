/**
 * RadixSort implementation supporting multiple bases and negative numbers.
 * Handles edge cases and optimizes performance.
 */
public class radixSort {

    /**
     * Get maximum absolute value in array to determine number of digits.
     *
     * @param arr Array to find maximum absolute value in
     * @return Maximum absolute value in the array
     */
    private int getMax(int[] arr) {
        int max = 0;
        for (int num : arr) {
            max = Math.max(max, Math.abs(num));
        }
        return max;
    }

    /**
     * Counting sort for a specific digit represented by exponent `exp`.
     *
     * @param arr Array to be sorted
     * @param exp Exponent (1, base, base^2, etc.)
     * @param base Number base
     */
    private void countSort(int[] arr, int exp, int base) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[base];

        for (int num : arr) {
            int digit = Math.abs(num) / exp % base;
            count[digit]++;
        }

        for (int i = 1; i < base; i++) {
            count[i] += count[i - 1];
        }

        for (int i = n - 1; i >= 0; i--) {
            int digit = Math.abs(arr[i]) / exp % base;
            output[--count[digit]] = arr[i];
        }

        System.arraycopy(output, 0, arr, 0, n);
    }

    /**
     * Sort an integer array using radix sort.
     *
     * @param arr Array to be sorted
     * @param base Base for sorting (e.g., 10 for decimal)
     */
    public void sort(int[] arr, int base) {
        if (arr == null || arr.length <= 1 || base < 2) return;

        // Separate negative and non-negative numbers
        int[] positives = java.util.Arrays.stream(arr).filter(n -> n >= 0).toArray();
        int[] negatives = java.util.Arrays.stream(arr).filter(n -> n < 0).map(n -> -n).toArray();

        int maxPositive = getMax(positives);
        int maxNegative = getMax(negatives);

        // Sort non-negatives
        for (int exp = 1; maxPositive / exp > 0; exp *= base) {
            countSort(positives, exp, base);
        }

        // Sort negatives and reverse
        for (int exp = 1; maxNegative / exp > 0; exp *= base) {
            countSort(negatives, exp, base);
        }
        for (int i = 0; i < negatives.length / 2; i++) {
            int temp = negatives[i];
            negatives[i] = negatives[negatives.length - 1 - i];
            negatives[negatives.length - 1 - i] = temp;
        }

        // Merge back
        for (int i = 0; i < negatives.length; i++) {
            arr[i] = -negatives[i];
        }
        System.arraycopy(positives, 0, arr, negatives.length, positives.length);
    }

    /**
     * Example usage and test cases.
     */
    public static void main(String[] args) {
        radixSort sorter = new radixSort();

        int[] test1 = {170, 45, 75, -90, -802, 24, 2, 66};
        sorter.sort(test1, 10);
        System.out.println("Sorted (Decimal): " + java.util.Arrays.toString(test1));

        int[] test2 = {-5, -1, -300, -22};
        sorter.sort(test2, 10);
        System.out.println("Negative Only: " + java.util.Arrays.toString(test2));

        int[] test3 = {0};
        sorter.sort(test3, 10);
        System.out.println("Single Element: " + java.util.Arrays.toString(test3));

        int[] test4 = {};
        sorter.sort(test4, 10);
        System.out.println("Empty Array: " + java.util.Arrays.toString(test4));

        int[] test5 = {3, 2, 1, 0, -1, -2, -3};
        sorter.sort(test5, 2); // Binary base
        System.out.println("Sorted (Binary Base): " + java.util.Arrays.toString(test5));
    }
}

/**
 * Time Complexity: O(d * (n + b))
 *     - d: Number of digits in the maximum number
 *     - n: Size of the array
 *     - b: Base used for sorting
 *
 * Space Complexity: O(n + b)
 *     - Temporary arrays for counting and output
 */

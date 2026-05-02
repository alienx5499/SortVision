public class RadixSort {
    // Radix Sort (LSD, base 10, non-negative integers)
    // Time: O(d * (n + k)), Space: O(n + k)
    public static void radixSort(int[] arr) {
        if (arr == null || arr.length <= 1) return;

        int maxVal = getMax(arr);
        for (int exp = 1; maxVal / exp > 0; exp *= 10) {
            countingSortByExp(arr, exp);
        }
    }

    private static int getMax(int[] arr) {
        int mx = arr[0];
        for (int x : arr) if (x > mx) mx = x;
        return mx;
    }

    private static void countingSortByExp(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];

        for (int x : arr) count[(x / exp) % 10]++;
        for (int i = 1; i < 10; i++) count[i] += count[i - 1];

        for (int i = n - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        System.arraycopy(output, 0, arr, 0, n);
    }

    public static void main(String[] args) {
        int[] arr = {170, 45, 75, 90, 802, 24, 2, 66};
        radixSort(arr);
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}

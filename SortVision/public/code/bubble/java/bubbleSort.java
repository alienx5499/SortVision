public class BubbleSort {
    // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
    public static void bubbleSort(int[] arr) {
        if (arr == null || arr.length <= 1) return;

        for (int i = 0; i < arr.length - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int t = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = t;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}

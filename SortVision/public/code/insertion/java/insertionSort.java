public class InsertionSort {
    // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
    public static void insertionSort(int[] arr) {
        if (arr == null || arr.length <= 1) return;

        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        insertionSort(arr);
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}

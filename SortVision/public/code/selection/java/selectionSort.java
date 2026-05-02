public class SelectionSort {
    // Time: Best/Avg/Worst O(n^2), Space: O(1)
    public static void selectionSort(int[] arr) {
        if (arr == null || arr.length <= 1) return;

        for (int i = 0; i < arr.length - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx != i) {
                int t = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = t;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}

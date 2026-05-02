public class MergeSort {
    // Time: Best/Avg/Worst O(n log n), Space: O(n)
    public static void mergeSort(int[] arr) {
        if (arr == null || arr.length <= 1) return;
        sort(arr, 0, arr.length - 1);
    }

    private static void sort(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        sort(arr, left, mid);
        sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right) {
            temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        for (int x = 0; x < temp.length; x++) arr[left + x] = temp[x];
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        mergeSort(arr);
        for (int x : arr) System.out.print(x + " ");
        System.out.println();
    }
}

/**
 * Implements the Heap Sort algorithm using a max-heap.
 * Time Complexity: O(nlogn)
 * Space Complexity: O(1)-in-place-sorting
 */

public class heapSort {
    /**
     * Converts a subtree rooted at index 'i' into a max-heap, assuming its children are already heaps...
     * @param arr the array representing the heap
     * @param n size of the heap
     * @param i index of the root of the subtree
     */
    private void heapify(int[] arr, int n, int i) {
        int largest = i;           // init largest as root
        int left = 2 * i + 1;      // left = 2*i + 1
        int right = 2 * i + 2;     // right = 2*i + 2

        // if left>root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        // if right>largest.. swap
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // if largest is not at root.. swap and recurse
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            heapify(arr, n, largest);
        }
    }

    /**
     * Main method to perform heap sort on the array.
     *
     * @param arr the array to be sorted
     */
    public void sort(int[] arr) {
        if (arr == null || arr.length <= 1) return;

        int n = arr.length;

        // build heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // for each iteration.. delete the root and place at the end.. then recurse
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }
    //main with test cases included
    public static void main(String[] args) {
        heapSort sorter = new heapSort();
        int[][] testCases = {
            {},                             // empty
            {1},                            // one element
            {4, 10, 3, 5, 1},               // random unsorted
            {9, 7, 5, 3, 1},                // reverse sorted
            {1, 2, 3, 4, 5},                // already sorted
            {5, 5, 5, 5},                   // similar elements
        };

        for (int[] test : testCases) {
            sorter.sort(test);
            printArray(test);
        }
    }
    //print the array
    private static void printArray(int[] arr) {
        System.out.print("[ ");
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println("]");
    }
}

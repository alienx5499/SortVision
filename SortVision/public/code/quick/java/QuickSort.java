

import java.util.Arrays;

/*
 * Implements the Quick Sort algorithm for sorting an array of integers.
 * Quick Sort is a divide-and-conquer algorithm that works by selecting a 'pivot'
 * element from the array and partitioning the other elements into two sub-arrays,
 * according to whether they are less than or greater than the pivot. The sub-arrays
 * are then sorted recursively.
 */
public class QuickSort {
    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Pivot is the last element
        int i = (low - 1); 

        for (int j = low; j < high; j++) {
       
            if (arr[j] <= pivot) {
                i++;
             
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1; 
    }
    
    public void sort(int[] arr, int low, int high) {
        if (arr == null || arr.length == 0) {
            return; 
        }
        if (low < 0 || high >= arr.length || low > high) {
           
        }

        if (low < high) {
            
            int pi = partition(arr, low, high);

  
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }

    /**
     *
     * Time Complexity:
     * 
     *   Best Case: O(n log n) - Occurs when the pivot element always divides the array into two nearly equal halves.
     *   Average Case: O(n log n) - Achieved with random pivot selection or when input data is random.
     *   Worst Case: O(n^2) - Occurs when the pivot element is consistently the smallest or largest element
     *   
     * 
     *
     * Space Complexity:
     * 
     *   Average Case: O(log n) - Due to the depth of the recursion stack for balanced partitions.
     *   Worst Case: O(n) - Due to the depth of the recursion stack if partitions are extremely unbalanced,
     *   leading to a skewed recursion tree (e.g., in the worst-case time complexity scenario).
     * 
     */
    public void sort(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }
        sort(arr, 0, arr.length - 1);
    }

    // Add test cases
    public static void main(String[] args) {
        QuickSort sorter = new QuickSort();
        
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Original array: " + Arrays.toString(arr));
        
        sorter.sort(arr);
        
        System.out.println("Sorted array: " + Arrays.toString(arr));

        int[] emptyArr = {};
        System.out.println("Original empty array: " + Arrays.toString(emptyArr));
        sorter.sort(emptyArr);
        System.out.println("Sorted empty array: " + Arrays.toString(emptyArr));

        int[] singleElementArr = {42};
        System.out.println("Original single element array: " + Arrays.toString(singleElementArr));
        sorter.sort(singleElementArr);
        System.out.println("Sorted single element array: " + Arrays.toString(singleElementArr));
        
        int[] alreadySortedArr = {1, 2, 3, 4, 5};
        System.out.println("Original already sorted array: " + Arrays.toString(alreadySortedArr));
        sorter.sort(alreadySortedArr); 
        System.out.println("Sorted already sorted array: " + Arrays.toString(alreadySortedArr));
        
        int[] reverseSortedArr = {5, 4, 3, 2, 1};
        System.out.println("Original reverse sorted array: " + Arrays.toString(reverseSortedArr));
        sorter.sort(reverseSortedArr);
        System.out.println("Sorted reverse sorted array: " + Arrays.toString(reverseSortedArr));
    }
}

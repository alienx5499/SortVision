#include <stdio.h>

/* Insertion Sort (in-place)
   Time: Best O(n), Avg/Worst O(n^2)
   Space: O(1) */
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main(void) {
    int arr[] = {64, 25, 12, 22, 11};
    int n = (int)(sizeof(arr) / sizeof(arr[0]));

    insertionSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}

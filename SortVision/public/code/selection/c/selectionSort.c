#include <stdio.h>

/* Selection Sort (in-place)
   Time: Best/Avg/Worst O(n^2)
   Space: O(1) */
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) {
            int t = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = t;
        }
    }
}

int main(void) {
    int arr[] = {64, 25, 12, 22, 11};
    int n = (int)(sizeof(arr) / sizeof(arr[0]));

    selectionSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}

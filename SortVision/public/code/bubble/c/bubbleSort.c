#include <stdio.h>
#include <stdbool.h>

/* Bubble Sort (in-place)
   Time: Best O(n), Avg/Worst O(n^2)
   Space: O(1) */
void bubbleSort(int arr[], int n) {
    if (n <= 1) return;

    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
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

static void printArray(const int arr[], int n) {
    printf("[");
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], i == n - 1 ? "" : ", ");
    }
    printf("]\n");
}

int main(void) {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = (int)(sizeof(arr) / sizeof(arr[0]));

    bubbleSort(arr, n);
    printArray(arr, n);
    return 0;
}

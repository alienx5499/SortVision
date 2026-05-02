#include <stdio.h>

/* Radix Sort (LSD, base 10, non-negative integers)
   Time: O(d * (n + k))
   Space: O(n + k) */
static int getMax(int arr[], int n) {
    int mx = arr[0];
    for (int i = 1; i < n; i++) if (arr[i] > mx) mx = arr[i];
    return mx;
}

static void countingSortByExp(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};

    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];

    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radixSort(int arr[], int n) {
    int maxVal = getMax(arr, n);
    for (int exp = 1; maxVal / exp > 0; exp *= 10) {
        countingSortByExp(arr, n, exp);
    }
}

int main(void) {
    int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int n = (int)(sizeof(arr) / sizeof(arr[0]));

    radixSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}

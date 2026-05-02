#include <stdio.h>
#include <stdlib.h>

/* Bucket Sort (for floats in [0, 1))
   Time: Avg O(n + k), Worst O(n^2)
   Space: O(n + k) */
static int cmpFloat(const void *a, const void *b) {
    float x = *(const float *)a;
    float y = *(const float *)b;
    return (x > y) - (x < y);
}

void bucketSort(float arr[], int n) {
    float **buckets = (float **)calloc(n, sizeof(float *));
    int *sizes = (int *)calloc(n, sizeof(int));

    for (int i = 0; i < n; i++) {
        buckets[i] = (float *)malloc(n * sizeof(float));
    }

    for (int i = 0; i < n; i++) {
        int idx = (int)(arr[i] * n);
        if (idx >= n) idx = n - 1;
        buckets[idx][sizes[idx]++] = arr[i];
    }

    int k = 0;
    for (int i = 0; i < n; i++) {
        qsort(buckets[i], sizes[i], sizeof(float), cmpFloat);
        for (int j = 0; j < sizes[i]; j++) arr[k++] = buckets[i][j];
        free(buckets[i]);
    }

    free(buckets);
    free(sizes);
}

int main(void) {
    float arr[] = {0.42f, 0.32f, 0.23f, 0.52f, 0.25f, 0.47f, 0.51f};
    int n = (int)(sizeof(arr) / sizeof(arr[0]));

    bucketSort(arr, n);
    for (int i = 0; i < n; i++) printf("%.2f ", arr[i]);
    printf("\n");
    return 0;
}

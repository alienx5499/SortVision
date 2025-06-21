#include <stdio.h>
#include <stdlib.h>

// Bucket Sort Implementation in C
// This implementation sorts an array of floating-point numbers using the Bucket Sort algorithm.
// It divides the array into a specified number of buckets, sorts each bucket using Insertion Sort,
// and then concatenates the sorted buckets to produce the final sorted array.  
// The algorithm is efficient for uniformly distributed data and works well with floating-point numbers.

// Time Complexity:
// Best: O(n + k) when input is uniformly distributed
// Worst: O(n²) when all elements fall into one bucket
// Average: O(n + n²/k + k) (k = number of buckets)

// Space Complexity: O(n + k)

// Helper function: Insertion Sort for individual buckets
void insertionSort(float* bucket, int size) {
    for (int i = 1; i < size; i++) {
        float key = bucket[i];
        int j = i - 1;

        while (j >= 0 && bucket[j] > key) {
            bucket[j + 1] = bucket[j];
            j--;
        }
        bucket[j + 1] = key;
    }
}

// Core Bucket Sort Function
void bucketSort(float arr[], int n, int bucketCount) {
    if (n <= 1 || bucketCount <= 0) return;

    // 1. Find minimum and maximum values in the array
    float min = arr[0], max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }

    // 2. Allocate memory for buckets
    float** buckets = (float**)malloc(bucketCount * sizeof(float*));
    int* sizes = (int*)calloc(bucketCount, sizeof(int));
    int* capacities = (int*)malloc(bucketCount * sizeof(int));

    if (!buckets || !sizes || !capacities) {
        fprintf(stderr, "Memory allocation failed.\n");
        exit(EXIT_FAILURE);
    }

    for (int i = 0; i < bucketCount; i++) {
        capacities[i] = INITIAL_BUCKET_CAPACITY; // initial capacity
        buckets[i] = (float*)malloc(capacities[i] * sizeof(float));
        if (!buckets[i]) {
            fprintf(stderr, "Memory allocation failed for bucket %d\n", i);
            exit(EXIT_FAILURE);
        }
    }

    // 3. Distribute array elements into appropriate buckets
    float denominator = max - min + 1e-9; // Precompute the denominator
    for (int i = 0; i < n; i++) {
        int index = (int)(((arr[i] - min) / denominator) * bucketCount); // normalize and scale
        if (index >= bucketCount) index = bucketCount - 1;

        if (sizes[index] == capacities[index]) {
            capacities[index] *= 2;
            float* newBucket = (float*)realloc(buckets[index], capacities[index] * sizeof(float));
            if (!newBucket) {
                fprintf(stderr, "Memory reallocation failed for bucket %d\n", index);
                exit(EXIT_FAILURE);
            }
            buckets[index] = newBucket;
        }

        buckets[index][sizes[index]++] = arr[i];
    }

    // 4. Sort each bucket and concatenate results
    int pos = 0;
    for (int i = 0; i < bucketCount; i++) {
        if (sizes[i] > 0) {
            insertionSort(buckets[i], sizes[i]);
            for (int j = 0; j < sizes[i]; j++) {
                arr[pos++] = buckets[i][j];
            }
        }
        free(buckets[i]);
    }

    // 5. Cleanup
    free(buckets);
    free(sizes);
    free(capacities);
}

// Test cases and example usage
int main() {
    float testCases[][10] = {
        {},                                 // empty
        {42},                               // single element
        {5.2, 3.1, 3.1, 2.8, 5.2},          // duplicates
        {9.8, 7.3, 5.5, 1.2, 3.6},          // normal
        {1.1, 1.2, 1.3, 1.4, 1.5}           // already sorted
    };
    int lengths[] = {0, 1, 5, 5, 5};

    for (int i = 0; i < 5; i++) {
        printf("\nTest case %d:\nBefore: ", i + 1);
        for (int j = 0; j < lengths[i]; j++) printf("%.2f ", testCases[i][j]);

        bucketSort(testCases[i], lengths[i], 5);

        printf("\nAfter:  ");
        for (int j = 0; j < lengths[i]; j++) printf("%.2f ", testCases[i][j]);
        printf("\n");
    }

    return 0;
}

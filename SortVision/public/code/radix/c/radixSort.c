#include <stdio.h>
#include <stdlib.h>

// Radix Sort Implementation in C
// This implementation handles edge cases such as empty arrays, single-element arrays,
// arrays with duplicates, and already sorted arrays. It uses Counting Sort as a subroutine
// to sort the digits of the numbers in the array. The code is designed to be efficient and
// stable, ensuring that the relative order of equal elements is preserved.

// Time Complexity:

// Worst / Average / Best: O(nk)
// where k is the number of digits (i.e., log(max)), and n is the number of elements.

// Space Complexity:

// O(n + k) for output array and digit counts.

// Helper function: Find maximum value in array
int getMax(int arr[], int n) {
    if (n == 0) return 0; // Handle empty array
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max)
            max = arr[i];
    return max;
}

// Counting Sort based on digit represented by exp (1, 10, 100, ...)
void countingSort(int arr[], int n, int exp) {
    int* output = (int*)malloc(n * sizeof(int));
    int count[10] = {0};

    if (!output) {
        fprintf(stderr, "Memory allocation failed.\n");
        exit(EXIT_FAILURE);
    }

    // Count occurrences of each digit
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    // Convert count[] to actual positions
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    // Build the output array from right to left (stable sort)
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Copy sorted array back to original
    for (int i = 0; i < n; i++)
        arr[i] = output[i];

    free(output);
}

// Core Radix Sort Function
void radixSort(int arr[], int n) {
    if (n <= 1) return; // No sorting needed

    int max = getMax(arr, n);

    // Apply counting sort for each digit
    for (int exp = 1; max / exp > 0; exp *= 10)
        countingSort(arr, n, exp);
}

// Utility function to print array
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

// Test cases
int main() {
    int* test1 = NULL;
    int test2[] = {42};
    int test3[] = {5, 3, 3, 2, 5};       // Duplicates
    int test4[] = {170, 45, 75, 90, 802, 24, 2, 66}; // Random
    int test5[] = {1, 2, 3, 4, 5};       // Already sorted
    int test6[] = {100, 90, 80, 70, 60}; // Reverse order

    void* tests[] = {test1, test2, test3, test4, test5, test6};
    int sizes[] = {0, 1, 5, 8, 5, 5};

    for (int i = 0; i < 6; i++) {
        printf("\nTest Case %d:\nBefore: ", i + 1);
        printArray(tests[i], sizes[i]);

        radixSort(tests[i], sizes[i]);

        printf("After:  ");
        printArray(tests[i], sizes[i]);
    }

    return 0;
}

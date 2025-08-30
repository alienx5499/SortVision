#include <stdio.h>
#include <stdbool.h>

/**
 * Bubble Sort implementation
 *
 * Sorts the input array in ascending order using the bubble sort algorithm.
 * Optimized with early termination if the array becomes sorted early.
 *
 * Time Complexity:
 * - Best: O(n)       [already sorted]
 * - Average: O(n^2)
 * - Worst: O(n^2)
 *
 * Space Complexity: O(1) [in-place]
 *
 * @param arr The array to sort
 * @param n   The number of elements in the array
 */
void bubbleSort(int arr[], int n) {
    if (n <= 1) return;  // Handle empty or single-element arrays

    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                swapped = true;
            }
        }

        // If no swaps happened, array is already sorted
        if (!swapped) break;
    }
}

/**
 * Utility function to print an array
 */
void printArray(int arr[], int n) {
    printf("[");
    for (int i = 0; i < n; i++) {
        printf("%d", arr[i]);
        if (i != n - 1) printf(", ");
    }
    printf("]\n");
}

/**
 * Example test cases for Bubble Sort
 */
void runTests() {
    int test1[0];
    int test2[] = {42};
    int test3[] = {5, 2, 9, 1, 5};
    int test4[] = {1, 2, 3, 4, 5};
    int test5[] = {10, -5, 3, 0, 2};

    int* tests[] = {test1, test2, test3, test4, test5};
    int sizes[] = {0, 1, 5, 5, 5};
    const char* descriptions[] = {
        "Empty array",
        "Single element",
        "Unsorted with duplicates",
        "Already sorted",
        "Contains negatives"
    };

    for (int i = 0; i < sizeof(tests)/sizeof(tests[0]); i++) {
        printf("Test %d (%s):\nBefore: ", i + 1, descriptions[i]);
        printArray(tests[i], sizes[i]);

        bubbleSort(tests[i], sizes[i]);

        printf("After:  ");
        printArray(tests[i], sizes[i]);
        printf("-------------------------\n");
    }
}

/**
 * Main function to demonstrate usage
 */
int main() {
    runTests();
    return 0;
}

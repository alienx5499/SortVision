// File: heapSort.cpp
// Description: Implementation of Heap Sort using Max-Heap

#include <iostream>
#include <vector>
#include <algorithm> // For swap

using namespace std;

/**
 * Function: heapify
 * ------------------
 * Maintains the max-heap property for a subtree rooted at index `i`
 * assuming the subtrees rooted at its children are already max-heaps.
 * 
 * @param arr[] - the array representing the heap
 * @param n - total number of elements in heap
 * @param i - index of the root of subtree to heapify
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
void heapify(int arr[], int n, int i) {
    int largest = i;         // Initialize largest as root
    int left = 2 * i + 1;    // left child index
    int right = 2 * i + 2;   // right child index

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest])
        largest = left;

    // If right child is larger than the largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;

    // If largest is not root
    if (largest != i) {
        swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

/**
 * Function: heapSort
 * ------------------
 * Main function to perform heap sort
 * 
 * @param arr[] - the array to sort
 * @param n - size of the array
 * 
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) — In-place sorting
 */
void heapSort(int arr[], int n) {
    // Step 1: Build a max heap from the array (bottom-up heapify)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    // Step 2: Extract elements from the heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root (max) to the end
        swap(arr[0], arr[i]);

        // Heapify the reduced heap
        heapify(arr, i, 0);
    }
}

/**
 * Function: printArray
 * --------------------
 * Helper function to print array elements
 */
void printArray(int arr[], int n) {
    for (int i = 0; i < n; ++i)
        cout << arr[i] << " ";
    cout << "\n";
}

/**
 * Function: runTests
 * ------------------
 * Runs sample test cases to validate heapSort implementation
 */
void runTests() {
    cout << "Running Test Cases:\n";

    // Test Case 1: Normal unsorted array
    int arr1[] = {12, 11, 13, 5, 6, 7};
    int n1 = sizeof(arr1)/sizeof(arr1[0]);
    heapSort(arr1, n1);
    cout << "Sorted Array 1: ";
    printArray(arr1, n1);

    // Test Case 2: Already sorted array
    int arr2[] = {1, 2, 3, 4, 5};
    int n2 = sizeof(arr2)/sizeof(arr2[0]);
    heapSort(arr2, n2);
    cout << "Sorted Array 2: ";
    printArray(arr2, n2);

    // Test Case 3: Array with duplicates
    int arr3[] = {4, 10, 4, 3, 4};
    int n3 = sizeof(arr3)/sizeof(arr3[0]);
    heapSort(arr3, n3);
    cout << "Sorted Array 3: ";
    printArray(arr3, n3);

    // Test Case 4: Single element
    int arr4[] = {42};
    int n4 = sizeof(arr4)/sizeof(arr4[0]);
    heapSort(arr4, n4);
    cout << "Sorted Array 4: ";
    printArray(arr4, n4);

    // Test Case 5: Empty array
    int arr5[] = {};
    int n5 = sizeof(arr5)/sizeof(arr5[0]);
    heapSort(arr5, n5);
    cout << "Sorted Array 5 (Empty): ";
    printArray(arr5, n5);
}

int main() {
    runTests();
    return 0;
}

// mergeSort.cpp
// Implementation of Merge Sort in C++
// Author: SSOC Contributor
// Description: Clean and efficient implementation with comments, test cases, and optimizations.

#include <iostream>
#include <vector>
#include <cassert>
using namespace std;

/**
 * Merges two sorted subarrays of arr.
 * First subarray is arr[left..mid]
 * Second subarray is arr[mid+1..right]
 * @param arr Array to sort
 * @param left Starting index
 * @param mid Mid index
 * @param right Ending index
 */
void merge(vector<int>& arr, int left, int mid, int right) {
    // Sizes of the subarrays
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // Create temp arrays
    vector<int> L(n1), R(n2);

    // Copy data to temp arrays L[] and R[]
    for (int i = 0; i < n1; ++i)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; ++j)
        R[j] = arr[mid + 1 + j];

    // Merge the temp arrays back into arr[left..right]
    int i = 0;  // Initial index of first subarray
    int j = 0;  // Initial index of second subarray
    int k = left;  // Initial index of merged subarray

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }

    // Copy remaining elements, if any
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

/**
 * Sorts an array using merge sort algorithm.
 * @param arr Array to sort
 * @param left Left index
 * @param right Right index
 */
void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        // Find the middle point
        int mid = left + (right - left) / 2;

        // Recursively sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        // Merge sorted halves
        merge(arr, left, mid, right);
    }
}

/**
 * Utility function to print the array.
 */
void printArray(const vector<int>& arr) {
    for (int val : arr)
        cout << val << " ";
    cout << endl;
}

/**
 * Test cases to verify the merge sort implementation.
 */
void runTests() {
    // Test 1: Normal case
    vector<int> arr1 = {12, 11, 13, 5, 6, 7};
    mergeSort(arr1, 0, arr1.size() - 1);
    assert((arr1 == vector<int>{5, 6, 7, 11, 12, 13}));

    // Test 2: Already sorted
    vector<int> arr2 = {1, 2, 3, 4, 5};
    mergeSort(arr2, 0, arr2.size() - 1);
    assert((arr2 == vector<int>{1, 2, 3, 4, 5}));

    // Test 3: Reversed array
    vector<int> arr3 = {5, 4, 3, 2, 1};
    mergeSort(arr3, 0, arr3.size() - 1);
    assert((arr3 == vector<int>{1, 2, 3, 4, 5}));

    // Test 4: Single element
    vector<int> arr4 = {1};
    mergeSort(arr4, 0, arr4.size() - 1);
    assert((arr4 == vector<int>{1}));

    // Test 5: Empty array
    vector<int> arr5 = {};
    mergeSort(arr5, 0, arr5.size() - 1);
    assert((arr5 == vector<int>{}));

    cout << "✅ All test cases passed!\n";
}

/**
 * Main function with example usage.
 */
int main() {
    vector<int> example = {38, 27, 43, 3, 9, 82, 10};
    cout << "Original array:\n";
    printArray(example);

    mergeSort(example, 0, example.size() - 1);

    cout << "Sorted array:\n";
    printArray(example);

    // Run tests
    runTests();

    return 0;
}

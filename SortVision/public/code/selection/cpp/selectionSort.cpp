#include <iostream>
#include <vector>
#include <cassert>
using namespace std;

/*
 * Find the index of the minimum element in arr[start ... end-1]
 * Time complexity: O(n)
 */
int findMinIndex(const vector<int> &arr, int start, int end)
{
    int minIdx = start;
    for (int i = start + 1; i < end; ++i)
    {
        if (arr[i] < arr[minIdx])
        {
            minIdx = i;
        }
    }
    return minIdx;
}

/*
 * Find the index of the maximum element in arr[start ... end-1]
 * Used in bidirectional selection sort
 */
int findMaxIndex(const vector<int> &arr, int start, int end)
{
    int maxIdx = start;
    for (int i = start + 1; i < end; ++i)
    {
        if (arr[i] > arr[maxIdx])
        {
            maxIdx = i;
        }
    }
    return maxIdx;
}

/*
 * Classic Selection Sort
 * Time complexity: O(n^2)
 * Space complexity: O(1)
 */
void selectionSort(vector<int> &arr)
{
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i)
    {
        int minIdx = findMinIndex(arr, i, n);
        swap(arr[i], arr[minIdx]);
    }
}

/*
 * Bidirectional Selection Sort (Dual selection)
 * Time complexity: O(n^2)
 * Slightly reduces the number of iterations by sorting from both ends
 */
void bidirectionalSelectionSort(vector<int> &arr)
{
    int left = 0, right = arr.size() - 1;

    while (left < right)
    {
        int minIdx = left, maxIdx = left;

        for (int i = left; i <= right; ++i)
        {
            if (arr[i] < arr[minIdx])
                minIdx = i;
            if (arr[i] > arr[maxIdx])
                maxIdx = i;
        }

        // Swap minimum with leftmost
        swap(arr[left], arr[minIdx]);

        // If the max was at the left position, it is now at minIdx
        if (maxIdx == left)
            maxIdx = minIdx;

        // Swap maximum with rightmost
        swap(arr[right], arr[maxIdx]);

        ++left;
        --right;
    }
}

/*
 * Utility function to print array
 */
void printArray(const vector<int> &arr)
{
    for (int val : arr)
        cout << val << " ";
    cout << "\n";
}

/*
 * Test cases for validation
 */
void runTests()
{
    {
        vector<int> arr = {};
        selectionSort(arr);
        assert(arr.empty());
    }
    {
        vector<int> arr = {42};
        selectionSort(arr);
        assert(arr[0] == 42);
    }
    {
        vector<int> arr = {5, 1, 4, 2, 8};
        selectionSort(arr);
        assert(arr == vector<int>({1, 2, 4, 5, 8}));
    }
    {
        vector<int> arr = {9, 7, 5, 3, 1};
        bidirectionalSelectionSort(arr);
        assert(arr == vector<int>({1, 3, 5, 7, 9}));
    }
    {
        vector<int> arr = {1, 2, 3, 4, 5};
        bidirectionalSelectionSort(arr);
        assert(arr == vector<int>({1, 2, 3, 4, 5}));
    }

    cout << "✅ All test cases passed.\n";
}

/*
 * Main function demonstrating usage
 */
int main()
{
    runTests();

    vector<int> arr;
    int n;
    cout << "Enter number of elements: ";
    cin >> n;

    if (n < 0)
    {
        cout << "Invalid input.\n";
        return 1;
    }

    arr.resize(n);
    cout << "Enter elements:\n";
    for (int i = 0; i < n; ++i)
    {
        cin >> arr[i];
    }

    cout << "\nOriginal array:\n";
    printArray(arr);

    if (!arr.empty())
    {
        int minIdx = findMinIndex(arr, 0, arr.size());
        int maxIdx = findMaxIndex(arr, 0, arr.size());

        cout << "\nIndex of Minimum Element: " << minIdx << " (Value: " << arr[minIdx] << ")\n";
        cout << "Index of Maximum Element: " << maxIdx << " (Value: " << arr[maxIdx] << ")\n";
    }

    cout << "\nSorted array using Bidirectional Selection Sort:\n";
    bidirectionalSelectionSort(arr);
    printArray(arr);

    return 0;
}

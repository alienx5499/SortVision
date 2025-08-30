/**
 * bucketSort.cpp
 *
 * Implementation of the Bucket Sort algorithm in C++.
 *
 * This file includes:
 *  - bucketSort: function to sort an array of floats using bucket sort
 *  - Input validation and edge-case handling
 *  - Detailed comments explaining each step
 *  - Time and space complexity analysis
 *  - Example usage in main()
 *  - Test cases
 *  - Performance optimization notes
 */

#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

/**
 * Sorts an array of floats using the Bucket Sort algorithm.
 *
 * @param arr  Pointer to the first element of the array.
 * @param n    Number of elements in the array.
 */
void bucketSort(float arr[], int n)
{
    if (n <= 1 || arr == nullptr)
    {
        // Array of size 0 or 1 is already sorted
        return;
    }

    // Find minimum and maximum values in the array
    float minValue = arr[0];
    float maxValue = arr[0];
    for (int i = 1; i < n; ++i)
    {
        if (arr[i] < minValue)
            minValue = arr[i];
        if (arr[i] > maxValue)
            maxValue = arr[i];
    }

    // Number of buckets: here we use n buckets for simplicity
    // Use n buckets for better distribution and to avoid O(n^2) worst-case
    int bucketCount = std::max(1, n);
    std::vector<std::vector<float>> buckets(bucketCount);
    // Optionally reserve space for buckets to reduce reallocations
    for (auto &bucket : buckets)
    {
        bucket.reserve(n / bucketCount + 1);
    }
    // Distribute array elements into buckets
    float range = maxValue - minValue;
    if (range == 0.0f)
    {
        // All elements are equal; place all in the first bucket
        for (int i = 0; i < n; ++i)
        {
            buckets[0].push_back(arr[i]);
        }
    }
    else
    {
        for (int i = 0; i < n; ++i)
        {
            int index = static_cast<int>(bucketCount * (arr[i] - minValue) / (range + 1e-6f));
            // Clamp index to valid range
            if (index < 0)
                index = 0;
            if (index >= bucketCount)
                index = bucketCount - 1;
            buckets[index].push_back(arr[i]);
        }
        // Sort each bucket and concatenate into original array
        int idx = 0;
        for (auto &bucket : buckets)
        {
            if (!bucket.empty())
            {
                if (bucket.size() <= 32)
                {
                    // Use insertion sort for small buckets
                    for (size_t i = 1; i < bucket.size(); ++i)
                    {
                        float key = bucket[i];
                        size_t j = i;
                        while (j > 0 && bucket[j - 1] > key)
                        {
                            bucket[j] = bucket[j - 1];
                            --j;
                        }
                        bucket[j] = key;
                    }
                }
                else
                {
                    std::sort(bucket.begin(), bucket.end());
                }
                for (float val : bucket)
                {
                    arr[idx++] = val;
                }
            }
        }
    }

    /**
     * Time Complexity:
     *  - Best/Average: O(n + k * log(k))  where k = elements per bucket
     *  - Worst: O(n log n) when all elements fall into one bucket
     *
     * Space Complexity:
     *  - O(n + k)  for buckets and array storage
     */

    } // End of bucketSort

    /**
     * Prints an array to stdout.
     *
     * @param arr  Pointer to the first element of the array.
     * @param n    Number of elements in the array.
     */
    void printArray(const float arr[], int n)
    {
        std::cout << '[';
        for (int i = 0; i < n; ++i)
        {
            std::cout << arr[i];
            if (i < n - 1)
                std::cout << ", ";
        }
        std::cout << "]\n";
    }

    int main()
    {
        // Example usage and test cases
        std::vector<std::vector<float>> testCases = {
            {},
            {1.0f},
            {2.5f, 1.2f},
            {5.0f, 3.3f, 8.8f, 4.4f, 2.2f},
            {10.0f, 7.7f, 8.8f, 9.9f, 1.1f, 5.5f},
            {3.3f, 3.3f, 3.3f},
            {0.0f, -1.1f, 5.5f, -10.5f, 8.8f}};

        for (auto &caseArr : testCases)
        {
            int n = static_cast<int>(caseArr.size());
            float *arr = n ? caseArr.data() : nullptr;

            std::cout << "Original: ";
            printArray(arr, n);
            bucketSort(arr, n);
            std::cout << "Sorted:   ";
            printArray(arr, n);
            std::cout << std::string(40, '-') << '\n';
        }

        // Performance optimization notes:
        //  - Adjust bucketCount based on data distribution for fewer elements per bucket.
        //  - Consider using insertion sort for small buckets to reduce overhead.
        //  - Use reserve() on buckets to preallocate memory if distribution is known.

        return 0;
    }

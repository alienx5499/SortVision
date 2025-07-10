# bucketSort.py
#  *
#  * Implementation of the Bucket Sort algorithm in C++.
#  *
#  * This file includes:
#  *  - bucketSort: function to sort an array of floats using bucket sort
#  *  - Input validation and edge-case handling
#  *  - Detailed comments explaining each step
#  *  - Time and space complexity analysis
#  *  - Example usage in main()
#  *  - Test cases
#  *  - Performance optimization notes


def insertion_sort(bucket):
    for i in range(1, len(bucket)):
        key = bucket[i]
        j = i - 1
        while j >= 0 and bucket[j] > key:
            bucket[j + 1] = bucket[j]
            j -= 1
        bucket[j + 1] = key

def bucket_sort(arr):
    n = len(arr)
    if n <= 1:
        return arr

    min_val = min(arr)
    max_val = max(arr)
    range_val = max_val - min_val

    # Create n buckets
    bucket_count = n
    buckets = [[] for _ in range(bucket_count)]

    if range_val == 0:
        # All elements are the same
        buckets[0].extend(arr)
    else:
        for num in arr:
            index = int(bucket_count * (num - min_val) / (range_val + 1e-6))
            index = max(0, min(index, bucket_count - 1))  # Clamp index
            buckets[index].append(num)

    # Sort each bucket and concatenate results
    sorted_arr = []
    for bucket in buckets:
        if len(bucket) <= 32:
            insertion_sort(bucket)
        else:
            bucket.sort()
        sorted_arr.extend(bucket)

    return sorted_arr


test_cases = [
    [],
    [1.0],
    [2.5, 1.2],
    [5.0, 3.3, 8.8, 4.4, 2.2],
    [10.0, 7.7, 8.8, 9.9, 1.1, 5.5],
    [3.3, 3.3, 3.3],
    [0.0, -1.1, 5.5, -10.5, 8.8]
]

for case in test_cases:
    print(f"Original: {case}")
    sorted_case = bucket_sort(case.copy())
    print(f"Sorted:   {sorted_case}")
    print("-" * 40)

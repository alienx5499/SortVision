"""Bucket Sort (for numbers in [0, 1)).

Time: Avg O(n + k), Worst O(n^2)
Space: O(n + k)
"""

def bucket_sort(arr: list[float]) -> list[float]:
    if len(arr) <= 1:
        return arr

    n = len(arr)
    buckets: list[list[float]] = [[] for _ in range(n)]

    for x in arr:
        idx = min(n - 1, int(x * n))
        buckets[idx].append(x)

    k = 0
    for bucket in buckets:
        bucket.sort()
        for x in bucket:
            arr[k] = x
            k += 1

    return arr


if __name__ == "__main__":
    arr = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]
    print(bucket_sort(arr))

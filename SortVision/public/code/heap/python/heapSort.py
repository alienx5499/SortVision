"""Heap Sort (in-place, max-heap).

Time: Best/Avg/Worst O(n log n)
Space: O(1)
"""

def heap_sort(arr: list[int]) -> list[int]:
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        _heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        _heapify(arr, i, 0)

    return arr


def _heapify(arr: list[int], n: int, i: int) -> None:
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        _heapify(arr, n, largest)


if __name__ == "__main__":
    arr = [64, 25, 12, 22, 11]
    print(heap_sort(arr))

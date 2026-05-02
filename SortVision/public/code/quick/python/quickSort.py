"""Quick Sort (in-place, Lomuto partition).

Time: Best/Avg O(n log n), Worst O(n^2)
Space: O(log n) recursion
"""

def quick_sort(arr: list[int], low: int = 0, high: int | None = None) -> list[int]:
    if high is None:
        high = len(arr) - 1

    if low < high:
        p = _partition(arr, low, high)
        quick_sort(arr, low, p - 1)
        quick_sort(arr, p + 1, high)

    return arr


def _partition(arr: list[int], low: int, high: int) -> int:
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1


if __name__ == "__main__":
    arr = [64, 25, 12, 22, 11]
    print(quick_sort(arr))

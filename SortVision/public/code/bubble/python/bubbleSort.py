"""Bubble Sort (in-place).

Time: Best O(n), Avg/Worst O(n^2)
Space: O(1)
"""

def bubble_sort(arr: list[int]) -> list[int]:
    for i in range(len(arr) - 1):
        swapped = False
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print(bubble_sort(arr))

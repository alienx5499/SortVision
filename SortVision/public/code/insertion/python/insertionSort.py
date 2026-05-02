"""Insertion Sort (in-place).

Time: Best O(n), Avg/Worst O(n^2)
Space: O(1)
"""

def insertion_sort(arr: list[int]) -> list[int]:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr


if __name__ == "__main__":
    arr = [64, 25, 12, 22, 11]
    print(insertion_sort(arr))

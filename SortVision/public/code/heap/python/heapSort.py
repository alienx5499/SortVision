"""
Heap Sort Implementation

Simple heap sort algorithm - builds a max heap then sorts by repeatedly
extracting the largest element.
"""

def heapify(arr: list[int], n: int, i: int) -> None:
    """
    Fix the heap property starting from index i.
    Makes sure parent is bigger than its kids.
    """
    # Basic checks - don't break if someone passes weird stuff
    if not arr or n <= 0 or i < 0 or i >= n:
        return

    biggest = i
    left = 2 * i + 1
    right = 2 * i + 2

    # Check left kid
    if left < n and arr[left] > arr[biggest]:
        biggest = left

    # Check right kid
    if right < n and arr[right] > arr[biggest]:
        biggest = right

    # If we found someone bigger, swap and keep going
    if biggest != i:
        arr[i], arr[biggest] = arr[biggest], arr[i]
        heapify(arr, n, biggest)

def heap_sort(arr: list[int]) -> list[int]:
    """
    Sort the array using heap sort.
    Returns a new sorted list.
    """
    if not arr:
        return []

    if len(arr) == 1:
        return arr[:]

    # Work on a copy so we don't mess up the original
    nums = arr[:]
    n = len(nums)

    # Build the heap - start from last parent and work backwards
    for i in range(n // 2 - 1, -1, -1):
        heapify(nums, n, i)

    # Now extract elements one by one
    for i in range(n - 1, 0, -1):
        # Move biggest to the end
        nums[0], nums[i] = nums[i], nums[0]
        # Fix the heap for remaining elements
        heapify(nums, i, 0)

    return nums

# Quick test to make sure it works
if __name__ == "__main__":

    # Try it out
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print("Before:", numbers)
    sorted_nums = heap_sort(numbers)
    print("After: ", sorted_nums)
    print("Original still good:", numbers)

    # Some edge cases
    print("\nEdge cases:")
    print("Empty:", heap_sort([]))
    print("One item:", heap_sort([42]))
    print("Already sorted:", heap_sort([1, 2, 3, 4, 5]))
    print("Reverse sorted:", heap_sort([5, 4, 3, 2, 1]))
    print("Duplicates:", heap_sort([3, 1, 3, 1, 3]))

    # Make sure it actually works
    test_arrays = [
        [3, 1, 4, 1, 5, 9, 2, 6],
        [100, 50, 25, 12],
        [-5, -2, -8, -1]
    ]
#     Heap sort
    print("\nTesting:")
    for arr in test_arrays:
        result = heap_sort(arr)
        # Quick check if it's actually sorted
        works = all(result[i] <= result[i+1] for i in range(len(result)-1)) if result else True
        print(f"{arr} -> {result} {'✓' if works else '✗'}")

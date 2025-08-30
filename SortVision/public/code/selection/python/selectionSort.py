def find_min_index(arr: list[int], start: int, end: int) -> int:
    """
    Find minimum element in unsorted portion
    Args:
        arr: List to search in
        start: Starting index of unsorted portion
        end: Ending index of unsorted portion
    Returns:
        int: Index of minimum element
    """
    # Initialize the minimum index as the start position
    min_idx = start

    # Iterate through the unsorted portion to find the minimum element
    for i in range(start + 1, end):
        # If we find a smaller element, update min_idx
        if arr[i] < arr[min_idx]:
            min_idx = i

    return min_idx

def selection_sort(arr: list[int]) -> list[int]:

    # Get the length of the array
    n = len(arr)

    # If array is empty or has one element, it's already sorted
    if n <= 1:
        return arr

    # Iterate through the array
    for i in range(n - 1):
        # Find the minimum element in the unsorted portion
        min_idx = find_min_index(arr, i, n)

        # Swap the found minimum element with the first element
        # of the unsorted portion if they are different
        if i != min_idx:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]

    return arr

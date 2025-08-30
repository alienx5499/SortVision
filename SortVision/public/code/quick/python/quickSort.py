def partition(arr: list[int], low: int, high: int) -> int:
    """
    Partition function to place pivot at correct position
    Args:
        arr: List to be partitioned
        low: Starting index
        high: Ending index
    Returns:
        int: Final position of pivot
    """
    # Choose the rightmost element as pivot
    pivot = arr[high]

    # Initialize the index for smaller elements
    # This will be the final position where pivot will be placed
    i = low - 1

    # Iterate through all elements except the pivot
    for j in range(low, high):
        # If current element is smaller than pivot
        if arr[j] <= pivot:
            # Increment index of smaller element
            i += 1
            # Swap current element with element at i
            arr[i], arr[j] = arr[j], arr[i]

    # Place pivot in its correct position
    # All elements before this position are smaller
    # All elements after this position are greater
    arr[i + 1], arr[high] = arr[high], arr[i + 1]

    # Return the position of the pivot
    return i + 1

def quick_sort(arr: list[int], low: int, high: int) -> list[int]:
    """
    Quick sort function to sort array using partition
    Args:
        arr: List to be sorted
        low: Starting index
        high: Ending index
    Returns:
        list[int]: Sorted list
    """
    # Only process if there are at least 2 elements
    if low < high:
        # Find the partition index where pivot is correctly placed
        pi = partition(arr, low, high)

        # Recursively sort elements before and after partition
        quick_sort(arr, low, pi - 1)     # Sort left part
        quick_sort(arr, pi + 1, high)    # Sort right part

    return arr

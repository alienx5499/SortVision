def merge(arr: list[int], left: int, mid: int, right: int) -> None:
    """
    Merges two sorted subarrays of arr.
    First subarray is arr[left:mid+1]
    Second subarray is arr[mid+1:right+1]
    """
    # Create temporary arrays for left and right subarrays
    n1 = mid - left + 1
    n2 = right - mid
    L = arr[left:mid+1]
    R = arr[mid+1:right+1]

    i = j = 0  # Initial indexes of first and second subarrays
    k = left   # Initial index of merged subarray

    # Merge the temp arrays back into arr[left..right]
    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1

    # Copy any remaining elements of L[]
    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1

    # Copy any remaining elements of R[]
    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1


def merge_sort(arr: list[int], left: int, right: int) -> None:
    """
    Sorts arr[left..right] using Merge Sort algorithm (in-place).
    """
    if left < right:
        # Find the middle point
        mid = (left + right) // 2
        # Recursively sort first and second halves
        merge_sort(arr, left, mid)
        merge_sort(arr, mid + 1, right)
        # Merge the sorted halves
        merge(arr, left, mid, right)


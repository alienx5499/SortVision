def insertion_sort(arr: list[int]) -> list[int]:
    # Traverse from the second element to the end of the list
    for i in range(1, len(arr)):
        key = arr[i]  # The current element to be inserted
        j = i - 1
        # Move elements of arr[0..i-1], that are greater than key, to one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        # Insert the key at the correct position
        arr[j + 1] = key
    return arr
// merge combines two sorted portions of an array
// arr: The array containing the portions to merge
// left: Start index of first portion
// mid: End index of first portion
// right: End index of second portion
func merge(arr []int, left, mid, right int) {
    // Calculate sizes of two subarrays to be merged
    n1 := mid - left + 1
    n2 := right - mid

    // Create temporary arrays for both halves
    leftArr := make([]int, n1)
    rightArr := make([]int, n2)

    // Copy data to temporary arrays
    for i := 0; i < n1; i++ {
        leftArr[i] = arr[left+i]
    }
    for j := 0; j < n2; j++ {
        rightArr[j] = arr[mid+1+j]
    }

    // Merge the temporary arrays back into arr[left..right]
    i := 0     // Initial index of first subarray
    j := 0     // Initial index of second subarray
    k := left  // Initial index of merged subarray

    // Compare and merge elements from both subarrays
    for i < n1 && j < n2 {
        if leftArr[i] <= rightArr[j] {
            arr[k] = leftArr[i]
            i++
        } else {
            arr[k] = rightArr[j]
            j++
        }
        k++
    }

    // Copy remaining elements of leftArr[] if any
    for i < n1 {
        arr[k] = leftArr[i]
        i++
        k++
    }

    // Copy remaining elements of rightArr[] if any
    for j < n2 {
        arr[k] = rightArr[j]
        j++
        k++
    }
}

// MergeSort performs merge sort on an array
// arr: The array to sort
// left: Start index
// right: End index
// Returns: The sorted array
func MergeSort(arr []int, left, right int) []int {
    // Only proceed if there are at least 2 elements to sort
    if left < right {
        // Find the middle point to divide array into two halves
        mid := left + (right-left)/2

        // Recursively sort first and second halves
        MergeSort(arr, left, mid)      // Sort left half
        MergeSort(arr, mid+1, right)   // Sort right half

        // Merge the sorted halves
        merge(arr, left, mid, right)
    }
    return arr
}
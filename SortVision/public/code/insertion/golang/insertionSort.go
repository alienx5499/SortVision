func InsertionSort(arr []int) []int {
    // Get the length of input array
    n := len(arr)
    
    // Iterate through array starting from the second element
    for i := 1; i < n; i++ {
        // Store current element as key to be inserted
        // in correct position
        key := arr[i]
        
        // Initialize j as the element before current position
        j := i - 1
        
        // Move elements of arr[0..i-1] that are greater than key
        // one position ahead of their current position
        // This creates the space to insert the key
        for j >= 0 && arr[j] > key {
            // Shift elements to the right
            arr[j+1] = arr[j]
            j = j - 1
        }
        
        // Place key in its correct position
        // j+1 is the correct position because j was decremented
        // one extra time in the last iteration of the inner loop
        arr[j+1] = key
    }
    
    // Return the sorted array
    return arr
}




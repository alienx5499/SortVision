
void insertionSort(std::vector<int>& arr) {
    // Get the size of the array
    int n = arr.size();
    
    // Start from the second element (index 1)
    // First element (index 0) is considered as sorted
    for (int i = 1; i < n; i++) {
        // Store the current element to be inserted
        int key = arr[i];
        
        // Initialize j as the position before current element
        int j = i - 1;
        
        // Move elements of arr[0..i-1] that are greater than key
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];  // Shift element to the right
            j = j - 1;            // Move to previous position
        }
        
        // Place the key in its correct position
        arr[j + 1] = key;
    }
}

    public static void insertionSort(int[] arr) {
        // Iterate through the array starting from the second element
        for (int i = 1; i < arr.length; i++) {
            // Store the current element that needs to be inserted in the right position
            int key = arr[i];
            
            // Initialize j as the position before i
            int j = i - 1;
            
            // Move elements of arr[0..i-1] that are greater than key
            // to one position ahead of their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];    // Shift element to the right
                j = j - 1;              // Move to previous position
            }
            
            // Place the key in its correct position
            arr[j + 1] = key;
        }
    }

   


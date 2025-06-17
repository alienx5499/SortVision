function insertionSort(arr: number[]): number[] {
    // Make a copy of the input array to avoid modifying the original
    const array = [...arr];
    
    // Start from the second element (index 1)
    // as a single element is already sorted
    for (let i = 1; i < array.length; i++) {
        // Store the current element to be inserted
        const current = array[i];
        let j = i - 1;
        
        // Move elements that are greater than current
        // to one position ahead of their current position
        while (j >= 0 && array[j] > current) {
            array[j + 1] = array[j];
            j--;
        }
        
        // Place the current element in its correct position
        array[j + 1] = current;
    }
    
    return array;
}


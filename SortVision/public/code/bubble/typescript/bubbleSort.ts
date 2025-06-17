
function bubbleSort<T>(arr: T[]): T[] {
    // Get the length of the array
    const n = arr.length;
    
    // Flag to optimize the algorithm by checking if any swaps occurred
    let swapped: boolean;
    
    // Outer loop for passes through the array
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        // Inner loop for comparing adjacent elements
        // With each pass, the largest element "bubbles up" to the end
        for (let j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap the elements if they are in wrong order
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // If no swapping occurred in this pass, array is already sorted
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}


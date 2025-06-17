function heapify(arr: number[], n: number, i: number): void {
    let largest = i;        // Initialize largest as root
    const left = 2 * i + 1; // Left child index
    const right = 2 * i + 2; // Right child index

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root, swap and recursively heapify the affected sub-tree
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap elements
        heapify(arr, n, largest);
    }
}
/**
 * Performs heap sort on an array of numbers
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 * 
 * The algorithm works in two steps:
 * 1. Build a max heap from the input array
 * 2. Repeatedly extract the maximum element and rebuild the heap
 */
function heapSort(arr: number[]): number[] {
    const n = arr.length;

    // Build max heap (rearrange array)
    // Start from last non-leaf node and heapify all nodes in reverse order
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root (maximum element) to end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Call heapify on the reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

export { heapSort };
/**
 * Implements the Merge Sort algorithm for sorting an array of numbers.
 * Merge Sort is a divide-and-conquer algorithm that divides an array into two halves,
 * recursively sorts them, and then merges the two sorted halves.
 *
 * @remarks
 * Time Complexity: O(N log N) in all cases (best, average, worst) due to its
 * consistent divide-and-conquer approach.
 * Space Complexity: O(N) due to the temporary arrays used in the merge operation.
 *
 * Key characteristics:
 * - Stable sort: Preserves the relative order of equal elements.
 * - Not in-place: Requires additional memory proportional to the input size.
 * - Efficient for large datasets and external sorting.
 */

/**
 * Merges two sorted portions of an array into a single sorted portion.
 * This private helper function is the core of the merge sort algorithm.
 * It assumes that the subarrays arr[left...mid] and arr[mid+1...right] are already sorted.
 *
 * @param arr The array containing the portions to merge.
 * @param left The starting index of the first sorted portion.
 * @param mid The ending index of the first sorted portion (and mid+1 is the start of the second).
 * @param right The ending index of the second sorted portion.
 */
function merge(arr: number[], left: number, mid: number, right: number): void {
    // Calculate the sizes of the two subarrays to be merged
    const size1 = mid - left + 1;
    const size2 = right - mid;

    // Create temporary arrays to hold the elements of the two subarrays
    // Performance Optimization Note: While possible to optimize memory by using a single auxiliary
    // array passed through the recursion, for clarity and typical use cases, separate temporary
    // arrays for each merge step are common and clear.
    const leftArray: number[] = new Array(size1);
    const rightArray: number[] = new Array(size2);

    // Copy data from the main array into the temporary left array
    for (let i = 0; i < size1; i++) {
        leftArray[i] = arr[left + i];
    }
    // Copy data from the main array into the temporary right array
    for (let i = 0; i < size2; i++) {
        rightArray[i] = arr[mid + 1 + i];
    }

    // Initial indices for merging:
    // i for leftArray, j for rightArray, k for the main array (arr)
    let i = 0; // Initial index of first subarray
    let j = 0; // Initial index of second subarray
    let k = left; // Initial index of merged subarray

    // Merge the temporary arrays back into the main array (arr[left...right])
    // Compare elements from leftArray and rightArray and place the smaller one
    // into the correct position in the main array.
    while (i < size1 && j < size2) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    // Copy any remaining elements of leftArray (if any)
    while (i < size1) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }

    // Copy any remaining elements of rightArray (if any)
    while (j < size2) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}

/**
 * Performs merge sort on a specified portion of an array.
 * This is the recursive function that divides the array into halves and then merges them.
 *
 * @param arr The array to be sorted. This array will be modified in-place.
 * @param left The starting index of the portion to be sorted.
 * @param right The ending index of the portion to be sorted.
 * @returns The sorted array (the same reference as the input `arr`).
 */
function mergeSort(arr: number[], left: number, right: number): number[] {
    // Input validation: Ensure the array is valid and indices are within bounds
    if (!arr || left < 0 || right >= arr.length || left > right) {
        // For educational purposes, throwing an error is appropriate for invalid input.
        // In a production system, you might handle this more gracefully (e.g., return original array).
        if (arr.length === 0) {
            return arr; // An empty array is already sorted, no error.
        }
        if (left > right) {
            // This can happen in recursive calls if a segment becomes empty, which is fine.
            // But if initial call has left > right, it's an invalid range.
            // For the recursive flow, this condition `left < right` handles it.
        } else {
            console.error(`Invalid input for mergeSort: arr.length=${arr.length}, left=${left}, right=${right}`);
            throw new Error("Invalid array or index range for mergeSort.");
        }
    }

    // Base case for recursion: if the array segment has one or zero elements, it's already sorted.
    if (left < right) {
        // Find the middle point to divide the array into two halves
        // Using Math.floor to ensure an integer index
        const mid = Math.floor(left + (right - left) / 2);

        // Recursively sort the first half
        mergeSort(arr, left, mid);
        // Recursively sort the second half
        mergeSort(arr, mid + 1, right);

        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
    return arr; // Return the sorted array (modified in-place)
}

/**
 * Main function for demonstrating the Merge Sort algorithm and running test cases.
 */
function main() {
    console.log("--- Example Usage ---");
    const exampleArray = [12, 11, 13, 5, 6, 7];
    console.log("Original Array: ", JSON.stringify(exampleArray)); // Use JSON.stringify for clean output
    const sortedExampleArray = mergeSort(exampleArray, 0, exampleArray.length - 1);
    console.log("Sorted Array: ", JSON.stringify(sortedExampleArray));
    console.log("\n");

    console.log("--- Running Test Cases ---");

    // Test Case Helper Function
    function runTestCase(testName: string, input: number[]) {
        const originalArray = [...input]; // Create a copy to preserve original for logging
        const expectedSorted = [...input].sort((a, b) => a - b); // Use built-in sort for comparison

        console.log(`Test Case: ${testName}`);
        console.log(`  Input: ${JSON.stringify(originalArray)}`);

        try {
            const result = mergeSort(input, 0, input.length - 1);
            console.log(`  Sorted: ${JSON.stringify(result)}`);

            // Compare arrays element by element for correctness
            const passed = result.length === expectedSorted.length &&
                           result.every((value, index) => value === expectedSorted[index]);

            if (passed) {
                console.log("  Status: PASSED");
            } else {
                console.log(`  Status: FAILED - Expected: ${JSON.stringify(expectedSorted)}`);
            }
        } catch (e: any) { // Type 'any' for e in catch block to access message safely
            console.log(`  Status: FAILED - Exception: ${e.name}: ${e.message}`);
            // In a real environment, you might log the full stack trace here for debugging.
            // console.error(e);
        }
        console.log("---\n");
    }

    // Test Case 1: Normal array
    runTestCase("Normal Array", [8, 4, 2, 1, 7, 3, 6, 5]);

    // Test Case 2: Already sorted array
    runTestCase("Already Sorted Array", [1, 2, 3, 4, 5]);

    // Test Case 3: Reverse sorted array
    runTestCase("Reverse Sorted Array", [5, 4, 3, 2, 1]);

    // Test Case 4: Array with duplicate elements
    runTestCase("Array with Duplicates", [4, 2, 2, 8, 1, 4, 3, 1]);

    // Test Case 5: Empty array (edge case)
    runTestCase("Empty Array", []);

    // Test Case 6: Single element array (edge case)
    runTestCase("Single Element Array", [42]);

    // Test Case 7: Array with negative numbers
    runTestCase("Array with Negative Numbers", [-5, 0, -10, 3, -2]);

    // Test Case 8: Large array (demonstrates performance for larger N)
    const largeArray: number[] = new Array(10000);
    for (let i = 0; i < largeArray.length; i++) {
        largeArray[i] = Math.floor(Math.random() * 100000); // Random numbers up to 99999
    }
    runTestCase("Large Random Array (10,000 elements)", largeArray);

    // Test Case 9: Array with all same elements
    runTestCase("Array with All Same Elements", [7, 7, 7, 7, 7]);
}

// Execute the main function to run examples and tests
main();

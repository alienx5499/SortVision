/**
 * Get maximum value in array. Used to determine the number of digits for Radix Sort.
 * This function expects an array of positive numbers, as it's used internally
 * by radixSort on positive numbers or absolute values of negative numbers.
 *
 * @param arr - Array to find maximum in. Must not be empty and should contain positive numbers.
 * @returns Maximum value in the array.
 * @throws Error if the array is empty.
 */
function getMax(arr: number[]): number {
    if (arr.length === 0) {
        throw new Error("Array cannot be empty when getting max value");
    }
    let max = arr[0]; // Assume arr[0] is positive as per function contract
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

/** * Count Sort Algorithm Implementation in TypeScript.
 * @param arr - Array of numbers to be sorted (or a part of it, e.g., positive numbers or absolute values of negative numbers).
 *            The function modifies this array in place.
 * @param exp - The current digit's place value (e.g., 1 for units digit, 10 for tens digit, base for base's place).
 * @param base - The numeral system base (e.g., 10 for decimal, 2 for binary).
 */
function countSort(arr: number[], exp: number, base: number): void {
    const output = new Array(arr.length);
    const count = new Array(base).fill(0);

    for (let i = 0; i < arr.length; i++) {
        count[Math.floor(Math.abs(arr[i]) / exp) % base]++;
    }

    for (let i = 1; i < base; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        const index = Math.floor(Math.abs(arr[i]) / exp) % base;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

/**
 * Radix Sort Algorithm Implementation in TypeScript.
 *
 * Sorts an array of numbers (positive and negative) using the Radix Sort algorithm.
 * The sort is stable.
 *
 * @remarks
 * Radix sort is a non-comparative sorting algorithm. It avoids comparison by creating
 * and distributing elements into buckets according to their radix. For elements with
 * more than one significant digit, this bucketing process is repeated for each digit,
 * while preserving the ordering of the prior step, until all digits have been considered.
 *
 * **Time Complexity:** O(d * (n + b))
 * Where:
 * - n is the number of elements in the array.
 * - d is the maximum number of digits in any number in the array (for the given base).
 *   
 * - b is the base used for sorting.
 * In cases where d -> constant and b ! significantly larger than n, Radix Sort can perform linearly, O(n).
 *
 * **Space Complexity:** O(n + b)
 * This is due to:
 * - The output array of size n and count array of size b used in each call to countSort.
 * - Additional arrays for separating negative and positive numbers, each potentially up to size n.
 *
 * @param arr - The array of numbers to be sorted.
 * @param base - The base of the numeral system to be used for sorting (e.g., 10 for decimal, 2 for binary).
 *               Must be an integer greater than or equal to 2. Defaults to 10.
 * @returns A new array containing the sorted numbers.
 * @throws Error if the base is less than 2.
 */
function radixSort(arr: number[], base: number = 10): number[] {
    if (arr.length <= 1) {
        return [...arr]; 
    }

    if (base < 2) {
        throw new Error("Base must be at least 2");
    }

    const negativeNumbers = arr.filter(num => num < 0);
    const positiveNumbers = arr.filter(num => num >= 0);

    let sortedNegativeNumbers: number[] = [];
    if (negativeNumbers.length > 0) {
       
        const absNegativeNumbers = negativeNumbers.map(num => Math.abs(num));
        
        if (absNegativeNumbers.length > 0) {
            const maxNeg = getMax(absNegativeNumbers); 
            for (let exp = 1; Math.floor(maxNeg / exp) > 0; exp *= base) {
                countSort(absNegativeNumbers, exp, base);
            }
        }
        sortedNegativeNumbers = absNegativeNumbers.map(num => -num).reverse();
    }

    let sortedPositiveNumbers: number[] = [];
    if (positiveNumbers.length > 0) {
        const maxPos = getMax(positiveNumbers);
        for (let exp = 1; Math.floor(maxPos / exp) > 0; exp *= base) {
            countSort(positiveNumbers, exp, base);
        }
        sortedPositiveNumbers = positiveNumbers; 
    }

    return [...sortedNegativeNumbers, ...sortedPositiveNumbers];
}



export { getMax, countSort, radixSort };

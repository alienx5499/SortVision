/**
 * ============================================================================
 * 📝 Radix Sort Implementation in JavaScript
 
 */

/**
 * Get the maximum absolute value in array to determine number of digits
 * @param {number[]} arr - Array to find maximum in
 * @returns {number} Maximum absolute value in the array
 */
function getMax(arr) {
  return arr.reduce(
    (max, val) => Math.max(max, Math.abs(val)),
    Math.abs(arr[0])
  );
}

/**
 * Performs counting sort based on the digit represented by exp
 * @param {number[]} arr - Array to be sorted
 * @param {number} exp - Current digit position (1, 10, 100, etc.)
 * @param {number} base - Number base (e.g., 10 for decimal)
 */
function countSort(arr, exp, base) {
  const output = new Array(arr.length);
  const count = new Array(base).fill(0);

  // Count occurrences for current digit
  for (let i = 0; i < arr.length; i++) {
    const digit = Math.floor(Math.abs(arr[i]) / exp) % base;
    count[digit]++;
  }

  // Cumulative count
  for (let i = 1; i < base; i++) {
    count[i] += count[i - 1];
  }

  // Build output (stable sort)
  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(Math.abs(arr[i]) / exp) % base;
    output[--count[digit]] = arr[i];
  }

  // Copy sorted output into original array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}

/**
 * Radix sort function
 * @param {number[]} arr - Array to be sorted
 * @param {number} [base=10] - Number base to use (default: 10)
 * @returns {number[]} Sorted array
 */
function radixSort(arr, base = 10) {
  if (!Array.isArray(arr) || arr.length <= 1) return arr;

  // Separate negative and positive numbers
  const negs = arr.filter((num) => num < 0);
  const poss = arr.filter((num) => num >= 0);

  // Sort positive numbers
  if (poss.length > 0) {
    const max = getMax(poss);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= base) {
      countSort(poss, exp, base);
    }
  }

  // Sort negative numbers
  if (negs.length > 0) {
    const negAbs = negs.map((num) => -num);
    const max = getMax(negAbs);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= base) {
      countSort(negAbs, exp, base);
    }
    negAbs.reverse();
    for (let i = 0; i < negAbs.length; i++) {
      negAbs[i] = -negAbs[i];
    }
    arr = [...negAbs, ...poss];
  } else {
    arr = [...poss];
  }

  return arr;
}

/**
 * ✅ Example Usage & Test Cases
 */
function testRadixSort() {
  const tests = [
    { input: [170, -45, 75, -90, 802, 24, 2, 66], base: 10 },
    { input: [], base: 10 },
    { input: [5], base: 10 },
    { input: [-5, -1, -10, -3], base: 10 },
    { input: [4, 2, 9, 1, 6], base: 2 }, // Binary base
  ];

  tests.forEach(({ input, base }, i) => {
    const original = [...input];
    const result = radixSort(input, base);
    console.log(`Test ${i + 1} - Base ${base}`);
    console.log("Original:", original);
    console.log("Sorted:  ", result);
    console.log("---------------------------");
  });
}

// Run test cases
testRadixSort();

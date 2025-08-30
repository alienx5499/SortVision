/*
Bubble Sort Algorithm in JavaScript

What this file includes :-

-Implemented Bubble Sort Algorithm
-Comments to make code clear
-Time and Space Complexity Analysis
-Example usage
-Test cases
-Performance Optimization Notes

Bubble Sort Algorithm - Compares adjacent elements over n-1 iterations and swaps the numbers to increasing order.

*/

//Implementation

function bubbleSort(arr) {
  const n = arr.length;

  //Iterations
  for (let i = 0; i < n - 1; i++) {
    //Optimization
    let isSwapped = false;

    //Comparing the adjacent elements and swaping them
    for (let j = 0; j < n - i - 1; j++) {
      //swap
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        isSwapped = true;
      }
    }
    //Optimization - if array is already sorted
    if (!isSwapped) break;
  }

  return arr;
}

/*
Time Complexity

-Iterations - O(n)
-Comparisons - O(n)
-Overall Time complexity as they are loops
O(n*n) = O(n^2)

Space Complexity

-In place substitutions - O(1)
*/

//Example Usage

const example = [4, 1, 3, 2, 10, 7];
console.log('Original: ', example.slice());
console.log('Sorted: ', bubbleSort(example.slice()));

//Test Cases

function testCases() {
  //Assigning test cases
  const tests = [
    { input: [], expected: [] },
    { input: [1], expected: [1] },
    { input: [2, 1], expected: [1, 2] },
    { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { input: [2, 2, 2], expected: [2, 2, 2] },
    { input: [10, 3, 1, 2, 4, 11, 7, 6], expected: [1, 2, 3, 4, 6, 7, 10, 11] },
    { input: [1, 2, 1, 2, 1, 2, 1], expected: [1, 1, 1, 1, 2, 2, 2] },
  ];

  //Checking tests
  tests.forEach(({ input, expected }, index) => {
    const result = bubbleSort(input.slice());
    const passed = JSON.stringify(result) === JSON.stringify(expected);

    //Printing Checks of test cases
    console.log(
      `Test ${index + 1}:`,
      passed ? 'Passed!' : `Failed! got ${result} as result`
    );
  });
}

testCases();

/* Performance Optimization Notes :
- Stop early is array is already sorted using boolean isSwap variable.
- This is best case as this is O(n) time complexity.
- After every pass, the largest unsorted element is at the correct position.
- No need to check the last i elements again—they are already sorted.
*/

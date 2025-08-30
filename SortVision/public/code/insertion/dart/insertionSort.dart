/*
Insertion Sort Algorithm in Dart

What this file includes :-

-Implemented Insertion Sort Algorithm
-Comments to make code clear
-Time and Space Complexity Analysis
-Example usage
-Test cases
-Performance Optimization Notes

Insertion Sort Algorithm - In this we take one element at a time and arrange it to it's correct position.

*/

//Implementation

class InsertionSort {

  static void sort(List<int> arr) {
    int n = arr.length;

    if (arr == null || n <= 1)
    {
      // Array is null, empty, or has a single element; no sorting needed.
      return;
    }

    //Running Iterations from 2nd Element assuming first as sorted
    for(int i = 1; i < n; i++) {
      int currElement = arr[i];
      int prev = i - 1;

      //Comaring Elements and position them on their correct position
      while(prev >= 0 && arr[prev] > currElement) {
        arr[prev + 1] = arr[prev];
        prev--;
      }

      arr[prev + 1] = currElement;
    }
  }

  // Time Complexity

  // -Iterations - O(n)
  // -Assigning - O(n)
  // -Overall Time complexity as they are loops
  // O(n*n) = O(n^2)

  // Space Complexity

  // -In place substitutions - O(1)

  //Test Cases
  static void runTestCases() {
    List<List<int>> testCases = [
      [],                        //Empty Array
      [1],                       //Single Element
      [10, 1, 9, 3, 8, 4, 2, 7], //Standard Case
      [1, 2, 3, 4, 5],           //Already Sorted
      [5, 4, 3, 2, 1],           //Reverse Sorted
      [2, 2, 2, 1, 1, 3, 1]      //Repeated Elements
    ];

    List<List<int>> expectedResults = [
      [],
      [1],
      [1, 2, 3, 4, 7, 8, 9, 10],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 1, 1, 2, 2, 2, 3]
    ];

    for(int i = 0; i < testCases.length; i++) {

      //This makes a copy of the list testCases[i] so that we can sort it without changing the original test case.
      List<int> arr = List.from(testCases[i]);
      InsertionSort.sort(arr);

      //Assert() function is used to verify that a condition is true at runtime.
      assert(arr.toString() == expectedResults[i].toString(), 'Test case $i failed');
    }

    print("All test cases passed");
  }
}



void main() {
  //Example Cases
  List<int> example = [4, 1, 5, 3, 2];
  print("Original: $example");
  InsertionSort.sort(example);
  print("Sorted: $example");

  //running test cases

  InsertionSort.runTestCases();
}


/*Performance Optimization Notes

-Instead of swapping every time, shift elements and insert once.
-Add a condition of breaking if no sorting is needed.

*/

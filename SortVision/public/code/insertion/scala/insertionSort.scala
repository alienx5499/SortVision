/*
Insertion Sort Algorithm in Scala

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

object InsertionSort {
  def insertionSort(arr: Array[Int]): Array[Int] = {

    if (arr == null || arr.length <= 1){
      // Array is null, empty, or has a single element; no sorting needed.
      arr
    }

    //Running Iterations from 2nd Element assuming first as sorted
    for(i <- 1 until arr.length) {
      val currElement = arr(i)
      var prev = i - 1

      while(prev >= 0 && arr(prev) > currElement) {
        arr(prev + 1) = arr(prev)
        prev -= 1
      }

      arr(prev + 1) = currElement
    }

    arr
  }
}

// Time Complexity

// -Iterations - O(n)
// -Assigning - O(n)
// -Overall Time complexity as they are loops
// O(n*n) = O(n^2)

// Space Complexity

// -In place substitutions - O(1)

object InsertionSortTest {
  def main(args: Array[String]): Unit = {

     // Example Case
    val arr1 = Array(64, 34, 25, 12, 22, 11, 90)
    println("Original Array: " + arr1.mkString(", "))
    val sorted1 = InsertionSort.insertionSort(arr1.clone())
    println("Sorted Array:   " + sorted1.mkString(", "))


    //Test Cases
    // Test Case 1: Already sorted
    val arr2 = Array(1, 2, 3, 4, 5)
    assert(InsertionSort.insertionSort(arr2.clone()).sameElements(Array(1, 2, 3, 4, 5)))

    // Test Case 2: Reverse order
    val arr3 = Array(5, 4, 3, 2, 1)
    assert(InsertionSort.insertionSort(arr3.clone()).sameElements(Array(1, 2, 3, 4, 5)))

    // Test Case 3: All elements equal
    val arr4 = Array(7, 7, 7, 7)
    assert(InsertionSort.insertionSort(arr4.clone()).sameElements(Array(7, 7, 7, 7)))

    // Test Case 4: Empty array
    val arr5 = Array[Int]()
    assert(InsertionSort.insertionSort(arr5.clone()).isEmpty)

    // Test Case 5: Single Element
    val arr6 = Array[Int](1)
    assert(InsertionSort.insertionSort(arr6.clone()).sameElements(Array(1)))

    println("All tests passed!")
  }
}

/*Performance Optimization Notes

-Instead of swapping every time, shift elements and insert once.
-Add a condition of breaking if no sorting is needed./

*/

/*
Bubble Sort Algorithm in Scala

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

object BubbleSort {
  def bubbleSort(arr: Array[Int]): Array[Int] = {

    val n = arr.length

    //Iterations
    for(i <- 0 until n-1) {

      //optimization
      var swapped = false

      for(j <- 0 until n - i - 1) {
        if(arr(j) > arr(j+1)) {

          //swap
          val temp = arr(j)
          arr(j) = arr(j+1)
          arr(j+1) = temp
          swapped = true
        }
      }

      if(!swapped) {
        //Array is already sorted
        return arr
      }
    }

    arr
  }
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

object BubbleSortTest {
  def main(args: Array[String]): Unit = {

    // Example Case
    val arr1 = Array(64, 34, 25, 12, 22, 11, 90)
    println("Original Array: " + arr1.mkString(", "))
    val sorted1 = BubbleSort.bubbleSort(arr1.clone())
    println("Sorted Array:   " + sorted1.mkString(", "))


    //Test Cases
    // Test Case 1: Already sorted
    val arr2 = Array(1, 2, 3, 4, 5)
    assert(BubbleSort.bubbleSort(arr2.clone()).sameElements(Array(1, 2, 3, 4, 5)))

    // Test Case 2: Reverse order
    val arr3 = Array(5, 4, 3, 2, 1)
    assert(BubbleSort.bubbleSort(arr3.clone()).sameElements(Array(1, 2, 3, 4, 5)))

    // Test Case 3: All elements equal
    val arr4 = Array(7, 7, 7, 7)
    assert(BubbleSort.bubbleSort(arr4.clone()).sameElements(Array(7, 7, 7, 7)))

    // Test Case 4: Empty array
    val arr5 = Array[Int]()
    assert(BubbleSort.bubbleSort(arr5.clone()).isEmpty)

    // Test Case 5: Single Element
    val arr6 = Array[Int](1)
    assert(BubbleSort.bubbleSort(arr6.clone()).sameElements(Array(1)))

    println("All tests passed!")
  }
}


/* Performance Optimization Notes :
- Stop early is array is already sorted using boolean isSwap variable.
- This is best case as this is O(n) time complexity.
- After every pass, the largest unsorted element is at the correct position.
- No need to check the last i elements again—they are already sorted.
*/

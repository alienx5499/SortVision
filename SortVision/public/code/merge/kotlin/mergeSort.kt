/*
Merge Sort Algorithm in Kotlin

What this file includes :-

-Implemented Merge Sort Algorithm
-Comments to make code clear
-Time and Space Complexity Analysis
-Example usage
-Test cases
-Performance Optimization Notes

Merge Sort Algorithm - This is a divide-and-conquer algorithm that divides an array into two halves,
recursively sorts them, and then merges the two sorted halves.

*/

//Implementation

class MergeSort {
  companion object {
    fun sort(arr: IntArray) {
      mergeSort(arr, 0, arr.size - 1)
    }

    private fun mergeSort(arr: IntArray, left: Int, right: Int) {
      if (left < right) {
          val middle = left + (right - left) / 2

          //dividing the left half
          mergeSort(arr, left, middle)

          //dividing the right half
          mergeSort(arr, middle + 1, right)

          //merging the divided halves
          merge(arr, left, middle, right)
      }
    }

    private fun merge(arr: IntArray, left: Int, middle: Int, right: Int) {
      val leftSize = middle - left + 1
      val rightSize = right - middle

      val leftArray = IntArray(leftSize) { arr[left + it] }
      val rightArray = IntArray(rightSize) { arr[middle + 1 + it] }

      var i = 0
      var j = 0
      var k = left

      //merging elements based on their ascending value
      while (i < leftSize && j < rightSize) {
          if (leftArray[i] <= rightArray[j]) {
              arr[k++] = leftArray[i++]
          } else {
              arr[k++] = rightArray[j++]
          }
      }

      while (i < leftSize) {
          arr[k++] = leftArray[i++]
      }

      while (j < rightSize) {
          arr[k++] = rightArray[j++]
      }
    }
  }
}

//Time Complexity

//Since the various loops runs n times the time complexity is O(n logn)

//Space Complexity

// It is O(n)

//test cases

fun testMergeSort() {
  fun assertSorted(input: IntArray, expected: IntArray) {
    MergeSort.sort(input)
    assert(input.contentEquals(expected)) {
      "Expected: ${expected.joinToString()}, Got: ${input.joinToString()}"
    }
  }

  assertSorted(intArrayOf(5, 2, 4, 6, 1, 3), intArrayOf(1, 2, 3, 4, 5, 6)) //Normal Case
  assertSorted(intArrayOf(1, 2, 3, 4, 5), intArrayOf(1, 2, 3, 4, 5))       //Already Sorted
  assertSorted(intArrayOf(9, 7, 5, 3, 1), intArrayOf(1, 3, 5, 7, 9))       //Reverse Sorted
  assertSorted(intArrayOf(4, 2, 2, 8, 3, 3), intArrayOf(2, 2, 3, 3, 4, 8)) //Repeated Values
  assertSorted(intArrayOf(42), intArrayOf(42))                             //Single Element
  assertSorted(intArrayOf(), intArrayOf())                                 //Empty Array

  println("All test cases passed.")
}

fun main() {
  val arr = intArrayOf(38, 27, 43, 3, 9, 82, 10)
  println("Original: ${arr.joinToString(", ")}")

  MergeSort.sort(arr)

  println("Sorted:   ${arr.joinToString(", ")}")

  //running the test cases

  testMergeSort()
}

object SelectionSort {
  // Finding the index of the minimum number in the subarray
  def findMinIndex(arr: Array[Int], start: Int, end: Int): Int = {
    var minIdx = start // assume first element as minimum
    for (i <- start + 1 to end) {
      if (arr(i) < arr(minIdx)) {
        minIdx = i
      }
    }
    minIdx
  }

  // Sorting the array using selection sort
  def selectionSort(arr: Array[Int]): Array[Int] = {
    val n = arr.length
    for (i <- 0 until n - 1) {
      val minIdx = findMinIndex(arr, i, n - 1)
      val temp = arr(i)
      arr(i) = arr(minIdx)
      arr(minIdx) = temp
    }
    arr
  }
}


object SelectionSortTest {
  def main(args: Array[String]): Unit = {
    // Example Case
    val arr1 = Array(64, 34, 25, 12, 22, 11, 90)
    println("Original Array: " + arr1.mkString(", "))
    val sorted1 = SelectionSort.selectionSort(arr1.clone())
    println("Sorted Array:   " + sorted1.mkString(", "))

    // Test Cases
    // Test Case 1: Already sorted
    val arr2 = Array(1, 2, 3, 4, 5)
    assert(SelectionSort.selectionSort(arr2.clone()).sameElements(Array(1, 2, 3, 4, 5)))

    // Test Case 2: Reverse order
    val arr3 = Array(5, 4, 3, 2, 1)
    assert(SelectionSort.selectionSort(arr3.clone()).sameElements(Array(1, 2, 3, 4, 5)))

    // Test Case 3: All elements equal
    val arr4 = Array(7, 7, 7, 7)
    assert(SelectionSort.selectionSort(arr4.clone()).sameElements(Array(7, 7, 7, 7)))

    // Test Case 4: Empty array
    val arr5 = Array[Int]()
    assert(SelectionSort.selectionSort(arr5.clone()).isEmpty)

    // Test Case 5: Single Element
    val arr6 = Array
    assert(SelectionSort.selectionSort(arr6.clone()).sameElements(Array(1)))

    println("All tests passed!")
  }
}

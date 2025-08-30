// Merge Sort is a divide and conquer algorithm that divides the array into halves, sorts them and merges them.

object MergeSort {
  // Main function to sort an array using merge sort
  def mergeSort(arr: Array[Int]): Array[Int] = {
    // Base case: if the array has 0 or 1 element, it's already sorted
    if (arr.length <= 1) return arr

    // Find the middle index to divide the array into two halves
    val mid = arr.length / 2
    // Recursively sort the left half
    val left = mergeSort(arr.slice(0, mid))
    // Recursively sort the right half
    val right = mergeSort(arr.slice(mid, arr.length))

    // Merge the two sorted halves
    merge(left, right)
  }

  // Helper function to merge two sorted arrays
  def merge(left: Array[Int], right: Array[Int]): Array[Int] = {
    var result = Array[Int]()
    var i = 0 // Pointer for left array
    var j = 0 // Pointer for right array

    // Compare elements from left and right arrays and add the smaller one to result
    while (i < left.length && j < right.length) {
      if (left(i) <= right(j)) {
        result :+= left(i)
        i += 1
      } else {
        result :+= right(j)
        j += 1
      }
    }

    // Add any remaining elements from left array
    while (i < left.length) {
      result :+= left(i)
      i += 1
    }
    // Add any remaining elements from right array
    while (j < right.length) {
      result :+= right(j)
      j += 1
    }
    result
  }
}

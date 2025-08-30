object QuickSort {
  // QuickSort function sorts the array in place using recursion
  def quickSort(arr: Array[Int], low: Int = 0, high: Int = -1): Unit = {
    // If high is -1, set it to the last index of the array
    val actualHigh = if (high == -1) arr.length - 1 else high
    if (low < actualHigh) {
      // Partition the array and get the pivot index
      val pi = partition(arr, low, actualHigh)
      // Recursively sort elements before and after partition
      quickSort(arr, low, pi - 1)
      quickSort(arr, pi + 1, actualHigh)
    }
  }

  // Partition function places the pivot element at its correct position
  // and places all smaller elements to left of pivot and all greater to right
  def partition(arr: Array[Int], low: Int, high: Int): Int = {
    val pivot = arr(high) // Choose the last element as pivot
    var i = low - 1 // Index of smaller element
    for (j <- low until high) {
      if (arr(j) < pivot) {
        i += 1
        // Swap arr(i) and arr(j)
        val temp = arr(i)
        arr(i) = arr(j)
        arr(j) = temp
      }
    }
    // Swap arr(i+1) and arr(high) (or pivot)
    val temp = arr(i + 1)
    arr(i + 1) = arr(high)
    arr(high) = temp
    i + 1 // Return the partitioning index
  }
}

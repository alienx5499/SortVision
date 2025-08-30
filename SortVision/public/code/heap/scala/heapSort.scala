object HeapSort {
  // Function to heapify a subtree rooted at index i
  // n is the size of the heap
  def heapify(arr: Array[Int], n: Int, i: Int): Unit = {
    var largest = i         // Initialize largest as root
    val left = 2 * i + 1    // left child index
    val right = 2 * i + 2   // right child index

    // If left child is larger than root
    if (left < n && arr(left) > arr(largest))
      largest = left

    // If right child is larger than largest so far
    if (right < n && arr(right) > arr(largest))
      largest = right

    // If largest is not root
    if (largest != i) {
      // Swap root with largest
      val swap = arr(i)
      arr(i) = arr(largest)
      arr(largest) = swap

      // Recursively heapify the affected subtree
      heapify(arr, n, largest)
    }
  }

  // Main function to perform heap sort
  def heapSort(arr: Array[Int]): Unit = {
    val n = arr.length

    // Build a maxheap (rearrange array)
    for (i <- n / 2 - 1 to 0 by -1)
      heapify(arr, n, i)

    // One by one extract elements from heap
    for (i <- n - 1 to 1 by -1) {
      // Move current root to end
      val temp = arr(0)
      arr(0) = arr(i)
      arr(i) = temp

      // Call max heapify on the reduced heap
      heapify(arr, i, 0)
    }
  }

  // Example usage
  def main(args: Array[String]): Unit = {
    val arr = Array(12, 11, 13, 5, 6, 7)
    println("Original array: " + arr.mkString(", "))
    heapSort(arr)
    println("Sorted array: " + arr.mkString(", "))
  }
}

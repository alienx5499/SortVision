object HeapSort {
  // Time: Best/Avg/Worst O(n log n), Space: O(1)
  def heapSort(arr: Array[Int]): Array[Int] = {
    val n = arr.length

    for (i <- n / 2 - 1 to 0 by -1) heapify(arr, n, i)
    for (i <- n - 1 to 1 by -1) {
      val t = arr(0)
      arr(0) = arr(i)
      arr(i) = t
      heapify(arr, i, 0)
    }
    arr
  }

  private def heapify(arr: Array[Int], n: Int, i: Int): Unit = {
    var largest = i
    val left = 2 * i + 1
    val right = 2 * i + 2

    if (left < n && arr(left) > arr(largest)) largest = left
    if (right < n && arr(right) > arr(largest)) largest = right

    if (largest != i) {
      val t = arr(i)
      arr(i) = arr(largest)
      arr(largest) = t
      heapify(arr, n, largest)
    }
  }

  def main(args: Array[String]): Unit = {
    val arr = Array(64, 25, 12, 22, 11)
    println(heapSort(arr).mkString(", "))
  }
}

object QuickSort {
  // Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
  def quickSort(arr: Array[Int], low: Int = 0, high: Int = -1): Array[Int] = {
    val h = if (high == -1) arr.length - 1 else high

    if (low < h) {
      val p = partition(arr, low, h)
      quickSort(arr, low, p - 1)
      quickSort(arr, p + 1, h)
    }
    arr
  }

  private def partition(arr: Array[Int], low: Int, high: Int): Int = {
    val pivot = arr(high)
    var i = low - 1

    for (j <- low until high) {
      if (arr(j) <= pivot) {
        i += 1
        val t = arr(i)
        arr(i) = arr(j)
        arr(j) = t
      }
    }

    val t = arr(i + 1)
    arr(i + 1) = arr(high)
    arr(high) = t
    i + 1
  }

  def main(args: Array[String]): Unit = {
    val arr = Array(64, 25, 12, 22, 11)
    println(quickSort(arr).mkString(", "))
  }
}

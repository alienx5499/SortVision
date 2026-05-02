object BubbleSort {
  // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
  def bubbleSort(arr: Array[Int]): Array[Int] = {
    for (i <- 0 until arr.length - 1) {
      var swapped = false
      for (j <- 0 until arr.length - i - 1) {
        if (arr(j) > arr(j + 1)) {
          val t = arr(j)
          arr(j) = arr(j + 1)
          arr(j + 1) = t
          swapped = true
        }
      }
      if (!swapped) return arr
    }
    arr
  }

  def main(args: Array[String]): Unit = {
    val arr = Array(64, 34, 25, 12, 22, 11, 90)
    println(bubbleSort(arr).mkString(", "))
  }
}

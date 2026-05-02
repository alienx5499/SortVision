object SelectionSort {
  // Time: Best/Avg/Worst O(n^2), Space: O(1)
  def selectionSort(arr: Array[Int]): Array[Int] = {
    for (i <- 0 until arr.length - 1) {
      var minIdx = i
      for (j <- i + 1 until arr.length) {
        if (arr(j) < arr(minIdx)) minIdx = j
      }
      if (minIdx != i) {
        val t = arr(i)
        arr(i) = arr(minIdx)
        arr(minIdx) = t
      }
    }
    arr
  }

  def main(args: Array[String]): Unit = {
    val arr = Array(64, 25, 12, 22, 11)
    println(selectionSort(arr).mkString(", "))
  }
}

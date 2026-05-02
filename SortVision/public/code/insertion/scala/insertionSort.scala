object InsertionSort {
  // Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
  def insertionSort(arr: Array[Int]): Array[Int] = {
    for (i <- 1 until arr.length) {
      val key = arr(i)
      var j = i - 1

      while (j >= 0 && arr(j) > key) {
        arr(j + 1) = arr(j)
        j -= 1
      }
      arr(j + 1) = key
    }
    arr
  }

  def main(args: Array[String]): Unit = {
    val arr = Array(64, 25, 12, 22, 11)
    println(insertionSort(arr).mkString(", "))
  }
}

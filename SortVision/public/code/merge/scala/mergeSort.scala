object MergeSort {
  // Time: Best/Avg/Worst O(n log n), Space: O(n)
  def mergeSort(arr: Array[Int]): Array[Int] = {
    if (arr.length <= 1) return arr

    val mid = arr.length / 2
    val left = mergeSort(arr.slice(0, mid))
    val right = mergeSort(arr.slice(mid, arr.length))
    merge(left, right)
  }

  private def merge(left: Array[Int], right: Array[Int]): Array[Int] = {
    val result = new Array[Int](left.length + right.length)
    var i = 0
    var j = 0
    var k = 0

    while (i < left.length && j < right.length) {
      if (left(i) <= right(j)) { result(k) = left(i); i += 1 }
      else { result(k) = right(j); j += 1 }
      k += 1
    }
    while (i < left.length) { result(k) = left(i); i += 1; k += 1 }
    while (j < right.length) { result(k) = right(j); j += 1; k += 1 }

    result
  }

  def main(args: Array[String]): Unit = {
    val arr = Array(64, 25, 12, 22, 11)
    println(mergeSort(arr).mkString(", "))
  }
}

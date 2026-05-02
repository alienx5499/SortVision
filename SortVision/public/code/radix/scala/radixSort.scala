object RadixSort {
  // Radix Sort (LSD, base 10, non-negative integers)
  // Time: O(d * (n + k)), Space: O(n + k)
  def radixSort(arr: Array[Int]): Array[Int] = {
    if (arr.length <= 1) return arr

    val maxVal = arr.max
    var exp = 1
    while (maxVal / exp > 0) {
      countingSortByExp(arr, exp)
      exp *= 10
    }
    arr
  }

  private def countingSortByExp(arr: Array[Int], exp: Int): Unit = {
    val output = new Array[Int](arr.length)
    val count = Array.fill(10)(0)

    for (x <- arr) count((x / exp) % 10) += 1
    for (i <- 1 until 10) count(i) += count(i - 1)

    for (i <- arr.indices.reverse) {
      val digit = (arr(i) / exp) % 10
      output(count(digit) - 1) = arr(i)
      count(digit) -= 1
    }

    for (i <- arr.indices) arr(i) = output(i)
  }

  def main(args: Array[String]): Unit = {
    val arr = Array(170, 45, 75, 90, 802, 24, 2, 66)
    println(radixSort(arr).mkString(", "))
  }
}

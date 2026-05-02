object BucketSort {
  // Bucket Sort (for numbers in [0, 1))
  // Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
  def bucketSort(arr: Array[Double]): Array[Double] = {
    if (arr.length <= 1) return arr

    val n = arr.length
    val buckets = Array.fill(n)(collection.mutable.ArrayBuffer.empty[Double])

    for (x <- arr) {
      val idx = math.min(n - 1, (x * n).toInt)
      buckets(idx) += x
    }

    var k = 0
    for (bucket <- buckets) {
      val sorted = bucket.sorted
      for (x <- sorted) {
        arr(k) = x
        k += 1
      }
    }
    arr
  }

  def main(args: Array[String]): Unit = {
    val arr = Array(0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51)
    println(bucketSort(arr).mkString(", "))
  }
}

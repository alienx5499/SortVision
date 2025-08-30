/**
 * Implementation of the Bucket Sort algorithm in Scala.
 *
 * Bucket sort is a sorting algorithm that works by distributing the elements of an array
 * into a number of buckets. Each bucket is then sorted individually, and the results are
 * combined to produce the final sorted array.
 *
 * This implementation is designed for sorting arrays of Double values, but the algorithm
 * can be adapted for other data types with appropriate distribution functions.
 *
 * Time Complexity:
 * - Best Case: O(n + k) where n is the number of elements and k is the number of buckets
 *   This occurs when elements are uniformly distributed across buckets.
 * - Average Case: O(n + k) assuming uniform distribution of elements
 * - Worst Case: O(n²) when all elements are placed in a single bucket
 *
 * Space Complexity: O(n + k) for storing n elements in k buckets
 *
 * @author SSOC Season 4 Contributor
 */
object BucketSort {
  /**
   * Main bucket sort function that sorts an array of doubles.
   *
   * The algorithm works by distributing elements into buckets based on their value,
   * sorting each bucket individually, and then combining the results.
   *
   * @param arr The array of doubles to be sorted
   * @param bucketCount The number of buckets to use (default is 10)
   * @return A new sorted array of doubles
   */
  def bucketSort(arr: Array[Double], bucketCount: Int = 10): Array[Double] = {
    // Handle edge cases: empty array or single element array
    if (arr.isEmpty || arr.length == 1) {
      return arr.clone()
    }

    // Input validation for bucketCount
    val actualBucketCount = if (bucketCount <= 0) 10 else bucketCount

    // Find the minimum and maximum values in the array
    val min = arr.min
    val max = arr.max

    // Create buckets - Array of ArrayBuffers for more efficient appending
    import scala.collection.mutable.ArrayBuffer
    val buckets = Array.fill(actualBucketCount)(ArrayBuffer[Double]())

    // Distribute elements into buckets
    for (value <- arr) {
      // Calculate the bucket index for the current value
      // This formula maps values from [min, max] to [0, bucketCount-1]
      val bucketIndex = if (max > min) {
        math.min(((value - min) / (max - min) * actualBucketCount).toInt, actualBucketCount - 1)
      } else {
        0 // If all elements are the same, put them in the first bucket
      }

      // Add the value to the appropriate bucket
      buckets(bucketIndex) += value
    }

    // Sort each bucket using insertion sort and flatten the result
    val result = Array.newBuilder[Double]
    result.sizeHint(arr.length)  // Optimization: pre-allocate the result array size

    for (bucket <- buckets) {
      if (bucket.nonEmpty) {
        // Convert ArrayBuffer to Array for sorting
        val sortedBucket = insertionSort(bucket.toArray)
        // Add all elements from the sorted bucket to the result
        result ++= sortedBucket
      }
    }

    result.result()
  }

  /**
   * Helper function that sorts a bucket using insertion sort.
   *
   * Insertion sort is efficient for small arrays or nearly sorted arrays,
   * making it a good choice for sorting individual buckets.
   *
   * @param bucket The array of doubles to be sorted
   * @return A new sorted array of doubles
   */
  def insertionSort(bucket: Array[Double]): Array[Double] = {
    // Handle edge cases: empty array or single element array
    if (bucket.isEmpty || bucket.length == 1) {
      return bucket.clone()
    }

    // Create a mutable copy of the input array
    val result = bucket.clone()

    // Perform insertion sort
    for (i <- 1 until result.length) {
      val key = result(i)
      var j = i - 1

      // Move elements greater than key one position ahead
      while (j >= 0 && result(j) > key) {
        result(j + 1) = result(j)
        j -= 1
      }

      // Place key at its correct position
      result(j + 1) = key
    }

    result
  }

  /**
   * Example usage of the BucketSort implementation.
   */
  def main(args: Array[String]): Unit = {
    // Test cases
    val testCases = Array(
      Array(0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51),  // Normal case
      Array(0.9, 0.1, 0.5, 0.3, 0.7, 0.2, 0.8, 0.4, 0.6),  // Uniform distribution
      Array[Double](),  // Empty array
      Array(0.5),  // Single element
      Array(0.3, 0.3, 0.3),  // Duplicate elements
      Array(0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1),  // Reverse sorted
      Array(100.0, 1000.0, 10.0, 1.0, 0.1, 0.01),  // Wide range of values
      Array(0.0, 0.0, 0.0, 0.0)  // All zeros
    )

    // Run and display test cases
    for ((test, index) <- testCases.zipWithIndex) {
      println(s"Test ${index + 1}: ${test.mkString(", ")}")
      val sorted = bucketSort(test)
      println(s"Sorted: ${sorted.mkString(", ")}")

      // Verify with Scala's built-in sort
      val expected = test.sorted
      println(s"Correct: ${expected.sameElements(sorted)}\n")
    }

    // Performance test with different bucket counts
    val largeArray = Array.fill(10000)(math.random())

    def timeExecution(bucketCount: Int): Long = {
      val startTime = System.nanoTime()
      bucketSort(largeArray, bucketCount)
      val endTime = System.nanoTime()
      (endTime - startTime) / 1000000  // Convert to milliseconds
    }

    println("Performance Test with Different Bucket Counts:")
    println("Bucket Count | Time (ms)")
    println("-------------|----------")
    for (bucketCount <- List(5, 10, 50, 100, 500, 1000)) {
      val time = timeExecution(bucketCount)
      println(f"$bucketCount%11d | $time%9d")
    }
    println()

    // Performance notes
    println("Performance Characteristics:")
    println("- Bucket sort is most efficient when input is uniformly distributed")
    println("- Performance degrades when many elements are mapped to the same bucket")
    println("- The number of buckets can be tuned for optimal performance")
    println("- Memory usage increases with the number of buckets")
    println("- For small arrays or individual buckets, insertion sort is efficient")
    println("- Bucket sort is not a comparison-based sort, so it can beat the O(n log n) lower bound")
    println("- The algorithm is stable (preserves the relative order of equal elements)")
  }
}

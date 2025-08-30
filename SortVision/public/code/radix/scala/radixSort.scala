/**
 * Implementation of the Radix Sort algorithm in Scala.
 *
 * Radix sort is a non-comparative sorting algorithm that sorts data with integer keys by
 * grouping keys by individual digits which share the same significant position and value.
 * It uses counting sort as a subroutine to sort elements based on their individual digits.
 *
 * Time Complexity:
 * - Best Case: O(d * (n + k)) where d is the number of digits, n is the array size, and k is the range of digits (10 for decimal)
 * - Average Case: O(d * (n + k))
 * - Worst Case: O(d * (n + k))
 *
 * Space Complexity: O(n + k)
 *
 * @author SSOC Season 4 Contributor
 */
object RadixSort {
  /**
   * Main radix sort function that sorts an array of integers.
   *
   * The algorithm works by sorting the elements based on each digit position,
   * starting from the least significant digit (units place) to the most significant digit.
   *
   * @param arr The array of integers to be sorted
   * @return A new sorted array of integers
   */
  def radixSort(arr: Array[Int]): Array[Int] = {
    // Handle edge cases: empty array or single element array
    if (arr.isEmpty || arr.length == 1) {
      return arr.clone()
    }

    // Find the maximum value to determine the number of digits
    val max = getMax(arr)

    // Create a copy of the input array to avoid modifying the original
    val result = arr.clone()

    // Apply counting sort for each digit position
    // Start with the least significant digit (exp = 1 for units place)
    var exp = 1
    while (max / exp > 0) {
      // Use counting sort for the current digit position
      countingSort(result, exp)
      // Move to the next digit position
      exp *= 10
    }

    result
  }

  /**
   * Counting sort implementation specifically for radix sort.
   * Sorts the array based on the digit at the specified position.
   *
   * This is a stable sort, meaning that elements with the same digit
   * at the current position will maintain their relative order.
   *
   * @param arr The array to be sorted
   * @param exp The current digit position (1, 10, 100, etc.)
   * @return The modified array sorted based on the current digit position
   */
  def countingSort(arr: Array[Int], exp: Int): Array[Int] = {
    val n = arr.length
    val output = new Array[Int](n)
    val count = new Array[Int](10) // 0-9 digits

    // Count occurrences of each digit at the current position
    for (i <- 0 until n) {
      val digit = (arr(i) / exp) % 10
      count(digit) += 1
    }

    // Calculate cumulative count to determine the position of each element
    for (i <- 1 until 10) {
      count(i) += count(i - 1)
    }

    // Build the output array in reverse order to maintain stability
    for (i <- n - 1 to 0 by -1) {
      val digit = (arr(i) / exp) % 10
      output(count(digit) - 1) = arr(i)
      count(digit) -= 1
    }

    // Copy the output array back to the original array
    for (i <- 0 until n) {
      arr(i) = output(i)
    }

    arr
  }

  /**
   * Finds the maximum value in the array.
   *
   * @param arr The input array
   * @return The maximum value in the array, or 0 if the array is empty
   */
  def getMax(arr: Array[Int]): Int = {
    if (arr.isEmpty) {
      return 0
    }

    var max = arr(0)
    for (i <- 1 until arr.length) {
      if (arr(i) > max) {
        max = arr(i)
      }
    }

    max
  }

  /**
   * Example usage of the RadixSort implementation.
   */
  def main(args: Array[String]): Unit = {
    // Test cases
    val testCases = Array(
      Array(170, 45, 75, 90, 802, 24, 2, 66),  // Normal case
      Array(121, 432, 564, 23, 1, 45, 788),    // Example from documentation
      Array[Int](),                            // Empty array
      Array(5),                                // Single element
      Array(10, 10, 10),                       // Duplicate elements
      Array(0, 0, 0, 0),                       // All zeros
      Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 0)      // Reverse sorted
    )

    // Run and display test cases
    for ((test, index) <- testCases.zipWithIndex) {
      println(s"Test ${index + 1}: ${test.mkString(", ")}")
      val sorted = radixSort(test)
      println(s"Sorted: ${sorted.mkString(", ")}")

      // Verify with Scala's built-in sort
      val expected = test.sorted
      println(s"Correct: ${expected.sameElements(sorted)}\n")
    }

    // Performance notes
    println("Performance Characteristics:")
    println("- Radix sort is stable (preserves the relative order of equal elements)")
    println("- It's a non-comparative sorting algorithm")
    println("- Works well when the range of digits is small compared to the array size")
    println("- Particularly efficient for integers with fixed number of digits")
  }
}

#' Insertion Sort Algorithm
#'
#' This function performs an in-place insertion sort on a numeric vector.
#'
#' @param arr A numeric vector to be sorted.
#' @return A sorted numeric vector in ascending order.
#' @examples
#' insertion_sort(c(5, 2, 9, 1, 5, 6))
#' insertion_sort(c(10))
#' insertion_sort(c())
#'
#' @details
#' Time Complexity:
#' - Best case: O(n) (already sorted array)
#' - Average and Worst case: O(n^2)
#'
#' Space Complexity: O(1) - in-place sorting
insertion_sort <- function(arr) {
  n <- length(arr)

  if (n <= 1) {
    return(arr)  # Already sorted
  }

  for (i in 2:n) {
    key <- arr[i]
    j <- i - 1

    # Shift elements of arr[1..i-1], that are greater than key, to one position ahead
    while (j > 0 && arr[j] > key) {
      arr[j + 1] <- arr[j]
      j <- j - 1
    }

    arr[j + 1] <- key
  }

  return(arr)
}

# ------------------------
# Example Usage and Tests
# ------------------------

# Basic test
print(insertion_sort(c(5, 2, 4, 6, 1, 3)))   # Expected: 1 2 3 4 5 6

# Edge case: empty vector
print(insertion_sort(c()))                  # Expected: c()

# Edge case: single element
print(insertion_sort(c(42)))                # Expected: 42

# Already sorted
print(insertion_sort(c(1, 2, 3, 4, 5)))      # Expected: 1 2 3 4 5

# Reverse sorted
print(insertion_sort(c(9, 7, 5, 3, 1)))      # Expected: 1 3 5 7 9

# selectionSort.r
# ----------------------------
# 📊 Implementation of Selection Sort in R
# ----------------------------------------

#' Find the index of the minimum element in a subvector
#'
#' @param arr A numeric vector
#' @param start_idx Start index of the unsorted subvector
#' @param end_idx End index of the vector
#' @return Index of the minimum element between start_idx and end_idx
find_min_index <- function(arr, start_idx, end_idx) {
  min_idx <- start_idx
  for (i in (start_idx + 1):end_idx) {
    if (arr[i] < arr[min_idx]) {
      min_idx <- i
    }
  }
  return(min_idx)
}

#' Perform Selection Sort on a numeric vector
#'
#' @param arr A numeric vector to be sorted
#' @return A sorted numeric vector
#'
#' @examples
#' selection_sort(c(5, 2, 8, 3, 1))
#'
#' @note
#' Time Complexity: O(n^2)
#' Space Complexity: O(1)
#' Best for small datasets
selection_sort <- function(arr) {
  n <- length(arr)

  if (n <= 1) {
    return(arr)
  }

  for (i in 1:(n - 1)) {
    min_idx <- find_min_index(arr, i, n)

    if (i != min_idx) {
      # Swap elements
      temp <- arr[i]
      arr[i] <- arr[min_idx]
      arr[min_idx] <- temp
    }
  }

  return(arr)
}

# ----------------------------
# ✅ Test Cases
# ----------------------------

# Edge Case: Empty vector
print(selection_sort(c()))  # Expected: c()

# Edge Case: Single element
print(selection_sort(c(42)))  # Expected: c(42)

# Normal Case
print(selection_sort(c(5, 2, 9, 1, 6)))  # Expected: c(1, 2, 5, 6, 9)

# Already sorted
print(selection_sort(c(1, 2, 3, 4)))  # Expected: c(1, 2, 3, 4)

# Reverse order
print(selection_sort(c(9, 7, 5, 3, 1)))  # Expected: c(1, 3, 5, 7, 9)

# With duplicates
print(selection_sort(c(4, 2, 4, 3, 1)))  # Expected: c(1, 2, 3, 4, 4)

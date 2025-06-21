#' Quick Sort implementation in R
#'
#' This function sorts a numeric vector using the quick sort algorithm.
#' It uses Lomuto partition scheme and selects the last element as pivot.
#'
#' @param arr Numeric vector to sort
#' @param low Lower index (default = 1)
#' @param high Higher index (default = length of arr)
#' @return Sorted numeric vector
#' @examples
#' quick_sort(c(10, 3, 5, 2, 8))
#' quick_sort(c())
#' quick_sort(c(42))
#' Time Complexity: O(n log n) on average, O(n^2) in the worst case
#' Space Complexity: O(log n) due to recursive stack space
quick_sort <- function(arr, low = 1, high = NULL) {
  if (is.null(high)) high <- length(arr)

  # Base case: if the subarray has one or zero elements
  if (low < high) {
    # Partition the array and get the pivot index
    pi <- partition(arr, low, high)

    # Recursively sort elements before and after partition
    arr[low:(pi - 1)] <- quick_sort(arr, low, pi - 1)
    arr[(pi + 1):high] <- quick_sort(arr, pi + 1, high)
  }

  return(arr)
}

#' Partition function for quick sort
#'
#' This function partitions the array around the pivot (last element),
#' placing elements smaller than pivot to its left and larger to its right.
#'
#' @param arr Numeric vector
#' @param low Starting index
#' @param high Ending index
#' @return Index of the pivot after partition
partition <- function(arr, low, high) {
  # Median-of-three pivot selection
  mid <- floor((low + high) / 2)
  pivot_candidates <- c(arr[low], arr[mid], arr[high])
  pivot <- median(pivot_candidates)

  # Swap the chosen pivot with the last element
  pivot_index <- which(arr == pivot)[1]
  temp <- arr[pivot_index]
  arr[pivot_index] <- arr[high]
  arr[high] <- temp
  i <- low - 1

  for (j in low:(high - 1)) {
    if (arr[j] <= pivot) {
      i <- i + 1
      # Swap arr[i] and arr[j]
      temp <- arr[i]
      arr[i] <- arr[j]
      arr[j] <- temp
    }
  }

  # Swap arr[i + 1] and arr[high] (pivot)
  temp <- arr[i + 1]
  arr[i + 1] <- arr[high]
  arr[high] <- temp

  # Return the modified array and pivot index
  return(list(arr = arr, pivot_index = i + 1))
}

# ------------------ Test Cases ------------------

run_tests <- function() {
  test_cases <- list(
    list(input = c(), expected = c()),
    list(input = c(42), expected = c(42)),
    list(input = c(5, 2, 9, 1, 5), expected = sort(c(5, 2, 9, 1, 5))),
    list(input = c(100, 90, 80, 70, 60), expected = sort(c(100, 90, 80, 70, 60))),
    list(input = c(1, 2, 3, 4, 5), expected = c(1, 2, 3, 4, 5))
  )

  for (i in seq_along(test_cases)) {
    input <- test_cases[[i]]$input
    expected <- test_cases[[i]]$expected
    result <- quick_sort(input)

    cat(sprintf("Test %d: ", i))
    if (identical(result, expected)) {
      cat("✅ Passed\n")
    } else {
      cat("❌ Failed\n")
      cat("Expected:", expected, "\nGot:", result, "\n")
    }
  }
}

# Run all test cases
run_tests()

# Time Complexity:
# Best Case: O(n + k) when input is uniformly distributed
# Average Case: O(n + k*log(k))
# Worst Case: O(n^2) if all values fall into one bucket

# Space Complexity: O(n + k), where k = number of buckets

#' Bucket Sort Algorithm in R
#'
#' Sorts a numeric vector using the Bucket Sort algorithm.
#'
#' @param arr Numeric vector to sort.
#' @param bucket_count Number of buckets to use. Default is 10.
#' @return Sorted numeric vector.
#' @examples
#' bucket_sort(c(0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68))
#' bucket_sort(c(5, 3, 8, 4, 1), bucket_count = 5)

bucket_sort <- function(arr, bucket_count = 10) {
  # Handle edge cases
  if (length(arr) <= 1) return(arr)
  if (!is.numeric(arr)) stop("Input must be a numeric vector.")

  # Get min and max to calculate range
  min_val <- min(arr)
  max_val <- max(arr)
  range_val <- max_val - min_val

  # Create empty buckets
  buckets <- vector("list", bucket_count)
  for (i in 1:bucket_count) {
    buckets[[i]] <- c()
  }

  # Distribute elements into buckets
  for (val in arr) {
    index <- floor(((val - min_val) / range_val) * (bucket_count - 1)) + 1
    buckets[[index]] <- append(buckets[[index]], val)
  }

  # Sort individual buckets and concatenate
  sorted <- unlist(lapply(buckets, insertion_sort))
  return(sorted)
}

#' Insertion Sort Helper for Bucket Sort
#'
#' @param bucket A numeric vector (one bucket).
#' @return Sorted numeric vector.

insertion_sort <- function(bucket) {
  n <- length(bucket)
  if (n <= 1) return(bucket)

  for (i in 2:n) {
    key <- bucket[i]
    j <- i - 1
    while (j > 0 && bucket[j] > key) {
      bucket[j + 1] <- bucket[j]
      j <- j - 1
    }
    bucket[j + 1] <- key
  }
  return(bucket)
}

test_bucket_sort <- function() {
  stopifnot(identical(bucket_sort(c()), c()))
  stopifnot(identical(bucket_sort(c(42)), c(42)))
  stopifnot(identical(bucket_sort(c(5, 3, 8, 4, 1)), c(1, 3, 4, 5, 8)))
  stopifnot(identical(bucket_sort(c(2.4, 1.2, 0.5, 3.7)), sort(c(2.4, 1.2, 0.5, 3.7))))
  stopifnot(identical(bucket_sort(rep(5, 10)), rep(5, 10)))

  cat("✅ All test cases passed!\n")
}

test_bucket_sort()

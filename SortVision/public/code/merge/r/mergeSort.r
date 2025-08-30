#' Merge Sort Algorithm
#'
#' Sorts a vector using the merge sort algorithm, a divide-and-conquer approach
#' that recursively splits the input into halves, sorts them, and merges the sorted halves.
#'
#' @param arr A vector to be sorted (numeric, character, or logical)
#' @return A sorted vector of the same type as input
#' @examples
#' merge_sort(c(38, 27, 43, 3, 9, 82, 10))
#' merge_sort(c("banana", "apple", "cherry"))
#' @export
merge_sort <- function(arr) {
  # Base case: arrays with 0 or 1 element are already sorted
  n <- length(arr)
  if (n <= 1) {
    return(arr)
  }

  # Divide step: split array into left and right halves
  mid <- floor(n / 2)
  left <- merge_sort(arr[1:mid])
  right <- merge_sort(arr[(mid + 1):n])

  # Conquer step: merge sorted halves
  return(merge(left, right))
}

#' Merge Two Sorted Vectors
#'
#' Helper function for merge sort that combines two sorted vectors
#' into a single sorted vector.
#'
#' @param left First sorted vector
#' @param right Second sorted vector
#' @return Merged sorted vector
#' @noRd
merge <- function(left, right) {
  merged <- vector(mode = mode(left), length = length(left) + length(right))
  i <- j <- k <- 1  # Initialize pointers for left, right, and merged vectors

  # Compare elements and merge
  while (i <= length(left) && j <= length(right)) {
    if (left[i] <= right[j]) {
      merged[k] <- left[i]
      i <- i + 1
    } else {
      merged[k] <- right[j]
      j <- j + 1
    }
    k <- k + 1
  }

  # Append remaining elements from left vector
  if (i <= length(left)) {
    merged[k:length(merged)] <- left[i:length(left)]
  }

  # Append remaining elements from right vector
  if (j <= length(right)) {
    merged[k:length(merged)] <- right[j:length(right)]
  }

  return(merged)
}

# Example Usage
cat("Example 1: Numeric vector\n")
original <- c(38, 27, 43, 3, 9, 82, 10)
sorted <- merge_sort(original)
cat("Original:", original, "\n")
cat("Sorted:  ", sorted, "\n\n")

cat("Example 2: Character vector\n")
words <- c("banana", "apple", "cherry", "date", "blueberry")
cat("Original:", words, "\n")
cat("Sorted:  ", merge_sort(words), "\n\n")

# Test Cases
cat("Running test cases:\n")
test_vectors <- list(
  empty = numeric(0),
  single = 42,
  sorted = c(1, 2, 3, 4, 5),
  reversed = c(5, 4, 3, 2, 1),
  duplicates = c(5, 2, 5, 3, 2, 1, 1),
  large = sample(1:10000, 5000),
  strings = c("orange", "apple", "zebra", "banana")
)

for (name in names(test_vectors)) {
  vec <- test_vectors[[name]]
  sorted <- merge_sort(vec)
  cat(sprintf("%-10s: Input length %d | Output sorted: %s\n",
              name,
              length(vec),
              identical(sorted, sort(vec))))
}

# Performance Optimization Notes
cat("\nPerformance Optimization Notes:\n")
cat("1. Time Complexity: O(n log n) in all cases (best/avg/worst)\n")
cat("2. Space Complexity: O(n) for temporary storage during merge\n")
cat("3. Optimization Opportunities:\n")
cat("   - For small arrays (n < 15), use insertion sort to reduce recursion overhead\n")
cat("   - Avoid creating new vectors by passing indices (requires significant refactor)\n")
cat("   - Implement iterative version to eliminate recursion overhead\n")
cat("4. Current implementation handles:\n")
cat("   - All atomic vector types (numeric, character, logical)\n")
cat("   - Edge cases (empty, single-element, pre-sorted, reverse-sorted)\n")
cat("   - Duplicate values\n")

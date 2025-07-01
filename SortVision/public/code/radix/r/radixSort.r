#' Radix Sort Algorithm in R
#' @param arr A numeric vector
#' @return A sorted numeric vector

# Function to get maximum value
get_max <- function(arr) {
  return(max(arr))
}

# Counting Sort as subroutine for Radix Sort
counting_sort <- function(arr, exp) {
  n <- length(arr)
  output <- integer(n)
  count <- integer(10)
  
  # Count occurrences
  for (i in seq_len(n)) {
    index <- floor((arr[i] / exp)) %% 10
    count[index + 1] <- count[index + 1] + 1
  }
  
  # Accumulate counts
  for (i in 2:10) {
    count[i] <- count[i] + count[i - 1]
  }

  # Build output
  for (i in n:1) {
    index <- floor((arr[i] / exp)) %% 10
    output[count[index + 1]] <- arr[i]
    count[index + 1] <- count[index + 1] - 1
  }

  return(output)
}

# Radix Sort main function
radix_sort <- function(arr) {
  if (length(arr) <= 1) return(arr)
  max_val <- get_max(arr)
  exp <- 1
  while (floor(max_val / exp) > 0) {
    arr <- counting_sort(arr, exp)
    exp <- exp * 10
  }
  return(arr)
}

# Example Usage
arr <- c(170, 45, 75, 90, 802, 24, 2, 66)
cat("Original Array:\n")
print(arr)
sorted_arr <- radix_sort(arr)
cat("Sorted Array:\n")
print(sorted_arr)

# ---------------------
# ✅ Test Cases Section
# ---------------------

test_radix_sort <- function() {
  cat("\n--- Running Test Cases for radix_sort() ---\n")
  
  # Test 1: Empty vector
  input1 <- c()
  expected1 <- c()
  stopifnot(identical(radix_sort(input1), expected1))
  cat("✅ Test 1 passed: Empty vector\n")

  # Test 2: Single element
  input2 <- c(5)
  expected2 <- c(5)
  stopifnot(identical(radix_sort(input2), expected2))
  cat("✅ Test 2 passed: Single element\n")

  # Test 3: Already sorted
  input3 <- c(1, 2, 3, 4, 5)
  expected3 <- c(1, 2, 3, 4, 5)
  stopifnot(identical(radix_sort(input3), expected3))
  cat("✅ Test 3 passed: Already sorted\n")

  # Test 4: Reverse order
  input4 <- c(9, 8, 7, 6, 5)
  expected4 <- c(5, 6, 7, 8, 9)
  stopifnot(identical(radix_sort(input4), expected4))
  cat("✅ Test 4 passed: Reverse order\n")

  # Test 5: Random order
  input5 <- c(45, 2, 802, 90, 75, 56)
  expected5 <- sort(input5)
  stopifnot(identical(radix_sort(input5), expected5))
  cat("✅ Test 5 passed: Random order\n")

  # Test 6: With duplicate elements
  input6 <- c(10, 5, 10, 2, 5)
  expected6 <- sort(input6)
  stopifnot(identical(radix_sort(input6), expected6))
  cat("✅ Test 6 passed: Duplicates\n")

  # Test 7: Large values
  input7 <- c(1234, 56789, 10, 23456, 0)
  expected7 <- sort(input7)
  stopifnot(identical(radix_sort(input7), expected7))
  cat("✅ Test 7 passed: Large numbers\n")

  # Test 8: All same elements
  input8 <- rep(3, 10)
  expected8 <- rep(3, 10)
  stopifnot(identical(radix_sort(input8), expected8))
  cat("✅ Test 8 passed: All identical values\n")

  cat("--- ✅ All tests passed! ---\n")
}

# Run tests
test_radix_sort()
 

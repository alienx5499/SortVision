# Radix Sort (LSD, base 10, non-negative integers)
# Time: O(d * (n + k)), Space: O(n + k)
counting_sort_by_exp <- function(arr, exp) {
  n <- length(arr)
  output <- integer(n)
  count <- integer(10)

  for (i in 1:n) {
    digit <- (arr[i] %/% exp) %% 10
    count[digit + 1] <- count[digit + 1] + 1
  }
  for (i in 2:10) count[i] <- count[i] + count[i - 1]

  for (i in n:1) {
    digit <- (arr[i] %/% exp) %% 10
    output[count[digit + 1]] <- arr[i]
    count[digit + 1] <- count[digit + 1] - 1
  }

  output
}

radix_sort <- function(arr) {
  if (length(arr) <= 1) return(arr)

  max_val <- max(arr)
  exp <- 1
  while (max_val %/% exp > 0) {
    arr <- counting_sort_by_exp(arr, exp)
    exp <- exp * 10
  }
  arr
}

arr <- c(170, 45, 75, 90, 802, 24, 2, 66)
print(radix_sort(arr))

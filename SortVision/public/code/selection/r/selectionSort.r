# Selection Sort
# Time: Best/Avg/Worst O(n^2), Space: O(1)
selection_sort <- function(arr) {
  n <- length(arr)
  if (n <= 1) return(arr)

  for (i in 1:(n - 1)) {
    min_idx <- i
    for (j in (i + 1):n) {
      if (arr[j] < arr[min_idx]) min_idx <- j
    }
    if (min_idx != i) {
      temp <- arr[i]
      arr[i] <- arr[min_idx]
      arr[min_idx] <- temp
    }
  }

  arr
}

arr <- c(64, 25, 12, 22, 11)
print(selection_sort(arr))

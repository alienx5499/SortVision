# Bubble Sort (in-place style behavior via local reassignment)
# Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
bubble_sort <- function(arr) {
  n <- length(arr)
  if (n <= 1) return(arr)

  for (i in 1:(n - 1)) {
    swapped <- FALSE
    for (j in 1:(n - i)) {
      if (arr[j] > arr[j + 1]) {
        temp <- arr[j]
        arr[j] <- arr[j + 1]
        arr[j + 1] <- temp
        swapped <- TRUE
      }
    }
    if (!swapped) break
  }

  arr
}

arr <- c(64, 34, 25, 12, 22, 11, 90)
print(bubble_sort(arr))

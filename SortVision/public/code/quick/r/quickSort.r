# Quick Sort
# Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
quick_sort <- function(arr) {
  n <- length(arr)
  if (n <= 1) return(arr)

  pivot <- arr[n]
  less_equal <- arr[arr <= pivot]
  greater <- arr[arr > pivot]

  if (length(less_equal) > 0) {
    less_equal <- less_equal[-length(less_equal)]
  }

  c(quick_sort(less_equal), pivot, quick_sort(greater))
}

arr <- c(64, 25, 12, 22, 11)
print(quick_sort(arr))

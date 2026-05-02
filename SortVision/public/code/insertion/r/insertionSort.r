# Insertion Sort
# Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
insertion_sort <- function(arr) {
  n <- length(arr)
  if (n <= 1) return(arr)

  for (i in 2:n) {
    key <- arr[i]
    j <- i - 1

    while (j >= 1 && arr[j] > key) {
      arr[j + 1] <- arr[j]
      j <- j - 1
    }
    arr[j + 1] <- key
  }

  arr
}

arr <- c(64, 25, 12, 22, 11)
print(insertion_sort(arr))

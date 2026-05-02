# Merge Sort
# Time: Best/Avg/Worst O(n log n), Space: O(n)
merge_sort <- function(arr) {
  n <- length(arr)
  if (n <= 1) return(arr)

  mid <- floor(n / 2)
  left <- merge_sort(arr[1:mid])
  right <- merge_sort(arr[(mid + 1):n])

  merge(left, right)
}

merge <- function(left, right) {
  result <- c()
  i <- 1
  j <- 1

  while (i <= length(left) && j <= length(right)) {
    if (left[i] <= right[j]) {
      result <- c(result, left[i])
      i <- i + 1
    } else {
      result <- c(result, right[j])
      j <- j + 1
    }
  }

  if (i <= length(left)) result <- c(result, left[i:length(left)])
  if (j <= length(right)) result <- c(result, right[j:length(right)])
  result
}

arr <- c(64, 25, 12, 22, 11)
print(merge_sort(arr))

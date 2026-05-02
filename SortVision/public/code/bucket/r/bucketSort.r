# Bucket Sort (for numbers in [0, 1))
# Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
bucket_sort <- function(arr) {
  n <- length(arr)
  if (n <= 1) return(arr)

  buckets <- vector("list", n)

  for (x in arr) {
    idx <- min(n, floor(x * n) + 1)
    buckets[[idx]] <- c(buckets[[idx]], x)
  }

  k <- 1
  for (i in seq_len(n)) {
    bucket <- sort(buckets[[i]])
    if (length(bucket) > 0) {
      arr[k:(k + length(bucket) - 1)] <- bucket
      k <- k + length(bucket)
    }
  }

  arr
}

arr <- c(0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51)
print(bucket_sort(arr))

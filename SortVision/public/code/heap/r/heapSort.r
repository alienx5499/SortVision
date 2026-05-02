# Heap Sort
# Time: Best/Avg/Worst O(n log n), Space: O(1)
heapify <- function(arr, n, i) {
  largest <- i
  left <- 2 * i
  right <- 2 * i + 1

  if (left <= n && arr[left] > arr[largest]) largest <- left
  if (right <= n && arr[right] > arr[largest]) largest <- right

  if (largest != i) {
    temp <- arr[i]
    arr[i] <- arr[largest]
    arr[largest] <- temp
    arr <- heapify(arr, n, largest)
  }
  arr
}

heap_sort <- function(arr) {
  n <- length(arr)

  for (i in floor(n / 2):1) arr <- heapify(arr, n, i)
  for (i in n:2) {
    temp <- arr[1]
    arr[1] <- arr[i]
    arr[i] <- temp
    arr <- heapify(arr, i - 1, 1)
  }

  arr
}

arr <- c(64, 25, 12, 22, 11)
print(heap_sort(arr))

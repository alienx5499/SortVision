# Heap Sort implementation in R
# This function sorts an array using the heap sort algorithm.
heap_sort <- function(arr) {
  n <- length(arr)  # Get the length of the array

  # Step 1: Build a max heap from the input array
  arr <- build_max_heap(arr)

  # Step 2: One by one extract elements from the heap
  for (i in n:2) {
    # Move current root (maximum) to the end
    temp <- arr[1]
    arr[1] <- arr[i]
    arr[i] <- temp

    # Call heapify on the reduced heap
    arr[1:(i-1)] <- heapify(arr[1:(i-1)], i - 1, 1)
  }
  return(arr)
}

# Heapify a subtree rooted with node i (1-based index)
heapify <- function(arr, n, i) {
  largest <- i  # Initialize largest as root
  left <- 2 * i      # left child index
  right <- 2 * i + 1 # right child index

  # If left child exists and is greater than root
  if (left <= n && arr[left] > arr[largest]) {
    largest <- left
  }
  # If right child exists and is greater than largest so far
  if (right <= n && arr[right] > arr[largest]) {
    largest <- right
  }
  # If largest is not root
  if (largest != i) {
    temp <- arr[i]
    arr[i] <- arr[largest]
    arr[largest] <- temp
    # Recursively heapify the affected sub-tree
    arr <- heapify(arr, n, largest)
  }
  return(arr)
}

# Build a max heap from the array
build_max_heap <- function(arr) {
  n <- length(arr)
  # Start from the last non-leaf node and heapify each node
  for (i in floor(n / 2):1) {
    arr <- heapify(arr, n, i)
  }
  return(arr)
}

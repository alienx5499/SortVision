// HeapSort class provides a static method to sort an array using heap sort algorithm
class HeapSort {
    companion object {
        // Main function to sort an array using heap sort
        fun sort(arr: IntArray) {
            val n = arr.size
            // Step 1: Build a max heap from the input array
            buildMaxHeap(arr)
            // Step 2: One by one extract elements from the heap
            for (i in n - 1 downTo 1) {
                // Move current root (maximum) to the end
                val temp = arr[0]
                arr[0] = arr[i]
                arr[i] = temp
                // Call heapify on the reduced heap
                heapify(arr, i, 0)
            }
        }

        // Function to maintain the max heap property for a subtree rooted at index i
        // n is the size of the heap
        private fun heapify(arr: IntArray, n: Int, i: Int) {
            var largest = i // Initialize largest as root
            val left = 2 * i + 1 // left child index
            val right = 2 * i + 2 // right child index

            // If left child is larger than root
            if (left < n && arr[left] > arr[largest]) {
                largest = left
            }

            // If right child is larger than largest so far
            if (right < n && arr[right] > arr[largest]) {
                largest = right
            }

            // If largest is not root
            if (largest != i) {
                val swap = arr[i]
                arr[i] = arr[largest]
                arr[largest] = swap
                // Recursively heapify the affected subtree
                heapify(arr, n, largest)
            }
        }

        // Function to build a max heap from the input array
        private fun buildMaxHeap(arr: IntArray) {
            val n = arr.size
            // Start from the last non-leaf node and heapify each node
            for (i in n / 2 - 1 downTo 0) {
                heapify(arr, n, i)
            }
        }
    }

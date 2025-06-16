package main

import (
	"fmt"
)

// heapify ensures the heap property is maintained in a binary tree.
// Parameters:
// - arr: The slice of integers representing the heap.
// - n: The size of the heap.
// - i: The index of the current node to heapify.
func heapify(arr []int, n int, i int) {
    largest := i
    left := 2*i + 1
    right := 2*i + 2

    // Check if the left child exists and is greater than the root
    if left < n && arr[left] > arr[largest] {
        largest = left
    }

    // Check if the right child exists and is greater than the largest so far
    if right < n && arr[right] > arr[largest] {
        largest = right
    }

    // If the largest is not the root, swap and recursively heapify the affected subtree
    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}

// HeapSort sorts an array of integers using the heap sort algorithm.
// Parameters:
// - arr: The slice of integers to be sorted.
// Returns:
// - A new slice containing the sorted elements.
func HeapSort(arr []int) []int {
    n := len(arr)
    if n <= 1 {
        // Return a copy of the original array if it has one or no elements
        return append([]int{}, arr...)
    }

    // Copy the array to avoid modifying the original
    nums := append([]int{}, arr...)

    // Build the heap (rearrange the array)
    for i := n/2 - 1; i >= 0; i-- {
        heapify(nums, n, i)
    }

    // Extract elements from the heap one by one
    for i := n - 1; i > 0; i-- {
        // Move the current root (largest) to the end
        nums[0], nums[i] = nums[i], nums[0]
        // Call heapify on the reduced heap
        heapify(nums, i, 0)
    }

    return nums
}

// Example usage of the HeapSort function.
func main() {
    fmt.Println("Heap Sort Implementation in Go")

    // Example arrays
    testCases := [][]int{
        {64, 34, 25, 12, 22, 11, 90},
        {},
        {42},
        {1, 2, 3, 4, 5},
        {5, 4, 3, 2, 1},
        {3, 1, 3, 1, 3},
        {3, 1, 4, 1, 5, 9, 2, 6},
        {100, 50, 25, 12},
        {-5, -2, -8, -1},
    }

    for _, arr := range testCases {
        sorted := HeapSort(arr)
        fmt.Printf("Original: %v, Sorted: %v\n", arr, sorted)
    }
}
package main

import (
	"fmt"
	"reflect"
	"testing"
)

// bubbleSort sorts an array of integers using the Bubble Sort algorithm.
// It takes a slice of integers and returns the sorted slice.
// The algorithm works by repeatedly swapping adjacent elements if they are in the wrong order.
// This process is repeated until no more swaps are needed, indicating the list is sorted.
//
// Time Complexity:
//   - Best Case: O(n) when the array is already sorted (due to early termination optimization)
//   - Average Case: O(n²) due to nested loops
//   - Worst Case: O(n²) when the array is reverse sorted
//
// Space Complexity: O(1) - sorts in-place without additional memory allocation
func bubbleSort(arr []int) []int {
	// Handle edge cases: empty array or single element
	n := len(arr)
	if n <= 1 {
		return arr
	}

	// Outer loop: traverse through all elements
	// After each iteration, the largest unsorted element "bubbles up" to its correct position
	for i := 0; i < n-1; i++ {
		swapped := false  // Optimization flag to detect early termination

		// Inner loop: compare adjacent elements in the unsorted portion
		// The last i elements are already in place after previous passes
		for j := 0; j < n-i-1; j++ {
			// Swap adjacent elements if they're in the wrong order
			if arr[j] > arr[j+1] {
				arr[j], arr[j+1] = arr[j+1], arr[j]
				swapped = true
			}
		}

		// If no swaps occurred in a full pass, the array is sorted
		if !swapped {
			break
		}
	}
	return arr
}

func main() {
	// Example usage
	arr := []int{64, 34, 25, 12, 22, 11, 90}
	fmt.Println("Original array:", arr)
	sortedArr := bubbleSort(arr)
	fmt.Println("Sorted array:  ", sortedArr)
}

// TestBubbleSort contains test cases for the bubbleSort function
func TestBubbleSort(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected []int
	}{
		{"Empty Array", []int{}, []int{}},
		{"Single Element", []int{5}, []int{5}},
		{"Sorted Array", []int{1, 2, 3, 4}, []int{1, 2, 3, 4}},
		{"Reverse Sorted", []int{4, 3, 2, 1}, []int{1, 2, 3, 4}},
		{"Unsorted Array", []int{64, 34, 25, 12, 22, 11, 90}, []int{11, 12, 22, 25, 34, 64, 90}},
		{"With Duplicates", []int{3, 1, 2, 3, 1}, []int{1, 1, 2, 3, 3}},
		{"All Equal Elements", []int{7, 7, 7, 7}, []int{7, 7, 7, 7}},
		{"Negative Numbers", []int{-5, -1, -3, 0, 4}, []int{-5, -3, -1, 0, 4}},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			// Create a copy to preserve original test case
			inputCopy := make([]int, len(tc.input))
			copy(inputCopy, tc.input)
			
			result := bubbleSort(inputCopy)
			if !reflect.DeepEqual(result, tc.expected) {
				t.Errorf("For input %v, expected %v but got %v", tc.input, tc.expected, result)
			}
		})
	}
}
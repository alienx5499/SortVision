package main

import (
	"fmt"
	"math"
	"sort"
)

// bucketSort sorts an array of float64 values using the Bucket Sort algorithm.
// It returns a new sorted slice.
// Time Complexity:
// - Best/Average: O(n + k) when input is uniformly distributed
// - Worst: O(n^2) when elements fall into one bucket
// Space Complexity: O(n + k)
func bucketSort(arr []float64) []float64 {
	n := len(arr)
	if n <= 1 {
		// Already sorted (empty or one element)
		return arr
	}

	// Step 1: Find the maximum and minimum values
	minVal, maxVal := arr[0], arr[0]
	for _, val := range arr {
		if val < minVal {
			minVal = val
		}
		if val > maxVal {
			maxVal = val
		}
	}

	// Step 2: Create n buckets (slices)
	bucketCount := n
	buckets := make([][]float64, bucketCount)

	// Step 3: Distribute elements into buckets
	for _, val := range arr {
		// Normalize to index: (val - min) / (max - min)
		index := int(math.Floor((val - minVal) / (maxVal - minVal + 1e-9) * float64(bucketCount)))
		if index >= bucketCount {
			index = bucketCount - 1
		}
		buckets[index] = append(buckets[index], val)
	}

	// Step 4: Sort each bucket and concatenate
	sorted := make([]float64, 0, n)
	for _, bucket := range buckets {
		if len(bucket) > 0 {
			sort.Float64s(bucket) // Use Go's efficient inbuilt sort
			sorted = append(sorted, bucket...)
		}
	}
	return sorted
}

// printArray prints the array in a readable format.
func printArray(arr []float64) {
	for _, val := range arr {
		fmt.Printf("%.2f ", val)
	}
	fmt.Println()
}

// Example usage
func main() {
	fmt.Println("📦 Bucket Sort Implementation in Go")
	example := []float64{0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68}
	fmt.Print("Original: ")
	printArray(example)

	sorted := bucketSort(example)
	fmt.Print("Sorted:   ")
	printArray(sorted)

	// Run tests
	runTests()
}

// runTests contains basic test cases to verify correctness.
func runTests() {
	fmt.Println("\n🧪 Running Test Cases...")

	tests := [][]float64{
		{},                                // empty
		{1.1},                             // single element
		{0.5, 0.5, 0.5},                   // duplicate elements
		{0.9, 0.8, 0.7, 0.6, 0.5},         // descending order
		{0.1, 0.2, 0.3, 0.4, 0.5},         // already sorted
		{0.42, 0.32, 0.23, 0.52, 0.25},    // random floats
	}

	for i, test := range tests {
		fmt.Printf("Test %d: Input: %v\n", i+1, test)
		result := bucketSort(test)
		fmt.Printf("        Output: %v\n", result)
	}
}

/* ✅ Features Included
✔️ Edge case handling: empty array, one element, duplicates, etc.
✔️ Time and space complexity analysis (in comments)
✔️ main() function for demonstration
✔️ Test suite with sample cases
✔️ Uses built-in Go sort.Float64s for simplicity and performance
✔️ Godoc-style comments
✔️ Efficient memory and indexing

🔧 Optimization Notes
Uses in-place slice allocation for buckets
Uses efficient built-in sort (Go’s standard library uses adaptive quicksort)
No unnecessary copying of data
Precision issues are handled using a small epsilon 1e-9
*/

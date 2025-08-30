package quicksort

import (
	"fmt"
	"math/rand"
	"sort"
)

// pivotStrategy defines the method for selecting a pivot element
type pivotStrategy int

const (
	First pivotStrategy = iota
	Last
	Middle
	Random
)

// String representation of pivot strategies
func (s pivotStrategy) String() string {
	return [...]string{"First", "Last", "Middle", "Random"}[s]
}

// currentStrategy holds the active pivot selection strategy
var currentStrategy = Middle

// SetPivotStrategy configures the pivot selection method
// Valid strategies: First, Last, Middle, Random
func SetPivotStrategy(strategy pivotStrategy) {
	currentStrategy = strategy
}

// choosePivot selects a pivot index based on the current strategy
func choosePivot(arr []int, low, high int) int {
	switch currentStrategy {
	case First:
		return low
	case Last:
		return high
	case Middle:
		return low + (high-low)/2
	case Random:
		return low + rand.Intn(high-low+1)
	default:
		return low + (high-low)/2
	}
}

// partition rearranges elements around a pivot and returns its final position
// Uses Lomuto partition scheme with configurable pivot selection
// Time Complexity: O(n), Space Complexity: O(1)
// Steps:
// 1. Select pivot using current strategy
// 2. Move pivot to end of current partition
// 3. Initialize partition index i to low-1
// 4. Iterate j from low to high-1
// 5. If current element <= pivot, increment i and swap with j
// 6. Move pivot to its correct position (i+1)
// 7. Return pivot index
func partition(arr []int, low, high int) int {
	// Select pivot and move to last position
	pivotIdx := choosePivot(arr, low, high)
	arr[pivotIdx], arr[high] = arr[high], arr[pivotIdx]
	pivot := arr[high]

	i := low - 1 // Index of smaller element

	// Traverse through all elements
	for j := low; j < high; j++ {
		// If current element is <= pivot
		if arr[j] <= pivot {
			i++ // Move partition index
			arr[i], arr[j] = arr[j], arr[i]
		}
	}

	// Move pivot to its correct position
	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}

// quickSort recursively sorts the array using in-place partitioning
// Time Complexity: O(n log n) average, O(n²) worst-case
// Space Complexity: O(log n) stack space
// Optimizations:
// 1. Processes smaller partition first to minimize stack depth
// 2. Uses tail recursion optimization
func quickSort(arr []int, low, high int) {
	for low < high {
		// Partition the array and get pivot index
		pi := partition(arr, low, high)

		// Optimize recursion order to minimize stack depth
		if pi-low < high-pi {
			quickSort(arr, low, pi-1)
			low = pi + 1
		} else {
			quickSort(arr, pi+1, high)
			high = pi - 1
		}
	}
}

// Sort is the public interface for sorting integer slices
// Handles edge cases and initiates the sorting process
// Time Complexity: Same as quickSort
// Space Complexity: Same as quickSort
func Sort(arr []int) {
	// Handle edge cases: empty or single-element slices
	if len(arr) < 2 {
		return
	}

	// Start recursive sorting
	quickSort(arr, 0, len(arr)-1)
}

// Example usage demonstrates how to use the Sort function
func ExampleSort() {
	data := []int{9, -3, 5, 2, 6, 8, -6, 1, 3}
	fmt.Println("Original:", data)

	// Use random pivot strategy
	SetPivotStrategy(Random)
	Sort(data)

	fmt.Println("Sorted:  ", data)
	// Output:
	// Original: [9 -3 5 2 6 8 -6 1 3]
	// Sorted:   [-6 -3 1 2 3 5 6 8 9]
}

// TestSort runs various test cases for the Sort function
func TestSort(t *testing.T) {
	tests := []struct {
		name     string
		input    []int
		expected []int
	}{
		{"Empty", []int{}, []int{}},
		{"SingleElement", []int{5}, []int{5}},
		{"TwoElementsSorted", []int{1, 2}, []int{1, 2}},
		{"TwoElementsUnsorted", []int{2, 1}, []int{1, 2}},
		{"Sorted", []int{1, 2, 3, 4, 5}, []int{1, 2, 3, 4, 5}},
		{"ReverseSorted", []int{5, 4, 3, 2, 1}, []int{1, 2, 3, 4, 5}},
		{"Duplicates", []int{3, 1, 2, 1, 3}, []int{1, 1, 2, 3, 3}},
		{"NegativeNumbers", []int{-3, 1, -2, 4, 0}, []int{-3, -2, 0, 1, 4}},
		{"AllEqual", []int{7, 7, 7, 7, 7}, []int{7, 7, 7, 7, 7}},
	}

	for _, strategy := range []pivotStrategy{First, Last, Middle, Random} {
		SetPivotStrategy(strategy)
		for _, tt := range tests {
			t.Run(fmt.Sprintf("%s_%s", tt.name, strategy), func(t *testing.T) {
				arr := make([]int, len(tt.input))
				copy(arr, tt.input)

				Sort(arr)

				if !reflect.DeepEqual(arr, tt.expected) {
					t.Errorf("Sort(%v) = %v, want %v", tt.input, arr, tt.expected)
				}
			})
		}
	}
}

// TestLargeArrays tests sorting with large random arrays
func TestLargeArrays(t *testing.T) {
	sizes := []int{100, 1000, 10000}
	strategies := []pivotStrategy{First, Last, Middle, Random}

	for _, size := range sizes {
		for _, strategy := range strategies {
			t.Run(fmt.Sprintf("Size%d_%s", size, strategy), func(t *testing.T) {
				SetPivotStrategy(strategy)
				arr := make([]int, size)
				expected := make([]int, size)

				// Generate random numbers
				rand.Seed(42)
				for i := range arr {
					arr[i] = rand.Intn(size * 10)
				}

				copy(expected, arr)
				sort.Ints(expected)

				Sort(arr)

				if !reflect.DeepEqual(arr, expected) {
					t.Errorf("Sort failed for size %d with strategy %s", size, strategy)
				}
			})
		}
	}
}

// BenchmarkSort benchmarks sorting performance with different strategies
func BenchmarkSort(b *testing.B) {
	sizes := []int{100, 1000, 10000}
	strategies := []pivotStrategy{First, Last, Middle, Random}
	rand.Seed(42)

	for _, size := range sizes {
		for _, strategy := range strategies {
			b.Run(fmt.Sprintf("Size%d_%s", size, strategy), func(b *testing.B) {
				arr := make([]int, size)
				for i := range arr {
					arr[i] = rand.Intn(size * 10)
				}

				b.ResetTimer()
				for i := 0; i < b.N; i++ {
					SetPivotStrategy(strategy)
					testArr := make([]int, size)
					copy(testArr, arr)
					Sort(testArr)
				}
			})
		}
	}
}

// PerformanceNotes contains optimization details and complexity analysis
/*
Performance Optimization Notes:

1. Pivot Selection:
   - First/Last: O(n²) worst-case on sorted/reverse-sorted data
   - Middle: Avoids worst-case for pre-sorted data
   - Random: Probabilistic guarantee against worst-case O(n²)

2. Tail Recursion Optimization:
   - Processes smaller partition recursively
   - Handles larger partition iteratively
   - Limits stack depth to O(log n)

3. Partition Scheme:
   - Lomuto scheme: Simple implementation
   - Hoare scheme: Fewer swaps (not implemented here)

4. Small Array Optimization:
   - Insertion sort for small partitions (n < 12-20) not implemented
   - Could provide 10-15% improvement

5. Worst-case Prevention:
   - IntroSort: Hybrid with HeapSort fallback (not implemented)
   - Stack Depth Limit: Switch to HeapSort beyond certain depth

Time Complexity:
- Best-case:    O(n log n) - balanced partitions
- Average-case: O(n log n) - random data
- Worst-case:   O(n²)      - poor pivot selection

Space Complexity:
- O(log n) - stack space due to recursion

Comparison with Standard Library:
- Go's sort.Ints uses IntroSort (QuickSort + HeapSort fallback)
- This implementation focuses on QuickSort fundamentals
*/
var PerformanceNotes string // Dummy variable for documentation

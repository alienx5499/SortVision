package radix

import (
	"math"
	"math/bits"
	"runtime"
	"sync"
)

// RadixSort represents the radix sort implementation
type RadixSort struct {
	base int
}

// getMax finds the maximum value in slice to determine number of digits
// Time Complexity: O(n), Space Complexity: O(1)
func (rs *RadixSort) getMax(arr []int) int {
	if len(arr) == 0 {
		return 0
	}
	max := arr[0]
	for _, v := range arr {
		if v > max {
			max = v
		}
	}
	return max
}

// countSort performs counting sort for each digit
// Time Complexity: O(n + base), Space Complexity: O(n + base)
func (rs *RadixSort) countSort(arr []int, exp int) {
	n := len(arr)
	if n <= 1 {
		return
	}

	output := make([]int, n)
	count := make([]int, rs.base)

	for i := 0; i < n; i++ {
		digit := (arr[i] / exp) % rs.base
		if digit < 0 {
			digit += rs.base
		}
		count[digit]++
	}

	for i := 1; i < rs.base; i++ {
		count[i] += count[i-1]
	}

	for i := n - 1; i >= 0; i-- {
		digit := (arr[i] / exp) % rs.base
		if digit < 0 {
			digit += rs.base
		}
		output[count[digit]-1] = arr[i]
		count[digit]--
	}

	copy(arr, output)
}

// radixSortNonNegative sorts non-negative integers using radix sort
// Time Complexity: O(k * (n + base)), Space Complexity: O(n + base)
func (rs *RadixSort) radixSortNonNegative(arr []int) {
	if len(arr) <= 1 {
		return
	}
	max := rs.getMax(arr)
	exp := 1
	for max/exp > 0 {
		rs.countSort(arr, exp)
		exp *= rs.base
	}
}

// Sort performs radix sort on the input slice
// Time Complexity: O(k * (n + base)), Space Complexity: O(n + base)
func (rs *RadixSort) Sort(arr []int, base int) []int {
	if len(arr) <= 1 || base < 2 {
		return arr
	}
	rs.base = base

	// Handle minInt values separately
	minInt := math.MinInt
	var minInts, negatives, nonNegatives []int
	for _, v := range arr {
		if v == minInt {
			minInts = append(minInts, v)
		} else if v < 0 {
			negatives = append(negatives, -v) // Convert to positive
		} else {
			nonNegatives = append(nonNegatives, v)
		}
	}

	var wg sync.WaitGroup
	wg.Add(2)

	// Process negatives in parallel
	go func() {
		defer wg.Done()
		if len(negatives) > 0 {
			rs.radixSortNonNegative(negatives)
			// Reverse and convert back to negative
			for i, j := 0, len(negatives)-1; i < j; i, j = i+1, j-1 {
				negatives[i], negatives[j] = negatives[j], negatives[i]
			}
			for i := range negatives {
				negatives[i] = -negatives[i]
			}
		}
	}()

	// Process non-negatives in parallel
	go func() {
		defer wg.Done()
		if len(nonNegatives) > 0 {
			rs.radixSortNonNegative(nonNegatives)
		}
	}()

	wg.Wait()

	// Combine results: minInts + sorted negatives + sorted non-negatives
	return append(append(minInts, negatives...), nonNegatives...)
}

// ConcurrentRadixSort uses sign-bit flipping for better performance
type ConcurrentRadixSort struct {
	base int
}

// countSortConcurrent performs counting sort with parallel counting
func (crs *ConcurrentRadixSort) countSortConcurrent(arr []uint, exp uint) {
	n := len(arr)
	if n <= 1 {
		return
	}

	output := make([]uint, n)
	base := crs.base
	numWorkers := runtime.NumCPU()
	chunkSize := (n + numWorkers - 1) / numWorkers
	counts := make([][]int, numWorkers)

	var wg sync.WaitGroup
	wg.Add(numWorkers)

	// Parallel counting
	for i := 0; i < numWorkers; i++ {
		start := i * chunkSize
		end := start + chunkSize
		if end > n {
			end = n
		}
		go func(i int, chunk []uint) {
			defer wg.Done()
			localCount := make([]int, base)
			for _, v := range chunk {
				digit := (v / exp) % uint(base)
				localCount[digit]++
			}
			counts[i] = localCount
		}(i, arr[start:end])
	}
	wg.Wait()

	// Combine counts
	totalCount := make([]int, base)
	for i := 0; i < numWorkers; i++ {
		for d, c := range counts[i] {
			totalCount[d] += c
		}
	}

	// Prefix sum
	for i := 1; i < base; i++ {
		totalCount[i] += totalCount[i-1]
	}

	// Build output array
	for i := n - 1; i >= 0; i-- {
		digit := (arr[i] / exp) % uint(base)
		output[totalCount[digit]-1] = arr[i]
		totalCount[digit]--
	}

	copy(arr, output)
}

// SortConcurrent sorts using sign-bit flipping and parallel counting
func (crs *ConcurrentRadixSort) SortConcurrent(arr []int, base int) []int {
	if len(arr) <= 1 || base < 2 {
		return arr
	}
	crs.base = base

	// Flip sign bit for correct ordering
	signBit := uint(1 << (bits.UintSize - 1))
	arrU := make([]uint, len(arr))
	for i, v := range arr {
		arrU[i] = uint(v) ^ signBit
	}

	// Sort unsigned array
	max := uint(0)
	for _, v := range arrU {
		if v > max {
			max = v
		}
	}

	exp := uint(1)
	for max/exp > 0 {
		crs.countSortConcurrent(arrU, exp)
		exp *= uint(base)
	}

	// Convert back to signed
	for i, u := range arrU {
		arr[i] = int(u ^ signBit)
	}

	return arr
}

// Test functions
func TestRadixSort(t *testing.T) {
	tests := []struct {
		name  string
		input []int
		base  int
	}{
		{"Empty", []int{}, 10},
		{"SingleElement", []int{5}, 10},
		{"AllPositive", []int{5, 3, 9, 1}, 10},
		{"AllNegative", []int{-5, -3, -9, -1}, 10},
		{"MixedSigns", []int{-5, 3, -9, 1}, 10},
		{"WithZero", []int{-5, 0, -9, 1}, 10},
		{"LargeNumbers", []int{1000, -1000, 500, -500}, 10},
		{"MinInt", []int{math.MinInt, math.MinInt + 1, math.MaxInt}, 10},
		{"BinaryBase", []int{5, 3, 9, 1}, 2},
		{"HexadecimalBase", []int{30, 15, 10, 50}, 16},
	}

	rs := &RadixSort{}
	crs := &ConcurrentRadixSort{}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Test RadixSort
			inputCopy := append([]int(nil), tt.input...)
			result := rs.Sort(inputCopy, tt.base)
			if !isSorted(result) {
				t.Errorf("RadixSort(%v, %d) = %v, not sorted", tt.input, tt.base, result)
			}

			// Test ConcurrentRadixSort
			inputCopy = append([]int(nil), tt.input...)
			result = crs.SortConcurrent(inputCopy, tt.base)
			if !isSorted(result) {
				t.Errorf("ConcurrentRadixSort(%v, %d) = %v, not sorted", tt.input, tt.base, result)
			}
		})
	}

	// Random test cases
	randomTests := []struct {
		name  string
		size  int
		base  int
	}{
		{"Random100", 100, 10},
		{"Random1000", 1000, 10},
		{"Random10000", 10000, 10},
	}

	for _, tt := range randomTests {
		t.Run(tt.name, func(t *testing.T) {
			arr := generateRandomArray(tt.size)

			// Test RadixSort
			inputCopy := append([]int(nil), arr...)
			result := rs.Sort(inputCopy, tt.base)
			if !isSorted(result) {
				t.Errorf("RadixSort failed for %s", tt.name)
			}

			// Test ConcurrentRadixSort
			inputCopy = append([]int(nil), arr...)
			result = crs.SortConcurrent(inputCopy, tt.base)
			if !isSorted(result) {
				t.Errorf("ConcurrentRadixSort failed for %s", tt.name)
			}
		})
	}
}

// Helper function to check if slice is sorted
func isSorted(arr []int) bool {
	for i := 1; i < len(arr); i++ {
		if arr[i-1] > arr[i] {
			return false
		}
	}
	return true
}

// Helper function to generate random array
func generateRandomArray(size int) []int {
	arr := make([]int, size)
	min := -1000000
	max := 1000000
	for i := range arr {
		arr[i] = rand.Intn(max-min) + min
	}
	return arr
}

// Benchmark functions
func BenchmarkRadixSort(b *testing.B) {
	sizes := []int{100, 1000, 10000, 100000}
	bases := []int{2, 10, 16}
	rs := &RadixSort{}
	crs := &ConcurrentRadixSort{}

	for _, size := range sizes {
		for _, base := range bases {
			arr := generateRandomArray(size)
			
			b.Run("RadixSort_Size_"+strconv.Itoa(size)+"_Base_"+strconv.Itoa(base), func(b *testing.B) {
				for i := 0; i < b.N; i++ {
					rs.Sort(append([]int(nil), arr...), base)
				}
			})

			b.Run("ConcurrentRadixSort_Size_"+strconv.Itoa(size)+"_Base_"+strconv.Itoa(base), func(b *testing.B) {
				for i := 0; i < b.N; i++ {
					crs.SortConcurrent(append([]int(nil), arr...), base)
				}
			})
		}
	}
}

// Example function
func ExampleRadixSort() {
	arr := []int{170, -45, 75, -90, -802, 24, 2, 66}
	rs := &RadixSort{}
	sorted := rs.Sort(arr, 10)
	fmt.Println(sorted)
	// Output: [-802 -90 -45 2 24 66 75 170]
}

// Required imports for tests and examples
import (
	"fmt"
	"math/rand"
	"strconv"
	"testing"
)
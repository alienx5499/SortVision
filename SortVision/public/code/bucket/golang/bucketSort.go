package main

import (
	"fmt"
	"sort"
)

// Bucket Sort (for floats in [0, 1))
// Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
func bucketSort(arr []float64) {
	if len(arr) <= 1 {
		return
	}

	n := len(arr)
	buckets := make([][]float64, n)

	for _, x := range arr {
		idx := int(x * float64(n))
		if idx >= n {
			idx = n - 1
		}
		buckets[idx] = append(buckets[idx], x)
	}

	k := 0
	for i := 0; i < n; i++ {
		sort.Float64s(buckets[i])
		for _, x := range buckets[i] {
			arr[k] = x
			k++
		}
	}
}

func main() {
	arr := []float64{0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51}
	bucketSort(arr)
	fmt.Println(arr)
}

package main

import "fmt"

// Radix Sort (LSD, base 10, non-negative integers)
// Time: O(d * (n + k)), Space: O(n + k)
func radixSort(arr []int) {
	if len(arr) <= 1 {
		return
	}

	maxVal := arr[0]
	for _, x := range arr {
		if x > maxVal {
			maxVal = x
		}
	}

	for exp := 1; maxVal/exp > 0; exp *= 10 {
		countingSortByExp(arr, exp)
	}
}

func countingSortByExp(arr []int, exp int) {
	n := len(arr)
	output := make([]int, n)
	count := make([]int, 10)

	for _, x := range arr {
		count[(x/exp)%10]++
	}
	for i := 1; i < 10; i++ {
		count[i] += count[i-1]
	}

	for i := n - 1; i >= 0; i-- {
		digit := (arr[i] / exp) % 10
		output[count[digit]-1] = arr[i]
		count[digit]--
	}

	copy(arr, output)
}

func main() {
	arr := []int{170, 45, 75, 90, 802, 24, 2, 66}
	radixSort(arr)
	fmt.Println(arr)
}

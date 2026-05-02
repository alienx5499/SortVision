package main

import "fmt"

// Quick Sort (in-place, Lomuto partition)
// Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
func quickSort(arr []int, low, high int) {
	if low < high {
		p := partition(arr, low, high)
		quickSort(arr, low, p-1)
		quickSort(arr, p+1, high)
	}
}

func partition(arr []int, low, high int) int {
	pivot := arr[high]
	i := low - 1

	for j := low; j < high; j++ {
		if arr[j] <= pivot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}

func main() {
	arr := []int{64, 25, 12, 22, 11}
	quickSort(arr, 0, len(arr)-1)
	fmt.Println(arr)
}

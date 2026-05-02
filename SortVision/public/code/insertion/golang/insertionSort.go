package main

import "fmt"

// Insertion Sort (in-place)
// Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
func insertionSort(arr []int) {
	for i := 1; i < len(arr); i++ {
		key := arr[i]
		j := i - 1
		for j >= 0 && arr[j] > key {
			arr[j+1] = arr[j]
			j--
		}
		arr[j+1] = key
	}
}

func main() {
	arr := []int{64, 25, 12, 22, 11}
	insertionSort(arr)
	fmt.Println(arr)
}

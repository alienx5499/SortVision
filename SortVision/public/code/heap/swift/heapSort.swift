import Foundation

// Heap Sort (in-place, max-heap)
// Time: Best/Avg/Worst O(n log n), Space: O(1)
func heapSort(_ arr: inout [Int]) {
    let n = arr.count
    if n <= 1 { return }

    for i in stride(from: n / 2 - 1, through: 0, by: -1) {
        heapify(&arr, n, i)
    }
    for i in stride(from: n - 1, through: 1, by: -1) {
        arr.swapAt(0, i)
        heapify(&arr, i, 0)
    }
}

private func heapify(_ arr: inout [Int], _ n: Int, _ i: Int) {
    var largest = i
    let left = 2 * i + 1
    let right = 2 * i + 2

    if left < n && arr[left] > arr[largest] { largest = left }
    if right < n && arr[right] > arr[largest] { largest = right }

    if largest != i {
        arr.swapAt(i, largest)
        heapify(&arr, n, largest)
    }
}

var arr = [64, 25, 12, 22, 11]
heapSort(&arr)
print(arr)

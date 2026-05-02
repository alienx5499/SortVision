import Foundation

// Bubble Sort (in-place)
// Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
func bubbleSort(_ arr: inout [Int]) {
    if arr.count <= 1 { return }

    for i in 0..<(arr.count - 1) {
        var swapped = false
        for j in 0..<(arr.count - i - 1) {
            if arr[j] > arr[j + 1] {
                arr.swapAt(j, j + 1)
                swapped = true
            }
        }
        if !swapped { break }
    }
}

var arr = [64, 34, 25, 12, 22, 11, 90]
bubbleSort(&arr)
print(arr)

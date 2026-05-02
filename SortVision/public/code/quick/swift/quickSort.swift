import Foundation

// Quick Sort (in-place, Lomuto partition)
// Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
func quickSort(_ arr: inout [Int], _ low: Int, _ high: Int) {
    if low < high {
        let p = partition(&arr, low, high)
        quickSort(&arr, low, p - 1)
        quickSort(&arr, p + 1, high)
    }
}

private func partition(_ arr: inout [Int], _ low: Int, _ high: Int) -> Int {
    let pivot = arr[high]
    var i = low - 1

    for j in low..<high {
        if arr[j] <= pivot {
            i += 1
            arr.swapAt(i, j)
        }
    }
    arr.swapAt(i + 1, high)
    return i + 1
}

var arr = [64, 25, 12, 22, 11]
quickSort(&arr, 0, arr.count - 1)
print(arr)

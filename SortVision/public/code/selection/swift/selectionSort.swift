import Foundation

// Selection Sort (in-place)
// Time: Best/Avg/Worst O(n^2), Space: O(1)
func selectionSort(_ arr: inout [Int]) {
    guard arr.count > 1 else { return }

    for i in 0..<(arr.count - 1) {
        var minIdx = i
        for j in (i + 1)..<arr.count {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        if minIdx != i {
            arr.swapAt(i, minIdx)
        }
    }
}

var arr = [64, 25, 12, 22, 11]
selectionSort(&arr)
print(arr)

import Foundation

// Insertion Sort (in-place)
// Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
func insertionSort(_ arr: inout [Int]) {
    guard arr.count > 1 else { return }

    for i in 1..<arr.count {
        let key = arr[i]
        var j = i - 1

        while j >= 0 && arr[j] > key {
            arr[j + 1] = arr[j]
            j -= 1
        }
        arr[j + 1] = key
    }
}

var arr = [64, 25, 12, 22, 11]
insertionSort(&arr)
print(arr)

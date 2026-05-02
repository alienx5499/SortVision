import Foundation

// Merge Sort
// Time: Best/Avg/Worst O(n log n), Space: O(n)
func mergeSort(_ arr: [Int]) -> [Int] {
    guard arr.count > 1 else { return arr }

    let mid = arr.count / 2
    let left = mergeSort(Array(arr[..<mid]))
    let right = mergeSort(Array(arr[mid...]))
    return merge(left, right)
}

private func merge(_ left: [Int], _ right: [Int]) -> [Int] {
    var result: [Int] = []
    result.reserveCapacity(left.count + right.count)

    var i = 0, j = 0
    while i < left.count && j < right.count {
        if left[i] <= right[j] {
            result.append(left[i]); i += 1
        } else {
            result.append(right[j]); j += 1
        }
    }
    result.append(contentsOf: left[i...])
    result.append(contentsOf: right[j...])
    return result
}

let arr = [64, 25, 12, 22, 11]
print(mergeSort(arr))

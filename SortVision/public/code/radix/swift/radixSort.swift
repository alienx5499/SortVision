import Foundation

// Radix Sort (LSD, base 10, non-negative integers)
// Time: O(d * (n + k)), Space: O(n + k)
func radixSort(_ arr: inout [Int]) {
    guard arr.count > 1 else { return }

    guard let maxVal = arr.max() else { return }
    var exp = 1
    while maxVal / exp > 0 {
        countingSortByExp(&arr, exp)
        exp *= 10
    }
}

private func countingSortByExp(_ arr: inout [Int], _ exp: Int) {
    var output = Array(repeating: 0, count: arr.count)
    var count = Array(repeating: 0, count: 10)

    for x in arr {
        count[(x / exp) % 10] += 1
    }
    for i in 1..<10 {
        count[i] += count[i - 1]
    }

    for i in stride(from: arr.count - 1, through: 0, by: -1) {
        let digit = (arr[i] / exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    }

    arr = output
}

var arr = [170, 45, 75, 90, 802, 24, 2, 66]
radixSort(&arr)
print(arr)

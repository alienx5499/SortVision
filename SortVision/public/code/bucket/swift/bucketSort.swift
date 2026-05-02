import Foundation

// Bucket Sort (for numbers in [0, 1))
// Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
func bucketSort(_ arr: inout [Double]) {
    guard arr.count > 1 else { return }

    let n = arr.count
    var buckets = Array(repeating: [Double](), count: n)

    for x in arr {
        let idx = min(n - 1, Int(x * Double(n)))
        buckets[idx].append(x)
    }

    var k = 0
    for i in 0..<n {
        buckets[i].sort()
        for x in buckets[i] {
            arr[k] = x
            k += 1
        }
    }
}

var arr: [Double] = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]
bucketSort(&arr)
print(arr)

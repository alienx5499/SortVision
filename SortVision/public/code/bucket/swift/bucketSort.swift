class BucketSort {
    static func sort(_ arr: inout [Int]) {
        // Check if the array is empty or has only one element
        guard arr.count > 1 else { return }

        // 1. Find the minimum and maximum values in the array
        guard let minValue = arr.min(), let maxValue = arr.max() else { return }

        // 2. Decide the number of buckets
        let bucketCount = arr.count
        let bucketSize = max(1, (maxValue - minValue) / bucketCount + 1)

        // 3. Create empty buckets
        var buckets: [[Int]] = Array(repeating: [], count: bucketCount)

        // 4. Distribute the elements into buckets
        for num in arr {
            let bucketIndex = (num - minValue) / bucketSize
            buckets[bucketIndex].append(num)
        }

        // 5. Sort each bucket and concatenate the result
        var sortedArray: [Int] = []
        for var bucket in buckets {
            // You can use any sorting algorithm here; using Swift's built-in sort
            bucket.sort()
            sortedArray.append(contentsOf: bucket)
        }

        // 6. Copy the sorted elements back to the original array
        for i in 0..<arr.count {
            arr[i] = sortedArray[i]
        }
    }
}

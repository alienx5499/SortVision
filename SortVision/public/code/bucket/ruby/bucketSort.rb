# Bucket Sort (for numbers in [0, 1))
# Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
def bucket_sort(arr)
  return arr if arr.length <= 1

  n = arr.length
  buckets = Array.new(n) { [] }

  arr.each do |x|
    idx = [n - 1, (x * n).to_i].min
    buckets[idx] << x
  end

  k = 0
  buckets.each do |bucket|
    bucket.sort.each do |x|
      arr[k] = x
      k += 1
    end
  end
  arr
end

arr = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]
p bucket_sort(arr)

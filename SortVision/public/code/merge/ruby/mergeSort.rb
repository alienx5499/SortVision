# Merge Sort
# Time: Best/Avg/Worst O(n log n), Space: O(n)
def merge_sort(arr)
  return arr if arr.length <= 1

  mid = arr.length / 2
  left = merge_sort(arr[0...mid])
  right = merge_sort(arr[mid..])
  merge(left, right)
end

def merge(left, right)
  result = []
  i = j = 0

  while i < left.length && j < right.length
    if left[i] <= right[j]
      result << left[i]
      i += 1
    else
      result << right[j]
      j += 1
    end
  end

  result.concat(left[i..] || []).concat(right[j..] || [])
end

arr = [64, 25, 12, 22, 11]
p merge_sort(arr)

# Merge Sort implementation in Ruby
# Time Complexity: O(n log n)
# Space Complexity: O(n)

def merge_sort(arr)
  return arr if arr.length <= 1

  mid = arr.length / 2
  left = arr[0...mid]
  right = arr[mid...arr.length]

  # Recursively sort left and right halves
  left = merge_sort(left)
  right = merge_sort(right)

  # Merge the sorted halves
  merge(left, right)
end

def merge(left, right)
  result = []
  i = j = 0

  # Compare and merge elements
  while i < left.length && j < right.length
    if left[i] <= right[j]
      result << left[i]
      i += 1
    else
      result << right[j]
      j += 1
    end
  end

  # Add remaining elements from left array
  result.concat(left[i...left.length])

  # Add remaining elements from right array
  result.concat(right[j...right.length])

  result
end

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
puts "Original array: #{arr.join(', ')}"

sorted = merge_sort(arr)
puts "Sorted array: #{sorted.join(', ')}"

# Test with different array
test_arr = [5, 2, 4, 6, 1, 3]
puts "\nTest array: #{test_arr.join(', ')}"
puts "Sorted: #{merge_sort(test_arr).join(', ')}"

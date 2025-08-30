# radixSort.rb
# 📌 Radix Sort Implementation in Ruby
# 🔄 Non-comparative, integer sorting algorithm

# ----------------------------------------
# 🧠 Get Maximum Value from Array
# Returns the maximum number in the array
# Time Complexity: O(n)
def get_max(arr)
  arr.max || 0
end

# ----------------------------------------
# 🧮 Counting Sort (used as subroutine by Radix Sort)
# Sorts the array based on the digit represented by exp
# Time Complexity: O(n)
# Space Complexity: O(n + k), where k = base (10)
def counting_sort(arr, exp)
  n = arr.length
  output = Array.new(n, 0)     # output array
  count = Array.new(10, 0)     # digit counts for base 10

  # Store count of occurrences in count[]
  arr.each do |num|
    index = (num / exp) % 10
    count[index] += 1
  end

  # Change count[i] so that count[i] now contains actual
  # position of this digit in output[]
  (1...10).each do |i|
    count[i] += count[i - 1]
  end

  # Build the output array (stable sort)
  (n - 1).downto(0) do |i|
    index = (arr[i] / exp) % 10
    output[count[index] - 1] = arr[i]
    count[index] -= 1
  end

  # Copy the output array to arr[]
  (0...n).each do |i|
    arr[i] = output[i]
  end

  arr
end

# ----------------------------------------
# 🚀 Radix Sort Function
# Time Complexity: O(d * (n + b)) where:
#   - d = number of digits
#   - b = base (10)
#   - n = number of elements
# Space Complexity: O(n)
def radix_sort(arr)
  return arr if arr.length <= 1

  max_num = get_max(arr)

  exp = 1
  while max_num / exp > 0
    counting_sort(arr, exp)
    exp *= 10
  end

  arr
end

# ----------------------------------------
# 🧪 Example Usage and Test Cases
if __FILE__ == $0
  puts "📘 Radix Sort in Ruby"

  test_cases = [
    [],
    [5],
    [170, 45, 75, 90, 802, 24, 2, 66],
    [3, 3, 3],
    [100, 10, 1],
    [999, 888, 777, 111]
  ]

  test_cases.each_with_index do |test, idx|
    puts "\n🔢 Test Case #{idx + 1}:"
    puts "Input:  #{test}"
    sorted = radix_sort(test.dup)
    puts "Sorted: #{sorted}"
  end
end

# ----------------------------------------
# 📈 Notes:
# - Radix Sort only works efficiently for non-negative integers.
# - Not suitable for negative numbers without modifications.
# - It's faster than comparison sorts (like merge or quick sort)
#   for large datasets with small key sizes.

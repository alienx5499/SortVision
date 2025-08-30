# insertionSort.rb

# 📘 Insertion Sort Algorithm in Ruby
#
# Insertion Sort is a simple sorting algorithm that builds the sorted array one item at a time.
# It is much like sorting playing cards in your hands.
#
# Time Complexity:
# - Best Case (Already Sorted): O(n)
# - Average & Worst Case: O(n^2)
#
# Space Complexity:
# - O(1) (In-place sort)

# 📌 Function: insertion_sort
# Sorts an array of numbers using insertion sort algorithm
#
# @param [Array<Numeric>] arr The array to sort
# @return [Array<Numeric>] The sorted array
def insertion_sort(arr)
  # Traverse from the second element to the end
  (1...arr.length).each do |i|
    key = arr[i]
    j = i - 1

    # Move elements greater than key to one position ahead
    while j >= 0 && arr[j] > key
      arr[j + 1] = arr[j]
      j -= 1
    end

    arr[j + 1] = key
  end
  arr
end

# ✅ Example usage
if __FILE__ == $0
  puts "🔢 Original: [5, 2, 9, 1, 5, 6]"
  sorted = insertion_sort([5, 2, 9, 1, 5, 6])
  puts "✅ Sorted:   #{sorted}"
end

# 🧪 Test Cases
def run_tests
  raise "❌ Test failed: empty array" unless insertion_sort([]) == []
  raise "❌ Test failed: one element" unless insertion_sort([1]) == [1]
  raise "❌ Test failed: sorted" unless insertion_sort([1, 2, 3]) == [1, 2, 3]
  raise "❌ Test failed: reverse" unless insertion_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]
  raise "❌ Test failed: duplicates" unless insertion_sort([4, 2, 2, 8, 3]) == [2, 2, 3, 4, 8]

  puts "✅ All test cases passed!"
end

run_tests if __FILE__ == $0

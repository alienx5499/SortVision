# Quick Sort Implementation in Ruby

# 🧠 Swap elements in the array
def swap(arr, i, j)
  arr[i], arr[j] = arr[j], arr[i]
end

# 🔄 Partition the array using Lomuto's scheme (last element as pivot)
def partition(arr, low, high)
  pivot = arr[high]
  i = low - 1

  (low...high).each do |j|
    if arr[j] <= pivot
      i += 1
      swap(arr, i, j)
    end
  end

  swap(arr, i + 1, high)
  i + 1
end

# 🚀 Quick Sort recursive function
def quick_sort(arr, low = 0, high = nil)
  high ||= arr.length - 1
  if low < high
    pi = partition(arr, low, high)
    quick_sort(arr, low, pi - 1)
    quick_sort(arr, pi + 1, high)
  end
  arr
end

# 🧪 Test utility to print array
def print_array(label, arr)
  puts "#{label}: #{arr.join(', ')}"
end

# ▶️ Example usage and test cases
if __FILE__ == $0
  puts "📦 Quick Sort Test Cases"

  # Test Case 1: Normal unsorted array
  arr1 = [10, 7, 8, 9, 1, 5]
  print_array("Original", arr1)
  quick_sort(arr1)
  print_array("Sorted", arr1)
  puts

  # Test Case 2: Already sorted array
  arr2 = [1, 2, 3, 4, 5]
  print_array("Already Sorted", arr2)
  quick_sort(arr2)
  print_array("After Quick Sort", arr2)
  puts

  # Test Case 3: Single element array
  arr3 = [42]
  print_array("Single Element", arr3)
  quick_sort(arr3)
  print_array("After Quick Sort", arr3)
  puts

  # Test Case 4: Empty array
  arr4 = []
  print_array("Empty Array", arr4)
  quick_sort(arr4)
  print_array("After Quick Sort", arr4)
  puts

  # Test Case 5: Array with duplicates
  arr5 = [5, 1, 3, 5, 2, 1, 3]
  print_array("With Duplicates", arr5)
  quick_sort(arr5)
  print_array("After Quick Sort", arr5)
  puts
end

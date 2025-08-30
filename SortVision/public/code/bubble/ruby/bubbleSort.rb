# frozen_string_literal: true

# Implementation of the Bubble Sort algorithm in Ruby.
# Bubble sort is a simple sorting algorithm that repeatedly steps through the list,
# compares adjacent elements and swaps them if they are in the wrong order.
# The pass through the list is repeated until the list is sorted.
def bubble_sort(arr)
  # Return the array if it is empty or has a single element
  return arr if arr.length <= 1

  # Get the length of the array
  n = arr.length

  # Outer loop: controls the number of passes over the array
  (0...n).each do |i|
    # Flag to check if any swaps occurred in this pass
    swapped = false

    # Inner loop: processes adjacent elements, ignoring last i elements as they are sorted
    (0...n - i - 1).each do |j|
      # Compare adjacent elements
      if arr[j] > arr[j + 1]
        # Swap elements if they are in the wrong order
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
        # Mark that a swap occurred
        swapped = true
      end
    end

    # If no swaps occurred in this pass, the array is sorted
    break unless swapped
  end

  # Return the sorted array
  arr
end

# Example usage
if __FILE__ == $PROGRAM_NAME
  # Test case 1: Sorting a typical array
  unsorted_array = [64, 34, 25, 12, 22, 11, 90]
  puts "Original array: #{unsorted_array}"
  sorted_array = bubble_sort(unsorted_array.dup)
  puts "Sorted array:   #{sorted_array}"

  # Test case 2: Empty array
  empty_array = []
  puts "\nOriginal array: #{empty_array}"
  sorted_empty = bubble_sort(empty_array.dup)
  puts "Sorted array:   #{sorted_empty}"

  # Test case 3: Single-element array
  single_element = [42]
  puts "\nOriginal array: #{single_element}"
  sorted_single = bubble_sort(single_element.dup)
  puts "Sorted array:   #{sorted_single}"

  # Test case 4: Already sorted array
  sorted_input = [1, 2, 3, 4, 5]
  puts "\nOriginal array: #{sorted_input}"
  sorted_output = bubble_sort(sorted_input.dup)
  puts "Sorted array:   #{sorted_output}"

  # Test case 5: Array with duplicates
  duplicates = [5, 2, 3, 5, 1, 2]
  puts "\nOriginal array: #{duplicates}"
  sorted_duplicates = bubble_sort(duplicates.dup)
  puts "Sorted array:   #{sorted_duplicates}"

  # Test case 6: Reverse sorted array
  reverse_sorted = [10, 9, 8, 7, 6]
  puts "\nOriginal array: #{reverse_sorted}"
  sorted_reverse = bubble_sort(reverse_sorted.dup)
  puts "Sorted array:   #{sorted_reverse}"
end

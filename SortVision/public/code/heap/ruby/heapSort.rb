# heap_sort.rb

# Heap Sort Implementation
# Time Complexity: O(n log n) - Building heap is O(n), each of the n-1 heapify calls takes O(log n)
# Space Complexity: O(1) - Sorting is done in-place

# Heapify a subtree rooted at index i
# arr: the array to heapify
# n: size of the heap
# i: root index of the subtree
def heapify(arr, n, i)
  largest = i  # Initialize largest as root
  left = 2 * i + 1
  right = 2 * i + 2

  # If left child is larger than root
  if left < n && arr[left] > arr[largest]
    largest = left
  end

  # If right child is larger than current largest
  if right < n && arr[right] > arr[largest]
    largest = right
  end

  # If largest is not root, swap and continue heapifying
  if largest != i
    arr[i], arr[largest] = arr[largest], arr[i]
    heapify(arr, n, largest)  # Recursively heapify the affected subtree
  end
end

# Build a max heap from the array
def build_max_heap(arr)
  n = arr.length
  # Start from last non-leaf node and work backwards
  (n / 2 - 1).downto(0) do |i|
    heapify(arr, n, i)
  end
end

# Main heap sort function
def heap_sort(arr)
  return arr if arr.length <= 1  # Handle edge cases: empty or single element

  n = arr.length
  # Build max heap (rearrange array)
  build_max_heap(arr)

  # Extract elements one by one from heap
  (n - 1).downto(1) do |i|
    # Move current root to end
    arr[0], arr[i] = arr[i], arr[0]
    # Heapify the reduced heap (size = i)
    heapify(arr, i, 0)
  end
  arr
end

# Example Usage
if __FILE__ == $PROGRAM_NAME
  puts "Heap Sort Example"

  # Test Cases
  test_cases = [
    [],
    [5],
    [1, 2, 3],
    [5, 4, 3, 2, 1],
    [3, 1, 4, 1, 5, 9, 2, 6],
    [-3, -1, -2, -5, -4],
    [9, 7, 5, 3, 1, 2, 4, 6, 8]
  ]

  test_cases.each do |arr|
    puts "Original: #{arr.inspect}"
    sorted = heap_sort(arr.dup)  # Use dup to preserve original array
    puts "Sorted:   #{sorted.inspect}"
    puts "Valid:    #{sorted == arr.sort ? '✓' : '✗'}"
    puts "-" * 40
  end
end

# Performance Optimization Notes:
# 1. In-place sorting minimizes memory usage
# 2. Building heap from bottom up (starting at n/2 - 1) reduces heapify operations
# 3. Iterative heapify could be used to avoid recursion overhead (current version uses recursion)
# 4. The algorithm has optimal O(n log n) time complexity for comparison-based sorting
#
# Heap Property Maintenance:
# - After each swap, we call heapify to maintain the max-heap property
# - The heap property (parent >= children) is enforced at every heapify operation
#
# Edge Cases Handled:
# - Empty arrays return immediately
# - Single-element arrays require no sorting
# - Handles duplicate elements correctly
# - Works with negative numbers
#
# Key Insights:
# - The largest element is always at root (index 0) after building max-heap
# - Each extraction reduces heap size by 1 and puts max element in sorted position

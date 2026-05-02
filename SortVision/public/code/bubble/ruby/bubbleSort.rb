# Bubble Sort (in-place)
# Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
def bubble_sort(arr)
  (0...arr.length - 1).each do |i|
    swapped = false
    (0...arr.length - i - 1).each do |j|
      if arr[j] > arr[j + 1]
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
        swapped = true
      end
    end
    break unless swapped
  end
  arr
end

arr = [64, 34, 25, 12, 22, 11, 90]
p bubble_sort(arr)

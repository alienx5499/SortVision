# Selection Sort (in-place)
# Time: Best/Avg/Worst O(n^2), Space: O(1)
def selection_sort(arr)
  (0...arr.length - 1).each do |i|
    min_idx = i
    (i + 1...arr.length).each do |j|
      min_idx = j if arr[j] < arr[min_idx]
    end
    arr[i], arr[min_idx] = arr[min_idx], arr[i] if min_idx != i
  end
  arr
end

arr = [64, 25, 12, 22, 11]
p selection_sort(arr)

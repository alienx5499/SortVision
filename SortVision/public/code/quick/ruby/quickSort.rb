# Quick Sort
# Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
def quick_sort(arr)
  return arr if arr.length <= 1

  pivot = arr[-1]
  left = arr[0...-1].select { |x| x <= pivot }
  right = arr[0...-1].select { |x| x > pivot }

  quick_sort(left) + [pivot] + quick_sort(right)
end

arr = [64, 25, 12, 22, 11]
p quick_sort(arr)

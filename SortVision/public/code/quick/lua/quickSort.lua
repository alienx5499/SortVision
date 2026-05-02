-- Quick Sort (in-place, Lomuto partition)
-- Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
local function partition(arr, low, high)
  local pivot = arr[high]
  local i = low - 1

  for j = low, high - 1 do
    if arr[j] <= pivot then
      i = i + 1
      arr[i], arr[j] = arr[j], arr[i]
    end
  end

  arr[i + 1], arr[high] = arr[high], arr[i + 1]
  return i + 1
end

local function quickSort(arr, low, high)
  if low < high then
    local p = partition(arr, low, high)
    quickSort(arr, low, p - 1)
    quickSort(arr, p + 1, high)
  end
  return arr
end

local arr = {64, 25, 12, 22, 11}
quickSort(arr, 1, #arr)
print(table.concat(arr, ", "))

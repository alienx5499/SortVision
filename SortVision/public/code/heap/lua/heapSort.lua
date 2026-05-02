-- Heap Sort (in-place, max-heap)
-- Time: Best/Avg/Worst O(n log n), Space: O(1)
local function heapify(arr, n, i)
  local largest = i
  local left = 2 * i
  local right = 2 * i + 1

  if left <= n and arr[left] > arr[largest] then largest = left end
  if right <= n and arr[right] > arr[largest] then largest = right end

  if largest ~= i then
    arr[i], arr[largest] = arr[largest], arr[i]
    heapify(arr, n, largest)
  end
end

local function heapSort(arr)
  local n = #arr
  for i = math.floor(n / 2), 1, -1 do heapify(arr, n, i) end
  for i = n, 2, -1 do
    arr[1], arr[i] = arr[i], arr[1]
    heapify(arr, i - 1, 1)
  end
  return arr
end

local arr = {64, 25, 12, 22, 11}
print(table.concat(heapSort(arr), ", "))

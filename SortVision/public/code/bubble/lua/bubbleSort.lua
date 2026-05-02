-- Bubble Sort (in-place)
-- Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
local function bubbleSort(arr)
  for i = 1, #arr - 1 do
    local swapped = false
    for j = 1, #arr - i do
      if arr[j] > arr[j + 1] then
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
        swapped = true
      end
    end
    if not swapped then break end
  end
  return arr
end

local arr = {64, 34, 25, 12, 22, 11, 90}
print(table.concat(bubbleSort(arr), ", "))

-- Selection Sort (in-place)
-- Time: Best/Avg/Worst O(n^2), Space: O(1)
local function selectionSort(arr)
  for i = 1, #arr - 1 do
    local minIdx = i
    for j = i + 1, #arr do
      if arr[j] < arr[minIdx] then
        minIdx = j
      end
    end
    if minIdx ~= i then
      arr[i], arr[minIdx] = arr[minIdx], arr[i]
    end
  end
  return arr
end

local arr = {64, 25, 12, 22, 11}
print(table.concat(selectionSort(arr), ", "))

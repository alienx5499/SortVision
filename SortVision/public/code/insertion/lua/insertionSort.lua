-- Insertion Sort (in-place)
-- Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
local function insertionSort(arr)
  for i = 2, #arr do
    local key = arr[i]
    local j = i - 1

    while j >= 1 and arr[j] > key do
      arr[j + 1] = arr[j]
      j = j - 1
    end
    arr[j + 1] = key
  end
  return arr
end

local arr = {64, 25, 12, 22, 11}
print(table.concat(insertionSort(arr), ", "))

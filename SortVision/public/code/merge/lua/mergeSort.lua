-- Merge Sort
-- Time: Best/Avg/Worst O(n log n), Space: O(n)
local function merge(left, right)
  local result = {}
  local i, j = 1, 1

  while i <= #left and j <= #right do
    if left[i] <= right[j] then
      result[#result + 1] = left[i]
      i = i + 1
    else
      result[#result + 1] = right[j]
      j = j + 1
    end
  end

  while i <= #left do result[#result + 1] = left[i]; i = i + 1 end
  while j <= #right do result[#result + 1] = right[j]; j = j + 1 end
  return result
end

local function mergeSort(arr)
  if #arr <= 1 then return arr end

  local mid = math.floor(#arr / 2)
  local left, right = {}, {}
  for i = 1, mid do left[#left + 1] = arr[i] end
  for i = mid + 1, #arr do right[#right + 1] = arr[i] end

  return merge(mergeSort(left), mergeSort(right))
end

local arr = {64, 25, 12, 22, 11}
print(table.concat(mergeSort(arr), ", "))

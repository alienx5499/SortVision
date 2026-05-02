-- Radix Sort (LSD, base 10, non-negative integers)
-- Time: O(d * (n + k)), Space: O(n + k)
local function getMax(arr)
  local mx = arr[1]
  for i = 2, #arr do
    if arr[i] > mx then mx = arr[i] end
  end
  return mx
end

local function countingSortByExp(arr, exp)
  local output = {}
  local count = {}
  for i = 0, 9 do count[i] = 0 end

  for i = 1, #arr do
    local digit = math.floor(arr[i] / exp) % 10
    count[digit] = count[digit] + 1
  end
  for i = 1, 9 do count[i] = count[i] + count[i - 1] end

  for i = #arr, 1, -1 do
    local digit = math.floor(arr[i] / exp) % 10
    output[count[digit]] = arr[i]
    count[digit] = count[digit] - 1
  end

  for i = 1, #arr do arr[i] = output[i] end
end

local function radixSort(arr)
  if #arr <= 1 then return arr end

  local maxVal = getMax(arr)
  local exp = 1
  while math.floor(maxVal / exp) > 0 do
    countingSortByExp(arr, exp)
    exp = exp * 10
  end
  return arr
end

local arr = {170, 45, 75, 90, 802, 24, 2, 66}
print(table.concat(radixSort(arr), ", "))

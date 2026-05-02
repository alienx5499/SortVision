-- Bucket Sort (for numbers in [0, 1))
-- Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
local function bucketSort(arr)
  if #arr <= 1 then return arr end

  local n = #arr
  local buckets = {}
  for i = 1, n do buckets[i] = {} end

  for i = 1, n do
    local idx = math.floor(arr[i] * n) + 1
    if idx > n then idx = n end
    table.insert(buckets[idx], arr[i])
  end

  local k = 1
  for i = 1, n do
    table.sort(buckets[i])
    for _, x in ipairs(buckets[i]) do
      arr[k] = x
      k = k + 1
    end
  end
  return arr
end

local arr = {0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51}
print(table.concat(bucketSort(arr), ", "))

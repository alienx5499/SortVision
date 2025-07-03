--[[
  Selection Sort Implementation in Lua
  ------------------------------------
  This script implements the Selection Sort algorithm in Lua.

  Time Complexity:
    Best Case:    O(n^2)
    Average Case: O(n^2)
    Worst Case:   O(n^2)

  Space Complexity: O(1) - In-place sorting

  Author: SSOC Season 4 Contributor
--]]

-- Main selection sort function
function selectionSort(arr)
  -- Input validation
  if type(arr) ~= "table" then
    error("Input must be a table (array).")
  end

  local n = #arr
  for i = 1, n - 1 do
    local minIndex = i
    for j = i + 1, n do
      -- Use Lua's < operator; assumes elements are comparable
      if arr[j] < arr[minIndex] then
        minIndex = j
      end
    end
    -- Swap if new minimum is found
    if minIndex ~= i then
      arr[i], arr[minIndex] = arr[minIndex], arr[i]
    end
  end

  return arr
end

-- Utility function to print tables
local function printArray(arr)
  if type(arr) ~= "table" then
    print("Not a table")
    return
  end
  io.write("[ ")
  for i = 1, #arr do
    io.write(tostring(arr[i]) .. " ")
  end
  print("]")
end

-- Example Usage
print("🔹 Example Usage:")
local example = {64, 25, 12, 22, 11}
print("Original Array:")
printArray(example)
selectionSort(example)
print("Sorted Array:")
printArray(example)

-- Unit Tests
print("\n🧪 Running Test Cases...")

local function assertEqualTables(t1, t2)
  assert(#t1 == #t2, "Array lengths differ")
  for i = 1, #t1 do
    assert(t1[i] == t2[i], "Mismatch at index " .. i)
  end
end

-- Test Case 1: Already Sorted
local test1 = {1, 2, 3, 4, 5}
local expected1 = {1, 2, 3, 4, 5}
selectionSort(test1)
assertEqualTables(test1, expected1)

-- Test Case 2: Reverse Sorted
local test2 = {5, 4, 3, 2, 1}
local expected2 = {1, 2, 3, 4, 5}
selectionSort(test2)
assertEqualTables(test2, expected2)

-- Test Case 3: Mixed Data
local test3 = {3.5, 1.2, 4.8, 2.2}
local expected3 = {1.2, 2.2, 3.5, 4.8}
selectionSort(test3)
assertEqualTables(test3, expected3)

-- Test Case 4: Single Element
local test4 = {42}
local expected4 = {42}
selectionSort(test4)
assertEqualTables(test4, expected4)

-- Test Case 5: Empty Table
local test5 = {}
local expected5 = {}
selectionSort(test5)
assertEqualTables(test5, expected5)

print("✅ All tests passed.")

--[[
  bucketSort.lua

  Implementation of the Bucket Sort algorithm in Lua.

  This file includes:
    - insertionSort: Helper function to sort individual buckets.
    - bucketSort: Main function to sort numbers using bucket sort.
    - Input validation and edge-case handling.
    - Comprehensive comments.
    - Time and space complexity analysis.
    - Example usage.
    - Test cases.
    - Performance optimization notes.
]]

--[[
  Sorts a table using Insertion Sort.
  Used to sort individual buckets.

  @param bucket (table): The bucket to sort.
]]
function insertionSort(bucket)
    for i = 2, #bucket do
        local key = bucket[i]
        local j = i - 1
        while j > 0 and bucket[j] > key do
            bucket[j + 1] = bucket[j]
            j = j - 1
        end
        bucket[j + 1] = key
    end
end

--[[
  Sorts a table of numbers using the Bucket Sort algorithm.

  @param arr (table): The table to sort.
  @param bucketSize (number, optional): The size of each bucket. Defaults to 5.
  @return (table): The sorted table.
]]
function bucketSort(arr, bucketSize)
    -- Input validation
    if type(arr) ~= "table" then
        error("Input must be a table")
    end

    bucketSize = bucketSize or 5
    if type(bucketSize) ~= "number" or bucketSize <= 0 then
        error("bucketSize must be a positive number")
    end

    -- Handle trivial cases
    local n = #arr
    if n == 0 then
        return {}
    end
    if n == 1 then
        if type(arr[1]) ~= "number" then
            error("All elements must be numbers")
        end
        return {arr[1]}
    end

    -- Find min and max values
    local minValue = arr[1]
    local maxValue = arr[1]
    for i = 2, n do
        if type(arr[i]) ~= "number" then
            error("All elements must be numbers")
        end
        if arr[i] < minValue then
            minValue = arr[i]
        end
        if arr[i] > maxValue then
            maxValue = arr[i]
        end
    end

    -- Create buckets
    local bucketCount = math.floor((maxValue - minValue) / bucketSize) + 1
    local buckets = {}
    for i = 1, bucketCount do
        buckets[i] = {}
    end

    -- Distribute input values into buckets
    for i = 1, n do
        local idx = math.floor((arr[i] - minValue) / bucketSize) + 1
        table.insert(buckets[idx], arr[i])
    end

    -- Sort buckets and concatenate
    local sortedArray = {}
    for i = 1, bucketCount do
        if #buckets[i] > 0 then
            insertionSort(buckets[i])
            for j = 1, #buckets[i] do
                table.insert(sortedArray, buckets[i][j])
            end
        end
    end

    return sortedArray
end

--[[
  Time Complexity:
    - Best/Average: O(n + k), where n is the number of elements and k is the number of buckets.
    - Worst: O(n^2) when all elements fall into one bucket.

  Space Complexity:
    - O(n + k)
]]

-- Example Usage
local example = {29, 25, 3, 49, 9, 37, 21, 43}
print("Original: " .. table.concat(example, ", "))
local sortedExample = bucketSort(example)
print("Sorted:   " .. table.concat(sortedExample, ", "))

-- Test Cases
local function runTests()
    local cases = {
        { input = {}, expected = {} },
        { input = {1}, expected = {1} },
        { input = {2, 1}, expected = {1, 2} },
        { input = {5, 3, 8, 4, 2}, expected = {2, 3, 4, 5, 8} },
        { input = {10, 7, 8, 9, 1, 5}, expected = {1, 5, 7, 8, 9, 10} },
        { input = {3, 3, 3}, expected = {3, 3, 3} },
        { input = {0, -1, 5, -10, 8}, expected = {-10, -1, 0, 5, 8} },
    }

    for i, testCase in ipairs(cases) do
        local result = bucketSort(testCase.input)
        local pass = table.concat(result, ",") == table.concat(testCase.expected, ",")
        if not pass then
            print("Test " .. i .. " failed: expected {" .. table.concat(testCase.expected, ", ") .. "}, got {" .. table.concat(result, ", ") .. "}")
        else
            print("Test " .. i .. " passed")
        end
    end
end

runTests()


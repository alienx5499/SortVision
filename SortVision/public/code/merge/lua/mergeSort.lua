-- Merge Sort implementation in Lua
-- Time Complexity: O(n log n)
-- Space Complexity: O(n)

function mergeSort(arr)
    if #arr <= 1 then
        return arr
    end

    local mid = math.floor(#arr / 2)
    local left = {}
    local right = {}

    -- Split array into left and right halves
    for i = 1, mid do
        left[i] = arr[i]
    end
    for i = mid + 1, #arr do
        right[i - mid] = arr[i]
    end

    -- Recursively sort left and right halves
    left = mergeSort(left)
    right = mergeSort(right)

    -- Merge the sorted halves
    return merge(left, right)
end

function merge(left, right)
    local result = {}
    local i, j, k = 1, 1, 1

    -- Compare and merge elements
    while i <= #left and j <= #right do
        if left[i] <= right[j] then
            result[k] = left[i]
            i = i + 1
        else
            result[k] = right[j]
            j = j + 1
        end
        k = k + 1
    end

    -- Add remaining elements from left array
    while i <= #left do
        result[k] = left[i]
        i = i + 1
        k = k + 1
    end

    -- Add remaining elements from right array
    while j <= #right do
        result[k] = right[j]
        j = j + 1
        k = k + 1
    end

    return result
end

-- Example usage
local arr = {64, 34, 25, 12, 22, 11, 90}
print("Original array:")
for i, v in ipairs(arr) do
    print(v)
end

local sorted = mergeSort(arr)
print("\nSorted array:")
for i, v in ipairs(sorted) do
    print(v)
end

-- Function to perform Merge Sort on a list (Lua table)
function merge_sort(list)
    local n = #list -- In C++, you'd get the size of a std::vector or array.
                    -- In Lua, '#' gets the length of a table.

    -- Base case: If the list has 0 or 1 element, it's already sorted.
    -- This is crucial for stopping the recursion, just like in C++.
    if n <= 1 then
        return list
    end

    -- Find the middle point of the list.
    -- Similar to integer division in C++ (e.g., int mid = n / 2;).
    local mid = math.floor(n / 2)

    -- Create two empty lists (Lua tables) to hold the left and right halves.
    -- In C++, you might use std::vector<int> left, right;
    local left = {}
    local right = {}

    -- Divide the list into two halves.
    -- This loop populates the left half.
    -- In C++, you'd iterate from 0 to mid-1. Lua uses 1-based indexing by default.
    for i = 1, mid do
        left[i] = list[i]
    end
    -- This loop populates the right half.
    -- In C++, you'd iterate from mid to n-1.
    for i = mid + 1, n do
        right[i - mid] = list[i] -- Adjust index for the right list to start from 1
    end

    -- Recursively sort the two halves.
    -- This is the "divide and conquer" step, identical in concept to C++.
    left = merge_sort(left)
    right = merge_sort(right)

    -- Merge the sorted halves back together.
    -- This is where the core "merge" operation happens.
    return merge(left, right)
end

-- Function to merge two already sorted lists (Lua tables) into a single sorted list.
function merge(left, right)
    local result = {} -- Initialize an empty list to store the merged result.
                      -- Similar to std::vector<int> result; in C++.

    local i = 1       -- Pointer for the left list (current index).
    local j = 1       -- Pointer for the right list (current index).
    local k = 1       -- Pointer for the result list (current index).
                      -- In C++, these would be integer variables.

    -- Compare elements from both lists and add the smaller one to the result.
    -- This loop is the heart of the merge operation, identical logic in C++.
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

    -- Add any remaining elements from the left list (if any).
    -- This handles cases where one list is longer than the other.
    while i <= #left do
        result[k] = left[i]
        i = i + 1
        k = k + 1
    end

    -- Add any remaining elements from the right list (if any).
    while j <= #right do
        result[k] = right[j]
        j = j + 1
        k = k + 1
    end

    return result -- Return the merged and sorted list.
end

-- --- Example Usage ---

-- Helper function to print a Lua table (list) for cleaner output.
-- This is just for display, similar to a custom print function in C++.
function print_list(label, list)
    io.write(label .. ": {")
    for i, v in ipairs(list) do -- ipairs iterates over array-like parts of a table
        io.write(v)
        if i < #list then
            io.write(", ")
        end
    end
    print("}")
end

local unsorted_list = {8, 3, 1, 7, 0, 10, 2}
print_list("Original Unsorted List", unsorted_list)

-- Call the merge_sort function to sort the list.
local sorted_list = merge_sort(unsorted_list)

print_list("Sorted List", sorted_list)
--[[
    Bubble Sort Implementation in Lua

    Time Complexity:
        Best Case:    O(n)       → When the array is already sorted
        Average Case: O(n^2)
        Worst Case:   O(n^2)     → When the array is reverse sorted

    Space Complexity:
        O(1) – Sorting is done in-place without extra memory

    This implementation includes an optimization:
    - If no elements were swapped in a pass, it stops early (array is already sorted).
]]

-- 🧠 Optimized Bubble Sort Function
function bubbleSort(arr)
    local n = #arr
    for i = 1, n - 1 do
        local swapped = false

        -- Traverse unsorted part of the array
        for j = 1, n - i do
            if arr[j] > arr[j + 1] then
                -- Swap adjacent elements if they are in the wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = true
            end
        end

        -- If no swaps happened, the array is already sorted
        if not swapped then
            break
        end
    end
end

-- 📦 Utility: Print Array
function printArray(arr)
    for _, v in ipairs(arr) do
        io.write(v .. " ")
    end
    print()
end

-- 🧪 Utility: Test Bubble Sort with Expected Output
function testBubbleSort(testName, input, expected)
    bubbleSort(input)

    -- Check correctness
    local passed = true
    if #input ~= #expected then
        passed = false
    else
        for i = 1, #input do
            if input[i] ~= expected[i] then
                passed = false
                break
            end
        end
    end

    -- Print result
    print(testName .. ":")
    print("Output:   "); printArray(input)
    print("Expected: "); printArray(expected)
    print(passed and "✅ Test Passed\n" or "❌ Test Failed\n")
end

-- =====================
-- 🧪 Run All Test Cases
-- =====================

-- Test Case 1: Random array
testBubbleSort("Test 1 - Random", {64, 34, 25, 12, 22, 11, 90}, {11, 12, 22, 25, 34, 64, 90})

-- Test Case 2: Already sorted
testBubbleSort("Test 2 - Already Sorted", {1, 2, 3, 4, 5}, {1, 2, 3, 4, 5})

-- Test Case 3: Reverse sorted
testBubbleSort("Test 3 - Reverse Sorted", {5, 4, 3, 2, 1}, {1, 2, 3, 4, 5})

-- Test Case 4: All elements equal
testBubbleSort("Test 4 - All Equal", {7, 7, 7, 7}, {7, 7, 7, 7})

-- Test Case 5: Single element
testBubbleSort("Test 5 - One Element", {42}, {42})

-- Test Case 6: Empty array
testBubbleSort("Test 6 - Empty", {}, {})

-- Heap Sort Implementation in Lua

-- Time Complexity: O(n log n) for average and worst case
-- Space Complexity: O(1) for in-place sorting (if not considering recursion stack), O(log n) for recursion stack

--[[
    Heapify function to maintain the max-heap property.
    A max-heap is a complete binary tree in which the value of each internal node is greater than or equal to the values of its children.
    - arr: The array representing the heap.
    - n: The size of the heap.
    - i: The index of the root of the subtree to heapify (1-based index).
--]]
function heapify(arr, n, i)
    local largest = i -- Initialize largest as root (1-based index)
    local left = 2 * i -- Left child
    local right = 2 * i + 1 -- Right child

    -- Check if left child exists and is greater than root
    if left <= n and arr[left] > arr[largest] then
        largest = left
    end

    -- Check if right child exists and is greater than largest so far
    if right <= n and arr[right] > arr[largest] then
        largest = right
    end

    -- If largest is not root, then swap and heapify the affected sub-tree
    if largest ~= i then
        arr[i], arr[largest] = arr[largest], arr[i] -- Swap
        heapify(arr, n, largest) -- Recursively heapify the affected sub-tree
    end
end

--[[
    Build a max-heap from an unsorted array.
    This function iterates from the last non-leaf node up to the root and applies heapify to each node.
    - arr: The array to be transformed into a max-heap.
    - n: The size of the array.
--]]
function buildMaxHeap(arr, n)
    -- The last non-leaf node is at index n/2 (integer division)
    -- We start from the last non-leaf node and go up to the root (index 1)
    for i = math.floor(n / 2), 1, -1 do
        heapify(arr, n, i)
    end
end

--[[
    Main heap sort function.
    It first builds a max-heap from the input array.
    Then, it repeatedly extracts the maximum element (root of the heap) and moves it to the end of the array.
    After each extraction, it calls heapify on the reduced heap.
    - arr: The array to be sorted.
--]]
function heapSort(arr)
    if arr == nil or #arr == 0 then
        return -- Handle empty or nil array
    end

    local n = #arr

    -- Build a max-heap from the input array
    buildMaxHeap(arr, n)

    -- One by one extract elements from heap
    -- The loop runs from n down to 2 because the last element will be in place
    for i = n, 2, -1 do
        -- Move current root (maximum element) to the end
        arr[1], arr[i] = arr[i], arr[1]

        -- Call heapify on the reduced heap (size i-1, root is 1)
        heapify(arr, i - 1, 1)
    end
end

-- Helper function to print an array (for testing and example usage)
function printArray(arr)
    if arr == nil or #arr == 0 then
        print("[]")
        return
    end
    local elements = {}
    for i = 1, #arr do
        table.insert(elements, tostring(arr[i]))
    end
    print("[" .. table.concat(elements, ", ") .. "]")
end

-- Example Usage
function runExamples()
    print("--- Heap Sort Examples ---")

    local arr1 = {12, 11, 13, 5, 6, 7}
    print("Original array 1:")
    printArray(arr1)
    heapSort(arr1)
    print("Sorted array 1:")
    printArray(arr1) -- Expected: [5, 6, 7, 11, 12, 13]
    print("")

    local arr2 = {1, 2, 3, 4, 5}
    print("Original array 2 (already sorted):")
    printArray(arr2)
    heapSort(arr2)
    print("Sorted array 2:")
    printArray(arr2) -- Expected: [1, 2, 3, 4, 5]
    print("")

    local arr3 = {5, 4, 3, 2, 1}
    print("Original array 3 (reverse sorted):")
    printArray(arr3)
    heapSort(arr3)
    print("Sorted array 3:")
    printArray(arr3) -- Expected: [1, 2, 3, 4, 5]
    print("")

    local arr4 = {3, 0, 2, -1, 4, 10, 5}
    print("Original array 4 (with negative numbers):")
    printArray(arr4)
    heapSort(arr4)
    print("Sorted array 4:")
    printArray(arr4) -- Expected: [-1, 0, 2, 3, 4, 5, 10]
    print("")
end

-- Test Cases
function runTests()
    print("--- Running Heap Sort Tests ---")
    local testsPassed = 0
    local totalTests = 0

    local function assertEqual(arr1, arr2, testName)
        totalTests = totalTests + 1
        local pass = true
        if #arr1 ~= #arr2 then
            pass = false
        else
            for i = 1, #arr1 do
                if arr1[i] ~= arr2[i] then
                    pass = false
                    break
                end
            end
        end

        if pass then
            testsPassed = testsPassed + 1
            print(testName .. ": PASSED")
        else
            print(testName .. ": FAILED")
            print("Expected: ")
            printArray(arr2)
            print("Got: ")
            printArray(arr1)
        end
    end

    -- Test Case 1: Empty array
    local tc1_arr = {}
    heapSort(tc1_arr)
    assertEqual(tc1_arr, {}, "Test Case 1: Empty Array")

    -- Test Case 2: Single element array
    local tc2_arr = {1}
    heapSort(tc2_arr)
    assertEqual(tc2_arr, {1}, "Test Case 2: Single Element Array")

    -- Test Case 3: Array with two elements (sorted)
    local tc3_arr = {1, 2}
    heapSort(tc3_arr)
    assertEqual(tc3_arr, {1, 2}, "Test Case 3: Two Elements (Sorted)")

    -- Test Case 4: Array with two elements (unsorted)
    local tc4_arr = {2, 1}
    heapSort(tc4_arr)
    assertEqual(tc4_arr, {1, 2}, "Test Case 4: Two Elements (Unsorted)")

    -- Test Case 5: General case
    local tc5_arr = {12, 11, 13, 5, 6, 7}
    heapSort(tc5_arr)
    assertEqual(tc5_arr, {5, 6, 7, 11, 12, 13}, "Test Case 5: General Case")

    -- Test Case 6: Already sorted array
    local tc6_arr = {1, 2, 3, 4, 5, 6}
    heapSort(tc6_arr)
    assertEqual(tc6_arr, {1, 2, 3, 4, 5, 6}, "Test Case 6: Already Sorted")

    -- Test Case 7: Reverse sorted array
    local tc7_arr = {6, 5, 4, 3, 2, 1}
    heapSort(tc7_arr)
    assertEqual(tc7_arr, {1, 2, 3, 4, 5, 6}, "Test Case 7: Reverse Sorted")

    -- Test Case 8: Array with duplicate elements
    local tc8_arr = {5, 3, 8, 3, 2, 8, 5}
    heapSort(tc8_arr)
    assertEqual(tc8_arr, {2, 3, 3, 5, 5, 8, 8}, "Test Case 8: Duplicate Elements")

    -- Test Case 9: Array with negative numbers
    local tc9_arr = {3, -1, 0, 5, -2, 2}
    heapSort(tc9_arr)
    assertEqual(tc9_arr, {-2, -1, 0, 2, 3, 5}, "Test Case 9: Negative Numbers")

    -- Test Case 10: Larger array
    local tc10_arr = {9, 1, 8, 2, 7, 3, 6, 4, 5, 0}
    heapSort(tc10_arr)
    assertEqual(tc10_arr, {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}, "Test Case 10: Larger Array")

    print("\n--- Test Summary ---")
    print("Total tests: " .. totalTests)
    print("Tests passed: " .. testsPassed)
    print("Tests failed: " .. (totalTests - testsPassed))
    if totalTests == testsPassed then
        print("All tests passed successfully!")
    else
        print("Some tests failed.")
    end
end

-- To run examples and tests:
-- runExamples()
-- runTests()

-- Note: To use this file, you would typically require it in another Lua script
-- and then call the heapSort function. For standalone execution to see test
-- results, you can uncomment the runExamples() and runTests() calls and run
-- `lua heapSort.lua` from your terminal.

return {
    heapSort = heapSort,
    -- Exposing heapify and buildMaxHeap can be useful for other heap operations or educational purposes
    heapify = heapify,
    buildMaxHeap = buildMaxHeap
}

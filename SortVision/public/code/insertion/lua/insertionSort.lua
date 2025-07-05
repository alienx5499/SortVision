-- Main insertion sort function
function insertionSort(arr)
    -- Get the length of the array
    local n = #arr
    -- Traverse from the second element to the last
    for i = 2, n do
        -- Store the current value to be positioned
        local key = arr[i]
        -- Initialize j to the previous index
        local j = i - 1
        -- Move elements of arr[1..i-1], that are greater than key, to one position ahead
        while j > 0 and arr[j] > key do
            arr[j + 1] = arr[j] -- Shift element right
            j = j - 1
        end
        -- Place the key after the element just smaller than it
        arr[j + 1] = key
    end
    -- Return the sorted array (optional, for convenience)
    return arr
end
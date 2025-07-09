"""
Selection Sort Algorithm in Julia

Selection sort is a simple comparison-based sorting algorithm. It divides the input list into two parts: the sublist of items already sorted, which is built up from left to right at the front (left) of the list, and the sublist of items remaining to be sorted that occupy the rest of the list. The algorithm repeatedly selects the smallest (or largest, depending on sorting order) element from the unsorted sublist, swapping it with the leftmost unsorted element, and moving the sublist boundaries one element to the right.

Time Complexity: O(n^2)
Space Complexity: O(1) (in-place)
Stable: No
"""

"""
Main selection sort function
Sorts the input array in-place in ascending order.

# Arguments
- `arr::Vector{T}`: The array to be sorted (in-place)

# Example
julia> arr = [64, 25, 12, 22, 11]
julia> selection_sort!(arr)
julia> arr
[11, 12, 22, 25, 64]
"""
function selection_sort!(arr::Vector{T}) where T
    n = length(arr)
    for i in 1:n-1
        # Assume the minimum is the first unsorted element
        min_idx = i
        for j in i+1:n
            if arr[j] < arr[min_idx]
                min_idx = j
            end
        end
        # Swap the found minimum element with the first unsorted element
        if min_idx != i
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
        end
    end
    return arr
end

# -------------------
# Test Case
# -------------------
if abspath(PROGRAM_FILE) == @__FILE__
    function test_selection_sort!()
        arr = [64, 25, 12, 22, 11]
        expected = [11, 12, 22, 25, 64]
        selection_sort!(arr)
        @assert arr == expected "Test failed: selection_sort! did not sort correctly."
        println("Test passed: selection_sort! sorts correctly.")
    end
    test_selection_sort!()
end

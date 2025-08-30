# ===========================================
# 📘 Bubble Sort Implementation in Julia
# -------------------------------------------
# Sorts an array in ascending order using the
# bubble sort algorithm with early termination.
#
# Time Complexity:
#   Worst/Average: O(n^2)
#   Best (sorted): O(n)
#
# Space Complexity: O(1) – In-place
#
# Author: SSOC Contributor
# ===========================================

"""
    bubble_sort!(arr::Vector{T}) where T

Sorts the given array `arr` in ascending order using the Bubble Sort algorithm.

The function performs in-place sorting and uses early termination to improve
performance on already sorted or partially sorted arrays.

# Arguments
- `arr::Vector{T}`: A mutable vector of elements of any ordered type `T`.

# Returns
- Nothing (modifies the array in-place).

# Example
```julia
arr = [5, 1, 4, 2, 8]
bubble_sort!(arr)
println(arr)  # [1, 2, 4, 5, 8]
```
"""
function bubble_sort!(arr::Vector{T}) where T
    n = length(arr)
    if n <= 1
        return  # Already sorted
    end

    for i in 1:n-1
        swapped = false

        # Last i elements are already in place
        for j in 1:(n - i)
            if arr[j] > arr[j + 1]
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = true
            end
        end

        # If no two elements were swapped in inner loop, array is sorted
        if !swapped
            break
        end
    end
end

# ===========================================
# 🧪 Example Usage and Test Cases
# ===========================================

function print_array(arr::Vector)
    println("[", join(arr, ", "), "]")
end

println("🔹 Example Usage:")
arr = [64, 34, 25, 12, 22, 11, 90]
println("Original array:")
print_array(arr)

bubble_sort!(arr)
println("Sorted array:")
print_array(arr)

println("\n🧪 Running Test Cases...")

function test_bubble_sort(input, expected)
    local_copy = copy(input)
    bubble_sort!(local_copy)
    @assert local_copy == expected "Failed for input: $input"
end

# Test 1: Normal case
test_bubble_sort([5, 1, 4, 2, 8], [1, 2, 4, 5, 8])

# Test 2: Already sorted
test_bubble_sort([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])

# Test 3: Reverse sorted
test_bubble_sort([9, 7, 5, 3, 1], [1, 3, 5, 7, 9])

# Test 4: Duplicates
test_bubble_sort([2, 3, 2, 1, 3], [1, 2, 2, 3, 3])

# Test 5: Single element
test_bubble_sort([42], [42])

# Test 6: Empty array
test_bubble_sort([], [])

println("✅ All tests passed.")

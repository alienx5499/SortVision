# ==============================================
# 📘 Quick Sort Implementation in Julia
# ----------------------------------------------
# Implements quick sort with customizable pivot strategy.
#
# Time Complexity:
#   Best/Average: O(n log n)
#   Worst:        O(n^2) (rare, mitigated by pivot strategy)
#
# Space Complexity: O(log n) due to recursion stack
#
# Author: SSOC Season 4 Contributor
# ==============================================

"""
    partition!(arr::Vector{T}, low::Int, high::Int; strategy="last") -> Int

Partition the array `arr` around a pivot chosen using the given `strategy`.

Returns the final position of the pivot after partitioning.

Available strategies:
- `"first"`: Use the first element
- `"last"`: Use the last element
- `"random"`: Use a random element
- `"median3"`: Use median-of-three (first, mid, last)
"""
function partition!(arr::Vector{T}, low::Int, high::Int; strategy="last")::Int where T
    if strategy == "random"
        rand_index = rand(low:high)
        arr[rand_index], arr[high] = arr[high], arr[rand_index]
    elseif strategy == "first"
        arr[low], arr[high] = arr[high], arr[low]
    elseif strategy == "median3"
        mid = div(low + high, 2)
        candidates = [(arr[low], low), (arr[mid], mid), (arr[high], high)]
        sorted = sort(candidates, by = x -> x[1])
        median_index = sorted[2][2]
        arr[median_index], arr[high] = arr[high], arr[median_index]
    end

    pivot = arr[high]
    i = low - 1

    for j in low:high-1
        if arr[j] <= pivot
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
        end
    end

    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1
end

"""
    quick_sort!(arr::Vector{T}, low::Int, high::Int; strategy="last") -> Nothing

Recursive helper to perform in-place quick sort on the array
using a pivot strategy.
"""
function quick_sort!(arr::Vector{T}, low::Int, high::Int; strategy="last") where T
    if low < high
        p = partition!(arr, low, high; strategy=strategy)
        quick_sort!(arr, low, p - 1; strategy=strategy)
        quick_sort!(arr, p + 1, high; strategy=strategy)
    end
end

"""
    quick_sort!(arr::Vector{T}; strategy="last") -> Nothing

Wrapper function to sort the full array using quick sort.
Allows specifying a pivot strategy.
"""
function quick_sort!(arr::Vector{T}; strategy="last") where T
    if length(arr) <= 1
        return
    end
    quick_sort!(arr, 1, length(arr); strategy=strategy)
end

# ==============================================
# 🧪 Test Cases & Example Usage
# ==============================================

function print_array(arr::Vector)
    println("[", join(arr, ", "), "]")
end

println("🔹 Example Usage:")
arr = [10, 7, 8, 9, 1, 5]
println("Original array:")
print_array(arr)

quick_sort!(arr, strategy="median3")
println("Sorted array (median-of-three pivot):")
print_array(arr)

println("\n🧪 Running Test Cases...")

function test_quick_sort(input, expected; strategy="last")
    copy_input = copy(input)
    quick_sort!(copy_input; strategy=strategy)
    @assert copy_input == expected "Test failed for input: $input with strategy: $strategy"
end

# Test 1: Normal case
test_quick_sort([3, 1, 4, 1, 5, 9], [1, 1, 3, 4, 5, 9])

# Test 2: Empty array
test_quick_sort([], [])

# Test 3: Single element
test_quick_sort([42], [42])

# Test 4: Already sorted
test_quick_sort([1, 2, 3, 4], [1, 2, 3, 4])

# Test 5: Reverse sorted
test_quick_sort([5, 4, 3, 2, 1], [1, 2, 3, 4, 5])

# Test 6: Random pivot
test_quick_sort([7, 3, 2, 6, 5], [2, 3, 5, 6, 7]; strategy="random")

# Test 7: Median-of-three pivot
test_quick_sort([9, 3, 7, 1, 5], [1, 3, 5, 7, 9]; strategy="median3")

println("✅ All tests passed.")

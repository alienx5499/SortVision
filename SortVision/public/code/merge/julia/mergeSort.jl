"""
    merge!(arr::Vector{T}, left::Int, mid::Int, right::Int) where T

Merges two sorted subarrays of `arr` in-place.
The first subarray is from `left` to `mid`, and the second is from `mid+1` to `right`.

# Time Complexity
- O(n) where n = right - left + 1

# Space Complexity
- O(n) auxiliary space for temporary arrays

# Stability
- Stable sort: maintains relative order of equal elements
"""
function merge!(arr::Vector{T}, left::Int, mid::Int, right::Int) where T
    n1 = mid - left + 1
    n2 = right - mid

    # Create temporary arrays
    left_arr = similar(arr, n1)
    right_arr = similar(arr, n2)

    for i in 1:n1
        left_arr[i] = arr[left + i - 1]
    end

    for j in 1:n2
        right_arr[j] = arr[mid + j]
    end

    i = 1
    j = 1
    k = left

    while i <= n1 && j <= n2
        if left_arr[i] <= right_arr[j]
            arr[k] = left_arr[i]
            i += 1
        else
            arr[k] = right_arr[j]
            j += 1
        end
        k += 1
    end

    while i <= n1
        arr[k] = left_arr[i]
        i += 1
        k += 1
    end

    while j <= n2
        arr[k] = right_arr[j]
        j += 1
        k += 1
    end
end

"""
    merge_sort!(arr::Vector{T}, left::Int, right::Int) where T

Sorts the array `arr` from index `left` to `right` using merge sort algorithm.

# Time Complexity
- Best, Average, Worst: O(n log n)

# Space Complexity
- O(n)

# Stability
- Stable sort
"""
function merge_sort!(arr::Vector{T}, left::Int, right::Int) where T
    if left < right
        mid = left + (right - left) ÷ 2
        merge_sort!(arr, left, mid)
        merge_sort!(arr, mid + 1, right)
        merge!(arr, left, mid, right)
    end
end

"""
    merge_sort!(arr::Vector{T}) where T

Wrapper function that sorts the entire array `arr` in-place using merge sort.
"""
function merge_sort!(arr::Vector{T}) where T
    merge_sort!(arr, 1, length(arr))
end

# ----------------------------
# Example Usage and Test Cases
# ----------------------------

function test_merge_sort()
    arr1 = [5, 2, 4, 6, 1, 3]
    merge_sort!(arr1)
    @assert arr1 == sort([5, 2, 4, 6, 1, 3])

    arr2 = [1]
    merge_sort!(arr2)
    @assert arr2 == [1]

    arr3 = Int[]
    merge_sort!(arr3)
    @assert arr3 == []

    arr4 = [1, 2, 3, 4, 5]
    merge_sort!(arr4)
    @assert arr4 == [1, 2, 3, 4, 5]

    arr5 = [3, 3, 2, 1, 3]
    merge_sort!(arr5)
    @assert arr5 == [1, 2, 3, 3, 3]

    println("✅ All test cases passed.")
end

# Run tests
test_merge_sort()

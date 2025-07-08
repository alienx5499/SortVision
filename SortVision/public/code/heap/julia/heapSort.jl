"""
Heap Sort Algorithm in Julia
---------------------------
Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It works by first building a max heap from the input array, then repeatedly extracting the maximum element from the heap and placing it at the end of the array. This process continues until the array is sorted.

Time Complexity: O(n log n)
Space Complexity: O(1) (in-place)
Stable: No
"""

"""
Heapify function to maintain heap property
"""
function heapify!(arr::Vector{T}, n::Int, i::Int) where T
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n && arr[left] > arr[largest]
        largest = left
    end
    if right < n && arr[right] > arr[largest]
        largest = right
    end
    if largest != i
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify!(arr, n, largest)
    end
end

"""
Build max heap from array
"""
function build_max_heap!(arr::Vector{T}) where T
    n = length(arr)
    for i in div(n, 2)-1:-1:0
        heapify!(arr, n, i)
    end
end

"""
Main heap sort function
"""
function heap_sort!(arr::Vector{T}) where T
    n = length(arr)
    build_max_heap!(arr)
    for i in n-1:-1:1
        arr[1], arr[i+1] = arr[i+1], arr[1]  # swap first and last
        heapify!(arr, i, 0)
    end
end

# -------------------
# Test Cases
# -------------------

function test_heap_sort()
    arr1 = [4, 10, 3, 5, 1]
    heap_sort!(arr1)
    @assert arr1 == sort([4, 10, 3, 5, 1])

    arr2 = [1, 2, 3, 4, 5]
    heap_sort!(arr2)
    @assert arr2 == [1, 2, 3, 4, 5]

    arr3 = [5, 4, 3, 2, 1]
    heap_sort!(arr3)
    @assert arr3 == [1, 2, 3, 4, 5]

    arr4 = [7]
    heap_sort!(arr4)
    @assert arr4 == [7]

    arr5 = Int[]
    heap_sort!(arr5)
    @assert arr5 == Int[]

    println("All test cases passed!")
end

test_heap_sort()

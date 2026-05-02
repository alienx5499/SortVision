# Heap Sort (in-place, max-heap)
# Time: Best/Avg/Worst O(n log n), Space: O(1)
function heap_sort!(arr::Vector{Int})
    n = length(arr)

    for i in div(n, 2):-1:1
        heapify!(arr, n, i)
    end

    for i in n:-1:2
        arr[1], arr[i] = arr[i], arr[1]
        heapify!(arr, i - 1, 1)
    end
    return arr
end

function heapify!(arr::Vector{Int}, n::Int, i::Int)
    largest = i
    left = 2 * i
    right = 2 * i + 1

    if left <= n && arr[left] > arr[largest]
        largest = left
    end
    if right <= n && arr[right] > arr[largest]
        largest = right
    end

    if largest != i
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify!(arr, n, largest)
    end
end

arr = [64, 25, 12, 22, 11]
println(heap_sort!(arr))

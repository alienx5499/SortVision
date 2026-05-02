# Quick Sort
# Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
function quick_sort!(arr::Vector{Int}, low::Int=1, high::Int=length(arr))
    if low < high
        p = partition!(arr, low, high)
        quick_sort!(arr, low, p - 1)
        quick_sort!(arr, p + 1, high)
    end
    return arr
end

function partition!(arr::Vector{Int}, low::Int, high::Int)
    pivot = arr[high]
    i = low - 1

    for j in low:high-1
        if arr[j] <= pivot
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
        end
    end

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
end

arr = [64, 25, 12, 22, 11]
println(quick_sort!(arr))

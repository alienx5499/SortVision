# Bubble Sort (in-place)
# Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
function bubble_sort!(arr::Vector{Int})
    n = length(arr)
    for i in 1:n-1
        swapped = false
        for j in 1:(n - i)
            if arr[j] > arr[j + 1]
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = true
            end
        end
        if !swapped
            break
        end
    end
    return arr
end

arr = [64, 34, 25, 12, 22, 11, 90]
println(bubble_sort!(arr))

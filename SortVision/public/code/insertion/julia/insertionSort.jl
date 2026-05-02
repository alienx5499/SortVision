# Insertion Sort (in-place)
# Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
function insertion_sort!(arr::Vector{Int})
    for i in 2:length(arr)
        key = arr[i]
        j = i - 1
        while j >= 1 && arr[j] > key
            arr[j + 1] = arr[j]
            j -= 1
        end
        arr[j + 1] = key
    end
    return arr
end

arr = [64, 25, 12, 22, 11]
println(insertion_sort!(arr))

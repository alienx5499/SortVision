# Merge Sort
# Time: Best/Avg/Worst O(n log n), Space: O(n)
function merge_sort(arr::Vector{Int})
    if length(arr) <= 1
        return arr
    end

    mid = length(arr) ÷ 2
    left = merge_sort(arr[1:mid])
    right = merge_sort(arr[mid+1:end])
    return merge(left, right)
end

function merge(left::Vector{Int}, right::Vector{Int})
    result = Int[]
    i, j = 1, 1

    while i <= length(left) && j <= length(right)
        if left[i] <= right[j]
            push!(result, left[i]); i += 1
        else
            push!(result, right[j]); j += 1
        end
    end

    while i <= length(left)
        push!(result, left[i]); i += 1
    end
    while j <= length(right)
        push!(result, right[j]); j += 1
    end

    return result
end

arr = [64, 25, 12, 22, 11]
println(merge_sort(arr))

# Bucket Sort (for floats in [0, 1))
# Time: Avg O(n + k), Worst O(n^2), Space: O(n + k)
function bucket_sort!(arr::Vector{Float64})
    n = length(arr)
    if n <= 1
        return arr
    end

    buckets = [Float64[] for _ in 1:n]

    for x in arr
        idx = min(n, floor(Int, x * n) + 1)
        push!(buckets[idx], x)
    end

    k = 1
    for b in buckets
        sort!(b)
        for x in b
            arr[k] = x
            k += 1
        end
    end
    return arr
end

arr = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]
println(bucket_sort!(arr))

# Radix Sort (LSD, base 10, non-negative integers)
# Time: O(d * (n + k)), Space: O(n + k)
function radix_sort!(arr::Vector{Int})
    if length(arr) <= 1
        return arr
    end

    max_val = maximum(arr)
    exp = 1
    while div(max_val, exp) > 0
        counting_sort_by_exp!(arr, exp)
        exp *= 10
    end
    return arr
end

function counting_sort_by_exp!(arr::Vector{Int}, exp::Int)
    output = similar(arr)
    count = fill(0, 10)

    for x in arr
        count[(div(x, exp) % 10) + 1] += 1
    end
    for i in 2:10
        count[i] += count[i - 1]
    end

    for i in length(arr):-1:1
        digit = (div(arr[i], exp) % 10) + 1
        output[count[digit]] = arr[i]
        count[digit] -= 1
    end

    arr .= output
end

arr = [170, 45, 75, 90, 802, 24, 2, 66]
println(radix_sort!(arr))

# Function to perform bucket sort on an array
function bucketSort(arr)
    # Handle empty or single-element arrays
    if length(arr) <= 1
        return arr
    end

    # Find the range of input array
    minVal, maxVal = minimum(arr), maximum(arr)
    
    # Number of buckets (using array length as number of buckets)
    n = length(arr)
    range = (maxVal - minVal) / n
    
    # Create n empty buckets
    buckets = [Float64[] for _ in 1:n]
    
    # Put array elements into different buckets
    for num in arr
        # Calculate bucket index for current element
        # We use max(1, ...) to handle the case when num == maxVal
        bucketIndex = max(1, ceil(Int, (num - minVal) / range))
        push!(buckets[bucketIndex], num)
    end
    
    # Sort individual buckets
    for bucket in buckets
        sort!(bucket)  # Using Julia's built-in sort for each bucket
    end
    
    # Concatenate all buckets into final array
    result = Float64[]
    for bucket in buckets
        append!(result, bucket)
    end
    
    return result
end

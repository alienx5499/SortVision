"""
    insertion_sort!(arr::Vector{T}) where T

Sorts the input vector `arr` in-place using the Insertion Sort algorithm.

This is a stable, in-place, comparison-based sorting algorithm.

# Arguments
- `arr::Vector{T}`: A mutable vector of elements of any type `T` that supports ordering.

# Returns
- The same vector sorted in ascending order.

# Time Complexity
- Best Case: O(n)
- Average/Worst Case: O(n^2)
# Space Complexity
- O(1) auxiliary space
"""
function insertion_sort!(arr::Vector{T}) where T
    n = length(arr)
    for i in 2:n
        key = arr[i]
        j = i - 1
        while j ≥ 1 && arr[j] > key
            arr[j + 1] = arr[j]
            j -= 1
        end
        arr[j + 1] = key
    end
    return arr
end

# -----------------------------------------------------
# 🧪 Test Suite
function run_tests()
    println("\n🧪 Running Insertion Sort Tests...")

    tests = [
        ([5, 3, 8, 1, 2], sort([5, 3, 8, 1, 2]), "Test 1: Random Integers"),
        ([1, 2, 3, 4, 5], [1, 2, 3, 4, 5], "Test 2: Already Sorted"),
        ([9, 7, 5, 3, 1], [1, 3, 5, 7, 9], "Test 3: Reverse Sorted"),
        ([42], [42], "Test 4: Single Element"),
        (Int[], Int[], "Test 5: Empty Array"),
        (["z", "b", "a", "d"], ["a", "b", "d", "z"], "Test 6: String Array"),
        ([4, 2, 4, 1, 2], [1, 2, 2, 4, 4], "Test 7: Duplicates")
    ]

    for (input, expected, desc) in tests
        insertion_sort!(input)
        result = input == expected ? "✅ Passed" : "❌ Failed"
        println(rpad(desc, 30), result)
    end
end

# -----------------------------------------------------
# 📦 Example Usage
function main()
    println("📦 Example: Insertion Sort Demo")
    arr = [6, 4, 7, 2, 9, 1]
    println("Original: ", arr)
    insertion_sort!(arr)
    println("Sorted:   ", arr)

    run_tests()
end

# Run when this file is executed directly
if abspath(PROGRAM_FILE) == @__FILE__
    main()
end

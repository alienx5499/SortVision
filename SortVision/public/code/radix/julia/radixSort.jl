# Radix Sort Implementation in Julia

# Time Complexity: O(d * (n + k)) where:
# - d is the number of digits in the maximum number.
# - n is the number of elements in the array.
# - k is the base of the number system (e.g., 10 for decimal).
# For a fixed k (like 10), it's O(d * n). If d is also bounded (e.g., numbers fit in standard integer types),
# it can be considered O(n) in practice for certain constraints.

# Space Complexity: O(n + k) due to the auxiliary arrays used in counting sort (output array and count array).


"""
    get_max(arr::Vector{Int})::Int

Finds the maximum value in a vector of integers.
Returns 0 if the array is empty, as Radix Sort (specifically, determining passes)
wouldn't proceed meaningfully. If the array might contain negative numbers
and those were to be supported, this function would need adjustment or the caller
would need to handle it. For this Radix Sort, we assume non-negative integers.
"""
function get_max(arr::Vector{Int})::Int
    if isempty(arr)
        return 0
    end
    # Initialize max_val with the first element, then iterate through the rest.
    # This is safe due to the isempty check.
    max_val = arr[1]
    for i = 2:length(arr)
        if arr[i] > max_val
            max_val = arr[i]
        end
    end
    return max_val
end

"""
    counting_sort!(arr::Vector{Int}, exp::Int, base::Int=10)

Performs a counting sort on `arr` based on the digit represented by `exp`.
`exp` is `base^i` where `i` is the current digit number (0 for units, 1 for tens, etc. if base is 10).
This function modifies `arr` in-place after sorting based on the current digit.
Assumes non-negative integers.
"""
function counting_sort!(arr::Vector{Int}, exp::Int, base::Int=10)
    n = length(arr)
    if n == 0
        return # Nothing to sort for an empty array
    end

    output = Vector{Int}(undef, n) # Auxiliary array to store sorted numbers
    count = zeros(Int, base)      # Count array for digits 0 to base-1

    # Store count of occurrences of each digit
    # The digit is (arr[i] / exp) % base
    for i = 1:n
        digit_val = div(arr[i], exp) % base
        count[digit_val + 1] += 1 # Julia is 1-indexed, so digit 0 maps to count[1]
    end

    # Change count[i] so that count[i] now contains the actual
    # ending position of this digit in the output array.
    # (i.e., count[digit+1] will be the count of numbers <= digit)
    for i = 2:base
        count[i] += count[i-1]
    end

    # Build the output array. Iterate backwards to maintain stability.
    # Stability is crucial for Radix Sort.
    # The value count[digit+1] is the position for the *last* occurrence of that digit.
    for i = n:-1:1
        digit_val = div(arr[i], exp) % base
        output[count[digit_val + 1]] = arr[i]
        count[digit_val + 1] -= 1 # Decrement for the next element with the same digit
    end

    # Copy the output array to arr[], so that arr[] now
    # contains sorted numbers according to the current digit.
    # This makes the sort "in-place" from the caller's perspective.
    for i = 1:n
        arr[i] = output[i]
    end
end

"""
    radix_sort!(arr::Vector{Int}, base::Int=10)

Sorts a vector of non-negative integers in ascending order using the Radix Sort algorithm.
Modifies the input array `arr` in-place.
The `base` parameter determines the numerical base for sorting (default is 10).
"""
function radix_sort!(arr::Vector{Int}, base::Int=10)
    if length(arr) <= 1
        return # Already sorted or empty
    end

    # Find the maximum number to know number of digits
    max_val = get_max(arr) # Uses the previously implemented get_max

    # If max_val is 0, all elements must be 0 (assuming non-negative numbers)
    # or the array was empty (handled above) or contains only 0s.
    # No sorting needed if max_val is 0.
    if max_val == 0
        return
    end

    # Perform counting sort for every digit. Note that instead
    # of passing digit number, exp is passed. exp is base^i
    # where i is current digit number.
    exp = 1
    while div(max_val, exp) > 0
        counting_sort!(arr, exp, base)
        
        # Check for overflow before multiplying exp by base
        if exp > div(typemax(Int), base) # Avoids overflow: exp * base > typemax(Int)
            break # exp would overflow, likely max_val is huge or base is small.
                  # This also handles base = 1 if it were allowed (which would loop forever).
                  # Base should be >= 2.
        end
        exp *= base
    end
end

# Example Usage
function run_examples()
    println("--- Radix Sort Examples ---")

    arr1 = [170, 45, 75, 90, 802, 24, 2, 66]
    println("Original array 1: ", arr1)
    radix_sort!(arr1)
    println("Sorted array 1:   ", arr1) # Expected: [2, 24, 45, 66, 75, 90, 170, 802]
    println()

    arr2 = [1, 20, 6, 4, 500, 90, 0]
    println("Original array 2: ", arr2)
    radix_sort!(arr2)
    println("Sorted array 2:   ", arr2) # Expected: [0, 1, 4, 6, 20, 90, 500]
    println()

    arr3 = [5, 4, 3, 2, 1]
    println("Original array 3 (reverse sorted): ", arr3)
    radix_sort!(arr3)
    println("Sorted array 3:   ", arr3) # Expected: [1, 2, 3, 4, 5]
    println()
end

# Test Cases
# For more robust testing, Julia's `Test` module would be used.
# For this single file, we'll do basic checks.
module RadixSortTests
    using ..Main # Assuming the file is run in a way Main contains these functions
                 # Or explicitly qualify with module name if saved as RadixSort.jl and included.

    function test_radix_sort()
        println("--- Running Radix Sort Tests ---")
        tests_passed = 0
        total_tests = 0

        function check_equal(arr1::Vector{Int}, arr2::Vector{Int}, test_name::String)
            total_tests += 1
            if arr1 == arr2
                tests_passed += 1
                println(test_name, ": PASSED")
            else
                println(test_name, ": FAILED")
                println("  Expected: ", arr2)
                println("  Got:      ", arr1)
            end
        end

        # Test Case 1: Empty array
        tc1_arr = Int[]
        radix_sort!(tc1_arr)
        check_equal(tc1_arr, Int[], "Test Case 1: Empty Array")

        # Test Case 2: Single element array
        tc2_arr = [1]
        radix_sort!(tc2_arr)
        check_equal(tc2_arr, [1], "Test Case 2: Single Element Array")

        # Test Case 3: General case
        tc3_arr = [170, 45, 75, 90, 802, 24, 2, 66]
        radix_sort!(tc3_arr)
        check_equal(tc3_arr, [2, 24, 45, 66, 75, 90, 170, 802], "Test Case 3: General Case")

        # Test Case 4: Array with zeros
        tc4_arr = [0, 5, 0, 2, 0, 1]
        radix_sort!(tc4_arr)
        check_equal(tc4_arr, [0, 0, 0, 1, 2, 5], "Test Case 4: Array with Zeros")

        # Test Case 5: Already sorted array
        tc5_arr = [10, 20, 30, 40, 50]
        radix_sort!(tc5_arr)
        check_equal(tc5_arr, [10, 20, 30, 40, 50], "Test Case 5: Already Sorted")

        # Test Case 6: Reverse sorted array
        tc6_arr = [55, 44, 33, 22, 11]
        radix_sort!(tc6_arr)
        check_equal(tc6_arr, [11, 22, 33, 44, 55], "Test Case 6: Reverse Sorted")
        
        # Test Case 7: Numbers with different number of digits
        tc7_arr = [100, 1, 1000, 10]
        radix_sort!(tc7_arr)
        check_equal(tc7_arr, [1, 10, 100, 1000], "Test Case 7: Different Digits")

        println("\n--- Test Summary ---")
        println("Total tests: ", total_tests)
        println("Tests passed: ", tests_passed)
        println("Tests failed: ", total_tests - tests_passed)
        if total_tests == tests_passed
            println("All tests passed successfully!")
        else
            println("Some tests failed.")
        end
    end
end 

end 

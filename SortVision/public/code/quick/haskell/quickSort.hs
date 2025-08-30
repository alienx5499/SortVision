-- QuickSort Implementation in Haskell

-- Partition function using functional approach
-- Takes a pivot element and a list, returns two lists:
-- left: elements <= pivot, right: elements > pivot
partition :: (Ord a) => a -> [a] -> ([a], [a])
partition pivot xs =
    -- Use list comprehension to separate elements based on pivot
    -- Elements <= pivot go to left list, elements > pivot go to right list
    ([x | x <- xs, x <= pivot], [x | x <- xs, x > pivot])

-- Quick sort function using divide and conquer
-- Base case: empty list or single element is already sorted
-- Recursive case: partition around first element, sort sublists, combine
quickSort :: (Ord a) => [a] -> [a]
quickSort [] = []  -- Base case: empty list is already sorted
quickSort [x] = [x]  -- Base case: single element is already sorted
quickSort (x:xs) =
    -- Use first element as pivot
    let (left, right) = partition x xs
    in quickSort left ++ [x] ++ quickSort right

-- Alternative implementation with different pivot selection
-- This version uses the middle element as pivot for better performance
-- on already sorted or reverse sorted lists
quickSortRandomPivot :: (Ord a) => [a] -> [a]
quickSortRandomPivot [] = []  -- Base case: empty list
quickSortRandomPivot [x] = [x]  -- Base case: single element
quickSortRandomPivot xs =
    -- Use middle element as pivot for better performance
    let n = length xs
        midIndex = n `div` 2
        pivot = xs !! midIndex
        -- Remove pivot from list before partitioning
        xsWithoutPivot = take midIndex xs ++ drop (midIndex + 1) xs
        (left, right) = partition pivot xsWithoutPivot
    in quickSortRandomPivot left ++ [pivot] ++ quickSortRandomPivot right

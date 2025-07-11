-- Heap Sort Implementation in Haskell
--
-- This module provides a functional implementation of the Heap Sort algorithm
-- using Haskell lists. Due to the nature of immutable lists, operations that
-- would be O(1) or O(log n) on arrays (like element swapping or access by index
-- for heapify) become O(n). This significantly affects the overall time complexity
-- compared to array-based implementations.
--
module HeapSort (
    heapSort,
    heapify,
    buildMaxHeap,
    extractMax
    -- heapSortInternal -- Might add later for the recursive part of heapSort
) where

import Data.List (foldl') -- Using strict foldl for buildMaxHeap

setAt :: [a] -> Int -> a -> [a]
setAt xs i val
    | i < 0 || i >= length xs = error "setAt: index out of bounds"
    | otherwise = take i xs ++ [val] ++ drop (i+1) xs
heapify :: (Ord a) => [a] -> Int -> Int -> [a]
heapify xs n i =
    let l = 2 * i + 1 -- Index of left child
        r = 2 * i + 2 -- Index of right child
        largest' -- Determine which of i, l, r has the largest element
            | l < n && (xs !! l) > (xs !! i) = l
            | otherwise = i
        largest -- Compare with right child if it exists
            | r < n && (xs !! r) > (xs !! largest') = r
            | otherwise = largest'
    in
    -- If largest is not the current root i, swap them and recursively heapify the affected subtree
    if largest /= i
    then let swappedXs = setAt (setAt xs i (xs !! largest)) largest (xs !! i)
         in heapify swappedXs n largest
    else xs -- If i is already the largest, the subtree is heapified
buildMaxHeap :: (Ord a) => [a] -> [a]
buildMaxHeap xs =
    let n = length xs
        -- Iterate from the last non-leaf node ((n `div` 2) - 1) down to 0.
        -- foldl' is used for strictness, potentially helping with space.
        indices = reverse [0 .. (n `div` 2) - 1] 
    in if n == 0 
       then [] 
       else foldl' (\currentHeap idx -> heapify currentHeap n idx) xs indices

-- Extract maximum element from heap
-- Takes a max heap (represented as a list) and returns a tuple containing:
--   1. The maximum element (which is the root of the heap).
--   2. The remaining heap after extracting the maximum element and re-establishing the heap property.
-- Steps:
--   - The max element is the `head` of the list.
--   - The `last` element of the list is moved to the root position of the `init` (all but last) list.
--   - The new root is then `heapify`-ed to maintain the max-heap property.
-- Time Complexity: O(n) for `last` and `init`. O(n) for `setAt`. O(n log n) for `heapify` on lists.
--                  Overall: O(n log n) for lists.
--                  For an array-based heap, this operation is O(log n).
-- Space Complexity: O(n) due to the creation of new lists by `init`, `setAt`, and `heapify`.
extractMax :: (Ord a) => [a] -> (a, [a])
extractMax [] = error "extractMax: cannot extract from an empty heap"
extractMax [x] = (x, []) -- Base case: single element heap
extractMax heap =
    let maxVal = head heap         -- O(1)
        lastVal = last heap         -- O(n)
        n = length heap             -- O(1) after `last` or if calculated once.
        
        -- Heap with last element removed. O(n) for init.
        heapWithoutLast = init heap 
        
        newN = n - 1 -- Size of the heap after extraction
    in if newN == 0
       then (maxVal, []) -- If original heap had 1 element, now it's empty.
       else 
            -- Place lastVal at the root of the shortened list
            let provisionalHeap = setAt heapWithoutLast 0 lastVal -- O(n) due to setAt
            in (maxVal, heapify provisionalHeap newN 0) -- O(n log n) due to heapify
-- Time Complexity (for this list-based implementation):
--   - `buildMaxHeap`: O(n^2 log n)
--   - The `heapSort'` helper function calls `extractMax` n times. Each `extractMax` is O(n log n).
--     So, this phase is O(n * n log n) = O(n^2 log n).
--   - Overall: O(n^2 log n) + O(n^2 log n) = O(n^2 log n).
--   - For an array-based implementation, Heap Sort is O(n log n).
--
-- Space Complexity (for this list-based implementation):
--   - O(n) for storing the heap created by `buildMaxHeap`.
--   - O(n) for the accumulated sorted list.
--   - The recursion depth of `heapSort'` is O(n), contributing O(n) to stack space.
--   - Each call to `extractMax` and `heapify` generates new lists, contributing to overall space usage.
--     The dominant factor is O(n) for the primary list structures being manipulated.
heapSort :: (Ord a) => [a] -> [a]
heapSort [] = []
heapSort xs = 
    let initialHeap = buildMaxHeap xs
    in heapSort' initialHeap []
    where
        -- Helper function for heapSort.
        -- `currentHeap`: the heap being processed.
        -- `sortedAcc`: accumulator for elements already extracted and sorted (in final order).
        -- Recursively extracts the maximum element from `currentHeap`, prepends it to `sortedAcc`,
        -- and continues until `currentHeap` is empty.
        -- Each recursive call involves `extractMax`, which is O(n log n) for lists.
        -- Called N times, contributing to the overall O(N^2 log N) complexity of heapSort.
        heapSort' :: (Ord a) => [a] -> [a] -> [a]
        heapSort' currentHeap sortedAcc =
            if null currentHeap
            then sortedAcc
            else 
                let (maxVal, nextHeap) = extractMax currentHeap
                in heapSort' nextHeap (maxVal : sortedAcc)

-- Performance Optimization Notes
-- ------------------------------
-- The primary performance bottleneck in this implementation is the use of Haskell lists
-- to represent the heap. Standard lists in Haskell are singly-linked lists, leading to:
--   - O(n) for element access by index (`!!` used in `heapify`).
--   - O(n) for updating an element at an index (our `setAt` helper).
--   - O(n) for `last` and `init` operations (used in `extractMax`).
--
-- This results in:
--   - `heapify` being O(n log n) instead of the typical O(log n) for array-based heaps.
--   - `buildMaxHeap` being O(n^2 log n) instead of O(n).
--   - `extractMax` being O(n log n) instead of O(log n).
-- Consequently, the overall `heapSort` time complexity is O(n^2 log n) rather than the
-- standard O(n log n) for array-based implementations.
-- Test Case Utilities and Execution
-- A simple utility to run a test case and print its status.
runTest :: (Eq a, Show a) => ([a] -> [a]) -> String -> [a] -> [a] -> IO Bool
runTest sortFunc caseName input expected = do
    let actual = sortFunc input
    let passed = actual == expected
    putStrLn $ "Test Case: " ++ caseName
    putStrLn $ "  Input:    " ++ show input
    putStrLn $ "  Expected: " ++ show expected
    putStrLn $ "  Actual:   " ++ show actual
    putStrLn $ "  Status:   " ++ if passed then "PASSED" else "FAILED"
    putStrLn ""
    return passed

-- Main function with Example Usage and Test Cases
main :: IO ()
main = do
    putStrLn "Heap Sort Implementation - Examples and Tests"
    putStrLn "==========================================="
    putStrLn "\nExample Usage (Manual Verification):"
    
    let exampleList1 = [3, 1, 4, 1, 5, 9, 2, 6]
    putStrLn $ "Original: " ++ show exampleList1 ++ " ==> Sorted: " ++ show (heapSort exampleList1)
    
    let exampleList2 = [] :: [Int]
    putStrLn $ "Original: " ++ show exampleList2 ++ " ==> Sorted: " ++ show (heapSort exampleList2)

    putStrLn "\nAutomated Test Cases:"
    putStrLn "---------------------"
    
    results <- sequence [
        runTest heapSort "Empty list" ([] :: [Int]) [],
        runTest heapSort "Single element list" [42] [42],
        runTest heapSort "Already sorted list" [1, 2, 3, 4, 5] [1, 2, 3, 4, 5],
        runTest heapSort "Reverse sorted list" [5, 4, 3, 2, 1] [1, 2, 3, 4, 5],
        runTest heapSort "Unsorted list with duplicates" [3, 1, 4, 1, 5, 9, 2, 6, 5, 3] [1, 1, 2, 3, 3, 4, 5, 5, 6, 9],
        runTest heapSort "List with negative numbers" [-3, 1, -4, 0, 5, -9] [-9, -4, -3, 0, 1, 5],
        runTest heapSort "List with all same elements" [7, 7, 7, 7] [7, 7, 7, 7]
        ]
    
    let allPassed = and results
    putStrLn $ "Overall Test Result: " ++ if allPassed then "ALL TESTS PASSED" else "SOME TESTS FAILED"
    
    putStrLn "\n-------------------------------------------"
    putStrLn "Further checks (e.g., properties for QuickCheck) would be beneficial for robust testing."

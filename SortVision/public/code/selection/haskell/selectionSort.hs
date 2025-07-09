-- | Selection Sort Implementation in Haskell
-- | Author: Your Name
-- |
-- | This module implements the selection sort algorithm using pure functional programming.
-- | It includes:
-- |   - findMin: Find minimum element in a list
-- |   - removeElement: Remove first occurrence of an element
-- |   - selectionSort: Sort a list using selection sort
-- |
-- | Time Complexity: O(n^2)
-- | Space Complexity: O(n) (due to list immutability)
-- |
-- | Handles edge cases: empty list, single element, duplicates

-- | Find the minimum element in a list
findMin :: (Ord a) => [a] -> a
findMin []     = error "Cannot find minimum of an empty list"
findMin [x]    = x
findMin (x:xs) = min x (findMin xs)

-- | Remove the first occurrence of an element from a list
removeElement :: (Eq a) => a -> [a] -> [a]
removeElement _ [] = []
removeElement y (x:xs)
    | y == x    = xs              -- Remove first match
    | otherwise = x : removeElement y xs

-- | Selection sort implementation
selectionSort :: (Ord a) => [a] -> [a]
selectionSort [] = []
selectionSort xs =
    let minElem = findMin xs           -- Find minimum
        rest    = removeElement minElem xs -- Remove min from list
    in minElem : selectionSort rest    -- Recurse on rest

-- | Example usage and test cases
main :: IO ()
main = do
    putStrLn "=== Selection Sort in Haskell ==="

    let tests = [ [],
                  [1],
                  [4, 2, 5, 1, 3],
                  [9, 7, 5, 3, 1],
                  [5, 5, 5, 5],
                  [-2, 3, 0, -1, 4]
                ]

    mapM_ (\arr -> do
        putStrLn $ "Original: " ++ show arr
        putStrLn $ "Sorted:   " ++ show (selectionSort arr)
        putStrLn "---------------------------"
        ) tests

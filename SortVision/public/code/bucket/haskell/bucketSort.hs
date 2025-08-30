-- Calculate bucket index for element
-- This function determines which bucket an element should go into
-- by mapping the value to an index based on its position in the range

bucketIndex :: (RealFrac a) => a -> a -> a -> Int
bucketIndex value minVal maxVal =
    floor $ fromIntegral (numBuckets - 1) * (value - minVal) / (maxVal - minVal)
    where numBuckets = 10  -- Number of buckets used for sorting

-- Distribute elements into buckets
-- This function creates multiple buckets and places each element into appropriate bucket
-- based on its value relative to the min and max values in the input list

distributeToBuckets :: (RealFrac a) => [a] -> Int -> [[a]]
distributeToBuckets xs n =
    foldr (\x acc ->
        let idx = bucketIndex x minVal maxVal
            (before, after) = splitAt idx acc
        in before ++ ((x : (after !! 0)) : tail after)
    ) (replicate n []) xs
    where
        minVal = minimum xs
        maxVal = maximum xs

-- 1. First checks if the list is empty or singleton
-- 2. Creates buckets and distributes elements
-- 3. Sorts each bucket individually
-- 4. Concatenates all sorted buckets to get final sorted list

bucketSort :: (RealFrac a, Ord a) => [a] -> [a]
bucketSort [] = []
bucketSort [x] = [x]
bucketSort xs =
    concat $ map sortBucket buckets
    where
        numBuckets = 10  -- Number of buckets (can be adjusted)
        buckets = distributeToBuckets xs numBuckets

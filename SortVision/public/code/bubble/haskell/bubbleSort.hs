module BubbleSort (bubbleSort) where

-- Time: Best O(n), Avg/Worst O(n^2), Space: O(1) auxiliary per pass
bubbleSort :: Ord a => [a] -> [a]
bubbleSort xs = go (length xs) xs
  where
    go 0 ys = ys
    go n ys =
      let (ys', swapped) = pass ys
       in if swapped then go (n - 1) ys' else ys'

    pass (a:b:rest)
      | a > b = let (tail', s) = pass (a:rest) in (b : tail', True || s)
      | otherwise = let (tail', s) = pass (b:rest) in (a : tail', s)
    pass ys = (ys, False)

main :: IO ()
main = print (bubbleSort [64, 34, 25, 12, 22, 11, 90])

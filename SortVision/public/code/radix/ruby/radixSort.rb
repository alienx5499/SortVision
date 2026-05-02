# Radix Sort (LSD, base 10, non-negative integers)
# Time: O(d * (n + k)), Space: O(n + k)
def radix_sort(arr)
  return arr if arr.length <= 1

  max_val = arr.max
  exp = 1
  while (max_val / exp) > 0
    counting_sort_by_exp(arr, exp)
    exp *= 10
  end
  arr
end

def counting_sort_by_exp(arr, exp)
  output = Array.new(arr.length, 0)
  count = Array.new(10, 0)

  arr.each { |x| count[(x / exp) % 10] += 1 }
  (1...10).each { |i| count[i] += count[i - 1] }

  (arr.length - 1).downto(0) do |i|
    digit = (arr[i] / exp) % 10
    output[count[digit] - 1] = arr[i]
    count[digit] -= 1
  end

  arr.replace(output)
end

arr = [170, 45, 75, 90, 802, 24, 2, 66]
p radix_sort(arr)

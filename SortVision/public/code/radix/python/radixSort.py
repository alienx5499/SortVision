"""Radix Sort (LSD, base 10, non-negative integers).

Time: O(d * (n + k))
Space: O(n + k)
"""

def radix_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        _counting_sort_by_exp(arr, exp)
        exp *= 10

    return arr


def _counting_sort_by_exp(arr: list[int], exp: int) -> None:
    output = [0] * len(arr)
    count = [0] * 10

    for x in arr:
        count[(x // exp) % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]

    for i in range(len(arr) - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1

    arr[:] = output


if __name__ == "__main__":
    arr = [170, 45, 75, 90, 802, 24, 2, 66]
    print(radix_sort(arr))

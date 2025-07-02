""" 
This file includes:
-Complete implementation of radix sort with counting sort as a subroutine.
-Support for negative numbers and configurable number base.
-Example usage.
-Type hints and docstrings compliant with PEP 8 and PEP 257.
"""

from typing import List

class RadixSort:
    """
    A class implementing the Radix Sort algorithm.
    Supports different bases and handles negative numbers.
    """

    def get_max(self, arr: List[int]) -> int:
        """
        Get maximum absolute value in array to determine number of digits.

        Args:
            arr (List[int]): List to find maximum in

        Returns:
            int: Maximum absolute value in the list
        """
        return max(abs(num) for num in arr) if arr else 0

    def count_sort(self, arr: List[int], exp: int, base: int) -> None:
        """
        Counting sort for each digit based on current exponent.

        Args:
            arr (List[int]): List to be sorted
            exp (int): Current digit position (1, 10, 100, etc.)
            base (int): The base to be used (e.g., 10 for decimal)
        """
        n = len(arr)
        output = [0] * n
        count = [0] * base

        for i in range(n):
            index = abs(arr[i]) // exp
            count[(index % base)] += 1

        for i in range(1, base):
            count[i] += count[i - 1]

        for i in range(n - 1, -1, -1):
            index = abs(arr[i]) // exp
            output[count[(index % base)] - 1] = arr[i]
            count[(index % base)] -= 1

        for i in range(n):
            arr[i] = output[i]

    def sort(self, arr: List[int], base: int = 10) -> List[int]:
        """
        Radix sort function that handles negative numbers and supports different bases.

        Args:
            arr (List[int]): List to be sorted
            base (int, optional): Number base to use. Defaults to 10.

        Returns:
            List[int]: Sorted list
        """
        if len(arr) <= 1:
            return arr

        # Separate negative and non-negative numbers
        neg = [-num for num in arr if num < 0]
        pos = [num for num in arr if num >= 0]

        if neg:
            max_neg = self.get_max(neg)
            exp = 1
            while max_neg // exp > 0:
                self.count_sort(neg, exp, base)
                exp *= base
            neg = [-num for num in reversed(neg)]

        if pos:
            max_pos = self.get_max(pos)
            exp = 1
            while max_pos // exp > 0:
                self.count_sort(pos, exp, base)
                exp *= base

        return neg + pos


# Example usage
if __name__ == "__main__":
    sorter = RadixSort()
    arr = [170, 45, 75, -90, -802, 24, 2, 66]
    sorted_arr = sorter.sort(arr)
    print("Sorted array:", sorted_arr)

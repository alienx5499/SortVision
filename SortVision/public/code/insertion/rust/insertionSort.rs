/// Insertion sort is a simple sorting algorithm that builds the final sorted array
/// one item at a time. It works by iterating through the array and for each element,
/// placing it in its correct position among the already sorted elements.
///
/// Time Complexity: O(n²) average and worst case, O(n) best case
/// Space Complexity: O(1) - in-place sorting
/// Stability: Stable - maintains relative order of equal elements
///
/// Performs insertion sort on a slice of ordered elements
pub fn insertion_sort<T: Ord>(arr: &mut [T]) {
    // Handle edge cases
    if arr.len() <= 1 {
        return; // Array is already sorted or empty
    }

    // Iterate through the array starting from the second element
    for i in 1..arr.len() {
        // Compare current element with previous elements and shift if necessary
        // We use a while loop to continue shifting until we find the correct position
        let mut j = i;
        while j > 0 && arr[j] < arr[j - 1] {
            // Swap the current element with the previous element
            arr.swap(j, j - 1);
            j -= 1;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_sorting() {
        let mut arr = vec![64, 34, 25, 12, 22, 11, 90];
        insertion_sort(&mut arr);
        assert_eq!(arr, vec![11, 12, 22, 25, 34, 64, 90]);
    }

    #[test]
    fn test_already_sorted() {
        let mut arr = vec![1, 2, 3, 4, 5];
        insertion_sort(&mut arr);
        assert_eq!(arr, vec![1, 2, 3, 4, 5]);
    }
}

fn main() {
    println!("🧪 Insertion Sort Demo");
    println!("=====================");

    // Test 1: Basic sorting
    let mut arr1 = vec![64, 34, 25, 12, 22, 11, 90];
    println!("Original array: {:?}", arr1);
    insertion_sort(&mut arr1);
    println!("Sorted array:   {:?}", arr1);
    println!();

    // Test 2: Already sorted
    let mut arr2 = vec![1, 2, 3, 4, 5];
    println!("Already sorted: {:?}", arr2);
    insertion_sort(&mut arr2);
    println!("After sorting:  {:?}", arr2);
    println!();

    // Test 3: Strings
    let mut arr3 = vec!["banana", "apple", "cherry"];
    println!("String array:   {:?}", arr3);
    insertion_sort(&mut arr3);
    println!("Sorted strings: {:?}", arr3);
    println!();

    // Test 4: Edge cases
    let mut empty: Vec<i32> = vec![];
    let mut single = vec![42];

    insertion_sort(&mut empty);
    insertion_sort(&mut single);

    println!("Empty array:    {:?}", empty);
    println!("Single element: {:?}", single);
    println!();

    println!("✅ All tests completed successfully!");
    println!("To run unit tests, use: rustc --test insertionSort.rs -o test && ./test");
}

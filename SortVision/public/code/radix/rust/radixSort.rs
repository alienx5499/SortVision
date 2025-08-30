use std::cmp::max;

/// Get the maximum absolute value in the array
/// Used to determine the number of digits to process
fn get_max(arr: &[i32]) -> i32 {
    let mut max_val = arr[0].abs();
    for &num in arr.iter().skip(1) {
        max_val = max(max_val, num.abs());
    }
    max_val
}

/// Performs counting sort on the array based on the digit represented by exp
fn count_sort(arr: &mut Vec<i32>, exp: i32, base: i32) {
    let mut output = vec![0; arr.len()];
    let mut count = vec![0; base as usize];

    // Count occurrences based on current digit
    for &num in arr.iter() {
        let index = (num.abs() / exp) % base;
        count[index as usize] += 1;
    }

    // Convert count to cumulative count
    for i in 1..base {
        count[i as usize] += count[(i - 1) as usize];
    }

    // Build the output array (stable sort)
    for i in (0..arr.len()).rev() {
        let index = (arr[i].abs() / exp) % base;
        output[count[index as usize] as usize - 1] = arr[i];
        count[index as usize] -= 1;
    }

    // Copy output back to arr
    arr.copy_from_slice(&output);
}

/// Main Radix Sort function
/// Sorts the array using Radix Sort with optional base
/// Handles both negative and positive integers
fn radix_sort(arr: &mut Vec<i32>, base: i32) {
    // Separate negative and positive numbers
    let mut negs: Vec<i32> = Vec::new();
    let mut poss: Vec<i32> = Vec::new();

    for &num in arr.iter() {
        if num < 0 {
            negs.push(num);
        } else {
            poss.push(num);
        }
    }

    // Sort positive numbers
    if !poss.is_empty() {
        let max_pos = get_max(&poss);
        let mut exp = 1;
        while max_pos / exp > 0 {
            count_sort(&mut poss, exp, base);
            exp *= base;
        }
    }

    // Sort negative numbers
    if !negs.is_empty() {
        for num in &mut negs {
            *num = -(*num); // Convert to positive
        }
        let max_neg = get_max(&negs);
        let mut exp = 1;
        while max_neg / exp > 0 {
            count_sort(&mut negs, exp, base);
            exp *= base;
        }
        for num in &mut negs {
            *num = -(*num); // Restore negative sign
        }
        negs.reverse(); // Reverse for correct order
    }

    // Merge negatives and positives
    arr.clear();
    arr.extend(negs);
    arr.extend(poss);
}

/// Example usage with test cases
fn main() {
    let mut arr = vec![170, -45, 75, -90, 802, 24, 2, 66];

    println!("Original array:");
    for &num in &arr {
        print!("{} ", num);
    }
    println!();

    radix_sort(&mut arr, 10); // Default base = 10

    println!("\nSorted array (base 10):");
    for &num in &arr {
        print!("{} ", num);
    }
    println!();
}

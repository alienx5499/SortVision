// Radix Sort (LSD, base 10, non-negative integers)
// Time: O(d * (n + k)), Space: O(n + k)
pub fn radix_sort(arr: &mut [u32]) {
    if arr.len() <= 1 {
        return;
    }

    let mut max_val = arr[0];
    for &x in arr.iter() {
        if x > max_val {
            max_val = x;
        }
    }

    let mut exp = 1u32;
    while max_val / exp > 0 {
        counting_sort_by_exp(arr, exp);
        exp *= 10;
    }
}

fn counting_sort_by_exp(arr: &mut [u32], exp: u32) {
    let mut output = vec![0u32; arr.len()];
    let mut count = [0usize; 10];

    for &x in arr.iter() {
        count[((x / exp) % 10) as usize] += 1;
    }
    for i in 1..10 {
        count[i] += count[i - 1];
    }

    for i in (0..arr.len()).rev() {
        let digit = ((arr[i] / exp) % 10) as usize;
        output[count[digit] - 1] = arr[i];
        count[digit] -= 1;
    }

    arr.copy_from_slice(&output);
}

fn main() {
    let mut arr = [170, 45, 75, 90, 802, 24, 2, 66];
    radix_sort(&mut arr);
    println!("{:?}", arr);
}

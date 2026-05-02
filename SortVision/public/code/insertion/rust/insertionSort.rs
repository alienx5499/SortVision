// Insertion Sort (in-place)
// Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
pub fn insertion_sort(arr: &mut [i32]) {
    for i in 1..arr.len() {
        let key = arr[i];
        let mut j = i;

        while j > 0 && arr[j - 1] > key {
            arr[j] = arr[j - 1];
            j -= 1;
        }
        arr[j] = key;
    }
}

fn main() {
    let mut arr = [64, 25, 12, 22, 11];
    insertion_sort(&mut arr);
    println!("{:?}", arr);
}

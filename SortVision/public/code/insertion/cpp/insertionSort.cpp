#include <iostream>
#include <vector>
using namespace std;

// Insertion Sort (in-place)
// Time: Best O(n), Avg/Worst O(n^2), Space: O(1)
void insertionSort(vector<int>& arr) {
    for (int i = 1; i < (int)arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    insertionSort(arr);
    for (int x : arr) cout << x << ' ';
    cout << '\n';
}

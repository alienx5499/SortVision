#include <iostream>
#include <vector>
using namespace std;

// Quick Sort (in-place, Lomuto partition)
// Time: Best/Avg O(n log n), Worst O(n^2), Space: O(log n) recursion
static int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int p = partition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    quickSort(arr, 0, (int)arr.size() - 1);
    for (int x : arr) cout << x << ' ';
    cout << '\n';
}

#include <iostream>
#include <vector>
using namespace std;

// Merge Sort
// Time: Best/Avg/Worst O(n log n), Space: O(n)
static void mergeVec(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);

    int i = 0, j = 0, k = l;
    while (i < (int)left.size() && j < (int)right.size()) {
        arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
    }
    while (i < (int)left.size()) arr[k++] = left[i++];
    while (j < (int)right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    mergeVec(arr, l, m, r);
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    mergeSort(arr, 0, (int)arr.size() - 1);
    for (int x : arr) cout << x << ' ';
    cout << '\n';
}

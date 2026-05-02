#include <iostream>
#include <vector>
using namespace std;

// Selection Sort (in-place)
// Time: Best/Avg/Worst O(n^2), Space: O(1)
void selectionSort(vector<int>& arr) {
    for (int i = 0; i < (int)arr.size() - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < (int)arr.size(); j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        if (minIdx != i) swap(arr[i], arr[minIdx]);
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    selectionSort(arr);
    for (int x : arr) cout << x << ' ';
    cout << '\n';
}

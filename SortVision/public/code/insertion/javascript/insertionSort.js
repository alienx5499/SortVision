
function insertionSort(arr) {
    // Make a copy of the input array to avoid modifying the original
    const array = [...arr];
    const n = array.length;

    // Start from the second element (index 1)
    // as the first element is considered sorted
    for (let i = 1; i < n; i++) {
        // Store the current element to be inserted
        let currentElement = array[i];
        let j = i - 1;

        // Move elements that are greater than currentElement
        // to one position ahead of their current position
        while (j >= 0 && array[j] > currentElement) {
            array[j + 1] = array[j];
            j--;
        }

        // Place the currentElement in its correct position
        array[j + 1] = currentElement;
    }

    return array;
}


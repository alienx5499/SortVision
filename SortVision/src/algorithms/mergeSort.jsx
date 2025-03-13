export const mergeSort = async (array, visualizeArray, delay, setCurrentBar, shouldStopRef) => {
    const merge = async (left, right) => {
      let result = [];
      let i = 0;
      let j = 0;
  
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
        visualizeArray([...result, ...left.slice(i), ...right.slice(j)]);  // Update the visualization
        setCurrentBar({ compare: i, swap: null });  // Update active compare bars
        await new Promise(resolve => setTimeout(resolve, delay));
  
        if (shouldStopRef.current) return result;  // Stop if shouldStopRef is true
      }
  
      return [...result, ...left.slice(i), ...right.slice(j)];
    };
  
    const mergeSortHelper = async (arr) => {
      if (arr.length <= 1) return arr;
      const middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
  
      return await merge(await mergeSortHelper(left), await mergeSortHelper(right));
    };
  
    await mergeSortHelper(array);
    return { swaps: 0, comparisons: 0 };  // Merge sort is hard to track comparisons/swaps easily
  };
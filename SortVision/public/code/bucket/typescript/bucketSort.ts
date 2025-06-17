
function bucketSort(arr: number[]): number[] {
    // Find min and max values
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    // Create buckets
    const n = arr.length;
    const buckets: number[][] = Array(n).fill([]).map(() => []);
    
    // Distribute elements into buckets
    for (const num of arr) {
        const idx = Math.floor((num - min) * (n - 1) / (max - min));
        buckets[idx].push(num);
    }
    
    // Sort individual buckets
    for (let i = 0; i < n; i++) {
        buckets[i].sort((a, b) => a - b);
    }
    
    // Concatenate all buckets
    return buckets.reduce((result, bucket) => result.concat(bucket), []);
}

export default bucketSort;

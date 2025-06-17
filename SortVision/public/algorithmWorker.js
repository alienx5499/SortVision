// algorithmWorker.js
/**
 * @file algorithmWorker.js
 * Handles algorithm execution in a Web Worker.
 * Receives messages to 'execute' an algorithm.
 * Posts messages back for 'progress', 'complete', or 'error'.
 * This script runs off the main UI thread to prevent freezing during computation.
 */

// Object to store available sorting algorithms.
const algorithms = {
  /**
   * Sorts an array chunk using the Bubble Sort algorithm.
   * @param {Array<number>} data - The array (or chunk) to sort.
   * @param {Function} reportProgress - Callback function to report progress (0-100).
   * @returns {Array<number>} The sorted array.
   */
  bubbleSort: (data, reportProgress) => {
    let arr = [...data]; // Clone data to avoid modifying the original array if passed by reference.
    let n = arr.length;
    if (n <= 1) {
      reportProgress(100);
      return arr;
    }
    let swapped;
    // n-1 passes
    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
        }
      }
      // Calculate progress after each full pass through the inner loop
      // Progress is based on how many elements are in their final sorted places (from the end of the array)
      // (i+1) elements are sorted after pass i.
      let progress = Math.floor(((i + 1) / (n - 1)) * 100);
      reportProgress(progress);

      if (!swapped) {
        // If no swaps occurred in a pass, the array is sorted
        break;
      }
    }
    reportProgress(100); // Ensure 100% is reported on completion.
    return arr;
  },
  /**
   * Placeholder for Merge Sort algorithm. Currently uses native sort.
   * @param {Array<number>} data - The array (or chunk) to sort.
   * @param {Function} reportProgress - Callback function to report progress (0-100).
   * @returns {Array<number>} The sorted array.
   */
  mergeSort: (data, reportProgress) => {
    reportProgress(0); // Initial progress report.
    let arr = [...data];
    if (arr.length <= 1) {
      reportProgress(100); // Already sorted or empty.
      return arr;
    }
    
    // Placeholder: Use native sort. A real implementation would have merging steps
    // where progress could be reported more granularly.
    arr.sort((a, b) => a - b); 
    
    reportProgress(100); // Final progress report.
    return arr;
  }
  // TODO: Implement actual merge sort, quick sort, heap sort etc. with progress reporting and cooperative stop.
};

/**
 * Handles messages sent from the main thread.
 * @param {MessageEvent} event - The message event containing data from the main thread.
 * Expected event.data format: { type: string, algorithm?: string, data?: Array, options?: Object }
 */
self.onmessage = function(event) {
  const { type, algorithm, data, options } = event.data; // Options can be used for algorithm-specific settings.

  if (type === 'execute') {
    console.log(`Worker: Received execute for algorithm "${algorithm}" with data size ${data ? data.length : 'N/A'}.`);
    
    // Function to report progress back to the main thread.
    const reportProgressFunc = (progress) => {
      self.postMessage({ type: 'progress', progress: progress, algorithm: algorithm });
    };

    try {
      if (algorithms[algorithm]) {
        reportProgressFunc(0); // Report 0% progress before starting.
        
        const startTime = performance.now();
        // Execute the specified algorithm, passing the data and progress callback.
        const result = algorithms[algorithm](data, reportProgressFunc); 
        const endTime = performance.now();
        
        // Algorithms are responsible for calling reportProgressFunc(100) upon their completion.
        
        // Send completion message with results and time taken for this chunk.
        self.postMessage({ 
          type: 'complete', 
          result: result, 
          timeTaken: endTime - startTime, 
          algorithm: algorithm 
        });
        console.log(`Worker: Completed ${algorithm} in ${endTime - startTime}ms.`);
      } else {
        // Algorithm not found in the 'algorithms' object.
        console.error(`Worker: Algorithm "${algorithm}" not found.`);
        self.postMessage({ type: 'error', error: `Algorithm ${algorithm} not found.`, algorithm: algorithm });
      }
    } catch (e) {
      // Catch any synchronous errors during algorithm execution or setup.
      console.error(`Worker: Error processing algorithm "${algorithm}":`, e);
      self.postMessage({ type: 'error', error: e.message || 'Unknown worker error', algorithm: algorithm });
    }
  } else if (type === 'stop') {
    // This 'stop' message type is for potential future cooperative cancellation.
    // Current implementation uses worker.terminate() from the manager (abort-style).
    // For cooperative stopping, algorithms would need to periodically check a global 'shouldStop' flag.
    console.log(`Worker: Received 'stop' command. Cooperative stop not fully implemented in algorithms.`);
    // Example: self.shouldStop = true; 
    // Algorithms would then check self.shouldStop and exit cleanly, posting a 'stopped' message.
  } else {
    console.warn(`Worker: Received unknown message type: "${type}".`);
  }
};

/**
 * Optional: Global error handler for the worker.
 * This catches any errors not caught within self.onmessage's try...catch blocks (e.g., async errors).
 */
self.onerror = function(errorEvent) {
  console.error('Global error in worker:', errorEvent.message, errorEvent);
  // Prevent the default browser error handling (which might terminate the worker or log to console).
  errorEvent.preventDefault(); 
  // Post a generic error message back to the main thread.
  self.postMessage({ type: 'error', error: 'A global error occurred in the worker: ' + errorEvent.message });
};

// Log to confirm the worker script has loaded and initialized successfully.
console.log('Worker: algorithmWorker.js script loaded and initialized successfully.');

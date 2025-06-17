/**
 * Manages a pool of Web Workers to execute algorithms in parallel.
 * Handles data splitting, task distribution, progress tracking, result aggregation, and worker lifecycle.
 */
class ParallelAlgorithmManager {
  /**
   * Initializes the ParallelAlgorithmManager.
   */
  constructor() {
    this.workers = new Map(); // Stores worker instances and their associated state (status, progress, etc.).
    // Determine the number of concurrent threads based on hardware concurrency, defaulting to 4.
    this.threadCount = typeof navigator !== 'undefined' && navigator.hardwareConcurrency 
      ? navigator.hardwareConcurrency 
      : 4;
  }

  /**
   * Initializes or re-initializes the pool of Web Workers.
   * It terminates any existing workers before creating new ones up to `this.threadCount`.
   * Note: For optimal performance, this might be called selectively (e.g., only when `threadCount` changes or on first use)
   * rather than on every execution start, but current visualizer calls it if workers are not matching threadCount or on first start.
   */
  async initializeWorkers() {
    // It's important to terminate existing workers before creating new ones to avoid resource leaks
    // or issues with mismatched worker states if re-initializing.
    this.terminateWorkers(); 
    for (let i = 0; i < this.threadCount; i++) {
      // Assumes algorithmWorker.js is in the public root directory and served accordingly.
      const worker = new Worker('/algorithmWorker.js'); 
      this.workers.set(i, { worker, status: 'idle', progress: 0, error: null });
    }
  }

  /**
   * Splits an array of data into a specified number of chunks for parallel processing.
   * @param {Array} data - The array to be split.
   * @param {number} numChunks - The desired number of chunks.
   * @returns {Array<Array>} An array of data chunks.
   */
  splitData(data, numChunks) {
    if (!data || data.length === 0) {
      return Array.from({ length: numChunks }, () => []);
    }
    const chunkSize = Math.ceil(data.length / numChunks);
    return Array.from({ length: numChunks }, (_, i) =>
      data.slice(i * chunkSize, (i + 1) * chunkSize)
    );
  }

  async executeChunk(workerId, algorithm, chunk, options) {
    const workerData = this.workers.get(workerId); // Retrieve the specific worker's data object.
    if (!workerData) {
      // This case should ideally not be reached if workers are initialized correctly.
      return Promise.reject(new Error(`Worker ${workerId} not found.`));
    }

    return new Promise((resolve, reject) => {
      // The worker's status is typically set to 'running' by `executeParallelAlgorithm` before this.
      workerData.progress = 0; // Reset progress for the new task.
      workerData.error = null; // Clear any previous error state for this worker.

      // Send the actual task (algorithm, data chunk, options) to the Web Worker.
      workerData.worker.postMessage({ type: 'execute', algorithm, data: chunk, options });

      // Define how to handle messages received from this specific worker.
      workerData.worker.onmessage = (event) => {
        const { type, progress, result, error: eventError, message: eventMessage } = event.data;
        
        if (type === 'progress') {
          // Update progress for this worker. Status remains 'running'.
          workerData.progress = progress;
        } else if (type === 'complete') {
          // Task completed successfully by the worker.
          workerData.status = 'completed';
          workerData.progress = 100;
          resolve(event.data); // Resolve with the full data from worker (includes result, timeTaken).
        } else if (type === 'error') {
          // Worker reported an error during its execution.
          workerData.status = 'error';
          workerData.error = eventError || eventMessage || 'Unknown worker error message';
          // Preserve progress if any was made, otherwise it's 0 or its last known value.
          workerData.progress = workerData.progress > 0 ? workerData.progress : 0; 
          reject(workerData.error); // Reject the promise for this chunk.
        }
      };

      // Handle critical errors in the worker itself (e.g., syntax errors in worker script, unhandled exceptions).
      workerData.worker.onerror = (errorEvent) => {
        workerData.status = 'error';
        workerData.error = errorEvent.message || 'Unhandled worker error';
        workerData.progress = workerData.progress > 0 ? workerData.progress : 0; 
        
        // Clean up message handlers to prevent memory leaks if the worker is in a bad state.
        workerData.worker.onmessage = null;
        workerData.worker.onerror = null;
        reject(workerData.error); // Reject the promise for this chunk.
      };
    });
  }

  /**
   * Executes a given algorithm in parallel across the worker pool.
   * Splits data, assigns chunks to workers, and aggregates results.
   * @param {string} algorithm - The name of the algorithm to execute (must exist in `algorithmWorker.js`).
   * @param {Array} data - The entire dataset to be processed.
   * @param {Object} options - Additional options for the algorithm execution.
   * @returns {Promise<Array>} A promise that resolves with an array of results from each worker
   *                           (typically { result: chunkResult, timeTaken: chunkTime }).
   */
  async executeParallelAlgorithm(algorithm, data, options) {
    // Ensure workers are initialized, especially if threadCount might have changed or it's the first run.
    // The visualizer currently calls initializeWorkers() if threadCount changes or before first execution.
    // This check provides an additional safeguard.
    if (this.workers.size !== this.threadCount || (this.workers.size === 0 && this.threadCount > 0)) {
        await this.initializeWorkers(); 
    }

    // Initialize/reset worker statuses to 'pending' before distributing tasks.
    for (let i = 0; i < this.threadCount; i++) {
        const workerData = this.workers.get(i);
        if (workerData) {
            workerData.status = 'pending'; // Mark as ready to receive a task.
            workerData.progress = 0;
            workerData.error = null;
        }
    }

    const chunks = this.splitData(data, this.threadCount); // Split data among workers.
    const promises = []; // Store promises for each worker's task execution.
    
    // Determine how many workers will actually be used based on data and thread count.
    const numTasks = Math.min(chunks.length, this.threadCount); 

    // Assign tasks (chunks) to workers.
    for (let i = 0; i < numTasks; i++) {
      const workerData = this.workers.get(i);
      if (workerData && chunks[i] && chunks[i].length > 0) { // Ensure worker and chunk are valid.
        workerData.status = 'running'; // Update status as the task is dispatched.
        promises.push(this.executeChunk(i, algorithm, chunks[i], options));
      } else if (workerData) {
        // If a worker is available but no chunk is assigned (e.g., data array is smaller than thread count).
        workerData.status = 'idle'; 
        workerData.progress = 100; // Mark as completed (having done no work).
      }
    }
    
    try {
        // Wait for all assigned tasks (promises) to complete.
        // Promise.all rejects immediately if any promise rejects.
        const results = await Promise.all(promises);
        return results; // Returns an array of {result, timeTaken} objects from each worker.
    } catch (error) {
        // This catch block is hit if any promise in Promise.all() rejects (i.e., a worker task fails).
        // Individual worker errors are handled within executeChunk, which sets workerData.status/error.
        console.error("Error supervising parallel execution:", error);
        // The 'finally' block is crucial for consistent state cleanup after errors.
        throw error; // Re-throw to be caught by the caller (e.g., the visualizer component).
    } finally {
        // This block executes after all promises have settled (either all resolved or at least one rejected).
        // It's used to reset worker statuses for future runs, ensuring they are 'idle'.
        for (let i = 0; i < this.threadCount; i++) {
            const workerData = this.workers.get(i);
            if (workerData) {
                if (workerData.status === 'completed' || workerData.status === 'running') {
                    // 'running' could happen if Promise.all threw before this worker completed its promise,
                    // though its own promise might still complete/error and update status.
                    // This ensures all non-errored workers are set to idle.
                    workerData.status = 'idle';
                }
                // If workerData.status is 'error', it remains 'error' until next execution (where it's reset)
                // or could be set to 'idle' here if we want immediate re-usability for non-critical errors.
                // For now, let's set them to idle for simplicity of UI. The error was captured.
                if (workerData.status === 'error') {
                    workerData.status = 'idle'; // Or keep 'error' if visualizer should show persistent error state
                }
            }
        }
    }
  }

  terminateWorkers() {
    this.workers.forEach(({ worker }) => {
      worker.terminate();
    });
    this.workers.clear();
  }

  async stopExecution() {
    console.log("Manager: Stopping all worker executions...");
    this.workers.forEach((workerData, workerId) => { // Note: Map.forEach is synchronous.
      if (workerData.worker) {
        workerData.worker.terminate(); // Abruptly stop the worker.
      }
      // The workerData object itself in the map will be replaced with a new one.
      // The visualizer should update its UI based on its own logic when stopExecution is called.
      
      // Replace the terminated worker with a new, idle worker instance for future tasks.
      // This makes the manager self-healing/resetting after a stop command.
      const newWorker = new Worker('/algorithmWorker.js');
      this.workers.set(workerId, { worker: newWorker, status: 'idle', progress: 0, error: null });
    });
    // All workers are now terminated and replaced. 
    // The visualizer is responsible for updating its display to reflect the 'aborted' action,
    // as the manager's internal state is now reset for a fresh run.
  }
}

export default ParallelAlgorithmManager;

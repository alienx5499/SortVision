import React, { useState, useEffect, useCallback, useRef } from 'react';
import ParallelAlgorithmManager from '@/lib/ParallelAlgorithmManager'; // Adjust path if necessary

// Define available algorithms for the parallel visualizer
const AVAILABLE_ALGORITHMS = {
  bubbleSort: { name: 'Bubble Sort' },
  mergeSort: { name: 'Merge Sort (Placeholder)' },
};

const ParallelSortingVisualizer = () => {
  const [threads, setThreads] = useState([]); // Stores state of each worker/thread
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort'); // Default to a valid key
  const [data, setData] = useState([]);
  const [numThreads, setNumThreads] = useState(typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4);
  const [manager, setManager] = useState(null); // Manages Web Workers
  const [lastRunReport, setLastRunReport] = useState(null); // Stores data for JSON export
  const intervalIdRef = useRef(null); // Ref to store the ID of the polling interval

  // Effect for initializing and cleaning up the ParallelAlgorithmManager and polling interval
  useEffect(() => {
    // Create a new manager instance on component mount
    const newManager = new ParallelAlgorithmManager();
    setManager(newManager);

    // Cleanup function to be called when the component unmounts
    return () => {
      if (newManager) {
        newManager.terminateWorkers(); // Terminate all active Web Workers
      }
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current); // Clear the polling interval
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleanup on unmount
  
  // useCallback for generating random data to memoize the function
  const generateData = useCallback(() => {
    const newData = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000) + 1);
    setData(newData);
    
    const initialThreadsState = Array(numThreads).fill(null).map((_, i) => ({
      id: i,
      status: 'idle',
      progress: 0,
      result: null,
      error: null,
    }));
    setThreads(initialThreadsState);
  }, [numThreads]); // Re-generate if numThreads changes

  // Effect to generate initial data when the component mounts or when generateData function is updated
  useEffect(() => {
    generateData();
  }, [generateData]); 

  // Handler for changing the selected algorithm
  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  // Handler for changing the number of threads
  const handleNumThreadsChange = (event) => {
    const count = parseInt(event.target.value, 10);
    const maxThreads = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
    if (count > 0 && count <= maxThreads) {
      setNumThreads(count);
      // Regenerate thread UI placeholders for the new count
      // Data will be regenerated via useEffect listening to generateData, which depends on numThreads
    }
  };
  
  const startParallelExecution = async () => {
    if (!manager || data.length === 0) return;

    setIsRunning(true);
    
    // Configure manager for the current number of threads and initialize workers
    manager.threadCount = numThreads; 
    await manager.initializeWorkers(); 

    // Initialize threads UI state for execution
    const initialExecutionThreadsState = Array(numThreads).fill(null).map((_, i) => ({
        id: i,
        status: 'pending', // Initial status before tasks are formally assigned by manager
        progress: 0,
        result: null,
        error: null,
    }));
    setThreads(initialExecutionThreadsState);
    setLastRunReport(null); // Clear previous report
    
    const overallStartTime = performance.now(); // Measure overall time for the entire parallel execution

    // Clear any existing interval before starting a new one to prevent multiple intervals
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    // Start polling for worker progress and status
    intervalIdRef.current = setInterval(() => {
        if (!manager || manager.workers.size === 0) return; // Guard against manager not being ready

        const currentThreadsState = Array(numThreads).fill(null).map((_, i) => {
            const workerData = manager.workers.get(i); // Get data for worker `i`
            if (workerData) {
                // If worker data exists, map it to the UI thread state
                return {
                    id: i,
                    status: workerData.status,
                    progress: workerData.progress,
                    result: null, // Result is typically handled once at the end
                    error: workerData.error || null, // Capture any error from the worker
                };
            }
            // Fallback if workerData is not yet available (e.g., manager still initializing)
            return { 
                id: i, 
                status: 'uninitialized', 
                progress: 0, 
                result: null, 
                error: null 
            };
        });
        setThreads(currentThreadsState); // Update the UI
    }, 200); // Polling interval: update UI every 200ms

    try {
      // Execute the parallel algorithm using the manager
      const executionResults = await manager.executeParallelAlgorithm(selectedAlgorithm, data, { /* options */ });
      const overallEndTime = performance.now(); // Record end time for successful execution
      
      // Update UI with final results and states from the manager
      const finalThreadsState = Array(numThreads).fill(null).map((_, i) => {
        const workerData = manager.workers.get(i);
        const execResult = executionResults && executionResults[i] ? executionResults[i] : null; 
        
        return {
          id: i,
          status: workerData ? workerData.status : 'idle', // Should be 'idle' after successful completion
          progress: workerData ? workerData.progress : (workerData?.status === 'idle' ? 100 : 0),
          result: execResult?.result || null,
          error: workerData ? workerData.error : null,
          timeTaken: execResult?.timeTaken || null, // Time taken for this specific chunk
        };
      });
      setThreads(finalThreadsState);

      // Prepare and set the report for this successful run
      const report = {
        algorithm: AVAILABLE_ALGORITHMS[selectedAlgorithm]?.name || selectedAlgorithm,
        numThreads,
        dataSize: data.length,
        totalExecutionTimeMs: parseFloat((overallEndTime - overallStartTime).toFixed(2)),
        threadsInfo: executionResults.map((execResult, i) => {
          const workerEntry = manager.workers.get(i);
          return {
            id: i,
            finalStatus: workerEntry?.status || 'completed', 
            finalProgress: workerEntry?.progress || 100,
            chunkProcessingTimeMs: execResult?.timeTaken ? parseFloat(execResult.timeTaken.toFixed(2)) : null,
            itemsProcessed: execResult?.result?.length || 0,
          };
        }),
        executionStatus: 'Completed',
        timestamp: new Date().toISOString(),
      };
      setLastRunReport(report);

    } catch (error) {
      const overallEndTime = performance.now(); // Record end time even if an error occurs
      console.error("ParallelSortingVisualizer: Parallel execution failed:", error);
      
      // Update UI to show error states
      const errorThreadsState = Array(numThreads).fill(null).map((_, i) => {
           const workerData = manager.workers.get(i);
           return {
               id: i,
               status: workerData ? workerData.status : 'error', // Reflect error status from manager
               progress: workerData ? workerData.progress : 0,
               error: workerData?.error || (i === 0 ? error.message : 'N/A'), // Show main error on first thread for clarity
               result: null,
           };
       });
      setThreads(errorThreadsState);

      // Prepare and set a report for the failed run
      const errorReport = {
        algorithm: AVAILABLE_ALGORITHMS[selectedAlgorithm]?.name || selectedAlgorithm,
        numThreads,
        dataSize: data.length,
        totalExecutionTimeMs: parseFloat((overallEndTime - overallStartTime).toFixed(2)),
        executionStatus: 'Failed',
        errorMessage: error.message,
        threadsInfo: Array(numThreads).fill(null).map((_, i) => {
            const workerEntry = manager.workers.get(i);
            return {
                id: i,
                finalStatus: workerEntry?.status || 'error',
                finalProgress: workerEntry?.progress || 0,
                error: workerEntry?.error ? (typeof workerEntry.error === 'string' ? workerEntry.error : JSON.stringify(workerEntry.error)) : (i === 0 ? error.message : 'N/A'),
            };
        }),
        timestamp: new Date().toISOString(),
      };
      setLastRunReport(errorReport);

    } finally {
      // This block executes regardless of success or failure
      setIsRunning(false); // Mark execution as no longer running
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current); // Stop polling
        intervalIdRef.current = null;
      }
      // Final UI sync: Ensure UI reflects the absolute final state from the manager
        if (manager) {
            const finalSyncStateFromManager = Array(numThreads).fill(null).map((_, i) => {
                const workerData = manager.workers.get(i); // Manager's workers should be 'idle' or 'error' now
                const currentUIThread = threads.find(t => t.id === i) || {}; 
                return {
                    id: i,
                    status: workerData ? workerData.status : 'idle', 
                    progress: workerData ? workerData.progress : (workerData?.status === 'idle' ? 100 : 0),
                    result: currentUIThread.result, 
                    error: workerData?.error || currentUIThread.error, 
                    timeTaken: currentUIThread.timeTaken, 
                };
            });
            setThreads(finalSyncStateFromManager);
        }
    }
  };

  // Handler for the "Stop Execution" button
  const handleStopExecution = () => {
    if (manager) {
      manager.stopExecution(); // Instructs the manager to terminate workers
    }
    setIsRunning(false); // Update running state
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current); // Stop polling
      intervalIdRef.current = null;
    }
    // Manually update UI to reflect 'aborted' state for all threads
    setThreads(prevThreads => prevThreads.map(t => ({
      ...t,
      status: 'aborted',
      progress: 0, 
    })));
    // Create a report for the aborted run
    setLastRunReport({
      algorithm: AVAILABLE_ALGORITHMS[selectedAlgorithm]?.name || selectedAlgorithm,
      numThreads,
      dataSize: data.length,
      totalExecutionTimeMs: 0, // Or calculate elapsed time until stop if meaningful
      executionStatus: 'Aborted',
      threadsInfo: threads.map(t => ({ id: t.id, finalStatus: 'aborted', finalProgress: t.progress, error: 'Execution stopped by user.' })),
      timestamp: new Date().toISOString(),
    });
  };

  // Handler for exporting the last run report as JSON
  const exportReport = () => {
    if (!lastRunReport) return;
    const jsonString = JSON.stringify(lastRunReport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const algoName = (lastRunReport.algorithm || 'report').replace(/\s+/g, '_');
    const dateStr = lastRunReport.timestamp ? lastRunReport.timestamp.slice(0,10) : new Date().toISOString().slice(0,10);
    a.download = `parallel_sort_report_${dateStr}_${algoName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="parallel-visualizer glass-morphic p-4 bg-slate-800 text-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">Parallel Algorithm Visualizer</h2>
      
      <div className="controls grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="algorithm-select" className="block text-sm font-medium text-slate-300 mb-1">Algorithm:</label>
          <select 
            id="algorithm-select"
            value={selectedAlgorithm} 
            onChange={handleAlgorithmChange}
            disabled={isRunning}
            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {Object.keys(AVAILABLE_ALGORITHMS).map(algoKey => (
              <option key={algoKey} value={algoKey}>{AVAILABLE_ALGORITHMS[algoKey].name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="thread-count-input" className="block text-sm font-medium text-slate-300 mb-1">Thread Count (Max: {typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4}):</label>
          <input 
            id="thread-count-input"
            type="number" 
            min="1" 
            max={typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4}
            value={numThreads}
            onChange={handleNumThreadsChange}
            disabled={isRunning}
            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <button 
          onClick={generateData}
          disabled={isRunning}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 transition duration-150 ease-in-out self-end"
        >
          Generate New Data
        </button>
      </div>

      <button 
        onClick={isRunning ? handleStopExecution : startParallelExecution}
        disabled={isRunning ? false : (!manager || data.length === 0)}
        className={`w-full text-white font-bold py-3 px-6 rounded mb-2 transition duration-150 ease-in-out text-lg
                    ${isRunning 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50'}`}
      >
        {isRunning ? 'Stop Execution' : 'Start Parallel Execution'}
      </button>

      <button
        onClick={exportReport}
        disabled={!lastRunReport} // Allow export even if running, report is of *last completed/aborted* run
        className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded mb-6 disabled:opacity-50 transition duration-150 ease-in-out"
      >
        Export Last Run Report (JSON)
      </button>
      
      <div className="threads-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {threads.map((thread, index) => (
          <div key={thread ? thread.id : index} className="thread bg-slate-700 p-4 rounded-md shadow">
            <div className="thread-header flex justify-between items-center mb-2">
              <span className="thread-id font-semibold text-emerald-400">Thread {thread ? thread.id : index}</span>
              <span className={`thread-status text-xs px-2 py-1 rounded-full ${
                thread?.status === 'pending' ? 'bg-sky-500 text-sky-900' :
                thread?.status === 'running' ? 'bg-yellow-500 text-yellow-900' :
                thread?.status === 'completed' || (thread?.status === 'idle' && thread?.progress === 100 && !thread.error && !isRunning) ? 'bg-green-500 text-green-900' :
                thread?.status === 'aborted' ? 'bg-orange-500 text-orange-900' :
                thread?.status === 'error' ? 'bg-red-500 text-red-900' :
                'bg-slate-500 text-slate-900' // idle (not run or after abort), uninitialized
              }`}>
                {thread ? thread.status : 'N/A'}
              </span>
            </div>
            <div className="progress-bar w-full bg-slate-600 rounded h-6 overflow-hidden my-2">
              <div 
                className={`progress h-full rounded transition-all duration-300 ease-out flex items-center justify-center
                            ${thread?.status === 'error' ? 'bg-red-600' : 'bg-emerald-500'}`}
                style={{ width: `${thread ? thread.progress : 0}%` }}
              >
                <span className="text-xs text-white font-medium pl-1 pr-1">{thread ? thread.progress : 0}%</span>
              </div>
            </div>
            {thread?.result && <p className="text-green-400 text-xs mt-1 truncate" title={JSON.stringify(thread.result)}>Result (first 5): {JSON.stringify(thread.result.slice(0,5))}...</p>}
            {thread?.timeTaken !== null && typeof thread?.timeTaken === 'number' && <p className="text-sky-300 text-xs mt-1">Time: {thread.timeTaken.toFixed(2)}ms</p>}
            {thread?.error && <p className="text-red-400 text-xs mt-1 break-words" title={typeof thread.error === 'string' ? thread.error : JSON.stringify(thread.error) }>Error: {typeof thread.error === 'string' ? thread.error.substring(0,50) : JSON.stringify(thread.error).substring(0,50)}...</p>}
          </div>
        ))}
      </div>
      {/* Further UI for displaying combined sorted data can be added here */}
    </div>
  );
};

export default ParallelSortingVisualizer;

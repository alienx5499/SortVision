import React from 'react';
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
  mergeSort,
  radixSort,
  heapSort,
  bucketSort,
} from '../../algorithms';

/**
 * SortingControls Component
 *
 * Provides utility functions for controlling sorting operations:
 * - Generating new arrays
 * - Starting and stopping sorting
 * - Testing all algorithms
 */
const SortingControls = () => {
  /**
   * Generates a new random array for visualization
   *
   * @param {number} arraySize - Size of the array to generate
   * @param {Function} setArray - State setter for the array
   * @param {Function} setCurrentBar - State setter for the current bar
   * @returns {void}
   */
  const generateNewArray = (arraySize, setArray, setCurrentBar) => {
    const newArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setCurrentBar({ compare: null, swap: null });
  };

  /**
   * Stops the current sorting process
   *
   * @param {Object} shouldStopRef - Reference to the stop flag
   * @param {Function} setIsStopped - State setter for the stopped flag
   * @param {Function} setIsSorting - State setter for the sorting flag
   * @returns {void}
   */
  const stopSorting = (shouldStopRef, setIsStopped, setIsSorting) => {
    shouldStopRef.current = true;
    setIsStopped(true);
    setIsSorting(false);
  };

  /**
   * Initiates the sorting process with the selected algorithm
   *
   * @param {string} algorithm - The selected sorting algorithm
   * @param {Array} array - The array to sort
   * @param {Function} setArray - State setter for the array
   * @param {number} speed - The animation speed
   * @param {Function} setCurrentBar - State setter for the current bar
   * @param {Object} shouldStopRef - Reference to the stop flag
   * @param {Function} setIsStopped - State setter for the stopped flag
   * @param {Function} setIsSorting - State setter for the sorting flag
   * @param {Function} setMetrics - State setter for the metrics
   * @param {Object} audio - Audio control object
   * @returns {Promise<void>}
   */
  const startSorting = async (
    algorithm,
    array,
    setArray,
    speed,
    setCurrentBar,
    shouldStopRef,
    setIsStopped,
    setIsSorting,
    setMetrics,
    audio
  ) => {
    // Reset sorting state
    shouldStopRef.current = false;
    setIsStopped(false);
    setIsSorting(true);
    const startTime = performance.now();

    let metrics = { swaps: 0, comparisons: 0 };
    try {
      // Execute the selected sorting algorithm
      switch (algorithm) {
        case 'bubble':
          metrics = await bubbleSort(
            array,
            setArray,
            speed,
            setCurrentBar,
            shouldStopRef,
            audio
          );
          break;
        case 'insertion':
          metrics = await insertionSort(
            array,
            setArray,
            speed,
            setCurrentBar,
            shouldStopRef,
            audio
          );
          break;
        case 'selection':
          metrics = await selectionSort(
            array,
            setArray,
            speed,
            setCurrentBar,
            shouldStopRef,
            audio
          );
          break;
        case 'quick':
          metrics = await quickSort(
            array,
            setArray,
            speed,
            setCurrentBar,
            shouldStopRef,
            audio
          );
          break;
        case 'merge':
          metrics = await mergeSort(
            array,
            setArray,
            speed,
            setCurrentBar,
            shouldStopRef,
            audio
          );
          break;
        case 'radix':
          metrics = await radixSort(
            array,
            setArray,
            speed,
            setCurrentBar,
            shouldStopRef,
            audio
          );
          break;
        case 'heap':
          metrics = await heapSort(
            array,
            setArray,
            speed,
            setCurrentBar,
            shouldStopRef,
            audio
          );
          break;
        case 'bucket':
          metrics = await bucketSort(
            array,
            setArray,
            speed,
            setCurrentBar,
            shouldStopRef,
            audio
          );
          break;
        default:
          break;
      }
    } catch (error) {
      console.log('Sorting was stopped:', error);
      setIsSorting(false);
      setIsStopped(true);
      return;
    }

    // Calculate and record performance metrics
    const endTime = performance.now();
    setMetrics({
      swaps: metrics.swaps || 0,
      comparisons: metrics.comparisons || 0,
      time: (endTime - startTime).toFixed(2),
    });

    setIsSorting(false);
  };

  /**
   * Benchmarks all sorting algorithms on the same array for comparison
   *
   * @param {Array} array - The array to sort
   * @param {Function} setArray - State setter for the array
   * @param {number} speed - The animation speed
   * @param {Function} setCurrentBar - State setter for the current bar
   * @param {Object} shouldStopRef - Reference to the stop flag
   * @param {Function} setIsStopped - State setter for the stopped flag
   * @param {Function} setIsSorting - State setter for the sorting flag
   * @param {Function} setCurrentTestingAlgo - State setter for the current testing algorithm
   * @param {Function} setCompareMetrics - State setter for the comparison metrics
   * @param {Function} setSortedMetrics - State setter for the sorted metrics
   * @param {Object} audio - Audio control object
   * @returns {Promise<void>}
   */
  const testAllAlgorithms = async (
    array,
    setArray,
    speed,
    setCurrentBar,
    shouldStopRef,
    setIsStopped,
    setIsSorting,
    setCurrentTestingAlgo,
    setCompareMetrics,
    setSortedMetrics,
    audio
  ) => {
    setIsSorting(true);
    shouldStopRef.current = false;
    setIsStopped(false);

    const algorithms = [
      'bubble',
      'insertion',
      'selection',
      'bucket',
      'radix',
      'heap',
      'merge',
      'quick',
    ];
    const results = {};

    // Clone the original array for consistent testing
    const originalArray = [...array];

    // Test each algorithm sequentially
    for (const algo of algorithms) {
      if (shouldStopRef.current) break; // Stop if user cancelled

      // Update UI to show current algorithm being tested
      setCurrentTestingAlgo(algo);
      setArray([...originalArray]);
      const startTime = performance.now();

      let metrics = { swaps: 0, comparisons: 0 };
      try {
        // Execute the current algorithm
        switch (algo) {
          case 'bubble':
            metrics = await bubbleSort(
              [...originalArray],
              setArray,
              speed,
              setCurrentBar,
              shouldStopRef,
              audio
            );
            break;
          case 'insertion':
            metrics = await insertionSort(
              [...originalArray],
              setArray,
              speed,
              setCurrentBar,
              shouldStopRef,
              audio
            );
            break;
          case 'selection':
            metrics = await selectionSort(
              [...originalArray],
              setArray,
              speed,
              setCurrentBar,
              shouldStopRef,
              audio
            );
            break;
          case 'quick':
            metrics = await quickSort(
              [...originalArray],
              setArray,
              speed,
              setCurrentBar,
              shouldStopRef,
              audio
            );
            break;
          case 'merge':
            metrics = await mergeSort(
              [...originalArray],
              setArray,
              speed,
              setCurrentBar,
              shouldStopRef,
              audio
            );
            break;
          case 'radix':
            metrics = await radixSort(
              [...originalArray],
              setArray,
              speed,
              setCurrentBar,
              shouldStopRef,
              audio
            );
            break;
          case 'heap':
            metrics = await heapSort(
              [...originalArray],
              setArray,
              speed,
              setCurrentBar,
              shouldStopRef,
              audio
            );
            break;
          case 'bucket':
            metrics = await bucketSort(
              [...originalArray],
              setArray,
              speed,
              setCurrentBar,
              shouldStopRef,
              audio
            );
            break;
          default:
            break;
        }

        // Record metrics for this algorithm
        const endTime = performance.now();
        results[algo] = {
          swaps: metrics.swaps || 0,
          comparisons: metrics.comparisons || 0,
          time: (endTime - startTime).toFixed(2),
        };
      } catch (error) {
        console.log(`Error testing ${algo}:`, error);
      }
    }

    // Reset testing state and update results
    setCurrentTestingAlgo(null);
    setCompareMetrics(results);

    // Sort algorithms by execution time (fastest first)
    const sortedResults = Object.entries(results)
      .sort(([, a], [, b]) => parseFloat(a.time) - parseFloat(b.time))
      .map(([algo, metrics], index) => ({
        algo,
        metrics,
        rank: index + 1,
      }));

    setSortedMetrics(sortedResults);
    setIsSorting(false);
  };

  // Export the utility functions
  return {
    generateNewArray,
    stopSorting,
    startSorting,
    testAllAlgorithms,
  };
};

export default SortingControls;

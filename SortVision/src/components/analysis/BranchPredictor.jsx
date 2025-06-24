import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSorting } from '../../context/SortingContext';

const BranchPredictor = () => {
  const { algorithm, isSorting, array } = useSorting();
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!isSorting || !array) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    svg.selectAll('*').remove();

    const width = svg.node().clientWidth;
    const height = 300;
    svg.attr('height', height);

    // Simulate branch prediction data
    const branchData = simulateBranchPrediction(array, algorithm);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, branchData.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Draw prediction accuracy
    svg.append('path')
      .datum(branchData)
      .attr('fill', 'none')
      .attr('stroke', '#8b5cf6')
      .attr('stroke-width', 2)
      .attr('d', d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d.accuracy * 100)));

    // Add threshold line
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', yScale(90))
      .attr('y2', yScale(90))
      .attr('stroke', '#f59e0b')
      .attr('stroke-dasharray', '5,5');

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d}%`));

    // Add annotation
    svg.append('text')
      .attr('x', width - 100)
      .attr('y', yScale(90) - 5)
      .text('90% Target')
      .style('font-size', '12px')
      .style('fill', '#f59e0b');

  }, [isSorting, array, algorithm]);

  return (
    <div className="branch-predictor">
      <h3 className="text-lg font-semibold mb-2">Branch Prediction Analysis</h3>
      <div className="relative">
        <svg ref={svgRef} width="100%" className="border rounded-lg bg-gray-50" />
        <div ref={tooltipRef} className="absolute opacity-0 bg-gray-800 text-white px-2 py-1 rounded text-xs" />
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p>Shows simulated branch prediction accuracy during algorithm execution.</p>
      </div>
    </div>
  );
};

function simulateBranchPrediction(array, algorithm) {
  const data = [];
  const baseAccuracy = getBaseAccuracy(algorithm);
  
  for (let i = 0; i < array.length; i++) {
    const progress = i / array.length;
    const noise = (Math.random() - 0.5) * 0.05;
    const trend = getTrendFactor(algorithm, progress);
    
    data.push({
      accuracy: Math.min(0.99, Math.max(0.7, baseAccuracy + trend + noise))
    });
  }
  
  return data;
}

function getBaseAccuracy(algorithm) {
  const accuracies = {
    'quickSort': 0.85,
    'mergeSort': 0.92,
    'heapSort': 0.88,
    'bubbleSort': 0.75,
    'insertionSort': 0.78,
    'selectionSort': 0.76,
    'radixSort': 0.95,
    'bucketSort': 0.90
  };
  return accuracies[algorithm] || 0.8;
}

function getTrendFactor(algorithm, progress) {
  // Some algorithms get better/worse as they progress
  const trends = {
    'quickSort': progress * 0.1,
    'mergeSort': 0,
    'heapSort': -progress * 0.05,
    'bubbleSort': progress * 0.15,
    'insertionSort': progress * 0.1,
    'selectionSort': 0,
    'radixSort': 0,
    'bucketSort': -progress * 0.05
  };
  return trends[algorithm] || 0;
}

export default BranchPredictor;
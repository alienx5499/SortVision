import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSorting } from '../../context/SortingContext';

const MemoryTracker = () => {
  const { algorithm, isSorting, array } = useSorting();
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!isSorting || !array) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);

    // Clear previous visualization
    svg.selectAll('*').remove();

    // Setup dimensions
    const width = svg.node().clientWidth;
    const height = 300;
    svg.attr('height', height);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, array.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(array, d => d.value)])
      .range([height, 0]);

    // Create memory usage simulation
    const memoryData = simulateMemoryUsage(array, algorithm);

    // Draw memory usage
    svg.append('path')
      .datum(memoryData)
      .attr('fill', 'none')
      .attr('stroke', '#4f46e5')
      .attr('stroke-width', 2)
      .attr('d', d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d.usage))
      )
      .on('mouseover', (event, d) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`Memory: ${d.usage ? d.usage.toFixed(2) : ''}MB`)
          .style('left', (event.pageX) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale));

  }, [isSorting, array, algorithm]);

  return (
    <div className="memory-tracker">
      <h3 className="text-lg font-semibold mb-2">Memory Usage Analysis</h3>
      <div className="relative">
        <svg ref={svgRef} width="100%" className="border rounded-lg bg-gray-50" />
        <div ref={tooltipRef} className="absolute opacity-0 bg-gray-800 text-white px-2 py-1 rounded text-xs" />
      </div>
    </div>
  );
};

// Helper function to simulate memory usage
function simulateMemoryUsage(array, algorithm) {
  // This is a simplified simulation - in a real app you'd use actual measurements
  const baseMemory = array.length * 4 / 1024 / 1024; // MB
  const complexityFactor = getAlgorithmComplexityFactor(algorithm);
  
  return array.map((_, i) => {
    const progress = i / array.length;
    return {
      usage: baseMemory * (1 + complexityFactor * progress * Math.random() * 0.5)
    };
  });
}

function getAlgorithmComplexityFactor(algorithm) {
  const factors = {
    'quickSort': 0.8,
    'mergeSort': 1.2,
    'heapSort': 1.0,
    'bubbleSort': 0.5,
    'insertionSort': 0.6,
    'selectionSort': 0.5,
    'radixSort': 1.5,
    'bucketSort': 1.3
  };
  return factors[algorithm] || 1.0;
}

export default MemoryTracker;
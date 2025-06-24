import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSorting } from '../../context/SortingContext';

const CacheAnalyzer = () => {
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

    // Simulate cache performance data
    const cacheData = simulateCachePerformance(array, algorithm);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, cacheData.length - 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    // Draw hit rate
    svg.append('path')
      .datum(cacheData)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2)
      .attr('d', d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d.hitRate * 100)));

    // Draw miss rate
    svg.append('path')
      .datum(cacheData)
      .attr('fill', 'none')
      .attr('stroke', '#ef4444')
      .attr('stroke-width', 2)
      .attr('d', d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d.missRate * 100)));

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 100}, 20)`);

    legend.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', '#10b981');

    legend.append('text')
      .attr('x', 15)
      .attr('y', 10)
      .text('Hit Rate')
      .style('font-size', '12px');

    legend.append('rect')
      .attr('y', 20)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', '#ef4444');

    legend.append('text')
      .attr('x', 15)
      .attr('y', 30)
      .text('Miss Rate')
      .style('font-size', '12px');

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => `${d}%`));

  }, [isSorting, array, algorithm]);

  return (
    <div className="cache-analyzer">
      <h3 className="text-lg font-semibold mb-2">Cache Performance Analysis</h3>
      <div className="relative">
        <svg ref={svgRef} width="100%" className="border rounded-lg bg-gray-50" />
        <div ref={tooltipRef} className="absolute opacity-0 bg-gray-800 text-white px-2 py-1 rounded text-xs" />
      </div>
    </div>
  );
};

function simulateCachePerformance(array, algorithm) {
  const data = [];
  const cacheSize = 32; // Simulated cache size in blocks
  
  for (let i = 0; i < array.length; i++) {
    const progress = i / array.length;
    const localityFactor = getLocalityFactor(algorithm, progress);
    
    // Simulate hit/miss rates based on algorithm characteristics
    const baseHitRate = 0.7 * localityFactor;
    const noise = (Math.random() - 0.5) * 0.1;
    
    data.push({
      hitRate: Math.min(0.95, Math.max(0.5, baseHitRate + noise)),
      missRate: 1 - (baseHitRate + noise)
    });
  }
  
  return data;
}

function getLocalityFactor(algorithm, progress) {
  // Algorithms with better locality have higher factors
  const factors = {
    'quickSort': 0.9 - progress * 0.2,
    'mergeSort': 0.8,
    'heapSort': 0.7,
    'bubbleSort': 0.6 + progress * 0.3,
    'insertionSort': 0.7 + progress * 0.2,
    'selectionSort': 0.6,
    'radixSort': 0.9,
    'bucketSort': 0.85
  };
  return factors[algorithm] || 0.7;
}

export default CacheAnalyzer;
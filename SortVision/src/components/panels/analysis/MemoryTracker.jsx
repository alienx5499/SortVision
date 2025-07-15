// src/components/panels/analysis/MemoryTracker.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function MemoryTracker({ snapshots }) {
  const svgRef = useRef();
  
  useEffect(() => {
    if (!snapshots.length) return;
    
    const svg = d3.select(svgRef.current);
    const width = svg.node().clientWidth;
    const height = 300;
    
    // Clear previous
    svg.selectAll('*').remove();
    
    // Set up scales
    const x = d3.scaleLinear()
      .domain([0, d3.max(snapshots, d => d.timestamp - snapshots[0].timestamp)])
      .range([0, width]);
      
    const y = d3.scaleLinear()
      .domain([0, d3.max(snapshots, d => d.totalMemory)])
      .range([height, 0]);
      
    // Create line generator
    const line = d3.line()
      .x(d => x(d.timestamp - snapshots[0].timestamp))
      .y(d => y(d.totalMemory));
      
    // Draw line
    svg.append('path')
      .datum(snapshots)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
      
    // Add axes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));
      
    svg.append('g')
      .call(d3.axisLeft(y));
  }, [snapshots]);
  
  return (
    <div className="memory-tracker">
      <h3>Memory Usage</h3>
      <svg ref={svgRef} width="100%" height="300"></svg>
    </div>
  );
}
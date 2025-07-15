// src/components/panels/analysis/CacheAnalyzer.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function CacheAnalyzer({ hits, misses }) {
  const data = {
    labels: ['Cache Hits', 'Cache Misses'],
    datasets: [{
      data: [hits, misses],
      backgroundColor: ['#36A2EB', '#FF6384'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384']
    }]
  };
  
  return (
    <div className="cache-analyzer">
      <h3>Cache Performance</h3>
      <p>Hit Rate: {(hits / (hits + misses) * 100).toFixed(2)}%</p>
      <Doughnut data={data} />
    </div>
  );
}
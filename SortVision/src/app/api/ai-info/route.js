import { NextResponse } from 'next/server';

/**
 * GEO Endpoint: /api/ai-info
 * Provides structured JSON metadata for AI crawlers and LLMs
 * Returns aiSummary, features, exampleQueries, and lastUpdated
 */
export async function GET() {
  const aiInfo = {
    aiSummary:
      'SortVision is an interactive sorting algorithm visualizer that helps users learn Bubble, Merge, Quick, Heap, Insertion, Selection, Radix, and Bucket Sort through real-time animations, performance metrics, and step-by-step explanations. Perfect for students learning DSA, developers preparing for coding interviews, and educators teaching computer science.',
    features: [
      'Visualize multiple sorting algorithms',
      'Adjustable speed and array size',
      'Real-time comparisons and performance metrics',
      'Interactive step-by-step controls',
      '8 major sorting algorithms: Bubble, Merge, Quick, Insertion, Selection, Heap, Radix, and Bucket Sort',
      'Code implementations in 20+ programming languages',
      'Time complexity analysis',
      'Performance comparison tools',
      'Mobile-responsive design',
      'Free and open-source',
    ],
    exampleQueries: [
      'show me a sorting algorithm visualizer',
      'learn bubble sort with animation',
      'explain merge sort visually',
      'compare quicksort vs bubble sort',
      'interactive sorting algorithm demo',
      'best algorithm visualization tool',
      'sorting algorithms for coding interviews',
      'DSA learning platform',
      'algorithm visualizer free',
    ],
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  return NextResponse.json(aiInfo, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

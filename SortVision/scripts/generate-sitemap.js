/**
 * Sitemap Generator for SortVision
 *
 * This script generates a sitemap.xml file based on the available
 * algorithm pages. Run this script to update the sitemap whenever
 * new algorithms are added or existing ones are modified.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Algorithm information
const algorithms = [
  'bubble',
  'insertion',
  'selection',
  'merge',
  'quick',
  'heap',
  'radix',
  'bucket',
];

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  console.log('Current date components:', { year, month, day });

  return `${year}-${month}-${day}`;
};

// Generate sitemap XML content
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  console.log('Generated date for sitemap:', currentDate);

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Homepage -->
  <url>
    <loc>https://www.sortvision.com/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://www.sortvision.com/og-image.png</image:loc>
      <image:title>SortVision - Sorting Algorithm Visualizer</image:title>
      <image:caption>Interactive visualization of sorting algorithms</image:caption>
    </image:image>
  </url>

  <!-- Algorithm Pages -->`;

  // Add entries for each algorithm with different tabs
  algorithms.forEach(algorithm => {
    const capitalizedAlgorithm =
      algorithm.charAt(0).toUpperCase() + algorithm.slice(1);

    // Config tab (default)
    sitemap += `
  <url>
    <loc>https://www.sortvision.com/algorithms/config/${algorithm}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://www.sortvision.com/og-image.png</image:loc>
      <image:title>${capitalizedAlgorithm} Sort Configuration - SortVision</image:title>
      <image:caption>Configure and run ${capitalizedAlgorithm} Sort algorithm</image:caption>
    </image:image>
  </url>`;

    // Details tab
    sitemap += `
  <url>
    <loc>https://www.sortvision.com/algorithms/details/${algorithm}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://www.sortvision.com/og-image.png</image:loc>
      <image:title>${capitalizedAlgorithm} Sort Algorithm Details - SortVision</image:title>
      <image:caption>Learn about ${capitalizedAlgorithm} Sort algorithm implementation and complexity</image:caption>
    </image:image>
  </url>`;

    // Metrics tab
    sitemap += `
  <url>
    <loc>https://www.sortvision.com/algorithms/metrics/${algorithm}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://www.sortvision.com/og-image.png</image:loc>
      <image:title>${capitalizedAlgorithm} Sort Performance Metrics - SortVision</image:title>
      <image:caption>Analyze ${capitalizedAlgorithm} Sort algorithm performance and metrics</image:caption>
    </image:image>
  </url>`;
  });

  // Add contributions pages
  sitemap += `
  <url>
    <loc>https://www.sortvision.com/contributions/overview</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://www.sortvision.com/og-image.png</image:loc>
      <image:title>SortVision Contributors Overview</image:title>
      <image:caption>View contributor statistics and repository health</image:caption>
    </image:image>
  </url>`;

  sitemap += `
  <url>
    <loc>https://www.sortvision.com/contributions/guide</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://www.sortvision.com/og-image.png</image:loc>
      <image:title>SortVision Contribution Guide</image:title>
      <image:caption>Learn how to contribute to SortVision project</image:caption>
    </image:image>
  </url>`;

  sitemap += `
  <url>
    <loc>https://www.sortvision.com/contributions/ssoc</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>https://www.sortvision.com/og-image.png</image:loc>
      <image:title>SortVision SSOC Leaderboard</image:title>
      <image:caption>View SSOC contributor leaderboard and rankings</image:caption>
    </image:image>
  </url>`;

  sitemap += `
</urlset>`;

  return sitemap;
};

// Write sitemap to file
const writeSitemap = () => {
  const sitemap = generateSitemap();
  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');

  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated successfully at ${outputPath}`);
};

writeSitemap();

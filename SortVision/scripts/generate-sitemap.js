#!/usr/bin/env node

/**
 * Sitemap Generator Script
 * 
 * This script generates a comprehensive sitemap.xml file for SortVision
 * with support for multiple languages and all algorithm pages.
 */

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.sortvision.com';
const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh'];
const algorithms = [
  'bubble', 'insertion', 'selection', 'merge', 'quick', 
  'heap', 'radix', 'bucket'
];

function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  // Generate homepage URLs for all languages
  supportedLanguages.forEach(lang => {
    const path = lang === 'en' ? '' : `/${lang}`;
    
    sitemap += `
  <!-- Homepage - ${lang.toUpperCase()} -->
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${lang === 'en' ? '1.0' : '0.9'}</priority>`;
    
    // Add hreflang links
    supportedLanguages.forEach(hreflang => {
      const hreflangPath = hreflang === 'en' ? '' : `/${hreflang}`;
      sitemap += `
    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${baseUrl}${hreflangPath}"/>`;
    });
    
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/"/>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>SortVision - Sorting Algorithm Visualizer</image:title>
      <image:caption>Interactive visualization of sorting algorithms</image:caption>
    </image:image>
  </url>`;
  });

  // Generate algorithm pages for all languages
  supportedLanguages.forEach(lang => {
    const langPath = lang === 'en' ? '' : `/${lang}`;
    
    algorithms.forEach(algorithm => {
      const tabs = ['config', 'details', 'metrics'];
      const priorities = [0.8, 0.7, 0.6];
      
      tabs.forEach((tab, index) => {
        sitemap += `
  <url>
    <loc>${baseUrl}${langPath}/algorithms/${tab}/${algorithm}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priorities[index]}</priority>`;
        
        // Add hreflang links
        supportedLanguages.forEach(hreflang => {
          const hreflangPath = hreflang === 'en' ? '' : `/${hreflang}`;
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${baseUrl}${hreflangPath}/algorithms/${tab}/${algorithm}"/>`;
        });
        
        sitemap += `
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort ${tab.charAt(0).toUpperCase() + tab.slice(1)} - SortVision</image:title>
      <image:caption>${tab === 'config' ? 'Configure and run' : tab === 'details' ? 'Learn about' : 'Analyze'} ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort algorithm</image:caption>
    </image:image>
  </url>`;
      });
    });
  });

  // Generate contributions pages for all languages
  supportedLanguages.forEach(lang => {
    const langPath = lang === 'en' ? '' : `/${lang}`;
    
    const contributionPages = [
      'contributions',
      'contributions/overview',
      'contributions/guide',
      'contributions/ssoc'
    ];

    contributionPages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}${langPath}/${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>`;
      
      // Add hreflang links
      supportedLanguages.forEach(hreflang => {
        const hreflangPath = hreflang === 'en' ? '' : `/${hreflang}`;
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${baseUrl}${hreflangPath}/${page}"/>`;
      });
      
      sitemap += `
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>SortVision ${page.split('/').pop().charAt(0).toUpperCase() + page.split('/').pop().slice(1)}</image:title>
      <image:caption>${page.includes('overview') ? 'View contributor statistics' : page.includes('guide') ? 'Learn how to contribute' : page.includes('ssoc') ? 'View SSOC leaderboard' : 'Contribute to SortVision'}</image:caption>
    </image:image>
  </url>`;
    });
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

function main() {
  try {
    console.log('🚀 Generating sitemap.xml...');
    
    const sitemap = generateSitemap();
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📁 Location: ${sitemapPath}`);
    console.log(`📊 URLs generated: ${(supportedLanguages.length * (1 + algorithms.length * 3 + 4))} URLs`);
    console.log(`🌍 Languages: ${supportedLanguages.join(', ')}`);
    console.log(`🔧 Algorithms: ${algorithms.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateSitemap };
#!/usr/bin/env node

/**
 * Comprehensive Sitemap Generator for SortVision
 * 
 * Generates a complete sitemap.xml with all pages for all supported languages:
 * - Homepage for all languages
 * - Algorithm pages (config, details, metrics) for all languages
 * - Contribution pages (overview, guide, ssoc) for all languages
 * - Contributor detail pages for all languages
 * - Proper hreflang tags for international SEO
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://www.sortvision.com';
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const SITEMAP_INDEX_PATH = path.join(__dirname, '..', 'public', 'sitemap-index.xml');

// Supported languages
const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'jp', name: 'Japanese', nativeName: '日本語' }
];

// Available sorting algorithms
const ALGORITHMS = [
  'bubble',
  'insertion', 
  'selection',
  'quick',
  'merge',
  'radix',
  'heap',
  'bucket'
];

// Algorithm tabs
const ALGORITHM_TABS = ['config', 'details', 'metrics'];

// Contribution sections
const CONTRIBUTION_SECTIONS = ['overview', 'guide', 'ssoc'];

// Common contributors (you can expand this list)
const COMMON_CONTRIBUTORS = [
  'alienx5499',
  'dependabot[bot]',
  'github-actions[bot]',
  'prabalpatra',
  'sortvision-contributor',
  'algorithm-enthusiast',
  'open-source-dev',
  'coding-wizard',
  'tech-contributor',
  'dev-helper'
];

/**
 * Generate URL with language prefix
 */
function getLocalizedUrl(language, path = '') {
  if (language === 'en') {
    return `${BASE_URL}/${path}`.replace(/\/$/, '') || BASE_URL;
  }
  return `${BASE_URL}/${language}/${path}`.replace(/\/$/, '');
}

/**
 * Generate hreflang links for a given path
 */
function generateHreflangLinks(path) {
  let links = '';
  const seen = new Set();
  
  // Add x-default (usually English)
  links += `    <xhtml:link rel="alternate" hreflang="x-default" href="${getLocalizedUrl('en', path)}" />\n`;
  
  // Add all language variants, mapping aliases to valid codes
  LANGUAGES.forEach(lang => {
    const hreflang = lang.code === 'jp' ? 'ja' : lang.code; // map jp -> ja
    if (seen.has(hreflang)) return;
    seen.add(hreflang);
    const codeForPath = hreflang; // ensure path uses the valid code too
    links += `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${getLocalizedUrl(codeForPath, path)}" />\n`;
  });
  
  return links;
}

/**
 * Generate URL entry with hreflang
 */
function generateUrlEntry(language, path, priority = '0.8', changefreq = 'weekly') {
  const url = getLocalizedUrl(language, path);
  const lastmod = new Date().toISOString();
  
  // Add image information for algorithm pages
  let imageInfo = '';
  if (path.includes('algorithms/')) {
    const algorithm = path.split('/').pop();
    imageInfo = `    <image:image>
      <image:loc>${BASE_URL}/og-image.png</image:loc>
      <image:title>${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Algorithm Visualization - SortVision</image:title>
      <image:caption>Interactive ${algorithm} sort algorithm visualization with real-time performance metrics</image:caption>
    </image:image>`;
  }
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${generateHreflangLinks(path)}${imageInfo}
  </url>`;
}


/**
 * Generate the complete sitemap
 */
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // 1. Homepage for all languages
  console.log('Generating homepage URLs...');
  LANGUAGES.forEach(lang => {
    sitemap += `\n${generateUrlEntry(lang.code, '', '1.0', 'daily')}`;
  });

  // 2. Algorithm pages for all languages
  console.log('Generating algorithm URLs...');
  ALGORITHMS.forEach(algorithm => {
    ALGORITHM_TABS.forEach(tab => {
      LANGUAGES.forEach(lang => {
        const path = `algorithms/${tab}/${algorithm}`;
        const priority = tab === 'config' ? '0.9' : '0.8';
        sitemap += `\n${generateUrlEntry(lang.code, path, priority)}`;
      });
    });
  });

  // 3. General algorithm pages (without specific tab)
  console.log('Generating general algorithm URLs...');
  ALGORITHMS.forEach(algorithm => {
    LANGUAGES.forEach(lang => {
      const path = `algorithms/${algorithm}`;
      sitemap += `\n${generateUrlEntry(lang.code, path, '0.8')}`;
    });
  });

  // 4. Contribution pages for all languages
  console.log('Generating contribution URLs...');
  CONTRIBUTION_SECTIONS.forEach(section => {
    LANGUAGES.forEach(lang => {
      const path = `contributions/${section}`;
      const priority = section === 'overview' ? '0.9' : '0.8';
      sitemap += `\n${generateUrlEntry(lang.code, path, priority)}`;
    });
  });

  // 5. General contributions page
  console.log('Generating general contribution URLs...');
  LANGUAGES.forEach(lang => {
    sitemap += `\n${generateUrlEntry(lang.code, 'contributions', '0.8')}`;
  });

  // 6. Contributor detail pages for all languages
  console.log('Generating contributor detail URLs...');
  COMMON_CONTRIBUTORS.forEach(contributor => {
    LANGUAGES.forEach(lang => {
      const path = `contributions/overview/${contributor}`;
      sitemap += `\n${generateUrlEntry(lang.code, path, '0.7')}`;
    });
  });

  // 7. Additional important pages
  console.log('Generating additional URLs...');
  const additionalPages = [
    { path: 'algorithms', priority: '0.9' },
    { path: 'contributions', priority: '0.8' }
  ];

  additionalPages.forEach(page => {
    LANGUAGES.forEach(lang => {
      sitemap += `\n${generateUrlEntry(lang.code, page.path, page.priority)}`;
    });
  });

  // 8. Add sitemap index information
  console.log('Adding sitemap metadata...');
  sitemap += `\n  <!-- Sitemap generated on ${new Date().toISOString()} -->`;
  sitemap += `\n  <!-- Total URLs: ${LANGUAGES.length * (1 + ALGORITHMS.length * (ALGORITHM_TABS.length + 1) + CONTRIBUTION_SECTIONS.length + 1 + COMMON_CONTRIBUTORS.length + additionalPages.length)} -->`;
  sitemap += `\n  <!-- Languages: ${LANGUAGES.map(l => l.code).join(', ')} -->`;
  sitemap += `\n  <!-- Algorithms: ${ALGORITHMS.join(', ')} -->`;

  sitemap += `\n</urlset>`;

  return sitemap;
}

/**
 * Generate sitemap index for better organization
 */
function generateSitemapIndex() {
  const lastmod = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <!-- Language-specific sitemaps (optional) -->
  <sitemap>
    <loc>${BASE_URL}/sitemap-en.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-es.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-hi.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-fr.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-de.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-zh.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-bn.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-ja.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-jp.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting comprehensive sitemap generation...');
  console.log(`📁 Output path: ${SITEMAP_PATH}`);
  console.log(`🌍 Languages: ${LANGUAGES.map(l => l.code).join(', ')}`);
  console.log(`🔢 Algorithms: ${ALGORITHMS.join(', ')}`);
  console.log(`👥 Contributors: ${COMMON_CONTRIBUTORS.length} common contributors`);
  
  try {
    // Generate sitemap
    const sitemap = generateSitemap();
    
    // Ensure directory exists
    const dir = path.dirname(SITEMAP_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write sitemap
    fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
    
    // Generate and write sitemap index
    const sitemapIndex = generateSitemapIndex();
    fs.writeFileSync(SITEMAP_INDEX_PATH, sitemapIndex, 'utf8');
    
    // Calculate statistics
    const urlCount = (sitemap.match(/<url>/g) || []).length;
    const languageCount = LANGUAGES.length;
    const algorithmCount = ALGORITHMS.length;
    const contributorCount = COMMON_CONTRIBUTORS.length;
    
    console.log('\n✅ Sitemap generated successfully!');
    console.log(`📊 Statistics:`);
    console.log(`   - Total URLs: ${urlCount}`);
    console.log(`   - Languages: ${languageCount}`);
    console.log(`   - Algorithms: ${algorithmCount}`);
    console.log(`   - Contributors: ${contributorCount}`);
    console.log(`   - Algorithm tabs: ${ALGORITHM_TABS.length}`);
    console.log(`   - Contribution sections: ${CONTRIBUTION_SECTIONS.length}`);
    console.log(`\n📄 Files generated:`);
    console.log(`   - Main sitemap: ${SITEMAP_PATH}`);
    console.log(`   - Sitemap index: ${SITEMAP_INDEX_PATH}`);
    console.log(`\n🌐 URLs:`);
    console.log(`   - Sitemap: ${BASE_URL}/sitemap.xml`);
    console.log(`   - Sitemap index: ${BASE_URL}/sitemap-index.xml`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateSitemap, LANGUAGES, ALGORITHMS, CONTRIBUTION_SECTIONS };

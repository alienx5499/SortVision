import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(_request, _params) {
  try {
    // Read the sitemap.xml file from public directory (using async fs for serverless compatibility)
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    try {
      const sitemapContent = await readFile(sitemapPath, 'utf8');
      
      // Return the sitemap with proper XML content type
      return new NextResponse(sitemapContent, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    } catch (fileError) {
      // Fallback: Generate a basic sitemap if file doesn't exist
      const baseUrl = 'https://www.sortvision.com';
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

      return new NextResponse(sitemap, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      });
    }
  } catch (error) {
    console.error('Error serving sitemap:', error);
    return new NextResponse('Error serving sitemap', { status: 500 });
  }
}

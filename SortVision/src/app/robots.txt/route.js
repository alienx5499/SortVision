import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://www.sortvision.com/sitemap.xml
Sitemap: https://www.sortvision.com/sitemap.xml

# Language-specific sitemaps
Sitemap: https://www.sortvision.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin or private areas (if any)
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Allow all language paths
Allow: /es/
Allow: /hi/
Allow: /fr/
Allow: /de/
Allow: /zh/
Allow: /algorithms/
Allow: /contributions/`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

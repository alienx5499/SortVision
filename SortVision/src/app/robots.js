// Add export flag so Next.js treats this route as static even under output: export
export const dynamic = 'force-static';

export default function robots() {
  const baseUrl = 'https://sortvision.vercel.app'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/sw.js',
          '/.env',
          '/node_modules/',
          '/_next/',
          '/api/private',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/algorithms',
          '/algorithms/',
          '/contributions',
          '/contributions/',
        ],
        disallow: ['/sw.js'],
      },
      {
        userAgent: 'bingbot',
        allow: [
          '/',
          '/algorithms',
          '/algorithms/', 
          '/contributions',
          '/contributions/',
        ],
        disallow: ['/sw.js'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
} 
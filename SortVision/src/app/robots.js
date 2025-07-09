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
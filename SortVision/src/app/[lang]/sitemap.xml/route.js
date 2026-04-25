import { NextResponse } from 'next/server';
import { algorithms } from '../../../utils/seo';

const SUPPORTED_LANGUAGES = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja'];
const ALGORITHM_TABS = ['config', 'details', 'metrics'];
const CONTRIBUTION_ROUTES = [
  '/contributions/overview',
  '/contributions/guide',
  '/contributions/ssoc',
];

const xmlEscape = value =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const buildUrlEntry = ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

export async function GET() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sortvision.com';
    const today = new Date().toISOString().split('T')[0];

    const coreRoutes = [
      { path: '/', changefreq: 'weekly', priority: '1.0' },
      { path: '/algorithms', changefreq: 'weekly', priority: '0.9' },
      { path: '/contributions', changefreq: 'weekly', priority: '0.8' },
      ...CONTRIBUTION_ROUTES.map(path => ({
        path,
        changefreq: 'weekly',
        priority: '0.8',
      })),
      ...Object.keys(algorithms).flatMap(algorithmKey =>
        ALGORITHM_TABS.map(tab => ({
          path: `/algorithms/${tab}/${algorithmKey}`,
          changefreq: 'monthly',
          priority: '0.9',
        }))
      ),
      ...Object.keys(algorithms).map(algorithmKey => ({
        path: `/algorithms/${algorithmKey}`,
        changefreq: 'monthly',
        priority: '0.85',
      })),
      ...Object.keys(algorithms).map(algorithmKey => ({
        path: `/${algorithmKey}-sort`,
        changefreq: 'monthly',
        priority: '0.85',
      })),
    ];

    const localizedRoutes = coreRoutes.flatMap(route =>
      SUPPORTED_LANGUAGES.flatMap(language => {
        const prefixedPath = `/${language}${route.path === '/' ? '' : route.path}`;
        const defaultPath = language === 'en' ? route.path : null;

        return [defaultPath, prefixedPath].filter(Boolean).map(path => ({
          ...route,
          path: path || '/',
        }));
      })
    );

    const uniqueRouteMap = new Map();
    localizedRoutes.forEach(route => {
      uniqueRouteMap.set(route.path, route);
    });

    const xmlEntries = [...uniqueRouteMap.values()]
      .sort((a, b) => a.path.localeCompare(b.path))
      .map(route =>
        buildUrlEntry({
          loc: `${baseUrl}${route.path}`,
          lastmod: today,
          changefreq: route.changefreq,
          priority: route.priority,
        })
      )
      .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

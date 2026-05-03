import { NextResponse } from 'next/server';
import { algorithms } from '../../utils/seo';
import { getBaseUrl } from '@/config/canonical';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/config/i18n';
import { ALGORITHM_TABS, CONTRIBUTION_SECTIONS } from '@/config/routes';

const NON_DEFAULT_LANGUAGES = SUPPORTED_LANGUAGES.filter(
  lang => lang !== DEFAULT_LANGUAGE
);
const CONTRIBUTION_ROUTES = [
  '/contributions',
  ...CONTRIBUTION_SECTIONS.map(section => `/contributions/${section}`),
];

const xmlEscape = (value: unknown): string =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

type UrlEntryParts = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
};

const buildUrlEntry = ({
  loc,
  lastmod,
  changefreq,
  priority,
}: UrlEntryParts) => `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

const buildCanonicalRoutes = () => {
  const algorithmKeys = Object.keys(algorithms);
  const routes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/algorithms', changefreq: 'weekly', priority: '0.9' },
    ...CONTRIBUTION_ROUTES.map(path => ({
      path,
      changefreq: 'weekly',
      priority: '0.8',
    })),
    ...algorithmKeys.flatMap(algorithmKey =>
      ALGORITHM_TABS.map(tab => ({
        path: `/algorithms/${tab}/${algorithmKey}`,
        changefreq: 'monthly',
        priority: '0.9',
      }))
    ),
    ...algorithmKeys.map(algorithmKey => ({
      path: `/algorithms/${algorithmKey}`,
      changefreq: 'monthly',
      priority: '0.85',
    })),
    ...algorithmKeys.map(algorithmKey => ({
      path: `/${algorithmKey}-sort`,
      changefreq: 'monthly',
      priority: '0.85',
    })),
    ...algorithmKeys.map(algorithmKey => ({
      path: `/algorithms/config/${algorithmKey}`,
      changefreq: 'monthly',
      priority: '0.9',
    })),
  ];

  const localizedRoutes = NON_DEFAULT_LANGUAGES.flatMap(language =>
    routes.map(route => ({
      ...route,
      path: `/${language}${route.path === '/' ? '' : route.path}`,
    }))
  );

  return [...routes, ...localizedRoutes];
};

export async function GET() {
  try {
    const baseUrl = getBaseUrl();
    const today = new Date().toISOString().split('T')[0];

    const xmlEntries = buildCanonicalRoutes()
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
    console.error('Error generating sitemap.xml:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Handle sitemap.xml requests for all languages
  if (pathname.endsWith('/sitemap.xml')) {
    const url = request.nextUrl.clone();
    url.pathname = '/sitemap.xml';
    const response = NextResponse.rewrite(url);
    response.headers.set('Content-Type', 'application/xml; charset=utf-8');
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return response;
  }
  
  // Skip middleware for static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    (pathname.includes('.') && !pathname.endsWith('/sitemap.xml')) ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Redirect invalid URLs
  if (pathname === '/$' || pathname === '/%24') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }

  // Redirect /jp to /ja (Japanese language code fix)
  if (pathname === '/jp' || pathname.startsWith('/jp/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/jp(\/|$)/, '/ja$1');
    return NextResponse.redirect(url, 301);
  }

  // Handle language-specific paths
  const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja'];
  const pathParts = pathname.split('/').filter(Boolean);
  
  // If first segment is invalid language code, redirect to English
  if (pathParts.length > 0 && pathParts[0].length === 2 && !supportedLanguages.includes(pathParts[0])) {
    const url = request.nextUrl.clone();
    url.pathname = '/' + pathParts.slice(1).join('/');
    return NextResponse.redirect(url, 301);
  }

  // Algorithms legacy redirect: /algorithms/:algorithm -> /algorithms/config/:algorithm
  if (pathname.startsWith('/algorithms/')) {
    const pathParts = pathname.split('/').filter(Boolean);
    const validAlgorithms = ['bubble', 'insertion', 'selection', 'merge', 'quick', 'heap', 'radix', 'bucket'];

    // Only handle legacy two-part path to avoid loops
    if (pathParts.length === 2 && pathParts[0] === 'algorithms') {
      const algorithm = pathParts[1].toLowerCase();
      if (validAlgorithms.includes(algorithm)) {
        const url = request.nextUrl.clone();
        url.pathname = `/algorithms/config/${algorithm}`;
        return NextResponse.redirect(url, 301);
      }
    }

    return NextResponse.next();
  }
  
  // Handle contribution redirects
  if (pathname === '/contributions' || pathname === '/contributions/') {
    const url = request.nextUrl.clone();
    url.pathname = '/contributions/overview';
    return NextResponse.redirect(url, 301);
  }
  
  // Handle other legacy redirects
  const redirectMap = {
    '/index': '/',
    '/home': '/',
    '/index.html': '/',
    '/contribute': '/contributions/overview',
    '/contributors': '/contributions/overview',
    '/ssoc': '/contributions/ssoc',
  };
  
  if (redirectMap[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = redirectMap[pathname];
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js (service worker)
     * - manifest.json (web app manifest)
     * - robots.txt (robots file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.json|robots.txt).*)',
  ],
};

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

  // Define supported languages early for reuse
  const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja'];
  
  // Handle trailing slashes - redirect to non-trailing slash (except root paths and language roots)
  const isLanguageRoot = supportedLanguages.some(lang => pathname === `/${lang}/`);
  
  if (pathname !== '/' && !isLanguageRoot && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    const response = NextResponse.redirect(url, 308); // Use 308 to preserve method
    // Prevent search engines from indexing redirect URLs
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Redirect invalid URLs
  if (pathname === '/$' || pathname === '/%24') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    const response = NextResponse.redirect(url, 301);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Redirect /jp to /ja (Japanese language code fix)
  if (pathname === '/jp' || pathname.startsWith('/jp/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/jp(\/|$)/, '/ja$1');
    const response = NextResponse.redirect(url, 301);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Handle language-specific paths
  const pathParts = pathname.split('/').filter(Boolean);
  
  // If first segment is invalid language code, redirect to English
  if (pathParts.length > 0 && pathParts[0].length === 2 && !supportedLanguages.includes(pathParts[0])) {
    const url = request.nextUrl.clone();
    url.pathname = '/' + pathParts.slice(1).join('/');
    const response = NextResponse.redirect(url, 301);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Algorithms legacy redirect: /algorithms/:algorithm -> /algorithms/config/:algorithm
  const validAlgorithms = ['bubble', 'insertion', 'selection', 'merge', 'quick', 'heap', 'radix', 'bucket'];
  
  // Handle legacy two-part path: /algorithms/bubble
  if (pathParts.length === 2 && pathParts[0] === 'algorithms' && validAlgorithms.includes(pathParts[1].toLowerCase())) {
    const url = request.nextUrl.clone();
    url.pathname = `/algorithms/config/${pathParts[1].toLowerCase()}`;
    const response = NextResponse.redirect(url, 301);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  
  // Handle language-prefixed legacy paths: /es/algorithms/bubble
  if (pathParts.length === 3 && supportedLanguages.includes(pathParts[0]) && pathParts[1] === 'algorithms' && validAlgorithms.includes(pathParts[2].toLowerCase())) {
    const url = request.nextUrl.clone();
    url.pathname = `/${pathParts[0]}/algorithms/config/${pathParts[2].toLowerCase()}`;
    const response = NextResponse.redirect(url, 301);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  
  // Handle contribution redirects
  if (pathname === '/contributions') {
    const url = request.nextUrl.clone();
    url.pathname = '/contributions/overview';
    const response = NextResponse.redirect(url, 301);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  
  // Handle language-prefixed contribution redirects: /es/contributions
  if (pathname.match(/^\/[a-z]{2}\/contributions$/)) {
    const lang = pathname.split('/')[1];
    if (supportedLanguages.includes(lang)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${lang}/contributions/overview`;
      const response = NextResponse.redirect(url, 301);
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return response;
    }
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
    const response = NextResponse.redirect(url, 301);
    // Prevent search engines from indexing redirect URLs
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
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
     * - sitemap files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.json|robots.txt|sitemap).*)',
  ],
};

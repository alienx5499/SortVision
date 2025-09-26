import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Temporarily disable all algorithm-related redirects to isolate Vercel edge rules
  if (pathname.startsWith('/algorithms/')) {
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sw.js|manifest.json|robots.txt|sitemap.xml).*)',
  ],
};

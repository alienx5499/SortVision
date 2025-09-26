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

  // Handle algorithm redirects - convert old format to new format
  if (pathname.startsWith('/algorithms/')) {
    const pathParts = pathname.split('/').filter(Boolean);
    
    // Handle /algorithms/radix -> /algorithms/config/radix
    if (pathParts.length === 2 && pathParts[0] === 'algorithms') {
      const algorithm = pathParts[1];
      const validAlgorithms = ['bubble', 'insertion', 'selection', 'merge', 'quick', 'heap', 'radix', 'bucket'];
      
      if (validAlgorithms.includes(algorithm)) {
        const url = request.nextUrl.clone();
        url.pathname = `/algorithms/config/${algorithm}`;
        return NextResponse.redirect(url, 301);
      }
    }
    
    // Ensure proper format for existing paths
    if (pathParts.length === 3 && pathParts[0] === 'algorithms') {
      const tab = pathParts[1];
      const algorithm = pathParts[2];
      const validTabs = ['config', 'details', 'metrics'];
      const validAlgorithms = ['bubble', 'insertion', 'selection', 'merge', 'quick', 'heap', 'radix', 'bucket'];
      
      if (validTabs.includes(tab) && validAlgorithms.includes(algorithm)) {
        // Path is already correct, continue
        return NextResponse.next();
      }
    }
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

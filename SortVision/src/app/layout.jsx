import './globals.css'

export const metadata = {
  title: 'SortVision | Interactive Sorting Algorithm Visualizer & DSA Learning Tool',
  description: 'Master sorting algorithms with interactive visualizations. Compare Bubble Sort, Merge Sort, Quick Sort and more with real-time animations, performance metrics, and educational content. Perfect for DSA learning and coding interview preparation.',
  keywords: 'sorting visualizer, algorithm visualizer, dsa sorting, data structures and algorithms, sorting algorithms, algorithm animation, computer science education, programming tutorial, sorting algorithm comparison, interactive learning, algorithm complexity, sorting performance, coding interview prep, algorithm practice, programming education, software engineering, algorithm tutorial, data structure visualization, sorting techniques, algorithm analysis, computational thinking, programming concepts, algorithm implementation, sorting algorithm tutorial, algorithm learning tool, interactive algorithm visualization, sorting algorithm animation, algorithm step by step, sorting algorithm explained, algorithm education platform, bubble sort, merge sort, quick sort, insertion sort, selection sort, heap sort, radix sort, learn coding, computer science, data structures',
  authors: [{ name: 'alienX' }],
  robots: 'index, follow, noarchive, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    url: 'https://sortvision.vercel.app/',
    title: 'SortVision | Interactive Sorting Algorithm Visualizer & DSA Learning Tool',
    description: 'Master sorting algorithms with interactive visualizations. Compare Bubble Sort, Merge Sort, Quick Sort and more with real-time animations, performance metrics, and educational content. Perfect for DSA learning and coding interview preparation.',
    images: [
      {
        url: 'https://sortvision.vercel.app/og-image.png',
        alt: 'SortVision - Interactive Sorting Algorithm Visualizer for DSA Learning',
      },
    ],
    siteName: 'SortVision',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SortVision | Interactive Sorting Algorithm Visualizer & DSA Learning Tool',
    description: 'Master sorting algorithms with interactive visualizations. Perfect for DSA learning and coding interview preparation.',
    images: ['https://sortvision.vercel.app/twitter-image.png'],
    creator: '@alienx5499',
    site: '@alienx5499',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg?v=2.0', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon.svg?v=2.0', type: 'image/svg+xml' }
    ],
    shortcut: [
      { url: '/favicon.svg?v=2.0', type: 'image/svg+xml' }
    ]
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.google-analytics.com https://*.vercel-scripts.com https://*.vercel-analytics.com https://va.vercel-scripts.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://github.com https://avatars.githubusercontent.com https://www.googletagmanager.com https://*.googletagmanager.com; connect-src 'self' http://localhost:3001 https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://stats.g.doubleclick.net https://*.g.doubleclick.net https://*.vercel-scripts.com https://*.vercel-analytics.com https://va.vercel-scripts.com https://api.github.com https://www.googletagmanager.com https://*.googletagmanager.com https://docs.google.com https://*.google.com https://sheets.googleapis.com; frame-src 'none'; object-src 'none';" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <meta name="category" content="Education, Technology, Computer Science" />
        <meta name="classification" content="Educational Software" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="target" content="students, developers, programmers, computer science students, educators" />
        <meta name="googlebot" content="index, follow, noarchive" />
        <meta name="bingbot" content="index, follow, noarchive" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SortVision" />
        <meta name="application-name" content="SortVision" />
        <meta name="format-detection" content="telephone=no" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --app-height: 100vh;
            }
            
            html, body {
              position: relative;
              height: 100%;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
              background-color: #0F172A;
              color: #e2e8f0;
            }
            
            .min-h-screen {
              min-height: var(--app-height);
            }
            
            #root {
              height: auto;
              min-height: var(--app-height);
              overflow-y: auto;
            }
            
            @media (max-width: 480px) {
              body {
                font-size: 14px;
              }
            }
            
            @media (min-width: 481px) and (max-width: 768px) {
              body {
                font-size: 15px;
              }
            }
            
            @media (min-width: 769px) {
              body {
                font-size: 16px;
              }
            }
          `
        }} />
        
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />
        
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function getQueryParam(param) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(param);
              }
              
              var debugParam = getQueryParam('cr7');
              var hasDebugParam = debugParam === 'goat';
              
              var hostname = window.location.hostname.toLowerCase();
              var isProductionDomain = 
                hostname.endsWith('.vercel.app') || 
                hostname === 'vercel.app' ||
                hostname.endsWith('.netlify.app') || 
                hostname === 'netlify.app' ||
                hostname.endsWith('.github.io') || 
                hostname === 'github.io' ||
                hostname.endsWith('.sortvision.com') || 
                hostname === 'sortvision.com';
              
              if (isProductionDomain && hasDebugParam) {
                console.log('%c SortVision DevTools Access Denied\\n DevTools not available in production', 'background: #991b1b; color: #ffffff; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; border-left: 3px solid #f87171;');
                return;
              }
              
              if (hasDebugParam) {
                var script = document.createElement('script');
                script.type = 'module';
                script.src = '/devTools/index.js';
                script.onerror = function(error) {
                  console.error('Failed to load debug tools:', error);
                };
                document.head.appendChild(script);
              } else if (isProductionDomain) {
                console.log('%c Thanks for visiting SortVision!\\n Explore sorting algorithms visualized', 'background: #4F46E5; color: #ffffff; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; border-left: 3px solid #818CF8;');
                return;
              } else if (!isProductionDomain){
                console.log('%c SortVision DevTools disabled\\n Add the debug parameter to enable', 'background: #FB923C; color: #7C2D12; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; border-left: 3px solid #EA580C;');
              }
            })();
            
            window.addEventListener('load', function() {
              setTimeout(function() {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-SZPR3VLNV0', {
                  page_title: document.title,
                  page_location: window.location.href
                });
              }, 1000);
            });
          `
        }} />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
} 
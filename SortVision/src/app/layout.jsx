import './globals.css';

export const metadata = {
  title:
    'SortVision | Interactive Sorting Algorithm Visualizer & DSA Learning Tool',
  description:
    'Master sorting algorithms with interactive visualizations. Compare Bubble Sort, Merge Sort, Quick Sort, Insertion Sort, Selection Sort, Heap Sort, Radix Sort, and Bucket Sort with real-time animations, performance metrics, and educational content. Perfect for DSA learning, coding interview preparation, and computer science education.',
  keywords:
    'sorting visualizer, algorithm visualizer, dsa sorting, data structures and algorithms, sorting algorithms, algorithm animation, computer science education, programming tutorial, sorting algorithm comparison, interactive learning, algorithm complexity, sorting performance, coding interview prep, algorithm practice, programming education, software engineering, algorithm tutorial, data structure visualization, sorting techniques, algorithm analysis, computational thinking, programming concepts, algorithm implementation, sorting algorithm tutorial, algorithm learning tool, interactive algorithm visualization, sorting algorithm animation, algorithm step by step, sorting algorithm explained, algorithm education platform, bubble sort, merge sort, quick sort, insertion sort, selection sort, heap sort, radix sort, learn coding, computer science, data structures',
  authors: [{ name: 'alienX' }],
  robots:
    'index, follow, noarchive, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  referrer: 'strict-origin-when-cross-origin',
  other: {
    'language': 'English',
    'revisit-after': '7 days',
    'rating': 'General',
    'category': 'Education, Technology, Computer Science',
    'classification': 'Educational Software',
    'coverage': 'Worldwide',
    'distribution': 'Global',
    'target': 'students, developers, programmers, computer science students, educators',
    'googlebot': 'index, follow, noarchive',
    'bingbot': 'index, follow, noarchive',
    'theme-color': '#0F172A',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
    'msapplication-tap-highlight': 'no',
    'apple-touch-fullscreen': 'yes',
    'apple-mobile-web-app-title': 'SortVision',
    'application-name': 'SortVision',
    'msapplication-TileColor': '#0F172A',
    'msapplication-config': '/browserconfig.xml',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.googletagmanager.com https://www.google-analytics.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; media-src 'self' data: blob:; connect-src 'self' https: data: blob:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; worker-src 'self' blob:;",
  },
  verification: {
    google: 'google12e2679e2ea95334',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.sortvision.com/',
    title:
      'SortVision | Interactive Sorting Algorithm Visualizer & DSA Learning Tool',
    description:
      'Master sorting algorithms with interactive visualizations. Compare Bubble Sort, Merge Sort, Quick Sort and more with real-time animations, performance metrics, and educational content. Perfect for DSA learning and coding interview preparation.',
    images: [
      {
        url: 'https://www.sortvision.com/og-image.png',
        alt: 'SortVision - Interactive Sorting Algorithm Visualizer for DSA Learning',
      },
    ],
    siteName: 'SortVision',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'SortVision | Interactive Sorting Algorithm Visualizer & DSA Learning Tool',
    description:
      'Master sorting algorithms with interactive visualizations. Perfect for DSA learning and coding interview preparation.',
    images: ['https://www.sortvision.com/twitter-image.png'],
    creator: '@alienx5499',
    site: '@alienx5499',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg?v=2.0', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/favicon.svg?v=2.0', type: 'image/svg+xml' }],
    shortcut: [{ url: '/favicon.svg?v=2.0', type: 'image/svg+xml' }],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "SortVision",
              "description": "Interactive sorting algorithm visualizer for learning data structures and algorithms",
              "url": "https://www.sortvision.com",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "alienX",
                "url": "https://github.com/alienx5499"
              },
              "educationalUse": "instruction",
              "learningResourceType": "interactive",
              "educationalLevel": ["beginner", "intermediate", "advanced"],
              "teaches": [
                "Sorting Algorithms",
                "Data Structures",
                "Computer Science",
                "Programming",
                "Algorithm Analysis"
              ],
              "about": [
                {
                  "@type": "Thing",
                  "name": "Bubble Sort",
                  "description": "Simple comparison-based sorting algorithm"
                },
                {
                  "@type": "Thing", 
                  "name": "Merge Sort",
                  "description": "Efficient divide-and-conquer sorting algorithm"
                },
                {
                  "@type": "Thing",
                  "name": "Quick Sort", 
                  "description": "Fast in-place sorting algorithm"
                },
                {
                  "@type": "Thing",
                  "name": "Insertion Sort",
                  "description": "Simple adaptive sorting algorithm"
                },
                {
                  "@type": "Thing",
                  "name": "Selection Sort",
                  "description": "Simple in-place sorting algorithm"
                },
                {
                  "@type": "Thing",
                  "name": "Heap Sort",
                  "description": "Comparison-based sorting using heap data structure"
                },
                {
                  "@type": "Thing",
                  "name": "Radix Sort",
                  "description": "Non-comparison integer sorting algorithm"
                },
                {
                  "@type": "Thing",
                  "name": "Bucket Sort",
                  "description": "Distribution-based sorting algorithm"
                }
              ]
            })
          }}
        />
        
        <script
          dangerouslySetInnerHTML={{
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
          `,
          }}
        />
      </body>
    </html>
  );
}

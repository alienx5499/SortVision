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
      <head>
        {/* Preconnects to speed up font/analytics connections */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        {/* Hint hero image for faster LCP if used */}
        <link rel="preload" as="image" href="/og-image.png" imagesrcset="/og-image.png 1x, /twitter-image.png 2x" fetchpriority="high" />
      </head>
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
        
        {/* FAQ Schema for better search visibility */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is SortVision?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SortVision is an interactive sorting algorithm visualizer designed to help students, developers, and educators understand sorting algorithms through real-time animations, step-by-step explanations, and performance metrics."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which sorting algorithms does SortVision support?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SortVision supports 8 major sorting algorithms: Bubble Sort, Merge Sort, Quick Sort, Insertion Sort, Selection Sort, Heap Sort, Radix Sort, and Bucket Sort, each with detailed explanations and complexity analysis."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is SortVision free to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, SortVision is completely free and open-source. It's designed to make algorithm learning accessible to everyone, from beginners to advanced programmers."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can SortVision help with coding interviews?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SortVision helps prepare for coding interviews by providing visual understanding of sorting algorithms, their time/space complexity, and practical examples that are commonly asked in technical interviews at top tech companies."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What programming languages are supported?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SortVision provides algorithm implementations in multiple programming languages including Python, JavaScript, Java, C++, C#, Go, Rust, and more, making it suitable for developers across different tech stacks."
                  }
                }
              ]
            })
          }}
        />
        
        {/* Educational Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "SortVision",
              "description": "Interactive platform for learning sorting algorithms and data structures",
              "url": "https://www.sortvision.com",
              "educationalCredentialAwarded": "Algorithm Understanding Certificate",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Sorting Algorithm Courses",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "Bubble Sort Algorithm",
                    "description": "Learn the fundamentals of bubble sort with interactive visualization"
                  },
                  {
                    "@type": "Course", 
                    "name": "Merge Sort Algorithm",
                    "description": "Master divide-and-conquer sorting with merge sort"
                  },
                  {
                    "@type": "Course",
                    "name": "Quick Sort Algorithm", 
                    "description": "Understand the most efficient sorting algorithm"
                  }
                ]
              }
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
              var isLocalhost = 
                hostname === 'localhost' ||
                hostname === '127.0.0.1' ||
                hostname.startsWith('192.168.') ||
                hostname.startsWith('10.') ||
                hostname.startsWith('172.');
              
              var isProductionDomain =
                hostname.endsWith('.vercel.app') ||
                hostname === 'vercel.app' ||
                hostname.endsWith('.netlify.app') ||
                hostname === 'netlify.app' ||
                hostname.endsWith('.github.io') ||
                hostname === 'github.io' ||
                hostname.endsWith('.sortvision.com') ||
                hostname === 'sortvision.com';

              // Block devTools on production domains entirely
              if (isProductionDomain) {
                console.log('%c SortVision DevTools Access Denied\\n DevTools not available in production', 'background: #991b1b; color: #ffffff; padding: 6px 10px; border-radius: 4px; font-weight: bold; font-size: 14px; border-left: 3px solid #f87171;');
                return;
              }

              // Load devTools only with debug parameter (non-production only)
              if (hasDebugParam) {
                var script = document.createElement('script');
                script.type = 'module';
                script.src = '/devTools/index.js';
                script.onerror = function(error) {
                  console.error('Failed to load debug tools:', error);
                };
                document.head.appendChild(script);
                
                // Also load test script for debugging
                var testScript = document.createElement('script');
                testScript.src = '/devTools/test.js';
                testScript.onerror = function(error) {
                  console.error('Failed to load test script:', error);
                };
                document.head.appendChild(testScript);
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

            // Register Service Worker for PWA functionality
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    // Only log in development
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                      console.log('✅ Service Worker registered successfully:', registration.scope);
                    }
                  })
                  .catch(function(error) {
                    // Only log in development
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                      console.log('❌ Service Worker registration failed:', error);
                    }
                  });
              });
            }

            // Chatbot helper functions
            window.copyCode = function(code) {
              navigator.clipboard.writeText(code).then(function() {
                // Only log in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                  console.log('✅ Code copied to clipboard');
                }
              }).catch(function(err) {
                // Only log in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                  console.error('❌ Failed to copy code:', err);
                }
              });
            };

            window.copyCodeById = function(codeId) {
              const codeElement = document.getElementById(codeId);
              if (codeElement) {
                const code = codeElement.textContent || codeElement.innerText;
                navigator.clipboard.writeText(code).then(function() {
                  // Only log in development
                  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log('✅ Code copied to clipboard');
                  }
                  // Show a brief success message
                  const button = event.target;
                  const originalText = button.textContent;
                  button.textContent = '✅ Copied!';
                  button.classList.add('bg-green-600');
                  setTimeout(function() {
                    button.textContent = originalText;
                    button.classList.remove('bg-green-600');
                    button.classList.add('bg-blue-600');
                  }, 2000);
                }).catch(function(err) {
                  // Only log in development
                  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.error('❌ Failed to copy code:', err);
                  }
                  alert('Failed to copy code. Please try selecting and copying manually.');
                });
              } else {
                // Only log in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                  console.error('❌ Code element not found:', codeId);
                }
              }
            };

            window.runCode = function(algorithm, language) {
              // Only log in development
              if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('▶️ Running code for', algorithm, 'in', language);
              }
              alert('Code execution feature coming soon! For now, copy the code and run it in your preferred environment.');
            };

            window.askForCode = function(algorithm) {
              // Only log in development
              if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('🤖 Asking for code:', algorithm);
              }
              const event = new CustomEvent('askForCode', { detail: { algorithm } });
              window.dispatchEvent(event);
            };
            `,
          }}
        />
      </body>
    </html>
  );
}

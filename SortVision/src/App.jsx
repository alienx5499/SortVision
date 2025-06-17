import React, { useState, useEffect, lazy, Suspense, useMemo, memo } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Terminal, Code, Github, Linkedin, X, Users } from 'lucide-react';
import { getAlgorithmMetaTags, getHomepageMetaTags, getContributionsMetaTags, getSSOCMetaTags, getAlgorithmSchema, algorithms, generateCanonicalUrl, isCanonicalPath } from './utils/seo';
import SEOContent from './components/SEOContent';
import { FeedbackButton } from './components/feedback';
import { SettingsButton } from './components/settings';
import './styles/animation.css';


// Lazy load components that aren't needed immediately
const SortingVisualizer = lazy(() => import('./components/sortingVisualizer/SortingVisualizer'));
const MobileOverlay = lazy(() => import('./components/MobileOverlay'));

// Memoized header component to prevent unnecessary re-renders
const Header = memo(({ children }) => (
  <header className="flex flex-col items-center mb-4 sm:mb-6 animate-fade-down animate-once animate-duration-[800ms] animate-delay-100">
    {children}
  </header>
));

// Memoized footer component
const Footer = memo(({ children }) => (
  <footer className="mt-8 sm:mt-10 text-slate-500 text-[10px] sm:text-xs font-mono text-center animate-fade-up animate-once animate-duration-[800ms] animate-delay-700">
    {children}
  </footer>
));

/**
 * Main Application Component
 * 
 * Renders the sorting visualizer application with header and footer
 * 
 * URL Structure:
 * - /                              -> Homepage with default algorithm (bubble) and 'controls' tab
 * - /algorithms/{algorithm}        -> Algorithm page with 'controls' tab (default)
 * - /algorithms/{algorithm}?tab={tab} -> Algorithm page with specific tab
 * - /contributions                 -> Contributors page
 * 
 * Query Parameters:
 * - tab: controls|metrics|details  -> Sets the active tab
 * - Other parameters are preserved for debugging, analytics, etc.
 *   Example: ?tab=details&debug=true&cr7=goat
 */
const App = () => {
  // Get route parameters and location
  const { algorithmName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for typing animation
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  // State for active tab in SortingVisualizer
  const [activeTab, setActiveTab] = useState('controls');
  
  // State for special modes (contributors, future modes)
  const [specialMode, setSpecialMode] = useState(null); // null = normal mode, 'contributors' = contributors mode
  const fullText = 'Interactive visualization of popular sorting algorithms';
  
  // Extract tab and algorithm/contribution section from path-based routing
  const pathParts = location.pathname.split('/').filter(Boolean);
  const isAlgorithmPath = pathParts[0] === 'algorithms';
  const isContributionPath = pathParts[0] === 'contributions';
  
  // Get tab from path
  let tabFromPath = null;
  let algorithmFromPath = algorithmName;
  let contributionSection = null;
  
  if (isAlgorithmPath && pathParts.length >= 3) {
    tabFromPath = pathParts[1]; // config, details, metrics
    algorithmFromPath = pathParts[2];
  } else if (isAlgorithmPath && pathParts.length === 2) {
    algorithmFromPath = pathParts[1];
  }
  
  if (isContributionPath && pathParts.length >= 2) {
    contributionSection = pathParts[1]; // overview, guide
  }
  
  // Get the current algorithm name for SEO - memoized to prevent recalculation
  const currentAlgorithm = useMemo(() => algorithmFromPath || 'bubble', [algorithmFromPath]);
  const algorithmTitle = useMemo(() => 
    algorithms[currentAlgorithm]?.name || 'Sorting Algorithms', 
    [currentAlgorithm]
  );
  
  // Check if current URL is canonical and redirect if necessary
  useEffect(() => {
    if (!isCanonicalPath(location.pathname)) {
      const canonicalPath = generateCanonicalUrl(location.pathname).replace('https://sortvision.vercel.app', '');
      navigate(canonicalPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  // Handle routing and tab state management
  useEffect(() => {
    if (isContributionPath) {
      setSpecialMode('contributors');
      
      // Handle contribution section routing
      if (contributionSection === 'guide') {
        setActiveTab('guide');
      } else if (contributionSection === 'overview') {
        setActiveTab('overview');
      } else if (contributionSection === 'ssoc') {
        setActiveTab('ssoc');
      } else {
        // Redirect /contributions to /contributions/overview
        navigate('/contributions/overview', { replace: true });
        return;
      }
    } else {
      setSpecialMode(null);
      
      // Handle path-based tab routing for algorithms
      if (tabFromPath && ['config', 'metrics', 'details'].includes(tabFromPath)) {
        // Map path-based tabs to internal tab names
        const tabMapping = {
          'config': 'controls',
          'metrics': 'metrics', 
          'details': 'details'
        };
        setActiveTab(tabMapping[tabFromPath]);
      } else if (isAlgorithmPath && pathParts.length === 2) {
        // Handle old format /algorithms/bucket -> redirect to /algorithms/config/bucket
        const algorithm = pathParts[1];
        const validAlgorithms = ['bubble', 'insertion', 'selection', 'merge', 'quick', 'heap', 'radix', 'bucket'];
        if (validAlgorithms.includes(algorithm)) {
          navigate(`/algorithms/config/${algorithm}`, { replace: true });
          return;
        }
      } else if (!isAlgorithmPath) {
        setActiveTab('controls'); // Default tab
      }
    }
  }, [location.pathname, tabFromPath, isAlgorithmPath, isContributionPath, contributionSection, pathParts, navigate]);
  
  // Memoize SEO metadata to prevent recalculation on each render
  const metaTags = useMemo(() => {
    if (location.pathname === '/contributions/ssoc') {
      return getSSOCMetaTags();
    }
    if (location.pathname === '/contributions') {
      return getContributionsMetaTags();
    }
    if (algorithmName) {
      return getAlgorithmMetaTags(algorithmName);
    }
    
    return getHomepageMetaTags();
  }, [algorithmName, location.pathname]);
  
  // Generate schema markup - memoized to prevent recalculation
  const schemaMarkup = useMemo(() => {
    // Base schema for all pages
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": algorithmName ? `${algorithmTitle} Visualizer - SortVision` : "SortVision",
      "url": `https://sortvision.vercel.app${location.pathname}`,
      "applicationCategory": "EducationalApplication",
      "applicationSubCategory": "Algorithm Visualization",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": metaTags.description,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "creator": {
        "@type": "Person",
        "name": "alienX",
        "url": "https://github.com/alienx5499"
      },
      "screenshot": "https://sortvision.vercel.app/og-image.png",
      "featureList": [
        "Interactive Bubble Sort Visualization",
        "Interactive Insertion Sort Visualization", 
        "Interactive Selection Sort Visualization",
        "Interactive Merge Sort Visualization",
        "Interactive Quick Sort Visualization",
        "Interactive Heap Sort Visualization",
        "Interactive Radix Sort Visualization",
        "Real-time Performance Metrics",
        "Algorithm Comparison Tools",
        "Educational Content",
        "Step-by-step Animation",
        "Algorithm Complexity Analysis"
      ],
      "keywords": metaTags.keywords,
      "educationalUse": [
        "Computer Science Education",
        "Algorithm Learning",
        "Data Structures and Algorithms",
        "Programming Education",
        "Coding Interview Preparation"
      ],
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": [
          "student",
          "teacher",
          "self-learner",
          "developer"
        ]
      },
      "sameAs": [
        "https://github.com/alienx5499/SortVision",
        "https://x.com/alienx5499"
      ]
    };

    // Enhanced homepage schema
    if (!algorithmName) {
      const homepageSchema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "SortVision",
        "url": "https://sortvision.vercel.app",
        "description": metaTags.description,
        "educationalCredentialAwarded": "Algorithm Visualization Knowledge",
        "hasOfferingCatalog": {
          "@type": "OfferingCatalog",
          "name": "Sorting Algorithm Visualizations",
          "itemListElement": [
            {
              "@type": "Course",
              "name": "Bubble Sort Visualization",
              "description": "Interactive learning of Bubble Sort algorithm",
              "url": "https://sortvision.vercel.app/algorithms/bubble",
              "provider": {
                "@type": "Organization",
                "name": "SortVision",
                "url": "https://sortvision.vercel.app"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "category": "Educational Course"
              },
              "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Online",
                "courseWorkload": "PT30M",
                "instructor": {
                  "@type": "Person",
                  "name": "alienX"
                }
              }
            },
            {
              "@type": "Course", 
              "name": "Merge Sort Visualization",
              "description": "Interactive learning of Merge Sort algorithm",
              "url": "https://sortvision.vercel.app/algorithms/merge",
              "provider": {
                "@type": "Organization",
                "name": "SortVision",
                "url": "https://sortvision.vercel.app"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "category": "Educational Course"
              },
              "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Online",
                "courseWorkload": "PT30M",
                "instructor": {
                  "@type": "Person",
                  "name": "alienX"
                }
              }
            },
            {
              "@type": "Course",
              "name": "Quick Sort Visualization", 
              "description": "Interactive learning of Quick Sort algorithm",
              "url": "https://sortvision.vercel.app/algorithms/quick",
              "provider": {
                "@type": "Organization",
                "name": "SortVision",
                "url": "https://sortvision.vercel.app"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "category": "Educational Course"
              },
              "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Online",
                "courseWorkload": "PT30M",
                "instructor": {
                  "@type": "Person",
                  "name": "alienX"
                }
              }
            }
          ]
        }
      };

      return [baseSchema, homepageSchema];
    }
    
    // Add breadcrumbs for algorithm pages
    if (algorithmName) {
      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sortvision.vercel.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `${algorithmTitle}`,
            "item": `https://sortvision.vercel.app${location.pathname}`
          }
        ]
      };
      
      // Get algorithm-specific schema for better SEO relevance
      const algorithmSchema = getAlgorithmSchema(algorithmName, location.pathname);
      
      // Return an array of schema objects for better structured data
      return [baseSchema, breadcrumb, algorithmSchema];
    }
    
    return baseSchema;
  }, [algorithmName, algorithmTitle, location.pathname, metaTags.description, metaTags.keywords]);
  
  // Memoize the current date to prevent recreation on each render
  const currentDate = useMemo(() => new Date().toISOString().split('T')[0], []);
  
  // Generate clean canonical URL - memoized to prevent recalculation
  const canonicalUrl = useMemo(() => {
    return generateCanonicalUrl(location.pathname);
  }, [location.pathname]);
  
  // Typing animation effect
  useEffect(() => {
    if (displayText.length < fullText.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 50); // Adjust speed of typing here
      
      return () => clearTimeout(typingTimer);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayText, fullText]);
  
  // Loading fallback for lazy loaded components
  const fallbackElement = useMemo(() => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-emerald-400 font-mono">Loading...</div>
    </div>
  ), []);
  
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-5 overflow-hidden">
      {/* Mobile Detection Overlay - Lazy loaded */}
      <Suspense fallback={null}>
        <MobileOverlay />
      </Suspense>
      
      {/* SEO Helmet */}
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        <meta property="article:modified_time" content={currentDate} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={metaTags.ogTitle} />
        <meta property="og:description" content={metaTags.ogDescription} />
        <meta property="og:updated_time" content={currentDate} />
        
        {/* Twitter */}
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={metaTags.twitterTitle} />
        <meta name="twitter:description" content={metaTags.twitterDescription} />
        
        {/* Schema.org markup for Google */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      
      <SettingsButton />
      
      {/* Header with logo and title */}
      <Header>
        <div className="flex items-center gap-2 sm:gap-3">
          <Terminal className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 animate-pulse animate-infinite animate-duration-[3000ms]" aria-hidden="true" />
          <h1 className="text-2xl sm:text-4xl font-mono font-bold text-white">
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <span className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">Sort</span>
              <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300">Vision</span>
            </Link>
          </h1>
          <Code className="h-4 w-4 sm:h-6 sm:w-6 text-slate-400 animate-spin animate-once animate-duration-[1500ms] animate-delay-300" aria-hidden="true" />
        </div>
        <div className="text-lg sm:text-xl font-mono text-slate-400 mt-1">
          <span className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">algorithm</span>
          <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300">.visualizer</span>
          <span className="text-slate-400 hover:text-white transition-colors duration-300">()</span>
        </div>
      </Header>
      
      {/* Subtitle with typing animation */}
      <div className="text-center text-slate-400 font-mono mb-6 sm:mb-8 max-w-[90%] sm:max-w-md h-6 animate-fade-up animate-once animate-duration-[800ms] animate-delay-300">
        <span className="text-amber-400">//</span> {displayText}
        {!isTypingComplete && <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse" aria-hidden="true"></span>}
      </div>
      
      {/* Main Sorting Visualizer Component - Lazy loaded */}
      <main className="animate-fade-up animate-once animate-duration-[1000ms] animate-delay-500 w-full max-w-4xl px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 mb-4 text-center">
          {algorithmName ? `${algorithmTitle} Visualization` : 'Sorting Algorithm Visualizer'}
        </h2>
        <Suspense fallback={fallbackElement}>
          <SortingVisualizer 
            initialAlgorithm={currentAlgorithm} 
            activeTab={activeTab}
            onTabChange={(newTab) => {
              setActiveTab(newTab);
              
              // Handle path-based routing for tab changes
              if (specialMode === 'contributors') {
                // Handle contribution tab changes
                const sectionMapping = {
                  'overview': 'overview',
                  'guide': 'guide',
                  'ssoc': 'ssoc'
                };
                const section = sectionMapping[newTab] || 'overview';
                navigate(`/contributions/${section}`, { replace: true });
              } else {
                // Handle algorithm tab changes
                const pathMapping = {
                  'controls': 'config',
                  'metrics': 'metrics',
                  'details': 'details'
                };
                const pathSegment = pathMapping[newTab] || 'config';
                const currentParams = new URLSearchParams(location.search);
                const newUrl = `/algorithms/${pathSegment}/${currentAlgorithm}${currentParams.toString() ? `?${currentParams.toString()}` : ''}`;
                navigate(newUrl, { replace: true });
              }
            }}
            specialMode={specialMode}
          />
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer>
        <span className="text-slate-600">/**</span> Built with 
        <span className="inline-block animate-bounce animate-infinite animate-duration-[2000ms] mx-1" aria-hidden="true">❤️</span> 
        by alienX <span className="text-slate-600">*/</span>
        
        {/* Social links - Now wraps on mobile */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4">
          <button 
            onClick={() => {
              if (specialMode === 'contributors') {
                // Return to normal mode - go to algorithms
                if (currentAlgorithm) {
                  navigate(`/algorithms/config/${currentAlgorithm}`);
                } else {
                  navigate('/algorithms/config/bubble'); // Default to bubble sort
                }
              } else {
                // Go to contributors mode - navigate to contributions page
                navigate('/contributions/overview');
              }
            }}
            className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
            aria-label={specialMode === 'contributors' ? "Return to SortVision main interface" : "View SortVision contributors"}
          >
            {specialMode === 'contributors' ? (
              <Terminal className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            ) : (
            <Users className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            )}
            <span>{specialMode === 'contributors' ? 'SortVision' : 'Contributors'}</span>
          </button>
          
          <a 
            href="https://github.com/alienx5499/SortVision" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
            aria-label="View SortVision source code on GitHub"
          >
            <Github className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/prabalpatra5499/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
            aria-label="Connect with the developer on LinkedIn"
          >
            <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          
          <a 
             href="https://github.com/sponsors/alienx5499" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-1 text-slate-400 hover:text-pink-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
           >
             <span className="text-base sm:text-lg">♥</span>
             <span>Sponsor</span>
           </a>

          <a 
            href="https://buymeacoffee.com/alienx5499" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-yellow-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
            aria-label="Support the developer with a donation"
          >
            <span className="text-base sm:text-lg" aria-hidden="true">☕</span>
            <span>Buy me a coffee</span>
          </a>
          
          <a 
            href="https://x.com/alienx5499" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-sky-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
            aria-label="Follow the developer on X (Twitter)"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            <span>X</span>
          </a>
        </div>
      </Footer>

      {/* SEO Content for better search engine understanding */}
      <SEOContent algorithm={algorithmName} />
      
      {/* Floating Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default App;
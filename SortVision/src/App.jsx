import React, { useState, useEffect, lazy, Suspense, useMemo, useCallback, memo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Terminal, Code, Github, Linkedin, Twitter } from 'lucide-react';
import { getAlgorithmMetaTags, getAlgorithmSchema, algorithms } from './utils/seo';

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
 */
const App = () => {
  // Get route parameters and location
  const { algorithmName } = useParams();
  const location = useLocation();
  
  // State for typing animation
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = 'Interactive visualization of popular sorting algorithms';
  
  // Get the current algorithm name for SEO - memoized to prevent recalculation
  const currentAlgorithm = useMemo(() => algorithmName || 'bubble', [algorithmName]);
  const algorithmTitle = useMemo(() => 
    algorithms[currentAlgorithm]?.name || 'Sorting Algorithms', 
    [currentAlgorithm]
  );
  
  // Memoize SEO metadata to prevent recalculation on each render
  const metaTags = useMemo(() => {
    if (algorithmName) {
      return getAlgorithmMetaTags(algorithmName);
    }
    
    return {
      title: 'SortVision | Interactive Sorting Algorithm Visualizer & Learning Tool',
      description: 'Master sorting algorithms with interactive visualizations. Compare Bubble, Merge, Quick Sort and more with real-time animations and metrics.',
      keywords: 'sorting visualizer, algorithm visualizer, bubble sort, merge sort, quick sort, insertion sort, selection sort, interactive sorting, learn sorting algorithms, algorithm comparison, sorting algorithm complexity, programming education',
      ogTitle: 'SortVision | Interactive Sorting Algorithm Visualizer & Learning Tool',
      ogDescription: 'Master sorting algorithms with interactive visualizations. Compare Bubble, Merge, Quick Sort and more with real-time animations and metrics.',
      twitterTitle: 'SortVision | Interactive Sorting Algorithm Visualizer & Learning Tool',
      twitterDescription: 'Master sorting algorithms with interactive visualizations. Compare Bubble, Merge, Quick Sort and more with real-time animations and metrics.'
    };
  }, [algorithmName]);
  
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
      "creator": {
        "@type": "Person",
        "name": "alienX"
      },
      "screenshot": "https://sortvision.vercel.app/og-image.png",
      "featureList": "Bubble Sort, Insertion Sort, Selection Sort, Merge Sort, Quick Sort, Heap Sort, Radix Sort, Performance Metrics, Algorithm Comparison",
      "keywords": `sorting algorithms, algorithm visualization, ${currentAlgorithm} sort, computer science education, programming tools`,
      "sameAs": [
        "https://github.com/alienx5499/SortVision",
        "https://x.com/alienx5499"
      ]
    };
    
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
  }, [algorithmName, algorithmTitle, currentAlgorithm, location.pathname, metaTags.description]);
  
  // Memoize the current date to prevent recreation on each render
  const currentDate = useMemo(() => new Date().toISOString().split('T')[0], []);
  
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
        <link rel="canonical" href={`https://sortvision.vercel.app${location.pathname}`} />
        <meta property="article:modified_time" content={currentDate} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://sortvision.vercel.app${location.pathname}`} />
        <meta property="og:title" content={metaTags.ogTitle} />
        <meta property="og:description" content={metaTags.ogDescription} />
        <meta property="og:updated_time" content={currentDate} />
        
        {/* Twitter */}
        <meta name="twitter:url" content={`https://sortvision.vercel.app${location.pathname}`} />
        <meta name="twitter:title" content={metaTags.twitterTitle} />
        <meta name="twitter:description" content={metaTags.twitterDescription} />
        
        {/* Schema.org markup for Google */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      
      {/* Header with logo and title */}
      <Header>
        <div className="flex items-center gap-2 sm:gap-3">
          <Terminal className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 animate-pulse animate-infinite animate-duration-[3000ms]" aria-hidden="true" />
          <h1 className="text-2xl sm:text-4xl font-mono font-bold text-white">
            <Link to="https://sortvision.vercel.app/" className="hover:opacity-90 transition-opacity">
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
          <SortingVisualizer initialAlgorithm={currentAlgorithm} />
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer>
        <span className="text-slate-600">/**</span> Built with 
        <span className="inline-block animate-bounce animate-infinite animate-duration-[2000ms] mx-1" aria-hidden="true">❤️</span> 
        by alienX <span className="text-slate-600">*/</span>
        
        {/* Social links - Now wraps on mobile */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4">
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
            <Twitter className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            <span>X</span>
          </a>
        </div>
      </Footer>
    </div>
  );
};

export default App; 
import React, {
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  memo,
  useRef,
} from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Terminal, Code, Github, Linkedin, Twitter, Users } from 'lucide-react';
import { algorithms } from './utils/seo';
import { FeedbackButton } from './components/feedback';
import { SettingsButton } from './components/settings';
import { ChatAssistant } from '@/components/chatbot';
import { AlgorithmStateProvider } from './context/AlgorithmState';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { MobileOverlayContext } from '@/components/MobileOverlay';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import SettingsModal from './components/settings/SettingsModal';
import StarOnGithubPopup from './components/StarOnGithubPopup';
import FeedbackModal from './components/feedback/FeedbackModal';

// Lazy load components that aren't needed immediately
const SortingVisualizer = lazy(
  () => import('./components/sortingVisualizer/SortingVisualizer')
);
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
// Main content component that can use the language context
const MainContent = () => {
  // Get route parameters and location
  const { algorithmName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t, getLocalizedUrl } = useLanguage();

  // State for typing animation
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // State for active tab in SortingVisualizer
  const [activeTab, setActiveTab] = useState('controls');

  // State for special modes (contributors, future modes)
  const [specialMode, setSpecialMode] = useState(null); // null = normal mode, 'contributors' = contributors mode
  const fullText = t('main.subtitle');

  // Extract tab and algorithm/contribution section from path-based routing
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  // Handle language prefixes - check if first segment is a language code
  const supportedLanguages = ['en', 'es', 'hi', 'fr', 'de', 'zh', 'bn', 'ja', 'jp'];
  let pathWithoutLanguage = pathParts;
  if (pathParts.length > 0 && supportedLanguages.includes(pathParts[0])) {
    pathWithoutLanguage = pathParts.slice(1);
  }
  
  const isAlgorithmPath = pathWithoutLanguage[0] === 'algorithms';
  const isContributionPath = pathWithoutLanguage[0] === 'contributions';

  // Get tab from path
  let tabFromPath = null;
  let algorithmFromPath = algorithmName;
  let contributionSection = null;

  if (isAlgorithmPath && pathWithoutLanguage.length >= 3) {
    tabFromPath = pathWithoutLanguage[1]; // config, details, metrics
    algorithmFromPath = pathWithoutLanguage[2];
  } else if (isAlgorithmPath && pathWithoutLanguage.length === 2) {
    algorithmFromPath = pathWithoutLanguage[1];
  }

  if (isContributionPath && pathWithoutLanguage.length >= 2) {
    contributionSection = pathWithoutLanguage[1]; // overview, guide
  }

  // Get the current algorithm name for SEO - memoized to prevent recalculation
  const currentAlgorithm = useMemo(
    () => algorithmFromPath || 'bubble',
    [algorithmFromPath]
  );
  const algorithmTitle = useMemo(
    () => algorithms[currentAlgorithm]?.name || 'Sorting Algorithms',
    [currentAlgorithm]
  );

  // Canonical URL handling now managed by Next.js App Router

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
        // Let middleware handle /contributions redirect
        setActiveTab('overview');
      }
    } else {
      setSpecialMode(null);

      // Handle path-based tab routing for algorithms
      if (
        tabFromPath &&
        ['config', 'metrics', 'details'].includes(tabFromPath)
      ) {
        // Map path-based tabs to internal tab names
        const tabMapping = {
          config: 'controls',
          metrics: 'metrics',
          details: 'details',
        };
        setActiveTab(tabMapping[tabFromPath]);
      } else if (isAlgorithmPath && pathParts.length === 2) {
        // Handle old format /algorithms/bucket -> redirect to /algorithms/config/bucket
        const algorithm = pathParts[1];
        const validAlgorithms = [
          'bubble',
          'insertion',
          'selection',
          'merge',
          'quick',
          'heap',
          'radix',
          'bucket',
        ];
        if (validAlgorithms.includes(algorithm)) {
          // Let middleware handle old format redirects
          setActiveTab('controls');
        }
      } else if (!isAlgorithmPath) {
        setActiveTab('controls'); // Default tab
      }
    }
  }, [
    location.pathname,
    tabFromPath,
    isAlgorithmPath,
    isContributionPath,
    contributionSection,
    navigate,
  ]);

  // Removed SEO metadata - now handled by Next.js App Router generateMetadata

  // Removed schema markup generation - now handled by Next.js App Router metadata

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

  // Loading fallback for lazy loaded components - fixed dimensions to prevent CLS
  const fallbackElement = useMemo(
    () => (
      <div className="w-full">
        {/* Reserve space for SortingVisualizer with exact dimensions */}
        <div className="h-[600px] bg-slate-900/50 rounded-lg border border-slate-800 p-6 flex flex-col items-center justify-center">
          {/* Loading header skeleton */}
          <div className="w-full max-w-2xl mb-6">
            <div className="h-8 bg-slate-800/60 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-slate-800/40 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>

          {/* Tab skeleton */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-10 w-24 bg-slate-800/60 rounded animate-pulse"
              ></div>
            ))}
          </div>

          {/* Main content skeleton */}
          <div className="w-full max-w-4xl">
            {/* Mini sorting bars animation */}
            <div className="flex items-end gap-1 mb-6 justify-center">
              {[15, 25, 12, 30, 18, 28, 20].map((height, index) => (
                <div
                  key={index}
                  className="w-2 bg-gradient-to-t from-emerald-500/50 to-emerald-300/50 rounded-t-sm animate-sort-bounce"
                  style={{
                    height: `${height}px`,
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '1.2s',
                  }}
                />
              ))}
            </div>

            {/* Loading text */}
            <div className="text-emerald-400 font-mono text-sm text-center animate-pulse">
              Loading component
              <span className="animate-ping">...</span>
            </div>

            {/* Control buttons skeleton */}
            <div className="flex gap-2 justify-center mt-6">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="h-10 w-20 bg-slate-800/60 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    []
  );

  const [isMobileOverlayVisible, setMobileOverlayVisible] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const sortingRef = useRef(null);
  const [showShortcutsOnOpen, setShowShortcutsOnOpen] = useState(false);

  // Keyboard shortcuts map (no up/down, no section focus logic)
  const shortcuts = {
    ' ': () => sortingRef.current?.playPause(),
    r: () => sortingRef.current?.resetVisualization(),
    R: () => sortingRef.current?.resetVisualization(),
    n: () => sortingRef.current?.generateNewArray?.(),
    N: () => sortingRef.current?.generateNewArray?.(),
    s: () => sortingRef.current?.shuffleArray(),
    S: () => sortingRef.current?.shuffleArray(),
    '+': () => sortingRef.current?.increaseSpeed(),
    '=': () => sortingRef.current?.increaseSpeed(),
    '-': () => sortingRef.current?.decreaseSpeed(),
    _: () => sortingRef.current?.decreaseSpeed(),
    ArrowRight: () => {
      // Only handle algorithm navigation
      sortingRef.current?.nextAlgorithm();
    },
    ArrowLeft: () => {
      sortingRef.current?.prevAlgorithm();
    },
    h: () => {
      setSettingsOpen(true);
      setShowShortcutsOnOpen(true);
    },
    H: () => {
      setSettingsOpen(true);
      setShowShortcutsOnOpen(true);
    },
    '?': () => {
      setSettingsOpen(true);
      setShowShortcutsOnOpen(true);
    },
    c: () => setChatOpen(v => !v),
    C: () => setChatOpen(v => !v),
    f: () => setFeedbackOpen(v => !v),
    F: () => setFeedbackOpen(v => !v),
    g: () => setSettingsOpen(v => !v),
    G: () => setSettingsOpen(v => !v),
  };
  useKeyboardShortcuts(shortcuts);

  return (
    <MobileOverlayContext.Provider
      value={{ isMobileOverlayVisible, setMobileOverlayVisible }}
    >
      <AlgorithmStateProvider>
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-5 overflow-hidden">
          {/* Animation keyframes for typing cursor */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            .animate-blink {
              animation: blink 1s step-end infinite;
            }
          `,
            }}
          />
          {/* Mobile Detection Overlay - Lazy loaded */}
          <Suspense fallback={null}>
            <MobileOverlay />
          </Suspense>

          {/* SEO now handled by Next.js App Router generateMetadata */}

          <SettingsButton onClick={() => setSettingsOpen(true)} />

          {/* Header with logo and title */}
          <Header>
            <div className="flex items-center gap-2 sm:gap-3">
              <Terminal
                className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 animate-pulse animate-infinite animate-duration-[3000ms]"
                aria-hidden="true"
              />
              <h1 className="text-2xl sm:text-4xl font-mono font-bold text-white">
                <Link to={getLocalizedUrl('')} className="hover:opacity-90 transition-opacity">
                  <span className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">
                    Sort
                  </span>
                  <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                    Vision
                  </span>
                </Link>
              </h1>
              <Code
                className="h-4 w-4 sm:h-6 sm:w-6 text-slate-400 animate-spin animate-once animate-duration-[1500ms] animate-delay-300"
                aria-hidden="true"
              />
            </div>
            <div className="text-lg sm:text-xl font-mono text-slate-400 mt-1">
              <span className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300">
                algorithm
              </span>
              <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                .visualizer
              </span>
              <span className="text-slate-400 hover:text-white transition-colors duration-300">
                ()
              </span>
            </div>
          </Header>

          {/* Subtitle with typing animation - fixed height to prevent CLS */}
          <div className="text-center text-slate-400 font-mono mb-6 sm:mb-8 max-w-[90%] sm:max-w-md h-6 animate-fade-up animate-once animate-duration-[800ms] animate-delay-300">
            <span className="text-amber-400">//</span> {displayText}
            {!isTypingComplete && (
              <span className="inline-block w-0.5 h-4 bg-amber-400 ml-0.5 animate-blink"></span>
            )}
          </div>

          {/* Main Sorting Visualizer Component - Lazy loaded */}
          <main className="animate-fade-up animate-once animate-duration-[1000ms] animate-delay-500 w-full max-w-4xl px-2 sm:px-4">
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 mb-4 text-center">
              {algorithmName
                ? `${algorithmTitle} ${t('main.algorithmVisualization')}`
                : t('main.sortingAlgorithmVisualizer')}
            </h2>
            <Suspense fallback={fallbackElement}>
              <SortingVisualizer
                ref={sortingRef}
                initialAlgorithm={currentAlgorithm}
                activeTab={activeTab}
                onTabChange={newTab => {
                  setActiveTab(newTab);

                  // Handle path-based routing for tab changes
                  if (specialMode === 'contributors') {
                    // Handle contribution tab changes
                    const sectionMapping = {
                      overview: 'overview',
                      guide: 'guide',
                      ssoc: 'ssoc',
                    };
                    const section = sectionMapping[newTab] || 'overview';
                    const newUrl = getLocalizedUrl(`contributions/${section}`);
                    navigate(newUrl, { replace: true });
                  } else {
                    // Handle algorithm tab changes
                    const pathMapping = {
                      controls: 'config',
                      metrics: 'metrics',
                      details: 'details',
                    };
                    const pathSegment = pathMapping[newTab] || 'config';
                    const currentParams = new URLSearchParams(location.search);
                    const basePath = `algorithms/${pathSegment}/${currentAlgorithm}`;
                    const newUrl = getLocalizedUrl(basePath) + (
                      currentParams.toString()
                        ? `?${currentParams.toString()}`
                        : ''
                    );
                    navigate(newUrl, { replace: true });
                  }
                }}
                specialMode={specialMode}
              />
            </Suspense>
          </main>

          {/* Footer */}
          <Footer>
            <span className="text-slate-600">/**</span> {t('main.builtWith')}
            <span
              className="inline-block animate-bounce animate-infinite animate-duration-[2000ms] mx-1"
              aria-hidden="true"
            >
              ❤️
            </span>
            {t('main.by')} alienX <span className="text-slate-600">*/</span>
            {/* Social links - Now wraps on mobile */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4">
              <button
                onClick={() => {
                  if (specialMode === 'contributors') {
                    // Return to normal mode - go to algorithms
                    if (currentAlgorithm) {
                      navigate(getLocalizedUrl(`algorithms/config/${currentAlgorithm}`));
                    } else {
                      navigate(getLocalizedUrl('algorithms/config/bubble')); // Default to bubble sort
                    }
                  } else {
                    // Go to contributors mode - navigate to contributions page
                    navigate(getLocalizedUrl('contributions/overview'));
                  }
                }}
                className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
                aria-label={
                  specialMode === 'contributors'
                    ? 'Return to SortVision main interface'
                    : 'View SortVision contributors'
                }
              >
                {specialMode === 'contributors' ? (
                  <Terminal
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                ) : (
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                )}
                <span>
                  {specialMode === 'contributors'
                    ? t('main.sortVision')
                    : t('main.contributors')}
                </span>
              </button>

              <a
                href="https://github.com/alienx5499/SortVision"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
                aria-label="View SortVision source code on GitHub"
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                <span>{t('main.github')}</span>
              </a>

              <a
                href="https://www.linkedin.com/in/prabalpatra5499/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
                aria-label="Connect with the developer on LinkedIn"
              >
                <Linkedin
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
                <span>{t('main.linkedin')}</span>
              </a>

              <a
                href="https://github.com/sponsors/alienx5499"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-pink-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
              >
                <span className="text-base sm:text-lg">♥</span>
                <span>{t('main.sponsor')}</span>
              </a>

              <a
                href="https://buymeacoffee.com/alienx5499"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-yellow-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
                aria-label="Support the developer with a donation"
              >
                <span className="text-base sm:text-lg" aria-hidden="true">
                  ☕
                </span>
                <span>{t('main.buyMeACoffee')}</span>
              </a>

              <a
                href="https://x.com/alienx5499"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-400 hover:text-sky-400 hover:scale-110 transition-all duration-300 text-[10px] sm:text-xs"
                aria-label="Follow the developer on X (Twitter)"
              >
                <Twitter className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                <span>{t('main.twitter')}</span>
              </a>
            </div>
            {/* Assistant Chatbot */}
            <ChatAssistant
              isOpen={isChatOpen}
              onClose={() => setChatOpen(false)}
              onToggle={() => setChatOpen(!isChatOpen)}
            />
            {/* Other Components */}
            <SettingsModal
              isOpen={isSettingsOpen}
              onClose={() => {
                setSettingsOpen(false);
                setShowShortcutsOnOpen(false);
              }}
              showShortcutsOnOpen={showShortcutsOnOpen}
            />
            <FeedbackButton onClick={() => setFeedbackOpen(true)} />
            <FeedbackModal
              isOpen={isFeedbackOpen}
              onClose={() => setFeedbackOpen(false)}
            />
          </Footer>

          {/* SEO Content for better search engine understanding */}
          {/* SEOContent removed - SEO handled by Next.js App Router */}

          {/* Star on GitHub Popup */}
          <StarOnGithubPopup />

          {/* Floating Feedback Button */}
          {/* <FeedbackButton /> */}
        </div>
      </AlgorithmStateProvider>
    </MobileOverlayContext.Provider>
  );
};

// Main App component that provides the language context
const App = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;

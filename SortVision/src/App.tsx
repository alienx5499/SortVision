import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ForwardRefExoticComponent,
  type LazyExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAppNavigate } from '@/lib/navigation/useAppNavigate';
import { algorithms } from './utils/seo';
import { SettingsButton } from './components/settings';
import {
  AlgorithmStateProvider,
  LanguageProvider,
  useLanguage,
} from '@/context';
import { MobileOverlayContext } from '@/components/MobileViewportGate';
import StarOnGithubPopup from './components/StarOnGithubPopup';
import SponsorUsPopup from './components/SponsorUsPopup';
import PWAInstaller from './components/PWAInstaller';
import {
  MainFooter,
  MainHeader,
  useMainRouteState,
  useMainShellState,
  useMainShortcuts,
  useMainTabNavigation,
  useTypingSubtitle,
} from '@/components/app';
import type {
  SortingVisualizerHandle,
  SortingVisualizerProps,
} from '@/components/sortingVisualizer/SortingVisualizer';
import { normalizeSortingAlgorithmId } from '@/components/sortingVisualizer/algorithmRegistry';

const SortingVisualizer = lazy(() =>
  import('./components/sortingVisualizer/SortingVisualizer').then(m => ({
    default: m.default,
  }))
) as LazyExoticComponent<
  ForwardRefExoticComponent<
    PropsWithoutRef<SortingVisualizerProps> &
      RefAttributes<SortingVisualizerHandle>
  >
>;

const MobileViewportGateLazy = lazy(
  () => import('./components/MobileViewportGate')
);

const MainContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const navigate = useAppNavigate();
  const { t, getLocalizedUrl } = useLanguage();

  const locationSearch = useMemo(() => {
    const q = searchParams.toString();
    return q ? `?${q}` : '';
  }, [searchParams]);

  const fullText = t('main.subtitle');
  const { displayText, isTypingComplete } = useTypingSubtitle(fullText);

  const { activeTab, specialMode, currentAlgorithm, isAlgorithmSection } =
    useMainRouteState({
      pathname,
    });
  const [uiActiveTab, setUiActiveTab] = useState(activeTab);

  useEffect(() => {
    queueMicrotask(() => setUiActiveTab(activeTab));
  }, [activeTab]);

  const algorithmTitle = useMemo(() => {
    const id = normalizeSortingAlgorithmId(currentAlgorithm);
    return algorithms[id]?.name || 'Sorting Algorithms';
  }, [currentAlgorithm]);

  const fallbackElement = useMemo(
    () => (
      <div className="w-full">
        <div className="h-[600px] bg-slate-900/50 rounded-lg border border-slate-800 p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl mb-6">
            <div className="h-8 bg-slate-800/60 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-slate-800/40 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>

          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-10 w-24 bg-slate-800/60 rounded animate-pulse"
              ></div>
            ))}
          </div>

          <div className="w-full max-w-4xl">
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

            <div className="text-emerald-400 font-mono text-sm text-center animate-pulse">
              Loading component
              <span className="animate-ping">...</span>
            </div>

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

  const { mobileOverlay, footerOverlay, footerActions } = useMainShellState();
  const sortingRef = useRef<SortingVisualizerHandle | null>(null);

  useMainShortcuts({
    sortingRef,
    setSettingsOpen: footerActions.setSettingsOpen,
    setChatOpen: footerActions.setChatOpen,
    setFeedbackOpen: footerActions.setFeedbackOpen,
  });

  const handleTabChange = useMainTabNavigation({
    specialMode,
    currentAlgorithm,
    locationSearch,
    getLocalizedUrl,
    navigate,
    onTabChangeOptimistic: setUiActiveTab,
  });

  return (
    <MobileOverlayContext.Provider value={mobileOverlay}>
      <AlgorithmStateProvider>
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-5 overflow-hidden">
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
          <Suspense fallback={null}>
            <MobileViewportGateLazy />
          </Suspense>

          <SettingsButton onClick={footerActions.openSettings} />

          <MainHeader getLocalizedUrl={getLocalizedUrl} />

          <div className="text-center text-slate-400 font-mono mb-6 sm:mb-8 max-w-[90%] sm:max-w-md h-6 animate-fade-up animate-once animate-duration-[800ms] animate-delay-300">
            <span className="text-amber-400">//</span> {displayText}
            {!isTypingComplete && (
              <span className="inline-block w-0.5 h-4 bg-amber-400 ml-0.5 animate-blink"></span>
            )}
          </div>

          <main className="animate-fade-up animate-once animate-duration-[1000ms] animate-delay-500 w-full max-w-4xl px-2 sm:px-4">
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 mb-4 text-center">
              {isAlgorithmSection
                ? `${algorithmTitle} ${t('main.algorithmVisualization')}`
                : t('main.sortingAlgorithmVisualizer')}
            </h2>
            <Suspense fallback={fallbackElement}>
              <SortingVisualizer
                ref={sortingRef}
                initialAlgorithm={currentAlgorithm}
                activeTab={uiActiveTab}
                onTabChange={handleTabChange}
                specialMode={specialMode}
              />
            </Suspense>
          </main>

          <MainFooter
            t={t}
            navigation={{
              specialMode,
              currentAlgorithm,
              getLocalizedUrl,
              navigate,
            }}
            overlay={footerOverlay}
            actions={footerActions}
          />
          <StarOnGithubPopup />
          <SponsorUsPopup />
          <PWAInstaller />
        </div>
      </AlgorithmStateProvider>
    </MobileOverlayContext.Provider>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <Suspense fallback={null}>
        <MainContent />
      </Suspense>
    </LanguageProvider>
  );
};

export default App;

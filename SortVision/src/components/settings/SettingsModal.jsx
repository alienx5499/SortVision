import React from 'react';
// Lazy load framer-motion to reduce initial bundle size
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Settings2, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import SettingsForm from './SettingsForm';
import { useLanguage } from '@/context/LanguageContext';

// KeyboardShortcutsInfoButton: Info icon with tooltip for keyboard shortcuts

function KeyboardShortcutsInfoButton({ showShortcutsOnOpen = false }) {
  const [show, setShow] = React.useState(showShortcutsOnOpen);
  const { t } = useLanguage();
  
  React.useEffect(() => {
    if (showShortcutsOnOpen) setShow(true);
  }, [showShortcutsOnOpen]);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button
        aria-label="Show keyboard shortcuts"
        className="p-2 rounded-full hover:bg-slate-800 border border-slate-600 hover:border-purple-400 transition-colors focus:outline-none"
        type="button"
      >
        <Info className="h-4 w-4 text-purple-400" />
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-96 bg-slate-900 text-white rounded-xl shadow-lg p-4 z-50 border border-purple-400/30">
          <h4 className="font-bold mb-2 text-purple-300 font-mono text-base">
            {t('settings.keyboardShortcuts.title')}
          </h4>
          <div className="space-y-3">
            <div>
              <div className="mb-1 font-mono text-emerald-400 text-xs">
                {t('settings.keyboardShortcuts.navigation')}
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    Tab
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.cycleFocus')}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="flex gap-1">
                    <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                      ←
                    </kbd>
                    <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                      →
                    </kbd>
                  </span>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.navigatePanels')}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-1 font-mono text-emerald-400 text-xs">
                {t('settings.keyboardShortcuts.algorithmControl')}
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    Space
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.playPause')}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    R
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.resetArray')}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-1 font-mono text-emerald-400 text-xs">
                {t('settings.keyboardShortcuts.speedControl')}
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    +
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.increaseSpeed')}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    -
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.decreaseSpeed')}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-1 font-mono text-emerald-400 text-xs">
                {t('settings.keyboardShortcuts.arrayManipulation')}
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    N
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.newArray')}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    S
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.shuffleArray')}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-1 font-mono text-emerald-400 text-xs">
                {t('settings.keyboardShortcuts.modalsOverlays')}
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    C
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.toggleChatAssistant')}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    F
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.toggleFeedbackForm')}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    G
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.toggleSettingsPanel')}
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    H
                  </kbd>
                  <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                    ?
                  </kbd>
                  <span className="ml-2 text-slate-300 font-mono text-xs">
                    {t('settings.keyboardShortcuts.showHelp')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const SettingsModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
        >
          <Card
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 shadow-2xl shadow-emerald-500/10 transition-all duration-500 ease-out animate-in zoom-in-95 fade-in-0 rounded-2xl"
          >
            {/* Close & Info Buttons */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              {/* Info Button with Tooltip */}
              <KeyboardShortcutsInfoButton showShortcutsOnOpen={isOpen} />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-800 transition-colors border border-slate-600 hover:border-emerald-500/50"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-slate-400 hover:text-emerald-400 transition-colors" />
              </button>
            </div>

            <CardHeader className="text-center pr-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Settings2
                  className="h-7 w-7 transition-all duration-300 text-emerald-400 animate-pulse"
                  style={{ animationDuration: '2.5s' }}
                  aria-hidden="true"
                />
                <CardTitle className="text-2xl font-bold font-mono text-white">
                  <span className="text-emerald-400">Sort</span>
                  <span className="text-purple-400">{t('settings.title')}</span>
                </CardTitle>
              </div>
              <CardDescription className="text-slate-400 font-mono">
                <span className="text-amber-400">//</span> {t('settings.description')}
                <br />
                <span className="text-amber-400">//</span> {t('settings.description2')}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 pt-0">
              <SettingsForm onClose={onClose} />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;

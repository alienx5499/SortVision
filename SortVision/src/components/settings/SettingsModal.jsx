import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import SettingsForm from './SettingsForm';

// KeyboardShortcutsInfoButton: Info icon with tooltip for keyboard shortcuts
const shortcuts = [
  {
    category: 'Navigation',
    items: [
      { keys: ['Tab'], description: 'Cycle focus' },
      { keys: ['←', '→', '↑', '↓'], description: 'Navigate panels/steps' },
    ],
  },
  {
    category: 'Algorithm control',
    items: [
      { keys: ['Space'], description: 'Play/Pause animation' },
      { keys: ['R'], description: 'Reset array' },
    ],
  },
  {
    category: 'Speed control',
    items: [
      { keys: ['+'], description: 'Increase speed' },
      { keys: ['-'], description: 'Decrease speed' },
    ],
  },
  {
    category: 'Array manipulation',
    items: [
      { keys: ['N'], description: 'New array' },
      { keys: ['S'], description: 'Shuffle array' },
    ],
  },
  {
    category: 'Shortcut help overlay',
    items: [
      { keys: ['H'], description: 'Show/hide shortcut help' },
    ],
  },
];

function KeyboardShortcutsInfoButton() {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <button
        aria-label="Show keyboard shortcuts"
        className="p-2 rounded-full hover:bg-slate-800 border border-slate-600 hover:border-purple-400 transition-colors focus:outline-none"
        type="button"
      >
        <Info className="h-4 w-4 text-purple-400" />
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-900 text-white rounded-xl shadow-lg p-4 z-50 border border-purple-400/30">
          <h4 className="font-bold mb-2 text-purple-300 font-mono text-base">Keyboard Shortcuts</h4>
          <div className="space-y-3">
            {shortcuts.map((section) => (
              <div key={section.category}>
                <div className="mb-1 font-mono text-emerald-400 text-xs">{section.category}</div>
                <ul className="space-y-1">
                  {section.items.map((item, idx) => (
                    <li key={item.description + idx} className="flex items-center gap-2 text-sm">
                      <span className="flex gap-1">
                        {item.keys.map((key, i) => (
                          <kbd key={i} className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-mono text-purple-200 shadow-inner">
                            {key}
                          </kbd>
                        ))}
                      </span>
                      <span className="ml-2 text-slate-300 font-mono text-xs">{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const SettingsModal = ({ isOpen, onClose }) => {
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
    const handleEscape = (e) => {
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
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 shadow-2xl shadow-emerald-500/10 transition-all duration-500 ease-out animate-in zoom-in-95 fade-in-0 duration-500 rounded-2xl"
          >
            {/* Close & Info Buttons */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              {/* Info Button with Tooltip */}
              <KeyboardShortcutsInfoButton />
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
                  <span className="text-purple-400">Settings</span>
                </CardTitle>
              </div>
              <CardDescription className="text-slate-400 font-mono">
                <span className="text-amber-400">//</span> Customize your visualization preferences<br />
                <span className="text-amber-400">//</span> Adjust sound, theme, and language settings to enhance your experience
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
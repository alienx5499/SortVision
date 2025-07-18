import { useEffect } from 'react';

export type KeyboardShortcutsMap = {
  [key: string]: (event: KeyboardEvent) => void;
};

/**
 * useKeyboardShortcuts - React hook for global keyboard shortcuts
 * @param shortcuts - map of key string to callback function
 */
export function useKeyboardShortcuts(shortcuts: KeyboardShortcutsMap) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (shortcuts.hasOwnProperty(event.key)) {
        // Prevent default for certain keys
        if ([' ', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
          event.preventDefault();
        }
        shortcuts[event.key](event);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
} 
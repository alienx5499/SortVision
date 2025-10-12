/**
 * Theme Management Utilities for SortVision
 *
 * Provides consistent theme application across the application
 */

// Theme application utility
export const applyTheme = theme => {
  if (typeof document === 'undefined') return; // Skip on SSR

  const documentElement = document.documentElement;

  // Remove all theme classes
  documentElement.classList.remove('light', 'dark', 'contrast');

  if (theme === 'system') {
    // Apply system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const themeToApply = prefersDark ? 'dark' : 'light';
    documentElement.classList.add(themeToApply);
    console.log('Applied system theme:', themeToApply);
  } else {
    // Apply selected theme
    documentElement.classList.add(theme);
    console.log('Applied theme:', theme);
  }
};

// Get current theme from localStorage or default
export const getCurrentTheme = () => {
  if (typeof localStorage === 'undefined') return 'system'; // Default for SSR

  const saved = localStorage.getItem('theme');
  if (!saved) {
    // Set default theme if none exists to respect user OS setting
    localStorage.setItem('theme', 'system');
    return 'system';
  }
  return saved;
};

// Initialize theme on app startup
export const initializeTheme = () => {
  if (typeof document === 'undefined') return; // Skip on SSR

  const theme = getCurrentTheme();

  // Only apply if theme class is not already present
  const hasThemeClass =
    document.documentElement.classList.contains('light') ||
    document.documentElement.classList.contains('dark') ||
    document.documentElement.classList.contains('contrast');

  if (!hasThemeClass) {
    applyTheme(theme);
    console.log('Initialized theme:', theme);
  } else {
    console.log(
      'Theme already applied, current classes:',
      document.documentElement.classList.toString()
    );
  }

  // Listen for system theme changes if system theme is selected
  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      console.log('System theme changed');
      applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleChange);
  }
};

// Set and apply a new theme
export const setTheme = theme => {
  if (typeof localStorage === 'undefined') return; // Skip on SSR

  localStorage.setItem('theme', theme);
  applyTheme(theme);
  console.log('Set new theme:', theme);
};

// Theme configuration
export const themes = [
  { id: 'light', name: 'Light Theme' },
  { id: 'dark', name: 'Dark Theme' },
  { id: 'contrast', name: 'High Contrast' },
  { id: 'system', name: 'System Default' },
];

/**
 * Theme Management Utilities for SortVision
 *
 * Provides consistent theme application across the application
 */

const THEME_IDS = ['light', 'dark', 'contrast', 'system'] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export interface ThemeOption {
  id: ThemeId;
  name: string;
}

function isThemeId(value: string): value is ThemeId {
  return (THEME_IDS as readonly string[]).includes(value);
}

export function applyTheme(theme: ThemeId): void {
  if (typeof document === 'undefined') return;

  const documentElement = document.documentElement;

  documentElement.classList.remove('light', 'dark', 'contrast');

  if (theme === 'system') {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const themeToApply = prefersDark ? 'dark' : 'light';
    documentElement.classList.add(themeToApply);
    console.log('Applied system theme:', themeToApply);
  } else {
    documentElement.classList.add(theme);
    console.log('Applied theme:', theme);
  }
}

export function getCurrentTheme(): ThemeId {
  if (typeof localStorage === 'undefined') return 'dark';

  const saved = localStorage.getItem('theme');
  if (!saved) {
    localStorage.setItem('theme', 'dark');
    return 'dark';
  }
  if (isThemeId(saved)) return saved;
  return 'dark';
}

export function initializeTheme(): void {
  if (typeof document === 'undefined') return;

  const theme = getCurrentTheme();

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

  if (theme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      console.log('System theme changed');
      applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleChange);
  }
}

export function setTheme(theme: ThemeId): void {
  if (typeof localStorage === 'undefined') return;

  localStorage.setItem('theme', theme);
  applyTheme(theme);
  console.log('Set new theme:', theme);
}

export const themes: ThemeOption[] = [
  { id: 'light', name: 'Light Theme' },
  { id: 'dark', name: 'Dark Theme' },
  { id: 'contrast', name: 'High Contrast' },
  { id: 'system', name: 'System Default' },
];

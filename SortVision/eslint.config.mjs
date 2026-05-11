import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist', '.next', 'vitest.config.ts', 'coverage/**'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^([A-Z_]|_)',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'react-refresh/only-export-components': [
        'error',
        {
          allowConstantExport: true,
          allowExportNames: [
            'generateMetadata',
            'generateStaticParams',
            'metadata',
            'viewport',
            'dynamic',
            'revalidate',
            'runtime',
            'useAlgorithmState',
            'useLanguage',
            'renderAlgorithmMiniVisualization',
            'getLeaderboardBadges',
          ],
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'error',
        {
          allowConstantExport: true,
          allowExportNames: [
            'generateMetadata',
            'generateStaticParams',
            'metadata',
            'viewport',
            'dynamic',
            'revalidate',
            'runtime',
            'useAlgorithmState',
            'useLanguage',
            'renderAlgorithmMiniVisualization',
            'getLeaderboardBadges',
          ],
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    files: ['public/code/**/*.js'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
  {
    files: [
      'src/context/**/*.{js,jsx}',
      'src/components/MobileViewportGate.tsx',
      'src/components/seo/LanguageDetection.tsx',
      'src/components/ui/badge.tsx',
      'src/components/ui/button.tsx',
    ],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
];

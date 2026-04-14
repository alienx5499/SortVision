import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', '.next'] },
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
        'warn',
        {
          varsIgnorePattern: '^([A-Z_]|_)',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
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
          ],
        },
      ],
      'react-hooks/exhaustive-deps': 'warn',
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
      'src/components/MobileOverlay.jsx',
      'src/components/seo/LanguageDetection.jsx',
      'src/components/ui/badge.jsx',
      'src/components/ui/button.jsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
];

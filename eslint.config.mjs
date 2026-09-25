import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['build', 'node_modules'] },

  // Site source (browser)
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: { react, 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      // React 18 only forwards the lowercase attribute; switch to fetchPriority on React 19
      'react/no-unknown-property': ['error', { ignore: ['fetchpriority'] }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Build config and helper scripts (Node)
  {
    files: ['vite.config.js', 'eslint.config.mjs'],
    languageOptions: { sourceType: 'module', globals: globals.node },
    rules: js.configs.recommended.rules,
  },
  {
    files: ['scripts/**/*.js'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
    rules: js.configs.recommended.rules,
  },

  // Leave all formatting to Prettier
  prettier,
];

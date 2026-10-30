import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  { ignores: ['dist', '.astro', 'node_modules', 'mockups'] },

  js.configs.recommended,
  tseslint.configs.strict,
  astro.configs.recommended,

  // Site source runs in the browser (or at build time in Astro frontmatter)
  {
    files: ['src/**/*.{ts,astro}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  // Config and helper scripts (Node)
  {
    files: ['*.{js,mjs}', 'scripts/**/*.js'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['scripts/**/*.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },

  // Leave all formatting to Prettier
  prettier
);

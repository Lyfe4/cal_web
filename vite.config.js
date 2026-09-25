import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
  },
  preview: {
    port: 3000,
  },
  build: {
    // Keep CRA's output layout so netlify.toml (publish = "build", /static/* cache
    // header) and scripts/generate-sitemap.js keep working unchanged.
    outDir: 'build',
    assetsDir: 'static',
    sourcemap: false,
  },
});

# Calvin R Development

Source for [calvinrdevelopment.com](https://calvinrdevelopment.com), built with React and [Vite](https://vite.dev) and hosted on Netlify.

## Scripts

- `npm start` (or `npm run dev`) runs the dev server at [http://localhost:3000](http://localhost:3000).
- `npm run build` builds the production site to `build/`, then regenerates `sitemap.xml`.
- `npm run preview` serves the production build locally.
- `npm run analyze` builds with sourcemaps and opens a bundle-size breakdown.
- `npm run generate-sitemap`, `generate-icons`, `optimize-images` and `seo-audit` run the helpers in `scripts/`.

Deploy settings (build command, security headers, CSP) live in `netlify.toml`.

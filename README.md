# Calvin R Development

Source for [calvinrdevelopment.com](https://calvinrdevelopment.com), built with [Astro](https://astro.build) (static output, TypeScript strict) and hosted on Netlify. The design system is described in `DESIGN_BRIEF.md`.

## Running it

Needs Node 22.23.4 or later (`.nvmrc` has the version CI uses).

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:4321](http://localhost:4321).

## Scripts

- `npm run dev` runs the dev server.
- `npm run build` builds the static site to `dist/`, including the sitemap, social cards and icons.
- `npm run preview` serves the production build locally. Use it for Lighthouse, since the dev server isn't representative.
- `npm run check` type-checks `.astro` and `.ts` files with `astro check`.
- `npm run lint` checks the code with ESLint (`npm run lint:fix` auto-fixes what it can).
- `npm test` runs the unit tests with Node's built-in test runner.
- `npm run format` formats everything with Prettier (`npm run format:check` only reports).
- `npm run fonts` rebuilds the subset Geist fonts in `src/assets/fonts/` from the full fonts in `mockups/fonts/`.

Before pushing, run `npm run check && npm run lint && npm test && npm run build`. Pull requests run the same four steps in GitHub Actions.

## Where things live

- `src/styles/tokens.css`: every colour, type, spacing, border, radius and motion token.
- `src/data/site.ts`: business name, contact details, address, ABN, prices and service areas. Nothing else hard-codes them.
- `src/data/schema.ts`: the sitewide JSON-LD, merged with any per-page schema.
- `src/content/projects/`: one Markdown file per project, typed by `src/content.config.ts`.
- `src/utils/brand.ts`: the social cards (`/og-image.png` and `/og/<project>.png`), favicons, app icons and manifest. They're drawn as SVG and rendered during the build, so changing a colour, the fonts or a project updates them too. The endpoints that serve them are in `src/pages/`.
- `public/`: files served as they are, such as `/calvin.jpg` (the old site's portrait URL, still used in structured data) and the font licence.

The sitemap's `lastmod` for each page is the date of the last commit that touched that page's content (see `astro.config.mjs`), not the build time.

`mockups/` and `design-research/` are design reference only. They aren't part of the build.

## Deploying

Netlify builds every push: pull requests get a deploy preview, and `master` deploys to production. Build settings, redirects, security headers and the CSP live in `netlify.toml`. Check CSP changes on a deploy preview, since local servers don't send those headers.

Analytics is Cloudflare Web Analytics. The beacon is only included when `PUBLIC_CF_BEACON_TOKEN` is set at build time (see `.env.example`), so set it in Netlify's environment variables for the production context only.

The contact form posts to Formspree. Its endpoint is in `src/data/site.ts`, and `netlify.toml` allows it in the CSP.

To roll back, open the site's Deploys list in Netlify, pick the last good deploy and choose "Publish deploy". That serves the old build straight away without a rebuild. Push a fix or revert afterwards, then unlock auto publishing if Netlify locked it.

## Editor setup

Install the Astro, ESLint and Prettier extensions for your editor to see type and lint issues as you type and format on save.

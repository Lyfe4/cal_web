# Calvin R Development

Source for [calvinrdevelopment.com](https://calvinrdevelopment.com), built with [Astro](https://astro.build) (static output, TypeScript strict) and hosted on Netlify. The design system is described in `DESIGN_BRIEF.md`.

## Scripts

- `npm run dev` runs the dev server at [http://localhost:4321](http://localhost:4321).
- `npm run build` builds the static site to `dist/`, including the sitemap.
- `npm run preview` serves the production build locally.
- `npm run check` type-checks `.astro` and `.ts` files with `astro check`.
- `npm run lint` checks the code with ESLint (`npm run lint:fix` auto-fixes what it can).
- `npm test` runs the unit tests with Node's built-in test runner.
- `npm run format` formats everything with Prettier (`npm run format:check` only reports).
- `npm run fonts` rebuilds the subset Geist fonts in `src/assets/fonts/` from the full fonts in `mockups/fonts/`.
- `npm run generate-icons` regenerates favicons and the social card.

Pull requests run check, lint, test and build in GitHub Actions.

## Where things live

- `src/styles/tokens.css`: every colour, type, spacing, border, radius and motion token.
- `src/data/site.ts`: business name, contact details, address, ABN, prices and service areas. Nothing else hard-codes them.
- `src/data/schema.ts`: the sitewide JSON-LD, merged with any per-page schema.
- `src/content/projects/`: one Markdown file per project, typed by `src/content.config.ts`.

## Deploying

Build settings, security headers and the CSP live in `netlify.toml`. Check CSP changes on a Netlify deploy preview, since local servers don't send those headers.

Analytics is Cloudflare Web Analytics. The beacon is only included when `PUBLIC_CF_BEACON_TOKEN` is set at build time (see `.env.example`).

## Editor setup

Install the Astro, ESLint and Prettier extensions for your editor to see type and lint issues as you type and format on save.

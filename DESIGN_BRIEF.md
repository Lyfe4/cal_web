# Design Brief — calvinrdevelopment.com Redesign

> **For the Claude Code session:** Read this whole file before touching any code. Do **not** load or use the `frontend-design` skill (or any generic design skill). Work from this brief and the references below. Act as a senior product designer + senior frontend engineer with a strong point of view.
>
> Decisions are made in a separate planning session with Calvin and handed to you one phase at a time. Don't jump ahead to later phases or make stack/design decisions that aren't stated here.

---

## 1. Who this site is for

**Calvin R Development** — solo frontend software developer based in **Armidale, NSW (New England)**, working with clients **anywhere in Australia**. Studied computer science at UNE and has worked in-house as a frontend developer on production web apps; now builds for businesses directly. The site never names a current employer.

Two offers, which the site must make clear within 5 seconds:
1. **Websites** — fast, custom-built sites for small businesses (local + national).
2. **Apps & integrations** — frontend for new/existing web apps, integrations (APIs, CMS, payments, booking, CRMs), rescuing/improving existing codebases, contract work.

The site should feel like it was made by **one specific, skilled person** — not an agency template and not an AI landing page. Personality > polish-by-numbers.

---

## 2. Hard "do not" list (the generic/AI look)

- ❌ Cream / off-white / beige backgrounds (`#fbfaf7`, `#f3f0e8`, `#f4efe4`, etc.). Retire the current "Workshop paper" palette entirely.
- ❌ Don't carry over the current site's fonts (Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono) or pine/clay palette by default. Anything reused must be a deliberate choice from the new direction.
- ❌ Serif-headline-on-cream "editorial" default.
- ❌ Purple→blue gradients, gradient blobs, glowing orbs, mesh-gradient heroes.
- ❌ Glassmorphism cards, generic drop-shadow cards in a 3-column grid with an icon on top.
- ❌ Emoji or icon-per-feature rows ("⚡ Fast  🎨 Beautiful  📱 Responsive").
- ❌ Copy like "Elevate your digital presence", "Crafting seamless experiences", "Let's build something amazing together", "impossible to ignore", "Unlock", "Empower".
- ❌ Fake or unprovable stats and claims. Every claim must be true of real work (e.g. no "< 1.5s load" unless this site measures it; no "trusted by businesses" plural with one client).
- ❌ Fake testimonials. Real ones only.
- ❌ Centered-everything layouts with identical section rhythm (heading, subheading, 3 cards, repeat).
- ❌ Default Inter/Poppins/Montserrat with no typographic hierarchy.
- ❌ Scroll-triggered fade-up on every element, or content hidden until JS runs.
- ❌ Stock photos of laptops / handshakes.

---

## 3. Chosen direction

**Engineer's notebook with a sense of place.** This is Direction A (dark, precise, mono for facts) with a warmer graphite and a light regional touch, no more. The reference build is `mockups/final.html` on branch `redesign/mockups`. Where this section and that file disagree, fix one so they match; don't guess. Directions B and C, and the earlier A/A+B/C mockups, are retired.

### 3.1 Colour tokens

Warm graphite, three text tiers, one accent. Build in OKLCH; the hex values are what the mockup ships.

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `--bg` | `#141210` | `oklch(18.4% 0.005 67.5)` | Page background. Also the text colour on the accent button. |
| `--surface` | `#1D1B18` | `oklch(22.3% 0.006 78.2)` | Raised panel. Defined but unused in `final.html`; keep it for things like the mobile menu. |
| `--rule` | `#2E2B27` | `oklch(29.1% 0.008 75.3)` | Every structural 1px line: header, section tops, table rows, ghost-button border. |
| `--mat` | `#2A2723` | `oklch(27.5% 0.008 75.2)` | Screenshot frame background. |
| `--mat-edge` | `#3D3934` | `oklch(34.7% 0.010 73.6)` | Frame border and the three browser-bar dots. |
| leader | `#45413B` | `oklch(37.7% 0.011 78.2)` | Dotted leader line in the spec sheet only. Currently inline; make it a token. |
| `--text` | `#F0EDE8` | `oklch(94.7% 0.007 80.7)` | Headings, project names, values, the bold first sentence of the lede. |
| `--text-2` | `#BEB8AF` | `oklch(78.5% 0.014 78.2)` | Body copy, descriptions, nav links (header and footer), frame URLs. |
| `--text-3` | `#999288` | `oklch(66.3% 0.017 77.0)` | Mono labels, section heads, facts rows, `dt`s, footer meta. |
| `--accent` | `#FF6B2C` | `oklch(70.4% 0.195 40.9)` | Signal orange. See 3.6 for where it's allowed. |
| `--on-accent` | `#141210` | = `--bg` | Text on the accent. |

**Measured contrast (WCAG 2.x):**

| Pair | Ratio | Result |
|---|---|---|
| `--text` on `--bg` | 16.00:1 | AA, AAA |
| `--text` on `--surface` | 14.71:1 | AA, AAA |
| `--text-2` on `--bg` | 9.49:1 | AA, AAA |
| `--text-2` on `--mat` (frame URL) | 7.55:1 | AA, AAA |
| `--accent` on `--bg` ("In progress", focus ring) | 6.58:1 | AA |
| `--on-accent` on `--accent` (primary CTA) | 6.58:1 | AA |
| `--text-3` on `--bg` (12px mono labels) | 6.07:1 | AA |
| `--text-3` on `--mat` | 4.83:1 | AA, with little margin; avoid |
| `--rule`, `--mat-edge`, leader on `--bg` | 1.33 / 1.63 / 1.84:1 | Decorative only. Never use them for text or for anything that has to be seen to be used. |

`--text-3` is the floor for any text on this page. Don't add a fourth, dimmer grey.

### 3.2 Type

- **Families:** Geist (sans) and Geist Mono, self-hosted variable WOFF2 (SIL OFL). Subset for production.
- **Weights in use:** Geist 400 (body), 480 (hero h1), 500 (project names, buttons, lede lead-in), 560 (wordmark). Geist Mono 400 only. No bold 700 anywhere.
- **Rule of thumb:** grotesk for claims, mono for facts. Labels, statuses, prices-as-metadata, section numbers and URLs are mono. Sentences are sans.

| Role | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| Hero h1 | `clamp(42px, 6.6vw, 96px)` | 480 | 1 | −0.048em, `max-width: 16ch` |
| Project name (rows) | `clamp(44px, 7vw, 104px)` | 500 | 0.92 | −0.055em |
| Featured project name | `clamp(44px, 6vw, 88px)` | 500 | 0.95 | −0.05em |
| Lede | `clamp(17px, 1.5vw, 20px)` | 400, lead-in 500 in `--text` | 1.45 | 0, `max-width: 46ch` |
| Project description | 17px | 400 | 1.55 | 0, `max-width: 44ch` |
| Body | 16px | 400 | 1.55 | 0 |
| Buttons, spec values | 15px | 500 / 400 / 400 | 1.55 | 0 |
| Mono label | 12px uppercase | 400 | 1.55 | +0.04em |
| Frame URL | 11px mono, sentence case | 400 | n/a | +0.02em |

The scale is bimodal: big statements (42–104px) and small functional text (11–20px), with nothing in between. Don't add a 24–36px "subheading" size.

### 3.3 Layout, spacing, rules, radii

- **Container:** `max-width: 1280px`, gutter `clamp(16px, 3vw, 40px)`. Everything is left-aligned. Nothing is centred.
- **Spacing steps in use:** 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 72px, plus the fluid hero values:
  - Hero padding: `clamp(48px, 8vw, 112px)` top, `clamp(40px, 5vw, 64px)` bottom.
  - Lede row: margin `clamp(32px, 4vw, 48px)` above, gap 28px / 64px.
  - Section: 1px `--rule` top, 20px padding above the section head, 72px below the content. Section head to content: 28px.
  - Featured project: gap 32px / 48px, 56px below.
  - Project rows: 32px top, 40px bottom, gap 16px / 40px. On mobile: 24px / 32px.
  - Spec sheet: 64px column gap, 11px row padding.
  - Footer: 40px top, 48px bottom.
  - Header: 56px tall, plus its 1px rule.
  - Buttons: 44px tall, 18px side padding, 12px apart.
- **Breakpoints:** 860px (single column, nav hidden, numbers move above names) and 480px (spec values wrap under their labels, leaders hidden).
- **Rules:** all lines are 1px. Solid `--rule` for structure, dotted leader colour for spec leaders. No 2px rules, no shadows.
- **Radii:** 0 on everything rectangular: buttons, frames, panels. The only round shapes are the 7px status dots and the frame's three browser dots.
- **Focus:** `outline: 2px solid var(--accent); outline-offset: 3px` on `:focus-visible`.

### 3.4 Screenshots and how they're framed

- **Source:** real captures of the live sites. Desktop width (1440px viewport) for websites. For app UIs, the narrowest width at which the app shows its wide (landscape) layout, so the text stays legible when scaled into a frame and nothing is clipped (Fuel Finder: 1100px, list and map side by side). Saved as WebP quality 80 in the image folder, with `width`/`height` set to stop layout shift. Never a live iframe.
- **Choose the view that shows the work best:** the brightest, most representative section, not just the top of the homepage. LenBuild uses the "Custom Home Building" section of its Projects & Services page (green brand bar plus real photos). Fuel Finder uses a real Armidale U91 search in its **light theme**, list and map side by side, with the map nudged so every station's price tag is in view. Patchbay uses its default **blueprint** theme (navy and cyan), captured in a fresh browser profile so no saved theme applies, and is cropped to the headline plus the starting pipeline list. Colours inside a screenshot belong to that product (Fuel Finder's light theme is warm off-white), and none of them become page colours.
- **Frame (`figure.frame`):**
  - Background `--mat`, 1px `--mat-edge` border, padding `0 8px 8px`.
  - On top, a 32px browser bar: three 7px dots in `--mat-edge`, then the site's address in 11px Geist Mono, `--text-2`, sentence case, `aria-hidden`.
  - The image fills the frame width.
  - Every screenshot gets a frame, including the bright ones, so all work reads as an object sitting on the page rather than part of it.
- **Width and alignment rule:**
  - In the project rows, every frame stretches to fill the screenshot column (`justify-self: stretch`), so all frames are the same width and share the same right edge (1440px viewport: 532px wide, right edge at x = 1320).
  - Every screenshot fills its frame's width, with no side mat showing. Don't cap or centre a narrow capture inside a frame, and never shrink the frame to fit the image.
  - Capture wide enough that the image is landscape. If a capture can't be made wide, keep it at full frame width and crop its height instead, so a project row is no taller than the others (at 1440px no frame in the rows is taller than Patchbay's, about 391px). A portrait gallery shot beside case-study copy may stay portrait, still at full frame width.
  - On mobile every frame is full content width.
- **Alt text:** describe what's on screen and the real data shown ("results for Armidale, eight stations listed cheapest first"), not "screenshot of…".

### 3.5 Key patterns

1. **Header:** wordmark "Calvin R **Development**" with "Development" in `--text-3`. Mono uppercase nav (Work, Services, About, Contact) in `--text-2`, 28px apart. 1px rule below.
   - **Reappears on scroll up.** With JS the header is `position: sticky` at the top on a solid `--bg` background (never translucent or blurred). Scrolling down past the header slides it up out of view; scrolling up, even a little, brings it back. At the top of the page it's always visible. Moves under 6px are ignored so jitter can't flicker it.
   - It moves by `transform` only and keeps its slot in the flow, so hiding and showing never shifts the layout (CLS 0). Under `prefers-reduced-motion` it shows and hides instantly with no slide.
   - One passive scroll listener, throttled with `requestAnimationFrame`. No library.
   - Keyboard: focus moving into the header (Tab from the top, Shift+Tab back up) shows it, and it stays while keyboard focus is inside. A link clicked or tapped doesn't pin it. The open mobile menu keeps it visible until the menu closes.
   - Without JS it's not sticky; it sits at the top of the page as before.
   - Because it can overlay content, `html` gets `scroll-padding-top` of the header height + 16px while it's sticky, so in-page anchors (#work), the skip-link target and scrolled-to elements land below it. The contact form focuses a field with `preventScroll` and then scrolls the whole field (label, control, error) into view itself, because WebKit ignores the padding when `focus()` scrolls.
2. **Hero:**
   - The h1 says what Calvin does, not where: "Websites and web apps for businesses across Australia."
   - Below it, a two-part row. On the left, the lede, starting with the bold `--text` sentence "I'm Calvin, a frontend developer based in Armidale, NSW." On the right, two CTAs, "See work" (ghost) and "Get a quote →" (accent), over a mono note "Websites from $600 · Replies within one business day".
   - The location appears **once** in the hero.
   - There's no entrance animation; it renders from static HTML.
   - The top of the LenBuild frame must show above the fold at 1440×900 and 375×812, without pushing the CTAs down.
3. **Section head:** mono `--text-3` row: "01 / Selected work" on the left, a quiet count or note on the right (hidden under 860px). No big h2s per section.
4. **Featured project + spec table** (one project, currently LenBuild):
   - A 2fr / 1fr grid: framed screenshot on the left. On the right, the name at the featured size, a mono kind line ("Client website · Guyra, NSW"), a one-sentence description, a ghost "Read the case study →" button, then a mono `dl` (Client / Type / Status), each row on a 1px rule with values right-aligned.
   - Stacks on mobile.
5. **Large project names** (the other projects):
   - An `ol` of rows, each with a 1px top rule. Three columns: mono number (56px), then text, then frame (both text and frame `1fr`).
   - The text column holds the name at up to 104px as a link (underline on hover), a description (max 44ch), and a mono facts row (type · data source or "Side project" · status).
   - On mobile it's one column: number above name, frame full width.
6. **Status:** a 7px dot plus a mono word. "Live" uses a `--text` dot. "In progress" is `--accent` for both dot and word.
7. **Dot-leader spec sheet** (on /services and the local pages; no longer on the homepage):
   - Two separate `dl`s side by side. Left: **prices** (Starter website from $600, Professional website from $1,125, Apps & integrations quoted per project, Extra pages $150 each, Support $80/mo or $800/yr). Right: **logistics** (Replies within one business day, In person in and around Armidale, Remote Australia-wide, Stack, Email).
   - Each row: mono `dt`, a dotted leader that fills the gap, right-aligned value in 15px sans.
   - On mobile the two lists stack, prices first. Never interleave the two lists. Under 480px the leaders hide and values wrap under their labels.
8. **Footer:**
   - On the left, a footer nav in the mono label + link style: two rows, each led by a `--text-3` label, with `--text-2` links that underline. "Site": Work, Services, About, Contact. "Areas": Armidale, Tamworth, New England. The labels share a column so the links line up; at 375px each row's links wrap within it.
   - On the right, mono meta in `--text-3`: business name · address; phone; email; ABN. Under 860px it stacks below the nav, left-aligned.

### 3.6 Accent rules

- Orange marks exactly two things in content: the **primary CTA** ("Get a quote") and the **"In progress"** status (dot and word).
- Two functional uses are also allowed because they're invisible until needed: the `:focus-visible` ring and `::selection`.
- Nothing else: no orange headings, links, icons, borders, underlines, backgrounds, hover states or decorative shapes.
- Budget: **under 5% of any screen.** Measured on the mockup: 0.13% of the full desktop page, 0.43% of the 1440×900 first screen, 1.81% of the 375×812 first screen.
- Only one orange button per screen. If a second action is needed, it's a ghost button.

### 3.7 What not to do in this system

- Don't lead the hero with location, or repeat "Armidale" in the hero. Local relevance belongs in the lede, the spec sheet, local pages and the footer.
- Don't mix up the three name forms. The hero and conversational copy say "I'm Calvin". The About page and structured data (`Person` name, `founder` on the business schema) use the full name "Calvin Reinke". The business name is always "Calvin R Development" and is never expanded to "Calvin Reinke Development".
- Don't add cards, shadows, rounded corners, gradients, glows or glass. Structure comes from 1px rules and space.
- Don't use the accent outside 3.6, and don't introduce a second accent colour. Colour comes from the screenshots.
- Don't put a screenshot on the page unframed, let frames in one list differ in width or right edge, or crop the work so it's clipped or mostly empty.
- Don't use a dimmer grey than `--text-3` for text, or put text on `--rule`/`--mat-edge` colours.
- Don't add a mid-size heading tier, bold 700 weights, or a third typeface.
- Don't use "Fig." captions, faux terminal windows or code-as-decoration. The notebook feel comes from mono facts, rules and leaders, not props.
- Don't interleave spec-sheet columns on mobile, or mix prices and logistics in one list.
- Don't use em dashes in rendered copy. Use full stops, commas or a colon (the existing site rule).
- No live clock, availability pill, entrance animation on hero content, or invented numbers.

---

## 4. Reference sites to study

Study for *specific* things (listed next to each) — do not copy any site wholesale.

### Developer / designer personal sites
| Site | Study it for |
|---|---|
| https://rauno.me | Restraint, micro-interactions, typographic detail |
| https://emilkowal.ski | Motion done subtly, crisp UI craft |
| https://paco.me | Minimal personal site, tasteful density |
| https://brittanychiang.com | Clear dev-portfolio structure, sticky nav + project list |
| https://www.joshwcomeau.com | Personality, playful-but-professional interaction |
| https://leerob.com | Ultra-minimal, content-first |

### Product / SaaS sites (layout, hierarchy, copy)
| Site | Study it for |
|---|---|
| https://linear.app | Dark UI, hierarchy, product storytelling |
| https://vercel.com | Grid systems, monospace details, dev-audience tone |
| https://stripe.com | Section variety, diagrams explaining technical things simply |
| https://www.raycast.com | Dark palette with a single strong accent |
| https://resend.com | Tight typography, dev-focused simplicity |
| https://railway.com | Characterful product site for developers |

### Studios / agencies (portfolio presentation)
| Site | Study it for |
|---|---|
| https://www.pentagram.com | Case study presentation, typographic confidence |
| https://area17.com | Strict grid, editorial project pages |
| https://basement.studio | Bold personality, studio voice |
| https://locomotive.ca | Motion + layout ambition (use sparingly) |
| https://lusion.co | Showpiece interaction (inspiration only, not for this scale) |
| https://humaan.com | Australian studio — local tone, clear services |

### Inspiration galleries (browse by category)
- https://godly.website — best curated modern web design
- https://www.siteinspire.com — filter by "portfolio", "minimal", "typographic"
- https://www.awwwards.com — filter Sites of the Day → Portfolio
- https://land-book.com — landing page sections
- https://minimal.gallery — restrained designs
- https://www.lapa.ninja — landing page patterns
- https://onepagelove.com — single-page portfolios
- https://refero.design / https://mobbin.com — real UI patterns by component (nav, pricing, contact, footers)
- https://hoverstat.es — experimental / typographic

> Many galleries are JS-heavy and may not render via fetch — use Chrome, or screenshots Calvin provides.

---

## 5. Craft resources (how a senior does it)

**Design fundamentals**
- Refactoring UI — https://www.refactoringui.com (hierarchy, spacing, colour)
- Laws of UX — https://lawsofux.com
- Practical Typography — https://practicaltypography.com
- Vercel Web Interface Guidelines — https://vercel.com/design/guidelines
- Rauno — "Invisible Details of Interaction Design" — https://rauno.me/craft/interaction-design
- Nielsen Norman Group — https://www.nngroup.com

**Type & colour tools**
- Fluid type + spacing scales — https://utopia.fyi
- Type scale preview — https://typescale.com
- Test palettes on a real layout — https://www.realtimecolors.com
- OKLCH colour picker — https://oklch.com (build the palette in OKLCH)
- Quality fonts beyond Google defaults — https://www.fontshare.com (e.g. General Sans, Satoshi, Switzer, Cabinet Grotesk), https://vercel.com/font (Geist + Geist Mono). Fonts will be **self-hosted**, so check the licence allows it.

**Layout & CSS**
- Every Layout — https://every-layout.dev
- Modern CSS — https://moderncss.dev
- Josh Comeau's CSS articles — https://www.joshwcomeau.com/css/

**Motion**
- Emil Kowalski's animation notes — https://animations.dev
- Use CSS transitions/animations and the View Transitions API. **No framer-motion / Motion library.**
- `prefers-reduced-motion` respected everywhere, including any JS-driven motion.

**Accessibility & performance (non-negotiable for a dev selling "fast sites")**
- https://www.a11yproject.com/checklist/
- https://web.dev/articles/vitals
- Target: Lighthouse 95+ in all four categories **on mobile**, LCP < 1.5s, zero layout shift.

---

## 6. Site structure and content

**Homepage order:** hero, then numbered sections 01 Selected work, 02 Services, 03 How I work, 04 Kind words, 05 Contact. Numbers come from page order, so they renumber themselves when a section is added or removed (Kind words drops out, and Contact becomes 04, if there are no testimonials). The homepage has no Details (spec sheet) or About section: prices live on /services and the local pages, and About is its own page at /about.

1. **Hero** — one plain sentence of what Calvin does + who for. e.g. *"Frontend developer in Armidale building fast websites and web apps for businesses across Australia."* Two CTAs: **See work** / **Get a quote**. Let type + one strong detail carry it. Hero content must render without JS and without an entrance animation.
2. **Selected work** — the centrepiece. Three projects, each with its own case-study page:
   - **LenBuild** (lenbuild.com) — client website, custom home builder, Guyra NSW. Use an optimised screenshot, **not a live iframe**.
   - **Fuel Finder** (nsw-fuel-finder.netlify.app) — live NSW & ACT fuel prices, cheapest first, list + map, four months of price history. Shows the apps & integrations offer. Label it **"In progress"**.
   - **Patchbay** (patchbay-tools.netlify.app) — developer toolbox that runs entirely in your browser. Shown as a project only (see Section 7).
   Each: screenshot, type of work, problem → what was built → result. No invented metrics.
3. **Services** — split into *Websites* and *Apps & integrations*. Keep current pricing unless told otherwise: Starter from $600, Professional from $1,125, Custom/contract quoted; extras $150/page, monthly support $80/mo, annual $800/yr.
4. **How I work** — short numbered process. Emphasise working directly with the developer, no agency layers.
5. **About** (its own page, /about; not a homepage section) — real photo of Calvin, named in full as "Calvin Reinke" (also the `Person` name and `founder` in structured data; the business name stays "Calvin R Development" and the hero stays "I'm Calvin"), Armidale/New England, computer science at UNE as education only (`alumniOf` the University of New England in structured data; no current employer named anywhere, no `worksFor`), in-house frontend experience on production web apps without naming where, remote across Australia, stack shown subtly.
6. **Kind words** (proof) — real testimonials only, word for word with a link to the source. One exists (Dan, LenBuild, Google review). The section is absent whenever the list is empty.
7. **Contact** — form (Formspree, keep the existing validation from the hotfix), email, phone, service area (in person in and around Armidale, further around New England by arrangement; phone, video and email Australia-wide). Response promise: **"Replies within one business day"** — no Mon–Fri 9–5 hours anywhere, including schema.
8. **Local pages** — Armidale, Tamworth, New England. Same design system, genuinely useful local content, not thin keyword pages.
   - **How Calvin works with clients (use everywhere):** in person in and around Armidale (Armidale, Guyra, Uralla). Clients from further away are welcome to meet him in Armidale. Elsewhere in New England, in person only by arrangement. Everything else is by phone, video and email, anywhere in Australia. First contact can be a call or an in-person chat; after that the work runs by email and phone, whichever the client prefers, plus the private preview link. Never offer travel to Tamworth. LenBuild is the only local client to name.
9. **404 page** — real one, returning a 404 status.

---

## 7. Technical standard

Match the **engineering** standard of Calvin's recent project Patchbay — **code quality only**.

> ⚠️ Do **not** use Patchbay (or Fuel Finder) as a visual, UI, UX, layout or copy reference. Do not reuse their colours, fonts, components or styling. The redesign's look comes solely from Sections 2–6.

Decided stack:
- **Astro** (static output), **TypeScript strict** throughout. Islands only where interactivity is needed (mobile nav, contact form) — minimal JS by default.
- **Netlify** hosting. Security headers/CSP stay in `netlify.toml` and must be updated for any new third party. Verify on a **Netlify deploy preview**, not just localhost (CSP isn't applied locally).
- **Self-hosted fonts**, subset, only the weights used.
- **Analytics:** lightweight and cookieless (provider to be confirmed — Plausible or Cloudflare Web Analytics). GA4 is being removed.
- **Formspree** for the contact form.

Requirements:
- **Accessibility built in**: full keyboard path, skip link, visible focus styles, semantic HTML, correct heading order, WCAG AA contrast (including small/muted text), mobile menu `inert`/hidden when closed with Escape + focus management. Verified with axe/Lighthouse, not asserted.
- Claims on the site must be **true of the site itself**, checked against the built output.
- **SEO**: per-page title/description/canonical/OG in the static HTML; business schema (ProfessionalService) sitewide, consistent NAP formatting; sitemap with real lastmod; preserve `/`, `/about`, `/services`, `/contact` (and `?package=` query links) or 301 them; real 404.
- Regenerate og-image, favicons and manifest/theme-color in the new palette; keep theme-color and manifest consistent.
- Clean structure: typed components, content in data/collections rather than scattered inline strings, linting/formatting, tests where logic exists, no dead dependencies.
- **Git safety:** ask before any destructive git command (`reset --hard`, force push, branch deletion, history rewrites). Work on a branch for the rebuild, not directly on `master`.

---

## 8. Process for the Claude Code session

The repo audit and the contact-form hotfix are already done. From here:

1. **Research**: review the reference sites (Section 4) and summarise patterns. No code changes.
2. **Propose** directions A/B/C as quick static hero mockups. Wait for Calvin to choose.
3. **Define tokens first**: colour (OKLCH), fluid type scale, spacing, radii, borders, motion durations — in one place.
4. **Build** in the phases Calvin gives you: homepage → case-study template → services → about → contact → local pages → 404.
5. **Self-critique each section** as a senior designer: "Would this look at home on godly.website? What makes it look templated? What's the one detail that makes it Calvin's?" Fix before moving on.
6. **Check** at 375px, 768px, 1280px, 1920px; keyboard nav; reduced motion; Lighthouse mobile + desktop.
7. Keep copy **specific and plain-Australian** — no hype words.

---

## 9. Definition of done

- Nobody would guess it was AI-generated or a template.
- A visitor knows within 5 seconds: who, what (sites + apps), where (Armidale, Australia-wide), how to contact.
- Projects are the hero of the site, not decoration.
- Lighthouse 95+ on mobile across the board; every claim on the site is true.
- Fast, accessible, and consistent across every page.

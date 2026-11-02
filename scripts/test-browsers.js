// Cross-browser check of the site's motion in Chromium, Firefox and WebKit (Playwright),
// each with and without prefers-reduced-motion. Optional; not part of CI.
//
//   npm run test:browsers                  builds, serves dist/ locally and runs the matrix
//   node scripts/test-browsers.js <url>    runs it against a deployed site, e.g. a Netlify
//                                          deploy preview
//
// Needs the browsers once: npx playwright install chromium firefox webkit
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';

const engines = { chromium, firefox, webkit };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Serves dist/ with clean URLs (/about -> about.html), like Netlify. Resolves to its URL. */
const serveDist = async () => {
  const root = fileURLToPath(new URL('../dist/', import.meta.url));
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.woff2': 'font/woff2',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.ico': 'image/x-icon',
  };
  const isFile = async (path) => {
    try {
      return (await stat(path)).isFile() ? path : null;
    } catch {
      return null;
    }
  };
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
    const file =
      (await isFile(join(root, path))) ??
      (await isFile(join(root, `${path}.html`))) ??
      (await isFile(join(root, path, 'index.html')));
    if (!file) {
      res.writeHead(404);
      res.end(await readFile(join(root, '404.html')).catch(() => 'Not found'));
      return;
    }
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  });
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = /** @type {import('node:net').AddressInfo} */ (server.address());
  return { url: `http://localhost:${port}`, close: () => server.close() };
};

/** Width of a step's progress rule: 0 to 1, or null when there's no rule (reduced motion) */
const ruleScale = (page, index) =>
  page.evaluate((i) => {
    const before = getComputedStyle(document.querySelectorAll('.steps li')[i], '::before');
    if (before.content === 'none') return null;
    return before.transform === 'none'
      ? 1
      : Number(new DOMMatrixReadOnly(before.transform).a.toFixed(2));
  }, index);

async function run(base, name, motion, record) {
  const moving = motion === 'motion';
  const browser = await engines[name].launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: moving ? 'no-preference' : 'reduce',
  });
  if (name === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  // Remember whether each page arrived by a view transition
  await context.addInitScript(() => {
    addEventListener('pagereveal', (event) => {
      try {
        sessionStorage.setItem('vt', String(Boolean(event.viewTransition)));
      } catch {
        // Sandboxed frames (Netlify's preview drawer) have no storage
      }
    });
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    // Netlify's deploy-preview drawer tries to frame app.netlify.com, which the CSP blocks
    if (message.type() === 'error' && !message.text().includes('app.netlify.com')) {
      errors.push(message.text());
    }
  });
  const check = (item, ok, note = '') => record({ name, motion, item, ok, note });

  // Page transitions: a project name click runs one wherever the browser supports them
  await page.goto(`${base}/`);
  const supported = await page.evaluate(() => 'CSSViewTransitionRule' in window);
  await page.click('.projects h3 a');
  await page.waitForURL('**/work/**');
  await sleep(600);
  const ran = (await page.evaluate(() => sessionStorage.getItem('vt'))) === 'true';
  check('transitions', moving ? ran === supported : !ran, `supported=${supported} ran=${ran}`);

  // Build log
  await page.goto(`${base}/`);
  const log = (await page.textContent('.build-log')) ?? '';
  check('build log', /Built[\s\S]*from\s+\w{7}/.test(log) && log.includes('This page:'));

  // Status: plays on entry, clears itself, plays again on re-entry after the cooldown
  const status = page.locator('.projects [data-status]').first();
  const showStatus = async () => {
    await status.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, 200));
    await sleep(300);
    return status.evaluate((el) => el.hasAttribute('data-seen'));
  };
  const first = await showStatus();
  await sleep(5200);
  const cleared = await status.evaluate((el) => !el.hasAttribute('data-seen'));
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1800);
  const again = await showStatus();
  check(
    'status',
    moving ? first && cleared && again : !first && !again,
    `first=${first} cleared=${cleared} again=${again}`
  );

  // How I work (on /services): steps above the reading line filled, below empty; undone on
  // the way up
  await page.goto(`${base}/services`);
  const mode = await page.evaluate(
    () => document.querySelector('[data-steps]')?.getAttribute('data-progress') ?? 'off'
  );
  await page.evaluate(() => {
    const third = document.querySelectorAll('.steps li')[2];
    window.scrollBy(0, third.getBoundingClientRect().top - window.innerHeight * 0.6 + 120);
  });
  await sleep(900);
  const down = await Promise.all([0, 1, 2, 3, 4].map((i) => ruleScale(page, i)));
  await page.evaluate(() => window.scrollBy(0, -500));
  await sleep(900);
  const up = await Promise.all([0, 1, 2, 3, 4].map((i) => ruleScale(page, i)));
  check(
    'how I work',
    moving
      ? down[0] === 1 && down[1] === 1 && down[4] === 0 && up[1] === 0
      : mode === 'off' && down.every((v) => v === null),
    `mode=${mode} down=${down} up=${up}`
  );
  await page.goto(`${base}/`);

  // Copy: visible beside the email in the contact block, and only there (the footer leaves
  // out the email and phone a page already shows); copies and announces
  const visibleCopies = () =>
    page
      .locator('[data-copy]')
      .evaluateAll((buttons) => buttons.filter((b) => b.offsetWidth > 0 && !b.hidden).length);
  const visible = await visibleCopies();
  const copy = page.locator('#contact [data-copy]');
  await copy.scrollIntoViewIfNeeded();
  await copy.click();
  await sleep(300);
  const label = (await copy.textContent())?.trim();
  const announced = await copy.evaluate((b) => b.nextElementSibling?.textContent);
  check(
    'copy',
    visible === 1 && label === 'Copied' && announced === 'Email address copied',
    `visible=${visible} label=${label} announced=${announced}`
  );

  // Footer contact: a page without its own contact block (the 404) keeps the email, phone
  // and copy button in the footer, so they're on every page
  await page.goto(`${base}/404`);
  const footerCopies = await visibleCopies();
  const footerLinks = await page.locator('.foot a[href^="mailto:"], .foot a[href^="tel:"]').count();
  check(
    'footer contact',
    footerCopies === 1 && footerLinks === 2,
    `copies=${footerCopies} links=${footerLinks}`
  );
  await page.goto(`${base}/`);

  // Arrow lean: 3px on hover; doesn't move under reduced motion
  const button = page.locator('.btn-primary').first();
  await button.scrollIntoViewIfNeeded();
  await button.hover();
  await sleep(400);
  const lean = await button.evaluate((b) => getComputedStyle(b.lastElementChild).translate);
  const leaned = lean === '3px' || lean === '3px 0px';
  check('arrow lean', moving ? leaned : lean === 'none', `translate=${lean}`);

  // Name weight: firms to 560 on hover without changing width by more than 1%
  const projectName = page.locator('.projects h3 a').first();
  await projectName.scrollIntoViewIfNeeded();
  const before = await projectName.evaluate((a) => a.getBoundingClientRect().width);
  await projectName.hover();
  await sleep(400);
  const [weight, after] = await projectName.evaluate((a) => [
    getComputedStyle(a).fontWeight,
    a.getBoundingClientRect().width,
  ]);
  check(
    'name weight',
    weight === '560' && Math.abs(after - before) / before < 0.01,
    `weight=${weight} width ${before.toFixed(1)} -> ${after.toFixed(1)}`
  );

  // Section map: hidden at 1440, at 1920 clear of the column with exactly one current section
  await page.goto(`${base}/work/lenbuild`);
  await sleep(300);
  const shownAt1440 = await page.evaluate(() => {
    const map = document.querySelector('[data-section-map]');
    return map.getBoundingClientRect().width > 0 && getComputedStyle(map).visibility === 'visible';
  });
  await page.setViewportSize({ width: 1920, height: 1080 });
  await sleep(400);
  await page.evaluate(() => {
    const id = document.querySelectorAll('[data-section-map] a')[1].hash.slice(1);
    const section = document.getElementById(id);
    window.scrollTo(0, section.getBoundingClientRect().top + scrollY - window.innerHeight * 0.3);
  });
  await sleep(500);
  const map = await page.evaluate(() => {
    const nav = document.querySelector('[data-section-map]');
    const box = nav.getBoundingClientRect();
    const article = nav.closest('article');
    const column =
      article.getBoundingClientRect().left + parseFloat(getComputedStyle(article).paddingLeft);
    // An animated colour serialises differently (oklab), so compare against the dim colour
    const probe = document.createElement('span');
    probe.style.color = 'var(--text-3)';
    document.body.append(probe);
    const dim = getComputedStyle(probe).color;
    probe.remove();
    return {
      shown: box.width > 0 && getComputedStyle(nav).visibility === 'visible',
      gap: Math.round(column - box.right),
      left: Math.round(box.left),
      current: [...nav.querySelectorAll('a')].map((a) => getComputedStyle(a).color !== dim),
    };
  });
  check(
    'section map',
    !shownAt1440 &&
      map.shown &&
      map.gap >= 24 &&
      map.left >= 16 &&
      map.current[1] === true &&
      map.current.filter(Boolean).length === 1,
    `1440 shown=${shownAt1440}; 1920 gap=${map.gap}px current=${map.current.map(Number).join('')}`
  );
  await page.setViewportSize({ width: 1440, height: 900 });

  // Screenshot fade: with images held back 2.5 s, a lazy frame waits at opacity 0 and fades
  // in once loaded; nothing in the first screen is ever held back
  await page.route('**/*.{avif,webp}', async (route) => {
    await sleep(2500);
    await route.continue();
  });
  await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
  await sleep(500);
  const firstScreen = await page.evaluate(() =>
    [...document.querySelectorAll('.frame')]
      .filter((frame) => frame.getBoundingClientRect().top < window.innerHeight)
      .some((frame) => frame.hasAttribute('data-developing'))
  );
  const frame = page.locator('.projects .frame').first();
  const developing = await frame.evaluate((f) => f.hasAttribute('data-developing'));
  await frame.scrollIntoViewIfNeeded();
  await sleep(300);
  const loading = await frame.evaluate((f) => getComputedStyle(f.querySelector('img')).opacity);
  await sleep(3500);
  const [stillDeveloping, loaded] = await frame.evaluate((f) => [
    f.hasAttribute('data-developing'),
    getComputedStyle(f.querySelector('img')).opacity,
  ]);
  check(
    'frame fade',
    !firstScreen &&
      (moving ? developing && loading === '0' && !stillDeveloping && loaded === '1' : !developing),
    `firstScreen=${firstScreen} developing=${developing} opacity ${loading} -> ${loaded}`
  );
  await page.unroute('**/*.{avif,webp}');

  check('no errors', errors.length === 0, errors.slice(0, 2).join(' | '));
  await browser.close();
}

const target = process.argv[2];
const server = target ? null : await serveDist();
const base = (target ?? server?.url ?? '').replace(/\/$/, '');
const results = [];
const record = (result) => {
  results.push(result);
  const { name, motion, item, ok, note } = result;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(8)} ${motion.padEnd(6)} ${item.padEnd(12)} ${note}`
  );
};

console.log(`Testing ${base}\n`);
for (const name of Object.keys(engines)) {
  for (const motion of ['motion', 'reduce']) {
    try {
      await run(base, name, motion, record);
    } catch (error) {
      record({ name, motion, item: 'crashed', ok: false, note: String(error).split('\n')[0] });
    }
  }
}
server?.close();

const failed = results.filter((result) => !result.ok).length;
console.log(`\n${results.length - failed} passed, ${failed} failed`);
process.exitCode = failed > 0 ? 1 : 0;

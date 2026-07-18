/* Generates all favicons / app icons / social card from a vector source.
   Run: node scripts/generate-icons.js
   Uses @resvg/resvg-js (SVG -> PNG) + png-to-ico (PNG -> .ico).

   "Workshop" theme: a pine rounded-square monogram tile with a cream glyph,
   mirroring the in-app nav brand mark. Social card on warm paper. */

const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');
const pngToIcoMod = require('png-to-ico');
const pngToIco = pngToIcoMod.default || pngToIcoMod;

const PUBLIC = path.join(__dirname, '..', 'public');
const FONTS = [
  path.join(__dirname, 'fonts', 'SpaceGrotesk.ttf'),
  path.join(__dirname, 'fonts', 'Inter.ttf'),
];

// --- Workshop palette ---
const PINE = '#0e4b3f';
const PINE_HI = '#15594a';
const CREAM = '#f4efe4';
const PAPER = '#fbfaf7';
const INK = '#1a1a17';
const INK_SOFT = '#55524a';
const INK_FAINT = '#928d80';
const CLAY = '#b0691a';
const LINE = 'rgba(14,75,63,0.05)';

const pineGrad = `<linearGradient id="pine" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${PINE_HI}"/><stop offset="1" stop-color="${PINE}"/></linearGradient>`;

// Favicon: a rounded pine tile that nearly fills the canvas, cream glyph.
function faviconSvg(S, label) {
  const r = S * 0.22;
  const multi = label.length > 1;
  const fontSize = multi ? S * 0.3 : S * 0.5;
  const ls = multi ? S * 0.01 : 0;
  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <defs>${pineGrad}</defs>
  <rect width="${S}" height="${S}" rx="${r.toFixed(1)}" fill="url(#pine)"/>
  <text x="${S / 2}" y="${S / 2}" text-anchor="middle" dominant-baseline="central"
    font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="${fontSize.toFixed(1)}"
    letter-spacing="${ls.toFixed(1)}" fill="${CREAM}">${label}</text>
</svg>`;
}

// App icon (maskable): pine fills the whole canvas so any OS mask is clean;
// the "CRD" sits well inside the safe zone.
function appSvg(S) {
  const fontSize = S * 0.24;
  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <defs>${pineGrad}</defs>
  <rect width="${S}" height="${S}" fill="url(#pine)"/>
  <text x="${S / 2}" y="${S / 2}" text-anchor="middle" dominant-baseline="central"
    font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="${fontSize.toFixed(1)}"
    letter-spacing="${(S * 0.012).toFixed(1)}" fill="${CREAM}">CRD</text>
</svg>`;
}

function ogSvg() {
  const W = 1200;
  const H = 630;

  // faint drafting grid
  let grid = '';
  for (let x = 40; x < W; x += 44) grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${LINE}" stroke-width="1"/>`;
  for (let y = 40; y < H; y += 44) grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${LINE}" stroke-width="1"/>`;

  const tileS = 104;
  const tileX = 90;
  const tileY = 92;

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>${pineGrad}</defs>
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${grid}
  <rect x="${tileX}" y="${tileY}" width="${tileS}" height="${tileS}" rx="24" fill="url(#pine)"/>
  <text x="${tileX + tileS / 2}" y="${tileY + tileS / 2}" text-anchor="middle" dominant-baseline="central"
    font-family="Space Grotesk, Arial, sans-serif" font-weight="700" font-size="30" letter-spacing="1.5" fill="${CREAM}">CRD</text>

  <text x="90" y="312" font-family="Space Grotesk" font-weight="700" font-size="78" fill="${INK}">Calvin R Development</text>
  <rect x="93" y="332" width="238" height="7" rx="3.5" fill="${CLAY}"/>

  <text x="90" y="404" font-family="Inter" font-weight="500" font-size="32" fill="${INK_SOFT}">Modern, hand-built websites for small</text>
  <text x="90" y="448" font-family="Inter" font-weight="500" font-size="32" fill="${INK_SOFT}">businesses across regional Australia.</text>

  <text x="90" y="556" font-family="Inter" font-weight="600" font-size="26" fill="${CLAY}">calvinrdevelopment.com</text>
  <text x="428" y="556" font-family="Inter" font-weight="400" font-size="26" fill="${INK_FAINT}">· Armidale, NSW</text>
</svg>`;
}

function render(svg, width, background = 'rgba(0,0,0,0)') {
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles: FONTS, loadSystemFonts: true, defaultFontFamily: 'Space Grotesk' },
    background,
  });
  return r.render().asPng();
}

function write(name, buf) {
  fs.writeFileSync(path.join(PUBLIC, name), buf);
  console.log('  wrote', name, `(${buf.length} bytes)`);
}

(async () => {
  console.log('Generating icons...');

  // Favicons — "C", pine tile, nearly fills the tab.
  const favSvg = faviconSvg(64, 'C');
  const fav16 = render(favSvg, 16);
  const fav32 = render(favSvg, 32);
  const fav48 = render(favSvg, 48);
  write('favicon-16.png', fav16);
  write('favicon-32.png', fav32);
  write('favicon.svg', Buffer.from(favSvg));

  // App icons — "CRD", pine full-bleed (maskable-safe)
  const app = appSvg(512);
  write('apple-touch-icon.png', render(app, 180, PINE));
  write('icon-192.png', render(app, 192, PINE));
  write('icon-512.png', render(app, 512, PINE));

  // Social card — warm paper
  write('og-image.png', render(ogSvg(), 1200, PAPER));

  // favicon.ico from 16/32/48
  const ico = await pngToIco([fav16, fav32, fav48]);
  write('favicon.ico', ico);

  console.log('Done.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

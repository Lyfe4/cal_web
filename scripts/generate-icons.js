/* Generates all favicons / app icons / social card from a vector source.
   Run: node scripts/generate-icons.js
   Uses @resvg/resvg-js (SVG -> PNG) + png-to-ico (PNG -> .ico). */

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

const VIOLET = '#a855f7';
const INDIGO = '#6366f1';
const DARK = '#0b0b12';

// Flat-top regular hexagon points centred at (cx,cy) with width w (h = 0.866w).
function hex(cx, cy, w) {
  const h = w * 0.866;
  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  return [
    [x0 + 0.25 * w, y0],
    [x0 + 0.75 * w, y0],
    [x0 + w, y0 + 0.5 * h],
    [x0 + 0.75 * w, y0 + h],
    [x0 + 0.25 * w, y0 + h],
    [x0, y0 + 0.5 * h],
  ]
    .map((p) => p.map((n) => n.toFixed(2)).join(','))
    .join(' ');
}

const grad = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="${VIOLET}"/><stop offset="1" stop-color="${INDIGO}"/></linearGradient>`;

// Square icon SVG. label = 'C' or 'CRD'. bg = fill or null (transparent).
// hexFrac controls how much of the canvas the hexagon fills (favicon ~full,
// app icons padded so the OS-rounded square has breathing room).
function iconSvg(S, label, bg, hexFrac = 0.62) {
  const hexW = S * hexFrac;
  const multi = label.length > 1;
  const fontSize = multi ? hexW * 0.27 : hexW * 0.44;
  const ls = multi ? hexW * 0.015 : 0;
  return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">
  <defs>${grad}</defs>
  ${bg ? `<rect width="${S}" height="${S}" fill="${bg}"/>` : ''}
  <polygon points="${hex(S / 2, S / 2, hexW)}" fill="url(#g)"/>
  <text x="${S / 2}" y="${S / 2}" text-anchor="middle" dominant-baseline="central"
    font-family="Space Grotesk" font-weight="700" font-size="${fontSize.toFixed(1)}"
    letter-spacing="${ls.toFixed(1)}" fill="#ffffff">${label}</text>
</svg>`;
}

function ogSvg() {
  const W = 1200;
  const H = 630;
  const hexW = 150;
  const cx = 90 + hexW / 2;
  const cy = 232;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${grad}
    <radialGradient id="glow" cx="100%" cy="0%" r="90%">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.35"/>
      <stop offset="0.55" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${DARK}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <polygon points="${hex(cx, cy, hexW)}" fill="url(#g)"/>
  <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central"
    font-family="Space Grotesk" font-weight="700" font-size="40" letter-spacing="2" fill="#ffffff">CRD</text>
  <text x="90" y="360" font-family="Space Grotesk" font-weight="700" font-size="72" fill="#f4f4f7">Calvin R Development</text>
  <text x="90" y="430" font-family="Inter" font-weight="500" font-size="32" fill="#b4b4c0">Modern, custom websites that make your</text>
  <text x="90" y="474" font-family="Inter" font-weight="500" font-size="32" fill="#b4b4c0">business impossible to ignore.</text>
  <text x="90" y="552" font-family="Inter" font-weight="600" font-size="26" fill="#a78bfa">calvinrdevelopment.com</text>
  <text x="430" y="552" font-family="Inter" font-weight="400" font-size="26" fill="#8a8a99">· Armidale, NSW</text>
</svg>`;
}

function render(svg, width) {
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles: FONTS, loadSystemFonts: true, defaultFontFamily: 'Space Grotesk' },
    background: 'rgba(0,0,0,0)',
  });
  return r.render().asPng();
}

function write(name, buf) {
  fs.writeFileSync(path.join(PUBLIC, name), buf);
  console.log('  wrote', name, `(${buf.length} bytes)`);
}

(async () => {
  console.log('Generating icons...');

  // Favicons — "C", transparent, hexagon nearly fills the canvas so it reads
  // clearly in a tiny browser tab.
  const favSvg = iconSvg(64, 'C', null, 0.98);
  const fav16 = render(favSvg, 16);
  const fav32 = render(favSvg, 32);
  const fav48 = render(favSvg, 48);
  write('favicon-16.png', fav16);
  write('favicon-32.png', fav32);
  write('favicon.svg', Buffer.from(favSvg.replace('font-family="Space Grotesk"', 'font-family="Space Grotesk, Arial, sans-serif"')));

  // App icons — "CRD", dark bg
  const appSvg = iconSvg(512, 'CRD', DARK);
  write('apple-touch-icon.png', render(appSvg, 180));
  write('icon-192.png', render(appSvg, 192));
  write('icon-512.png', render(appSvg, 512));

  // Social card
  write('og-image.png', render(ogSvg(), 1200));

  // favicon.ico from 16/32/48
  const ico = await pngToIco([fav16, fav32, fav48]);
  write('favicon.ico', ico);

  console.log('Done.');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

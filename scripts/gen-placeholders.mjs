// Generates placeholder SVGs for the photo pool and project screenshots.
// Run with: node scripts/gen-placeholders.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function pad(n) {
  return n.toString().padStart(2, '0');
}

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

const grayPairs = [
  ['#3a3d40', '#0e1012'],
  ['#525760', '#1a1d21'],
  ['#6a6f74', '#0e1012'],
  ['#2a2d30', '#525760'],
  ['#444950', '#1a1a1c'],
  ['#585e63', '#0e1012'],
  ['#3a3f44', '#20232a'],
  ['#7a7d80', '#2a2d30'],
  ['#1a1d21', '#4a4f54'],
  ['#5a5f64', '#0e1012'],
  ['#383c42', '#171a1d'],
  ['#65696f', '#1f2228'],
];

// --- photos ---
for (let i = 1; i <= 12; i++) {
  const [a, b] = grayPairs[i - 1];
  const angle = (i * 37) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g${i}" gradientTransform="rotate(${angle}, 0.5, 0.5)">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <pattern id="p${i}" patternUnits="userSpaceOnUse" width="3" height="3">
      <rect width="3" height="3" fill="rgba(0,0,0,0)"/>
      <rect width="1" height="1" fill="rgba(255,255,255,0.04)"/>
    </pattern>
  </defs>
  <rect width="400" height="400" fill="url(#g${i})"/>
  <rect width="400" height="400" fill="url(#p${i})"/>
  <text x="20" y="380" font-family="monospace" font-size="11" fill="rgba(255,255,255,0.25)" letter-spacing="2">PLACEHOLDER ${pad(i)}</text>
</svg>`;
  write(resolve(root, `public/photos/placeholder-${pad(i)}.svg`), svg);
}

// --- project screenshots (16:9) ---
const projects = [
  { slug: 'arcads', title: 'ARCADS', a: '#2a3840', b: '#0e1012' },
  { slug: 'rainpath', title: 'RAINPATH AI', a: '#3a4248', b: '#171a1d' },
  { slug: 'mvpboom', title: 'MVP BOOM', a: '#454a50', b: '#1a1d21' },
];

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.a}"/>
      <stop offset="1" stop-color="${p.b}"/>
    </linearGradient>
    <pattern id="grid" patternUnits="userSpaceOnUse" width="40" height="40">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="url(#g)"/>
  <rect width="1600" height="900" fill="url(#grid)"/>
  <text x="80" y="820" font-family="Archivo, Helvetica, Arial Narrow, sans-serif" font-weight="700" font-size="72" fill="rgba(255,255,255,0.88)" letter-spacing="6">${p.title}</text>
  <text x="80" y="860" font-family="monospace" font-size="18" fill="rgba(255,255,255,0.4)" letter-spacing="4">PLACEHOLDER · REPLACE WITH REAL SCREENSHOT</text>
</svg>`;
  write(resolve(root, `public/projects/${p.slug}.svg`), svg);
}

console.log('Generated 12 photo placeholders + 3 project screenshots.');

#!/usr/bin/env node
import { readdirSync, writeFileSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const PHOTOS_DIR = new URL('../public/photos/', import.meta.url).pathname;
const MANIFEST = join(PHOTOS_DIR, 'manifest.json');

const WEB_IMAGE = /\.(jpe?g|png|webp)$/i;
const PLACEHOLDER = /^placeholder-/i;

// Filename "Title - YYYY.ext" or "Title, YYYY.ext" → caption "Title · YYYY"
function captionFromFilename(file) {
  const stem = basename(file, extname(file)).trim();
  for (const sep of [' - ', ',']) {
    const idx = stem.lastIndexOf(sep);
    if (idx === -1) continue;
    const title = stem.slice(0, idx).trim();
    const year = stem.slice(idx + sep.length).trim();
    if (title && year) return `${title} · ${year}`;
  }
  return stem;
}

function main() {
  const files = readdirSync(PHOTOS_DIR)
    .filter((f) => WEB_IMAGE.test(f) && !PLACEHOLDER.test(f))
    .sort();

  const entries = files.map((file) => ({ file, caption: captionFromFilename(file) }));

  writeFileSync(MANIFEST, JSON.stringify(entries, null, 2) + '\n');
  console.log(`Wrote manifest: ${entries.length} photo(s)`);
}

main();

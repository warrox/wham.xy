#!/usr/bin/env node
import { readdirSync, statSync, readFileSync, unlinkSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';
import heicConvert from 'heic-convert';

const PHOTOS_DIR = new URL('../public/photos/', import.meta.url).pathname;
const MAX_DIM = 1600;
const QUALITY = 80;
const SKIP_IF_SMALLER_THAN = 500 * 1024; // 500 KB

const SUPPORTED = /\.(jpe?g|png|webp|heic|heif)$/i;
const PLACEHOLDER = /^placeholder-/i;

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

async function processFile(file) {
  const inPath = join(PHOTOS_DIR, file);
  const ext = extname(file);
  const extLower = ext.toLowerCase();
  const stem = basename(file, ext);
  const outPath = join(PHOTOS_DIR, `${stem}.jpg`);
  const inSize = statSync(inPath).size;

  let inputBuffer;
  if (extLower === '.heic' || extLower === '.heif') {
    const raw = readFileSync(inPath);
    const converted = await heicConvert({ buffer: raw, format: 'JPEG', quality: 0.95 });
    inputBuffer = Buffer.from(converted);
  } else {
    inputBuffer = readFileSync(inPath);
  }

  const meta = await sharp(inputBuffer).metadata();
  const alreadySmall =
    extLower !== '.heic' &&
    extLower !== '.heif' &&
    inSize < SKIP_IF_SMALLER_THAN &&
    (meta.width ?? 0) <= MAX_DIM &&
    (meta.height ?? 0) <= MAX_DIM;

  if (alreadySmall) {
    console.log(`  skip   ${file}  (${fmtBytes(inSize)}, ${meta.width}×${meta.height})`);
    return;
  }

  await sharp(inputBuffer)
    .rotate() // honor EXIF orientation
    .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(outPath);

  const outSize = statSync(outPath).size;
  const outMeta = await sharp(outPath).metadata();

  // If we converted from a non-jpg format, drop the original
  if (inPath !== outPath) {
    unlinkSync(inPath);
  }

  console.log(
    `  done   ${stem}.jpg  (${fmtBytes(inSize)} → ${fmtBytes(outSize)}, ${outMeta.width}×${outMeta.height})`,
  );
}

async function main() {
  const files = readdirSync(PHOTOS_DIR).filter(
    (f) => SUPPORTED.test(f) && !PLACEHOLDER.test(f),
  );

  if (files.length === 0) {
    console.log('No photos to optimize. Drop files into public/photos/ first.');
    return;
  }

  console.log(`Optimizing ${files.length} photo(s) in public/photos/`);
  for (const file of files) {
    try {
      await processFile(file);
    } catch (err) {
      console.error(`  fail   ${file}: ${err.message}`);
      process.exitCode = 1;
    }
  }
}

main();

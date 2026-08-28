/**
 * Generate placeholder gallery images so a fresh copy of the template renders a
 * complete site before any real photography exists.
 *
 * Usage: pnpm placeholders [count]
 *
 * Deliberately text-free — rasterising SVG text through sharp depends on system
 * fontconfig and would produce different output on different machines.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = fileURLToPath(new URL("../src/assets/gallery/", import.meta.url));
const rawCount = process.argv[2] ?? "6";
const COUNT = Number(rawCount);
if (!Number.isFinite(COUNT) || !Number.isInteger(COUNT) || COUNT < 1) {
  console.error(
    `Invalid count: ${JSON.stringify(rawCount)}. Expected a whole number of 1 or more.`,
  );
  process.exit(1);
}
const WIDTH = 1600;
const HEIGHT = 1200;

/** Evenly spaced hues so the set reads as a deliberate palette, not noise. */
function hueFor(index) {
  return Math.round((360 / COUNT) * index + 210) % 360;
}

function svg(index) {
  const hue = hueFor(index);
  const from = `hsl(${hue} 38% 24%)`;
  const to = `hsl(${(hue + 35) % 360} 42% 58%)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g)"/>
  <g fill="#ffffff" fill-opacity="0.08">
    <rect x="${WIDTH * 0.1}" y="0" width="${WIDTH * 0.06}" height="${HEIGHT}" transform="skewX(-18)"/>
    <rect x="${WIDTH * 0.45}" y="0" width="${WIDTH * 0.1}" height="${HEIGHT}" transform="skewX(-18)"/>
    <rect x="${WIDTH * 0.78}" y="0" width="${WIDTH * 0.04}" height="${HEIGHT}" transform="skewX(-18)"/>
  </g>
</svg>`;
}

await mkdir(OUT_DIR, { recursive: true });

for (let i = 0; i < COUNT; i += 1) {
  const name = `placeholder-${String(i + 1).padStart(2, "0")}.jpg`;
  const buffer = await sharp(Buffer.from(svg(i)))
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  await writeFile(path.join(OUT_DIR, name), buffer);
  console.log(`wrote ${name} (${(buffer.length / 1024).toFixed(1)} kB)`);
}

console.log(`\n${COUNT} placeholder images in src/assets/gallery/`);
console.log("Replace them with real photographs and update src/data/gallery.ts.");

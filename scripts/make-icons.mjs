/**
 * Generate the favicon set, PWA icons and social share image: the brand
 * scales-of-justice mark (matching the header logo, src/components/sections/
 * Header.astro) on the site's Hero-scrim gradient (matching
 * src/components/sections/Hero.astro) — fixed brand colours, not the
 * generic hue-parameterised mark the base template ships.
 *
 * This site has three runtime-switchable colour palettes
 * (PaletteSwitcher.tsx) — favicons/og-image can't respond to that switch
 * (they're static files picked once at build time), so they're generated
 * against the *default* palette, "original", regardless of which palette a
 * given visitor has selected. Re-run after changing the default palette's
 * brand-800/glow-700 values in src/styles/global.css.
 *
 * Usage: pnpm icons
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = fileURLToPath(new URL("../public/", import.meta.url));

// Same stops as the Hero scrim's default-palette ("original") sweep
// (src/components/sections/Hero.astro) — buttons stay flat brand-600.
const GRADIENT_FROM = "#43362a"; // brand-800
const GRADIENT_TO = "#7c5d27"; // glow-700

// lucide-react's Scale icon (24x24 viewBox), scaled ~1.67x and centred in
// the 64x64 canvas — see lucide.dev/icons/scale. Copied as static path data
// rather than rendered via react-dom/server so this script has no React
// dependency.
const scalePaths = [
  "M12 3v18",
  "m19 8 3 8a5 5 0 0 1-6 0zV7",
  "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1",
  "m5 8 3 8a5 5 0 0 1-6 0zV7",
  "M7 21h10",
];

const markSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GRADIENT_FROM}"/>
      <stop offset="100%" stop-color="${GRADIENT_TO}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <g transform="translate(12,12) scale(1.667)" fill="none" stroke="#f6f1e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    ${scalePaths.map((d) => `<path d="${d}"/>`).join("\n    ")}
  </g>
</svg>`;

/** Wrap a PNG buffer in a single-image ICO container. */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette size
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image size
  entry.writeUInt32LE(header.length + entry.length, 12); // offset

  return Buffer.concat([header, entry, png]);
}

async function png(size) {
  return sharp(Buffer.from(markSvg(size))).resize(size, size).png().toBuffer();
}

// `public/` may not exist yet on a fresh checkout, and `/new-site` runs this
// script — so create it rather than assuming it. Mirrors make-placeholders.mjs.
await mkdir(OUT_DIR, { recursive: true });

// Scalable favicon.
await writeFile(path.join(OUT_DIR, "favicon.svg"), markSvg(64));

// Raster favicons and PWA icons.
const targets = [
  ["favicon-96x96.png", 96],
  ["apple-touch-icon.png", 180],
  ["web-app-manifest-192x192.png", 192],
  ["web-app-manifest-512x512.png", 512],
];
for (const [name, size] of targets) {
  await writeFile(path.join(OUT_DIR, name), await png(size));
  console.log(`wrote ${name}`);
}

await writeFile(path.join(OUT_DIR, "favicon.ico"), pngToIco(await png(32), 32));
console.log("wrote favicon.ico");

// 1200x630 social share image: a deeper version of the same gradient
// (matching Hero's scrim, src/components/sections/Hero.astro) with the
// mark centred.
const ogBackground = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GRADIENT_FROM}"/>
      <stop offset="100%" stop-color="${GRADIENT_TO}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
</svg>`;

const ogMark = await sharp(Buffer.from(markSvg(64))).resize(240, 240).png().toBuffer();
const og = await sharp(Buffer.from(ogBackground))
  .composite([{ input: ogMark, gravity: "centre" }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toBuffer();
await writeFile(path.join(OUT_DIR, "og-image.jpg"), og);
console.log("wrote og-image.jpg");

console.log("\nIcons generated from the scales-of-justice mark.");

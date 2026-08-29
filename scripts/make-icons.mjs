/**
 * Generate the favicon set, PWA icons and the social share image.
 *
 * THE MARK: four rising steps drawn as one unbroken stroke. It is the same
 * idea the site is built on, reduced to a glyph — a sequence where both the
 * order and the size of each step carry information (the custody handoffs on
 * the homepage, the titration schedule on /weight-loss/). One continuous line
 * because nothing in the chain is meant to be a separate box.
 *
 * It survives 16px: four strokes, no counters, no fine detail. The same path
 * data is rendered in the header and footer by src/components/Mark.astro, so
 * the tab icon and the logotype are literally the same drawing rather than a
 * borrowed icon that nearly matches.
 *
 * Colours are the default palette's ("specimen"). The site has three
 * runtime-switchable palettes (PaletteSwitcher.tsx); static files picked once
 * at build time cannot respond to that, so they are generated against the
 * default regardless of a visitor's choice. Re-run after changing the default
 * palette's brand-800 / brand-600 / signal-500 in src/styles/global.css.
 *
 * Usage: pnpm icons
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";
import { site } from "../src/config/site.ts";

const OUT_DIR = fileURLToPath(new URL("../public/", import.meta.url));

/* Default palette, "specimen". Keep in sync with src/styles/global.css.

   The sweep runs brand-800 -> brand-600, entirely within the petrol ramp. An
   earlier version ran petrol -> amber to reuse the "one signature gradient"
   idea, and the two hues mixed through olive: the midpoint of a desaturated
   teal and a warm brown is mud, and it read as a printing error rather than a
   brand. So the ground stays one hue and amber does what it does everywhere
   else on the rebuilt site — it is the mark itself.

   The stroke is amber rather than pale blue because that is what the header
   logotype is now, and a tab icon that does not match the wordmark is a
   different logo. #e8a33d on #0b2a31 is 7.0:1, which holds at 16px. */
const GRADIENT_FROM = "#0b2a31"; // brand-800
const GRADIENT_TO = "#245f6c"; // brand-600
const STROKE = "#e8a33d"; // signal-500 — the mark, matching the header
const PAPER = "#ecf4f6"; // brand-50 — type on the share image
const ACCENT = "#e8a33d"; // signal-500

/**
 * The step path, in a 64x64 box with 14px of optical padding. Kept identical
 * to Mark.astro — if one changes, change both.
 */
const STEP_PATH = "M14 48H25V37H36V26H47V15";

const markSvg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${GRADIENT_FROM}"/>
      <stop offset="100%" stop-color="${GRADIENT_TO}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="13" fill="url(#g)"/>
  <path d="${STEP_PATH}" fill="none" stroke="${STROKE}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
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

await mkdir(OUT_DIR, { recursive: true });

await writeFile(path.join(OUT_DIR, "favicon.svg"), markSvg(64));
console.log("wrote favicon.svg");

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

/**
 * 1200x630 share image. The mark sits left of centre on the same gradient,
 * with the wordmark rendered as vector text — no font file is loaded, so the
 * letterforms are drawn from a generic stack by librsvg. That is deliberate:
 * embedding Instrument Sans here would mean shipping a font into a build
 * script for one raster, and at 630px the difference is not visible.
 *
 * The stack is a GROTESQUE now, not a serif. The rebuild moved the headline
 * role from Fraunces to Instrument Sans and reserved Fraunces for one italic
 * accent word, so a serif wordmark here would be the only serif wordmark the
 * brand has. Tracking is tightened to match `display-1`.
 */
const OG_W = 1200;
const OG_H = 630;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="${GRADIENT_FROM}"/>
      <stop offset="100%" stop-color="${GRADIENT_TO}"/>
    </linearGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#bg)"/>
  <g transform="translate(100,150) scale(3.0)">
    <path d="${STEP_PATH}" fill="none" stroke="${STROKE}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" transform="translate(-14,-15)"/>
  </g>
  <text x="100" y="418" fill="${PAPER}" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-weight="500" font-size="92" letter-spacing="-3.4">Ellery Health</text>
  <rect x="102" y="454" width="96" height="4" fill="${ACCENT}"/>
  <text x="100" y="512" fill="${PAPER}" fill-opacity="0.72" font-family="monospace" font-size="22" letter-spacing="3.2">LICENSED CLINICIANS. INDEPENDENT PHARMACIES.</text>
</svg>`;

const og = await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88, mozjpeg: true }).toBuffer();
await writeFile(path.join(OUT_DIR, "og-image.jpg"), og);
console.log("wrote og-image.jpg");

/**
 * site.webmanifest.
 *
 * Generated rather than hand-kept because every path inside it — `start_url`
 * and both icon `src` values — has to carry the deployment's base path, and a
 * manifest is the one place a wrong path fails silently: the browser installs
 * the app, then opens a 404 and shows a broken icon. Deriving it from
 * `src/config/site.ts` means moving to a custom domain (basePath "") fixes the
 * manifest in the same edit as everything else.
 *
 * Colours are read from the default palette in src/styles/global.css. They are
 * literals here for the same reason the mark's are: a build script cannot
 * resolve a CSS custom property.
 */
const manifest = {
  name: site.name,
  short_name: site.shortName,
  description:
    "GLP-1 and longevity treatment, coordinated between you, an independent " +
    "licensed clinician and a US mail-order pharmacy. Every fee, every handoff " +
    "and every hour, published.",
  start_url: `${site.basePath}/`,
  scope: `${site.basePath}/`,
  display: "standalone",
  background_color: "#f1f3f2", // --background, specimen palette
  theme_color: "#0b2a31", // brand-800, the slab
  icons: [192, 512].map((size) => ({
    src: `${site.basePath}/web-app-manifest-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: "image/png",
    purpose: "any maskable",
  })),
};

await writeFile(
  path.join(OUT_DIR, "site.webmanifest"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log("wrote site.webmanifest");

console.log("\nIcons generated from the four-step mark, default 'specimen' palette.");

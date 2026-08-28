/**
 * Assert that the built site is shippable.
 *
 * Hard failures (always): missing/duplicate canonical, incomplete or
 * non-reciprocal hreflang, unparseable JSON-LD, unresolved @id references,
 * missing sitemap entries, internal links to pages that were not built.
 *
 * Placeholder content is a hard failure only once the site has been configured
 * (canonical origin is no longer https://example.com). An unconfigured template
 * reports warnings and exits 0, so this repository's own CI stays green.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "node-html-parser";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const PLACEHOLDER_ORIGIN = "https://example.com";
const PLACEHOLDER_PATTERNS = [/example\.com/i, /\bAcme\b/, /TODO\(owner\)/];

const errors = [];
const warnings = [];

const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

if (!existsSync(DIST)) {
  console.error("dist/ not found — run `pnpm build` first.");
  process.exit(1);
}

/** Every .html file in dist/, as paths relative to dist/. */
function htmlFiles(dir = DIST, prefix = "") {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...htmlFiles(full, `${prefix}${entry}/`));
    } else if (entry.endsWith(".html")) {
      out.push(`${prefix}${entry}`);
    }
  }
  return out;
}

const files = htmlFiles();
if (files.length === 0) fail("dist/ contains no HTML files");

/** "index.html" -> "/", "imprint/index.html" -> "/imprint/" */
const routeOf = (file) =>
  file === "index.html" ? "/" : "/" + file.replace(/index\.html$/, "");

const builtRoutes = new Set(files.map(routeOf));

// Parse each page once and reuse the DOM everywhere. Every structural check in
// this file goes through node-html-parser rather than regex over raw HTML —
// attribute order and quoting style must never change what this script decides.
const pages = files.map((file) => {
  const html = readFileSync(path.join(DIST, file), "utf8");
  return { file, route: routeOf(file), html, root: parse(html) };
});

/**
 * Determine configuration state from the first canonical we can find.
 *
 * This drives the single highest-stakes switch in the script, so it uses the
 * DOM rather than a regex: a regex requiring `rel="canonical"` before `href`
 * would silently fail after any head-component refactor that reorders the
 * attributes, leaving `origin` null, `configured` false, and a real site's
 * placeholder errors quietly downgraded to warnings.
 */
let origin = null;
for (const page of pages) {
  const href = page.root
    .querySelector('link[rel="canonical"]')
    ?.getAttribute("href");
  if (!href) continue;
  try {
    origin = new URL(href).origin;
    break;
  } catch {
    /* malformed canonical — reported by the per-page check below */
  }
}
const configured = origin !== null && origin !== PLACEHOLDER_ORIGIN;

/** route -> set of hreflang alternate pathnames, for the reciprocity pass. */
const alternateSets = new Map();

for (const page of pages) {
  const root = page.root;
  const where = `${page.file}:`;

  /* --- canonical ------------------------------------------------------ */
  const canonicals = root.querySelectorAll('link[rel="canonical"]');
  if (canonicals.length === 0) fail(`${where} no <link rel="canonical">`);
  if (canonicals.length > 1) fail(`${where} ${canonicals.length} canonical tags, expected 1`);
  if (canonicals.length === 1) {
    const href = canonicals[0].getAttribute("href") ?? "";
    if (!/^https?:\/\//.test(href)) fail(`${where} canonical is not absolute: ${href}`);
  }

  /* --- hreflang ------------------------------------------------------- */
  const alternates = root.querySelectorAll('link[rel="alternate"][hreflang]');
  const langs = alternates.map((el) => el.getAttribute("hreflang"));
  if (!langs.includes("x-default")) fail(`${where} missing hreflang="x-default"`);

  const alternatePaths = new Set();
  for (const el of alternates) {
    const href = el.getAttribute("href") ?? "";
    let pathname;
    try {
      pathname = new URL(href).pathname;
    } catch {
      fail(`${where} hreflang href is not a valid URL: ${href}`);
      continue;
    }
    if (!builtRoutes.has(pathname)) {
      fail(`${where} hreflang points at a route that was not built: ${pathname}`);
      continue;
    }
    // x-default duplicates another locale's URL by design; it is not a
    // separate participant in the reciprocity graph.
    if (el.getAttribute("hreflang") !== "x-default") alternatePaths.add(pathname);
  }
  alternateSets.set(page.route, alternatePaths);

  /* --- JSON-LD -------------------------------------------------------- */
  const blocks = root.querySelectorAll('script[type="application/ld+json"]');
  const declaredIds = new Set();
  const referencedIds = new Set();

  for (const [index, block] of blocks.entries()) {
    let data;
    try {
      data = JSON.parse(block.rawText);
    } catch (error) {
      fail(`${where} JSON-LD block ${index} does not parse: ${error.message}`);
      continue;
    }
    const collect = (node) => {
      if (Array.isArray(node)) return node.forEach(collect);
      if (!node || typeof node !== "object") return;
      const keys = Object.keys(node);
      if (node["@id"]) {
        // A lone {"@id": "..."} is a reference; anything richer is a declaration.
        if (keys.length === 1) referencedIds.add(node["@id"]);
        else declaredIds.add(node["@id"]);
      }
      for (const value of Object.values(node)) collect(value);
    };
    collect(data);

    for (const [key, value] of Object.entries(data)) {
      if (value === null) fail(`${where} JSON-LD block ${index} has a null value for "${key}"`);
    }
  }

  for (const id of referencedIds) {
    if (!declaredIds.has(id)) {
      fail(`${where} JSON-LD references @id "${id}" which no block on this page declares`);
    }
  }

  /* --- internal links -------------------------------------------------- */
  for (const anchor of root.querySelectorAll("a[href]")) {
    const href = anchor.getAttribute("href") ?? "";
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = href.split("#")[0].split("?")[0];
    if (target === "") continue;
    if (builtRoutes.has(target)) continue;

    // `existsSync` alone is not enough: with trailingSlash "always" a route
    // built at dist/imprint/index.html leaves dist/imprint existing as a
    // DIRECTORY, so a link to "/imprint" would pass while pointing at a path
    // the site never serves. Only a real file (an asset) earns the carve-out.
    const asPath = path.join(DIST, target.replace(/^\//, ""));
    if (existsSync(asPath) && statSync(asPath).isFile()) continue;

    if (builtRoutes.has(`${target}/`)) {
      fail(
        `${where} internal link is missing its trailing slash: ${target} ` +
          `(the built route is ${target}/)`,
      );
    } else {
      fail(`${where} internal link to a route that was not built: ${target}`);
    }
  }

  /* --- meta description ------------------------------------------------ */
  // Google truncates a description in the SERP at roughly 155-160 characters,
  // so anything past ~165 loses its ending. On this site several descriptions
  // END on the prescription-gating condition, which is exactly the clause that
  // must not be the part that gets cut. Seven of fifteen exceeded it on the
  // first pass; this keeps them from creeping back.
  const descriptions = root.querySelectorAll('meta[name="description"]');
  if (descriptions.length === 0) fail(`${where} no <meta name="description">`);
  if (descriptions.length > 1) {
    fail(`${where} ${descriptions.length} meta descriptions, expected 1`);
  }
  for (const meta of descriptions) {
    const content = meta.getAttribute("content") ?? "";
    if (content.length > 165) {
      fail(`${where} meta description is ${content.length} chars, over the 165 ceiling`);
    }
  }

  /* --- placeholders ---------------------------------------------------- */
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(page.html)) {
      const message = `${where} contains placeholder content matching ${pattern}`;
      if (configured) fail(message);
      else warn(message);
    }
  }
}

/* --- hreflang reciprocity (cross-page) --------------------------------- */
// Existence was checked per page; symmetry can only be checked once every
// page's alternate set is known. A one-way alternate — page A advertising B
// while B never links back — is the classic hreflang defect: search engines
// discard the whole cluster, silently, with no build error anywhere.
for (const [route, alternates] of alternateSets) {
  for (const target of alternates) {
    if (target === route) continue;
    const back = alternateSets.get(target);
    // A target that was never built is already reported above; don't double-fail.
    if (!back) continue;
    if (!back.has(route)) {
      errors.push(
        `${route}: declares ${target} as an hreflang alternate, but ${target} ` +
          `does not link back to ${route}`,
      );
    }
  }
}

/* --- non-HTML crawler-surface artifacts --------------------------------- */
// Astro copies these verbatim from public/. The per-page loop above only ever
// reads *.html, so a stale "https://example.com", "Acme" or "TODO(owner)" in
// robots.txt, llms.txt or site.webmanifest shipped with zero errors AND zero
// warnings — the exact "green verify on a half-configured site" failure this
// gate exists to prevent. Scan every text artifact Astro emits at the root of
// dist/, not just the ones known by name today; readdirSync only returns
// entries that exist, so a missing file is skipped rather than failing.
const textArtifacts = readdirSync(DIST).filter(
  (entry) =>
    (entry.endsWith(".txt") || entry.endsWith(".webmanifest")) &&
    statSync(path.join(DIST, entry)).isFile(),
);

for (const name of textArtifacts) {
  const text = readFileSync(path.join(DIST, name), "utf8");
  const where = `${name}:`;
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(text)) {
      const message = `${where} contains placeholder content matching ${pattern}`;
      if (configured) fail(message);
      else warn(message);
    }
  }
}

/* --- sitemap ----------------------------------------------------------- */
const sitemapIndex = path.join(DIST, "sitemap-index.xml");
if (!existsSync(sitemapIndex)) {
  fail("dist/sitemap-index.xml is missing");
} else {
  const shards = readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f));
  if (shards.length === 0) fail("sitemap-index.xml exists but no sitemap-N.xml shard was emitted");

  const listed = new Set();
  for (const shard of shards) {
    const xml = readFileSync(path.join(DIST, shard), "utf8");
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try {
        listed.add(new URL(match[1]).pathname);
      } catch {
        fail(`${shard}: <loc> is not a valid URL: ${match[1]}`);
      }
    }
  }
  for (const route of builtRoutes) {
    if (route.startsWith("/404")) continue;
    if (!listed.has(route)) fail(`route ${route} is built but missing from the sitemap`);
  }
}

/* --- report ------------------------------------------------------------ */
for (const message of warnings) console.warn(`warn  ${message}`);
for (const message of errors) console.error(`ERROR ${message}`);

console.log(
  `\nverify-dist: ${pages.length} page(s), ${errors.length} error(s), ${warnings.length} warning(s)`,
);

if (!configured && warnings.length > 0) {
  console.log(
    "\nThis site still has template placeholders and origin " +
      `${PLACEHOLDER_ORIGIN}. Run /new-site to configure it; ` +
      "placeholders become hard errors once the domain is set.",
  );
}

process.exit(errors.length > 0 ? 1 : 0);

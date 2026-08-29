/**
 * Assert that the built site is shippable.
 *
 * Hard failures (always): missing/duplicate canonical, incomplete or
 * non-reciprocal hreflang, unparseable JSON-LD, unresolved @id references,
 * structured data that contradicts what the pages say, a page missing any of
 * the compliance footnotes, page text hidden behind an inline opacity: 0, a
 * class string the rebuild retired, missing sitemap entries, internal links to
 * pages that were not built.
 *
 * The four content checks are here rather than in a lint rule because none of
 * them is visible in source: a dropped footnote band, a motion block that was
 * never hydrated and an old utility class all typecheck, render and pass a
 * unit test. Built output is the only place they exist.
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

/**
 * Class strings the rebuild retired. Each was a real value in the system that
 * came before it — a 72rem container beside the 64rem `.shell`, the 3px
 * control radius beside the 12/24px pair, the `glow-*` ramp before it became
 * `signal-*` — so each is one copied line away from returning, and none of
 * them breaks a type, a test or a render on the way back in.
 *
 * Matched against whole class tokens rather than against the page source: a
 * build that inlines a stylesheet also inlines Tailwind's generated
 * `.max-w-6xl{}` rule, and a substring scan would then fail a page that never
 * uses the class.
 */
const RETIRED_CLASSES = [
  {
    pattern: /^max-w-6xl$/,
    instead: "`shell` — one outer container width, 64rem (DESIGN-SYSTEM.md §4)",
  },
  {
    pattern: /^rounded-\[3px\]$/,
    instead: "`rounded-lg` for controls, `rounded-2xl` / `.panel` for surfaces",
  },
  {
    pattern: /(?:^|-)glow-/,
    instead: "`signal-*` — and `text-signal-700 dark:text-signal-500` where it is type on paper",
  },
];

/**
 * schema.org types that would assert, in machine-readable form, the one claim
 * every page on this site disclaims. `src/config/site.ts` argues the choice of
 * `Organization`; this is what stops a later editor "improving" it to
 * something that sounds more medical, where no reader would ever see the
 * change and every crawler would.
 */
const FORBIDDEN_SCHEMA_TYPES = new Set([
  "MedicalBusiness",
  "MedicalOrganization",
  "MedicalClinic",
  "Pharmacy",
  "Physician",
  "Drug",
  "MedicalTherapy",
  "DietarySupplement",
]);

/**
 * How much of a footnote has to match. Long enough that two notes cannot
 * collide, short enough that an editorial tweak to the tail of a sentence
 * fails review rather than failing the build.
 */
const NOTE_PREFIX_CHARS = 40;

const errors = [];
const warnings = [];

const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

if (!existsSync(DIST)) {
  console.error("dist/ not found — run `pnpm build` first.");
  process.exit(1);
}

/**
 * The compliance rules this gate enforces are read from the dictionary, never
 * copied into this file — a copy would drift, and a drifted gate is worse than
 * no gate because it reports success.
 *
 * `src/i18n/en/common.ts` is plain JavaScript in a .ts file (no annotations,
 * no imports), so Node loads it directly with type stripping, which is on by
 * default from Node 22.18 and in the Node 24 that `.nvmrc` pins. If it ever
 * stops loading, that is a hard stop rather than a skipped check.
 */
let common;
try {
  common = (await import(new URL("../src/i18n/en/common.ts", import.meta.url).href)).default;
} catch (error) {
  console.error(
    "could not load src/i18n/en/common.ts, so the compliance checks have no " +
      "rules to check against:\n" +
      `  ${error.message}\n` +
      "  Node 22.18+ and Node 24 strip TypeScript types on import; on an " +
      "older Node, run this script with --experimental-strip-types.",
  );
  process.exit(1);
}

/** Collapse whitespace, so a text comparison survives compressHTML, source
    line wrapping and any future reformat of the dictionary. */
const squash = (value) => value.replace(/\s+/g, " ").trim();

// Astro escapes five characters on the way out — & < > " ' — and everything
// else, the em dashes and the ® and the § included, ships as literal UTF-8.
// Decoding by hand rather than reaching into the parser keeps the substitution
// visible and, more importantly, ordered: &amp; has to go last, or the text
// "&amp;lt;" would decode twice and come out as "<". (&apos; is here for
// tolerance; Astro emits the numeric form.)
const ENTITIES = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'" };
const decodeEntities = (value) =>
  value
    .replace(/&(?:lt|gt|quot|#39|apos);/g, (entity) => ENTITIES[entity])
    .replace(/&amp;/g, "&");

/**
 * A page's visible text, as one collapsed line.
 *
 * Deliberately not the DOM: the alternative is removing every <script> and
 * <style> from the shared parse tree, which the checks that run after this one
 * still need. Stripping tags can only ever ADD text to the haystack (an
 * unescaped ">" inside an attribute leaks that attribute in), never remove it,
 * so it cannot turn a present footnote into a missing one.
 */
const visibleText = (html) =>
  squash(
    decodeEntities(
      html
        .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/<[^>]+>/g, " "),
    ),
  );

const footnotes = common.compliance.notes.map((note) => ({
  symbol: note.symbol,
  prefix: squash(note.text).slice(0, NOTE_PREFIX_CHARS),
}));
const gatingSentence = squash(common.gating.short);

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

    /**
     * The structured data has to say the same thing the footer says, and the
     * two ways it stops doing that are both one word in someone else's file:
     * a @type that asserts Ellery practises medicine or dispenses, and an
     * Offer whose description has lost the clinician-decides condition.
     *
     * The second is the reason `src/i18n/en/programs.ts` says its `desc` is
     * "written to survive being read out of context" — SeoHead reads that copy
     * straight into `hasOfferCatalog`, so an editor tightening a card's
     * description also edits what every crawler is told the offer is.
     */
    const audit = (node) => {
      if (Array.isArray(node)) return node.forEach(audit);
      if (!node || typeof node !== "object") return;
      // @type is legally a string or an array of them.
      const types = [].concat(node["@type"] ?? []);
      for (const type of types) {
        if (FORBIDDEN_SCHEMA_TYPES.has(type)) {
          fail(
            `${where} JSON-LD block ${index} declares @type "${type}" — Ellery ` +
              "administers, and neither practises medicine nor dispenses " +
              "(src/config/site.ts explains the Organization choice)",
          );
        }
      }
      if (types.includes("Offer")) {
        const described = squash(String(node.itemOffered?.description ?? ""));
        if (!described.includes(gatingSentence)) {
          fail(
            `${where} JSON-LD block ${index}: the offer ` +
              `"${node.itemOffered?.name ?? "(unnamed)"}" does not carry ` +
              "common.gating.short — an offer described without the condition " +
              "is an offer of medication (src/i18n/en/programs.ts)",
          );
        }
      }
      for (const value of Object.values(node)) audit(value);
    };
    audit(data);

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

  /* --- the compliance footnotes ---------------------------------------- */
  // The band that resolves every superscript on the site belongs on EVERY
  // route, and until now that rule lived only in prose — which is how /404
  // came to ship none of them. A route without the band is a route where a
  // symbol in the copy above it points at nothing, and an asterisk that
  // resolves nowhere is the cheapest-looking thing a site in this category
  // can do. It is also invisible to a typecheck: the band is a component
  // someone forgets to render, not a call someone gets wrong.
  const lang = root.querySelector("html")?.getAttribute("lang") ?? "";
  if (!lang.startsWith("en")) {
    // One locale ships today, so there is one note set. When a second is
    // added, `footnotes` becomes a map keyed by lang — and a page whose
    // language has no registered set must fail here rather than be skipped,
    // or adding a locale quietly exempts fourteen new routes from the rule.
    fail(`${where} <html lang="${lang}"> has no registered compliance-note set`);
  } else {
    const text = visibleText(page.html);
    const missing = footnotes.filter((note) => !text.includes(note.prefix));
    if (missing.length > 0) {
      fail(
        `${where} is missing ${missing.length} of ${footnotes.length} compliance ` +
          `footnotes — ${missing.map((note) => note.symbol).join(" ")} — every ` +
          "route renders the whole band (src/i18n/en/common.ts → compliance.notes)",
      );
    }
  }

  /* --- content hidden at build time ------------------------------------- */
  // A React block lifted from a motion-driven library and rendered in .astro
  // WITHOUT a client:* directive does not animate. It serialises its `initial`
  // state into the markup and stays there, so the section ships as static HTML
  // frozen at opacity 0: it renders, it validates, it typechecks, and nobody
  // sees it. DESIGN-SYSTEM.md §5 names this as the trap; this is the tripwire.
  //
  // Two exemptions, both legitimate. Inside an <astro-island> a directive will
  // hydrate the element and animate it in. Inside <noscript>, invisibility is
  // the point. And only elements that actually carry text are flagged — an
  // opacity-0 wrapper around a decorative SVG loses a reader nothing.
  for (const el of root.querySelectorAll("[style]")) {
    const style = el.getAttribute("style") ?? "";
    if (!/(?:^|;)\s*opacity\s*:\s*0(?:\.0+)?\s*(?:;|$)/.test(style)) continue;
    if (el.text.trim() === "") continue;

    let animatable = false;
    for (let node = el.parentNode; node; node = node.parentNode) {
      const tag = node.rawTagName?.toLowerCase();
      if (tag === "astro-island" || tag === "noscript") {
        animatable = true;
        break;
      }
    }
    if (animatable) continue;

    fail(
      `${where} <${el.rawTagName}> hides page text behind an inline ` +
        `opacity: 0 with nothing to reveal it — "${squash(el.text).slice(0, 60)}…" ` +
        "(hydrate it, or strip the motion and use .reveal, whose base state is " +
        "its final state)",
    );
  }

  /* --- classes the rebuild retired --------------------------------------- */
  // Reported once per distinct token per page: /start/ alone carried nineteen
  // of one of them, and nineteen identical lines would bury the other errors.
  const retiredSeen = new Set();
  for (const el of root.querySelectorAll("[class]")) {
    for (const token of (el.getAttribute("class") ?? "").split(/\s+/)) {
      if (token === "" || retiredSeen.has(token)) continue;
      const retired = RETIRED_CLASSES.find((entry) => entry.pattern.test(token));
      if (!retired) continue;
      retiredSeen.add(token);
      fail(`${where} ships the retired class "${token}" — use ${retired.instead}`);
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

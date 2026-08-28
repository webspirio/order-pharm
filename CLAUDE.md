# CLAUDE.md — Rechtsanwältin Olga Gatlin

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

**Fresh copy of the template?** Run `/new-site` first. It configures every file
listed under "What `/new-site` rewrites" below, including replacing the project
name in this file's heading above.

## Commands

```sh
pnpm install          # deps — pnpm only (pnpm-workspace.yaml allowlists native builds)
pnpm dev              # dev server at http://localhost:4321
pnpm build            # static build → ./dist
pnpm preview          # serve ./dist locally
pnpm check            # typecheck .astro/.ts/.tsx — catches i18n key drift
pnpm test             # vitest over the i18n path helpers
pnpm verify           # check + test + build + scripts/verify-dist.mjs — the ship gate
pnpm placeholders     # regenerate placeholder gallery images
pnpm icons [--hue N]  # regenerate favicons, PWA icons and og-image.jpg
pnpm office-map       # regenerate the /kontakt/ office-location thumbnail
```

Node 24 (`.nvmrc`); `engines` requires `>=22.12.0`. The Cloudflare Workers Builds
image defaults to Node 24.18.0 and honors `.nvmrc`, so no `NODE_VERSION` needed.

`pnpm dlx shadcn@latest add <item>` installs registry components per
`components.json` (style `radix-nova`, target `src/components/ui`). The
`@reactbits-*` registries authenticate with `REACTBITS_LICENSE_KEY` — see
`.env.example` / `.envrc.example`. The free `@react-bits` registry needs no key.

## Skills

Five project skills: `/new-site` configure a fresh copy · `/add-page` new route
across all locales · `/add-section` new content block · `/add-locale` new
language · `/preflight` ship gate with Lighthouse and screenshots.

Three more ship vendored from elsewhere and aren't specific to this template:
`/grilling` (and its `/grill-me` alias) relentlessly interviews you about a
plan before you build it; `shadcn` is model-invoked automatically whenever a
task touches shadcn/ui components or `components.json`.

## Architecture

Prerendered marketing site: **Astro 7 (`output: 'static'`, no adapter) + React 19
islands + Tailwind v4**, deployed as plain files to Cloudflare Workers. No server,
no API routes, no form endpoint — contact is phone/messenger/mailto links only.
Runtime JS ships only where a `client:*` directive appears.

### Routes are shims; page components hold the structure

`src/pages/**` files are two-liners that pick a locale:

```astro
---
import HomePage from "@/components/HomePage.astro";
---
<HomePage locale="en" />
```

The real page lives in `src/components/*Page.astro`, which composes
`Layout.astro` (HTML shell) + `SeoHead.astro` (passed as `slot="head"`) +
`src/components/sections/*.astro`.

Consequence: **one new page = one page component + one route shim per locale**.
Never fork markup per locale. `/add-page` does all of it.

### i18n — the constraint most changes run into

`src/config/locales.ts` declares languages and is **pure data**. It is imported
by both `src/i18n/index.ts` and `astro.config.ts`, so the site and the sitemap
cannot disagree. Never add an `astro:*` import to it — the Astro config loads it
outside the build graph.

Four rules the code actively depends on:

- **The default-locale dictionary is the type source of truth.**
  `Dictionary = typeof en`, and `en.ts` is deliberately *not* `as const` so leaf
  values widen to `string`. Every other dictionary must replicate the full key
  structure; drift is a compile error. Adding copy means adding the key to
  **every** dictionary.
- **Locale code ≠ URL segment.** A language can serve from a different path than
  its BCP-47 code (Ukrainian is `uk` for hreflang but conventionally serves from
  `/ua/`). `localeSegment` maps between them; the default locale is the root
  (`""`).
- **Build every internal link with `localizedPath(locale, path)`**, where `path`
  is the *default-locale-root* path (`/`, `/imprint/`). Paths carry **trailing
  slashes** (`trailingSlash: 'always'`); a mismatch silently breaks language
  switching.
- **`unlocalizedPath(Astro.url.pathname)` is the inverse**, recovering the
  default-locale path from the live URL. `Header.astro` uses it to build the
  language switcher's options, so language links land on the equivalent page
  instead of the homepage, without every page declaring its own path.

All user-visible copy comes from the dictionaries. Non-text business data —
address, phone, schema.org type, social URLs, in-page anchor ids — lives in
`src/config/site.ts` and is the single source for markup, legal pages, and
JSON-LD alike.

### Islands and the `.astro` / `.tsx` boundary

Enforced throughout; breaking these produces components that render but don't
work.

1. **Stateful/interactive React lives in `src/components/islands/*.tsx`**, one
   file per island, rendered from `.astro` with a `client:*` directive.
2. **React context does not cross island boundaries.** Any component pairing a
   trigger with content (Dialog, DropdownMenu, Popover, Sheet, Tooltip) must sit
   *entirely* inside one `.tsx` file.
3. **A `fixed` overlay inside a filtered ancestor needs a portal.**
   `MobileMenu.tsx` renders via `createPortal` to `document.body` because it
   sits inside `Header.astro`'s `backdrop-blur` container, and `backdrop-filter`
   establishes a containing block for `position: fixed` descendants — an
   un-portalled `fixed inset-0` overlay clips to the 64px header instead of
   covering the viewport. The portal keeps trigger and content in one
   component, so rule 2 still holds. Same applies to `filter`, `transform`, and
   `will-change` ancestors.
4. **Attribute names follow the element, not the file.** `class` on HTML elements
   in `.astro`; `className` on React components — including React components used
   inside `.astro`.
5. **React without a `client:*` directive renders to static HTML at build time.**
   This is how `lucide-react` icons are used directly in `.astro` sections — zero
   JS shipped. Only add `client:load` / `client:idle` / `client:visible` where
   behavior actually requires it.
6. **Islands never import from `src/assets`.** The `.astro` section optimizes
   images with `getImage()` and passes plain URLs plus dimensions down. See
   `Gallery.astro`.

### Astro 7 authoring rules

The Rust compiler is strict: close every non-void element, and do not nest
invalidly (`<div>` inside `<p>` is no longer auto-corrected). `compressHTML`
defaults to `'jsx'`, so whitespace between adjacent inline elements is stripped —
write `{" "}` where a literal space matters. `src/fetch.ts` is a reserved
filename.

### Styling

Tailwind v4 via `@tailwindcss/vite`; **there is no `tailwind.config.*`**.
Design tokens in `src/styles/global.css` are split across three tiers, and
which one a new token belongs in depends on what kind of token it is:

- **`@theme`** — literal, theme-independent values: the font stack and the
  seven-value brand ramp. A new brand or font token goes here.
- **`:root` / `.dark`** — the actual light/dark values for every semantic
  colour (`--background`, `--foreground`, `--card`, `--border`, `--radius`,
  etc.), one block per theme; a third such pair ships from the imported
  `shadcn/tailwind.css`. **A new semantic colour goes here, as a `:root` +
  `.dark` pair** — never in `@theme`, where it would resolve to one value for
  both themes with no error to signal it.
- **`@theme inline`** — bridges each `:root`/`.dark` variable to the
  `--color-*`/`--radius-*` name Tailwind's utility generator reads (e.g.
  `--color-background: var(--background)` is what makes the `bg-background`
  utility exist). A semantic colour needs an entry here too before it works as
  a `bg-*`/`text-*`/`border-*` class.

The brand ramp is seven literal OKLCH values sharing one hue, with the hue in a
comment. Change them together, and recompute `--color-brand-foreground` so text
stays readable on `brand-500`. Never hardcode a brand hex in a component.

Dark mode is class-based (`@custom-variant dark`). An inline script in
`Layout.astro` applies the `dark` class before paint from `localStorage`, falling
back to `prefers-color-scheme`; `ThemeToggle.tsx` writes that key. Keep the two
in sync when touching theming.

`section[id] { scroll-margin-top: 5rem; }` in `@layer base` offsets in-page
anchor targets so a nav click doesn't leave the heading under the `sticky`
header. It is scoped to `section[id]` so new sections inherit it automatically.

### Images

Local images go through `astro:assets` (`<Image />` or `getImage()`), optimized
by `sharp` at build time. `src/data/gallery.ts` is the registry: it eagerly globs
`src/assets/gallery/*.{jpg,jpeg,JPG,png}` into typed `ImageMetadata` and pairs
each with a category and alt text — a `.webp` or other extension outside that
set throws at build, not silently no-ops. Adding a photo means dropping the
file in and registering it there — the `img()` helper throws at build if a
filename doesn't resolve.

### SEO / structured data

`SeoHead.astro` emits canonical, the full hreflang set + `x-default`, OG/Twitter
tags, and one JSON-LD block for the primary entity keyed
`@id: <domain>/#business`. Its `compact()` helper strips empty values
recursively, so a site with no address emits valid JSON-LD rather than nulls.

Other schema blocks (`FAQPage` in `Faq.astro`, and anything you add) reference
that `@id` rather than redeclaring the business. `verify-dist.mjs` fails if a
referenced `@id` is never declared.

`public/` carries the hand-maintained crawler surface: `robots.txt`, `llms.txt`,
and `_headers` (Cloudflare response headers, including the
`Link: </llms.txt>; rel="describedby"` hint). **`llms.txt` duplicates business
facts from `site.ts` in prose — update it when those change.**

### Verification

`pnpm verify` is the gate. `scripts/verify-dist.mjs` asserts on built output:
one canonical per page, complete and reciprocal hreflang including `x-default`,
parseable JSON-LD with resolvable `@id` references, a sitemap listing every
route, no internal links to unbuilt routes, and no leftover placeholders.

The placeholder check is configuration-aware: while the canonical origin is still
`https://example.com` placeholders are warnings, so the unconfigured template's
own CI stays green. Once the domain is set they become hard errors.

### Deployment

Cloudflare Workers with static assets, from `dist/`. `wrangler.jsonc` sets the
Worker name and `assets.directory`. Pushes to `main` deploy production.
`.github/workflows/ci.yml` runs `pnpm verify` on pull requests, on push to
`main`, and on manual `workflow_dispatch`.
`.github/workflows/deploy.yml.disabled` is an opt-in GitHub Actions alternative
kept disabled — enabling it alongside Cloudflare's Git integration causes double
builds. See `README.md` for the full setup of either path.

## What `/new-site` rewrites

`src/config/site.ts` · `src/config/locales.ts` · `src/i18n/*` ·
`src/data/gallery.ts` (category names) · `src/styles/global.css` (brand ramp) ·
`astro.config.ts` (site URL) · `wrangler.jsonc` · `package.json` ·
`public/robots.txt` · `public/llms.txt` · `public/site.webmanifest` ·
`README.md` · this file's heading · plus `pnpm icons` for the icon set and OG
image. It also deletes the template's own `docs/superpowers/{specs,plans}/*.md`
and `.superpowers/`, which describe how the template itself was built.

## Repo conventions

- Design specs and implementation plans live in `docs/superpowers/{specs,plans}/`.
- `.env`, `.envrc` and `.claude/settings.local.json` are gitignored. `.env` and
  `.envrc` each have a committed `.example` template to copy from; the shared
  `.claude/settings.json` is committed as-is.
  `.claude/settings.local.json` has no template — it's optional, personal-only
  Claude Code overrides (permissions, etc.) that never need to exist.
- `.input/` is gitignored — keep source photos and design mockups there.

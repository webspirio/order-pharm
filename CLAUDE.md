# CLAUDE.md — Ellery Health

Guidance for Claude Code (claude.ai/code) when working in this repository.

**This is a DEMO.** Ellery Health is not a real company. The address, the phone
number (a reserved 555-01xx fictional-use number), the named clinical practice
and the three named pharmacies are illustrative, and the patient quotations
were written for the demonstration. What is *not* illustrative is the
compliance posture described under "The compliance contract" below — that is
modelled on how the real US GLP-1 / longevity telehealth category actually
words things, and it is the reason the site is shaped the way it is.

Built from `static-website-template`. Where this repo diverges from that
template, the divergence is documented below and is deliberate.

## Commands

```sh
pnpm install          # deps — pnpm only (pnpm-workspace.yaml allowlists native builds)
pnpm dev              # dev server at http://localhost:4321
pnpm build            # static build → ./dist
pnpm preview          # serve ./dist locally
pnpm check            # typecheck .astro/.ts/.tsx — catches dictionary key drift
pnpm test             # vitest over the i18n path helpers
pnpm verify           # check + test + build + scripts/verify-dist.mjs — the ship gate
pnpm icons            # regenerate favicons, PWA icons and og-image.jpg
```

Node 24 (`.nvmrc`); `engines` requires `>=22.12.0`.

`pnpm dlx shadcn@latest add <item>` installs registry components per
`components.json` (style `radix-nova`, target `src/components/ui`).

## Architecture

Prerendered marketing site: **Astro 7 (`output: 'static'`, no adapter) + React 19
islands + Tailwind v4**, deployed as plain files to Cloudflare Workers. No
server, no API routes, no form endpoint. Runtime JS ships only where a
`client:*` directive appears — currently the header's three controls and the
intake form.

### Routes are shims; page components hold the structure

`src/pages/**` files are two-liners that pick a locale:

```astro
---
import PricingPage from "@/components/PricingPage.astro";
---
<PricingPage locale="en" />
```

The real page lives in `src/components/*Page.astro`, which composes
`Layout.astro` + `SeoHead.astro` (passed as `slot="head"`) +
`src/components/sections/*.astro`.

Every page includes, in order: `TrustTicker`, `Header`, `<main>`, then `Cta`
(except the legal pages), `ComplianceBand`, `Footer`.

### One locale, machinery intact

`src/config/locales.ts` declares `["en"]` — this serves a US audience, and a US
telehealth site in a second language is not something the client would ship.
The infrastructure is untouched: add a code plus one entry in each record and
`pnpm check` fails until a matching dictionary exists. `/add-locale` does the
rest, including the route shims. With one locale the header's language switcher
hides itself and `astro.config.ts` omits the sitemap's i18n map.

Four rules the code still depends on:

- **The default-locale dictionary is the type source of truth.**
  `Dictionary = typeof en`, and the composed `en` object is deliberately *not*
  `as const`, so leaf values widen to `string`. It must never annotate itself
  with `Dictionary` — that would be circular.
- **Locale code ≠ URL segment.** `localeSegment` maps between them; the default
  locale is the root (`""`).
- **Build every internal link with `localizedPath(locale, path)`**, where
  `path` is the default-locale-root path. Paths carry **trailing slashes**
  (`trailingSlash: 'always'`); a mismatch fails `verify-dist`.
- **`unlocalizedPath(Astro.url.pathname)` is the inverse.** `Header.astro` uses
  it both for the language switcher and for the `aria-current="page"` check.

### DIVERGENCE: the dictionary is a directory, not a file

`src/i18n/en/` holds one module per page plus three shared ones
(`common.ts`, `meta.ts`, `programs.ts`), composed in `src/i18n/en/index.ts`.

The template ships a single `en.ts`. At fourteen routes that file would be
~1,500 lines and the only file every task touches; split by page, a change to
the pricing copy cannot conflict with a change to an article. The i18n contract
is unchanged — `typeof en` still enforces the full key structure on any locale
added later, which will mirror this directory rather than a single file.

`common.ts` opens with the **voice** and **compliance** rules. Read them before
writing any user-visible string. They are not style preferences; several of them
are the difference between an administrator and an unlicensed pharmacy.

### DIVERGENCE: `src/config/pricing.ts` is the single source for every number

Every price, dose, duration, threshold, partner name and formatting helper.
**Never type a figure into copy or into markup.** Import it.

This exists because of a specific, observed failure mode. All three reference
sites the client supplied ship contradictory numbers live: a hero badge
claiming "350,000+ patients" directly beneath a ticker claiming "100,000+", a
membership quoted at both `$75` and `$74.99` on different pages, and a "no
memberships required" marquee above a product page charging a `$74` membership
fee. Each is one hand-typed number that drifted from another. On a site whose
entire pitch is that the numbers are in the open, a drifted number is not a
typo — it is the pitch failing.

So the dictionary carries the sentence and the component interpolates the
figure. `TrustTicker.astro` does this with `{admin}`/`{reviewHours}`/`{states}`
tokens; `StatStrip`, `Receipt`, `Relay`, `Programs` and `Ladder` all read the
constants directly.

Non-numeric business data — the brand name, the address, the schema.org type,
anchor ids — lives in `src/config/site.ts`.

### Islands and the `.astro` / `.tsx` boundary

Breaking these produces components that render but don't work.

1. **Stateful/interactive React lives in `src/components/islands/*.tsx`**, one
   file per island, rendered from `.astro` with a `client:*` directive.
2. **React context does not cross island boundaries.** Anything pairing a
   trigger with content (Select, DropdownMenu, RadioGroup, Popover) must sit
   *entirely* inside one `.tsx`. This is why the whole intake form is one file.
3. **A `fixed` overlay inside a filtered ancestor needs a portal.**
   `MobileMenu.tsx` renders via `createPortal` to `document.body` because it
   sits inside `Header.astro`'s `backdrop-blur` container, and
   `backdrop-filter` establishes a containing block for `position: fixed`
   descendants — an un-portalled `fixed inset-0` overlay clips to the 64px
   header. Same applies to `filter`, `transform` and `will-change` ancestors.
4. **Attribute names follow the element, not the file.** `class` on HTML
   elements in `.astro`; `className` on React components — including
   `lucide-react` icons used inside `.astro`.
5. **React without a `client:*` directive renders to static HTML at build
   time.** That is how lucide icons ship zero JS. Only add `client:load` /
   `client:idle` / `client:visible` where behaviour actually requires it.
6. **Islands never import from `src/assets`.** The `.astro` optimises with
   `<Image />` / `getImage()` and passes plain URLs plus dimensions down.

### Astro 7 authoring rules

The Rust compiler is strict: close every non-void element, and do not nest
invalidly (`<div>` inside `<p>` is no longer auto-corrected). `compressHTML`
defaults to `'jsx'`, so whitespace between adjacent inline elements is
stripped — write `{" "}` where a literal space matters. `src/fetch.ts` is a
reserved filename.

## The design system

Tailwind v4 via `@tailwindcss/vite`; **there is no `tailwind.config.*`**.
Everything is in `src/styles/global.css`, in three tiers:

- **`@theme`** — literal, theme-independent values: the three font stacks, the
  seven-value brand ramp, the three-value glow ramp. A new brand or font token
  goes here.
- **`:root` / `.dark`** (and their `[data-palette]` variants) — the actual
  light/dark values for every semantic colour. **A new semantic colour goes
  here as a `:root` + `.dark` pair** — never in `@theme`, where it would
  resolve to one value for both themes with no error to signal it.
- **`@theme inline`** — bridges each `:root`/`.dark` variable to the
  `--color-*`/`--radius-*` name Tailwind's utility generator reads. A semantic
  colour needs an entry here before `bg-*`/`text-*`/`border-*` exist for it.

### Three type roles, and the mono is the one that matters

- **heading** — Fraunces, weight 400, `WONK 1`, tight tracking. Loaded from the
  `wonk` variable file (wght + WONK, 36 KB latin), not `index.css` (wght only):
  WONK 1 swaps in the alternate g/y/f, which is the one typographic detail
  nobody else in this category has. Used at 24px and up only.
- **sans** — Instrument Sans. Body, and every sub-heading below 24px, where a
  400-weight display serif carries less ink than the paragraph it introduces.
- **mono** — IBM Plex Mono. **Every figure on this site.** Doses, hours,
  prices, cutoffs, step indices, USP chapter references, dates. This is the
  brand's most distinctive decision and the reason the "spec sheet" reading
  holds together.

Component classes: `.label` (the uppercase mono micro-layer), `.figure` (a
tabular number), `.subhead`, `.display-1/2/3`, `.lead`, `.btn-solid`,
`.btn-outline`, `.btn-solid-invert`, `.btn-outline-invert`, `.panel`,
`.panel-invert`, `.relay` / `.relay-step` / `.relay-on-light`, `.page-tint`.

### Colour

Three switchable palettes via a `data-palette` attribute on `<html>`, the same
mechanism as `.dark` (see the no-flash script in `Layout.astro` and
`PaletteSwitcher.tsx` — change one, change the other):

- **`original` "saline"** (default) — petrol/mineral teal, amber accent, cool
  paper ground. Chosen *against the field*: all three reference sites are warm,
  cream-grounded and light-only, so a cool mineral ground is the open position
  that still reads clinical. It is also the only palette with a real dark mode,
  which none of the three references has.
- **`indigo`** — deep indigo, soft coral. Reads closer to fintech.
- **`clay`** — deliberately the warm apothecary look the references use, kept
  switchable so the direction can be compared rather than argued about.

**Amber (`glow-*`) is reserved for things that measure time** — a duration, a
cutoff, a Relay tick, a step index. It is never decorative, never carries small
text on its own, and there is no glow-based semantic token. That restraint is
what keeps it readable as "this is a clock". Never hardcode a brand hex in a
component and never use a raw Tailwind palette colour.

Shape: cards 8px (`.panel`), controls near-square 3px (`.btn-*`). No shadows
except the mobile sheet. No gradients except the two photographic scrims.

### Structural devices

Three, and each encodes something true rather than decorating:

- **The Relay** (`Relay.astro`, `RelayDetail.astro`) — the four custody
  handoffs on a tick-marked track. Order *and* elapsed time are both
  information the reader came for, so a scale is the honest form and a card
  grid would throw the time away. Horizontal on the hero, vertical in detail.
  The rule is a per-step `border-top`, not one absolute bar, which is what
  makes it re-flow correctly at `grid-cols-2` and `grid-cols-1`.
- **The Ladder** (`Ladder.astro`) — the titration schedule as a stepped chart.
  Magnitude and sequence are both real, so a bulleted list is wrong.
- **Tables.** Wherever content is rows-of-pairs or a comparison, a real
  `<table>` with `.label` headers, hairline rows, mono figures, and a
  `sm:hidden` definition-list fallback. `Roles.astro` and `Receipt.astro` are
  the two patterns.

Long pages alternate `bg-background` / `bg-card` and carry exactly one
fixed-dark `bg-brand-800` band in the middle. A card inside a `bg-card` band
needs `bg-background` on the `.panel` or it disappears.

## The compliance contract

Non-negotiable in every string, and the reason the site's structure is what it
is. Ellery administers; it does not prescribe or dispense. Therefore:

- **Never a possessive** over clinicians or pharmacies. Not "our doctors", not
  "our pharmacy". They are independent third parties.
- **Never "we prescribe" / "we'll get you a prescription" / "we ship your
  medication".** Ellery routes.
- **Never promise or imply a prescription.** Every price carries the condition
  that a licensed clinician must first decide treatment is appropriate — use
  `d.gating.short` / `d.gating.long`, don't rewrite them.
- **"Compounded" always adjacent to the molecule**, never a brand name on a
  compounded product, and never "FDA-approved" near one. "FDA-registered" is
  not a synonym for approved.
- **Longevity claims hedge**: "may support", "is studied for". Never "treats",
  "prevents", "reverses".
- **Footnote symbols must resolve.** Eight are defined in `common.ts`'s
  `compliance.notes` (`*` `†` `‡` `§` `¶` `◆` `‖` `◇`) and
  `ComplianceBand.astro` renders all of them on every page. Never invent a
  ninth, and never a bare `*` that resolves nowhere — an unresolved asterisk is
  the cheapest-looking thing a site in this category can do.
- **The HIPAA posture is stated truthfully**: Ellery is not a covered entity;
  the practice and the pharmacies are; Ellery is their business associate where
  that applies. Never a bare "HIPAA compliant" badge.

## SEO / structured data

`SeoHead.astro` emits canonical, the hreflang set + `x-default`, OG/Twitter
tags, and one JSON-LD block for the primary entity keyed
`@id: <domain>/#business`. The entity is `Organization` — deliberately not
`MedicalBusiness` or `Pharmacy`, because the structured data has to say the
same thing the footer says. Its `hasOfferCatalog` reads
`src/i18n/en/programs.ts`, so the machine-readable description and the visible
cards are the same words.

Other schema blocks (`FAQPage` in `Faq.astro`, `Article` and `BreadcrumbList`
on the articles) reference that `@id` rather than redeclaring the entity;
`verify-dist.mjs` fails if a referenced `@id` is never declared. `Faq.astro`'s
`jsonLd` prop is opt-in so only the page carrying the complete question set
emits a `FAQPage`.

`public/` carries the hand-maintained crawler surface: `robots.txt`,
`llms.txt`, and `_headers`. **`llms.txt` duplicates business facts in prose —
update it when `site.ts` or `pricing.ts` change.** It also carries the
"most important thing to get right" section, which exists because an assistant
describing Ellery as "a pharmacy" is a real compliance problem.

## Verification

`pnpm verify` is the gate. `scripts/verify-dist.mjs` asserts on built output:
one canonical per page, complete and reciprocal hreflang including `x-default`,
parseable JSON-LD with resolvable `@id` references, a sitemap listing every
route, no internal links to unbuilt routes, and no leftover placeholders.

The placeholder check is **hard-erroring** now that the domain is set:
`example.com`, `Acme` and `TODO(owner)` fail the build wherever they appear,
including in `robots.txt`, `llms.txt` and `site.webmanifest`. The legal pages
therefore carry complete demonstration prose plus one labelled status banner,
rather than markers sprinkled through the body.

## Deployment

Cloudflare Workers with static assets, from `dist/`. `wrangler.jsonc` sets the
Worker name and `assets.directory`. `.github/workflows/ci.yml` runs
`pnpm verify` on pull requests and on push to `main`.

## Before this could go live

- Replace the fictional company, address, phone, clinical practice and
  pharmacies in `src/config/site.ts` and `src/config/pricing.ts`; re-run
  `pnpm icons`; update `public/llms.txt` to match.
- Have counsel rewrite `src/i18n/en/legal.ts` and review every compliance
  string. Corporate-practice-of-medicine and fee-splitting rules are
  state-specific.
- Replace the demonstration patient quotations in `src/i18n/en/home.ts` with
  real, consented ones, and disclose any that are incentivised.
- Confirm the state-availability count in `coverage` against real licensure.
- Wire `/start/` to a real intake backend. It is currently client-only and says
  so; nothing is submitted or stored.
- Add real accreditation only as a **verifying** link (the category convention
  is a LegitScript seal that links to its own verification page). A badge that
  does not verify is decoration, and this site deliberately ships none.

## Repo conventions

- `.env`, `.envrc` and `.claude/settings.local.json` are gitignored.
- `meeting-*.md` is gitignored — client call transcripts, not site content.
- `.input/` is gitignored — keep source photos and mockups there.
- Photography is Unsplash/Pexels licensed (commercial use, no attribution
  required). See `CREDITS.md`. Neither licence permits implying that a depicted
  person endorses anything, which is why the testimonials carry no portraits.

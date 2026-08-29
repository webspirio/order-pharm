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

Every page includes, in order: `Header` (fixed, floating over the page), then
`<main>` — whose FIRST in-flow section carries `.page-top` to clear the header,
except the homepage, whose hero deliberately runs under it — then the head
block, then `TrustTicker` closing it as a rail, then the page's own sections,
then `Cta` (except the legal pages), `ComplianceBand`, `Footer`.

The ticker moved out from above the nav in the rebuild, because it cannot sit
above a header that floats. It now takes the slot the reference template gives
its logo marquee: attached to the bottom of the hero, or of an inner page's
head block. Ellery has no customer logos to loop and would not run borrowed
ones if it did, so five checkable claims take that slot instead.

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
   `MobileMenu.tsx` renders via `createPortal` to `document.body`. The rebuilt
   header is opaque (no `backdrop-filter`) and its mount animation is
   opacity-only for exactly this reason — but the portal stays, because that
   guarantee should not be load-bearing. `filter`, `backdrop-filter`,
   `transform` and `will-change` all establish a containing block for
   `position: fixed` descendants, so an un-portalled `fixed inset-0` overlay
   would clip to the header box. Reach for the portal by default.
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

**Rebuilt.** The visual language is ported from the premium SaaS landing
template in `references/saas` (Next.js 16 + Tailwind v4 + Motion + Lenis),
onto the information design that was already here. The full, enforceable
version is **`docs/DESIGN-SYSTEM.md`** — that file is the contract every
section is built to, and it lists the values you are allowed to use. What
follows is why they are those values.

Tailwind v4 via `@tailwindcss/vite`; **there is no `tailwind.config.*`**.
Everything is in `src/styles/global.css`, in three tiers:

- **`@theme`** — literal, theme-independent values: the three font stacks, the
  nine-value brand ramp, the five-value signal ramp. A new brand or font token
  goes here.
- **`:root` / `.dark`** (and their `[data-palette]` variants) — the actual
  light/dark values for every semantic colour. **A new semantic colour goes
  here as a `:root` + `.dark` pair** — never in `@theme`, where it would
  resolve to one value for both themes with no error to signal it.
- **`@theme inline`** — bridges each `:root`/`.dark` variable to the
  `--color-*`/`--radius-*` name Tailwind's utility generator reads. A semantic
  colour needs an entry here before `bg-*`/`text-*`/`border-*` exist for it.

### THE INVERSION: the sans carries the headlines now

The old system set every `h1`/`h2`/`h3` in Fraunces. That reads editorial and
luxurious, which is the register this whole category already occupies. The
reference template's power comes from one thing — a very large, very tight
grotesque — so the roles swapped:

- **sans** — Instrument Sans. Headlines at **500** with `-0.03em` tracking, and
  all body copy. Crisp humanist grotesque, deliberately not Inter and not the
  Poppins rounding every competitor uses.
- **heading** — Fraunces, 400, **italic**, `WONK 1`. Reserved for **one accent
  word inside the `h1`**, and for pull quotes. Loaded from the `wonk` variable
  file (wght + WONK, 36 KB latin) because WONK 1 swaps in the alternate g/y/f.
  Demoting it from "all headings" to "one word" is what makes it register as a
  decision rather than a font choice — and it is the only place in the category
  that detail appears at all.
- **mono** — IBM Plex Mono. **Every figure on this site.** Doses, hours,
  prices, cutoffs, step indices, USP chapter references, dates. Unchanged, and
  still the decision the brand rests on.

`Headline.astro` carries the mechanism: the dictionary string holds a
`{accent}` token, the accent word sits beside it, and the component splits on
words to produce both the Fraunces span and a CSS-only staggered mount reveal.
A headline with two tokens is a bug you can grep for.

Component classes: `.shell` (the one container), `.section` / `.section-tight`
(the two rhythms), `.page-top` (clearance for the floating header), `.label`,
`.figure`, `.subhead`, `.display-1/2/3`, `.wonk`, `.lead`, `.measure`,
`.btn-solid` / `.btn-outline` / `.btn-solid-invert` / `.btn-outline-invert` /
`.btn-split`, `.panel` / `.panel-flat` / `.panel-invert`, `.slab` + `.on-slab`,
`.plate` / `.plate-soft` + `.on-plate`, `.band-overlap` / `.band-under`,
`.site-frame` / `.site-corner`, `.relay` / `.relay-step` / `.relay-on-light`,
`.tick-scale`, `.rule`, `.reveal`, `.mask-fade-b`.

### Colour: two hues, and the accent is amber now

Three switchable palettes via a `data-palette` attribute on `<html>`, the same
mechanism as `.dark` (see the no-flash script in `Layout.astro` and
`PaletteSwitcher.tsx` — change one, change the other):

- **`original` "specimen"** (default) — cool neutral paper ground, white
  surfaces, deep petrol slab, **amber signal**.
- **`indigo`** — deep indigo, coral signal. Reads closer to fintech.
- **`clay`** — deliberately the warm apothecary look the reference sites use,
  kept switchable so the direction can be compared rather than argued about.
  Its signal is olive, because the warm ground already carries the amber
  register.

**Amber was promoted, and that is the rebuild's central colour decision.** On
the old site it was a minor second hue meaning "this measures time" — the Relay
ticks, the review window, the dispatch cutoff. It is now *the* accent: the CTA
plate, the featured edge, the scroll rail, the mark itself. That is honest —
a coordination business sells a clock — and it is the open position, since the
reference template uses lime and every site in this category is sage, cream or
burgundy. The old petrol wash is gone: a page tinted throughout cannot carry a
loud accent, and the accent is now the point.

**The signal rule, enforced by contrast rather than taste.** `signal-500` is a
**surface** and a **rule**, never small text on a light ground:

| Pairing | Ratio | |
|---|---|---|
| `#e8a33d` on the paper ground | **1.9:1** | never |
| `#0c1412` on `#e8a33d` | **8.7:1** | the plate, ink on amber |
| `signal-700` `#8a5510` on paper | **5.6:1** | amber-coloured text on light |
| `#e8a33d` on the slab / in dark mode | **7.0:1** / **9.0:1** | fine as text |

So `text-signal-700 dark:text-signal-500` wherever amber type is wanted.

**Focus is ink, not amber.** One rule — `:focus-visible { outline: 2px solid
var(--focus) }` — and `--focus` flips on `.on-slab` and `.on-plate`. An amber
ring on the paper ground is 1.9:1 and fails WCAG 2.4.11; the reference template
ships exactly that bug.

**On the fixed `.slab` bands, `text-brand-50` has an opacity floor of `/60`.**
`/40` is 3.4:1, `/45` is 3.7:1, `/50` is 4.4:1, `/60` is 5.8:1. Borders and
hairlines (`border-brand-50/12`) are decorative and exempt. Never write raw
`bg-brand-800` — write `slab on-slab`, which also flips the focus and Fraunces
tokens with the ground.

Never hardcode a brand hex in a component and never use a raw Tailwind palette
colour.

### Shape and structure

**Two radius families and no third**: controls `rounded-lg` (12px), surfaces
`rounded-2xl` / `.panel` (24px). `--radius-slab` (40px) is *furniture* — the
frame's corner fillets, the header's bottom sweep, the slab's top corners — not
a card radius. `rounded-full` is for dots, ticks and avatar slots only.

**One container** (`.shell`, 64rem) and **two section rhythms** (`.section`,
`.section-tight`) across all fifteen routes. A page that invents a third of
either is the clearest tell of an assembled rather than a designed page.

Shadows appear in three places (floating header, mobile sheet, the overlapping
CTA plate) and always as a tint of the ink colour, never black. Two gradients
(the hero scrim, the mark).

### Structural devices

Five now, and each encodes something true rather than decorating:

- **The site frame** (`SiteFrame.astro`) — four fixed rails in the frame colour
  plus four SVG corner fillets, and a floating pill header that grows its own
  two fillets sideways into the top rail. Ported from the reference, and its
  signature: the whole viewport becomes a mount and the page a specimen sitting
  in it. Hidden below 850px, where a 10px rail is only a bezel eating the
  viewport, and hidden in print.
- **The Relay** (`Relay.astro`, `RelayDetail.astro`) — the four custody
  handoffs on a tick-marked track. Order *and* elapsed time are both
  information the reader came for, so a scale is the honest form and a card
  grid would throw the time away. **It is now the hero's product visual**,
  occupying the slot the reference template fills with a dashboard mockup: a
  mockup is a picture of software, the Relay is the instrument itself.
  The rule is a per-step `border-top`, not one absolute bar, which is what
  makes it re-flow correctly at `grid-cols-2` and `grid-cols-1`.
- **The Ladder** (`Ladder.astro`) — the titration schedule as a stepped chart.
  Magnitude and sequence are both real, so a bulleted list is wrong.
- **The overlap** (`.band-overlap` / `.band-under`) — the CTA plate straddles
  the top edge of the compliance slab, so the page's last ask and its legal
  ground read as one object. The overlap is a fixed 5rem on the plate and the
  band reserves 9rem, so the join survives any plate height; the
  adjacent-sibling rule means a page that omits the CTA (the legal pages) needs
  no prop.
- **Tables.** Wherever content is rows-of-pairs or a comparison, a real
  `<table>` with `.label` headers, hairline rows, mono figures, and a
  `sm:hidden` definition-list fallback. `Roles.astro` and `Receipt.astro` are
  the two patterns.

Long pages alternate `bg-background` / `bg-card` and carry exactly one `.slab`
band. A card inside a `bg-card` band needs `bg-background` on the `.panel` or
it disappears.

### Motion: one idea per section, and no animation library

1. **Mount animation belongs to the header and the `h1`, and nothing else.**
   Both are CSS keyframes. The header's is opacity-only on purpose: a transform
   would make it a containing block for `position: fixed` descendants, which is
   the exact trap `MobileMenu.tsx` portals around.
2. **Everything below the fold uses `.reveal`** — one scroll-driven CSS
   animation (`animation-timeline: view()`), defined once. **The base state is
   the final state**, and the animation only exists inside
   `@supports (animation-timeline: view())` nested in
   `@media (prefers-reduced-motion: no-preference)`. So no-JS, unsupported
   browsers and reduced-motion readers all get finished, readable content.
3. **At most one scroll-linked section per route**, and only where the content
   genuinely is a sequence in time.
4. **Reduced motion is a redefinition, not a shortening.** The global clamp
   only shortens duration; `animation-fill-mode: both` still latches the
   transform, and it cannot reach a JS-driven animation at all.
5. The hero's mouse parallax is ~25 lines of inline script with a rAF lerp —
   the one Motion feature that was being used, at roughly 800 bytes instead of
   35 KB, and never started for reduced motion or a narrow viewport.

### React Bits Pro: read the blocks, ship almost none of them

The licence is **Ultimate**, so all 135 components, 238 marketing blocks, 300
App UI blocks and 11 templates are available. `docs/react-bits/SKILL.md` is the
integration guide; `docs/react-bits/CATALOG.md` is the full ground-truth
catalog (name, description, export style, npm deps) fetched from the registry.

**Marketing blocks are read, not installed.** A block is hardcoded English copy
inside a Next.js client component; this site's copy lives in `src/i18n/` and
its numbers in `src/config/pricing.ts`, so a block can only ever be a
structural and motion reference — the arrangement, the grid, the hover
behaviour — transcribed into an `.astro` section that reads the dictionary.
That is what the SKILL calls the harmonization pass, and it is the whole job.

**One component ships**, where CSS genuinely cannot do the work:

- `blur-highlight` in `Thesis.astro` — the reference's scroll blur-up with a
  per-phrase highlight sweep. `client:visible`. Locally patched twice: for
  `prefers-reduced-motion` (the CSS clamp cannot reach a JS animation), and to
  accept the sentence as a `text` prop, because Astro serialises an island's
  children as `<astro-slot>` markup and the component's text extraction
  silently returns `""` — an empty, zero-height paragraph with nothing thrown.
`scroll-stack` was installed for `/learn/`, read, and removed: its cards are
`absolute inset-0` siblings positioned by a rAF loop, so un-hydrated it renders
three articles on top of one another. The full note is at the foot of
`LearnPage.astro`, and it is the best worked example in the repo of what the
harmonization pass actually decides.

Everything else was considered and rejected. **No WebGL anywhere**: every
shader component pulls `three` (~600 KB), and on a site whose pitch is that the
numbers are checkable, an ambient shader buys atmosphere and spends trust.
`staggered-text` was replaced by `Headline.astro`, which does the same word
stagger in a CSS keyframe, keeps the `{accent}` span a `text: string` prop
cannot hold, and costs nothing.


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

### The JavaScript budget

Every route ships React for the header's theme and palette controls, the mobile
sheet and Lenis smooth scrolling (~57 KB over the wire, plus ~10 KB for Lenis).
`/start/` adds the intake form's Radix primitives, and `/` adds Motion for the
one React Bits component in `Thesis.astro`. **Every one of those is
`client:idle` or `client:visible`, so none is in the critical path.**

What is NOT in the budget, deliberately:

- **No animation library on thirteen of fifteen routes.** Every reveal is a
  scroll-driven CSS animation; the hero's headline stagger and mouse parallax
  are a CSS keyframe and ~800 bytes of inline script.
- **No `three`, anywhere.** Every WebGL component in the React Bits library
  costs ~600 KB, and this site's whole argument is that the numbers are
  checkable rather than that the page is atmospheric.

Rewriting the three header controls in vanilla JS would remove React from
thirteen of fifteen routes. It was measured and deliberately not done: the
existing islands are correct, focus-trapped and portalled, and the payload is
not on the critical path. Revisit it if the JS budget ever becomes the
constraint — the intake form must stay React either way.

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
- `references/` is gitignored — the licensed SaaS landing template the rebuild
  is modelled on. Its licence forbids redistribution, so it stays out of the
  repo; read it, do not commit it.
- `.rb-source/` is gitignored — a local cache of React Bits Pro block source,
  fetched from the registry so blocks can be read without hitting rate limits.
  Same licensing reason.
- `.env.local` holds `REACTBITS_LICENSE_KEY` and is gitignored. The shadcn CLI
  reads it to authenticate the `@reactbits-starter` and `@reactbits-pro`
  registries declared in `components.json`.
- Photography is Unsplash/Pexels licensed (commercial use, no attribution
  required). See `CREDITS.md`. Neither licence permits implying that a depicted
  person endorses anything, which is why the testimonials carry no portraits.

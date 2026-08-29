# Ellery Health

A static marketing site for a fictional US company that coordinates GLP-1 and
longevity treatment between a patient, an independent licensed clinician, and a
state-licensed mail-order pharmacy.

**This is a demonstration build.** The company, the address, the phone number,
the named clinical practice and the named pharmacies are illustrative, and the
patient quotations were written for the demo. The compliance posture, the
pricing model and the process are modelled on how the real category works.

Astro 7 · React 19 islands · Tailwind v4 · shadcn/ui · deployed as plain files.

```sh
pnpm install
pnpm dev              # http://localhost:4321
pnpm verify           # the ship gate: check + test + build + verify-dist
```

## What is worth looking at

| | |
| --- | --- |
| **The thesis** | Every site in this category sells the outcome. This one sells the *chain*: four handoffs, one clock, and every fee published — including the ones that are not Ellery's. The regulatory constraint that an administrator may not prescribe or dispense is turned into the reason to trust it. |
| **The Relay** | `src/components/sections/Relay.astro` · a tick-marked measurement track rather than three icon cards, because elapsed time is information the reader came for. |
| **The Ladder** | `src/components/sections/Ladder.astro` · the titration schedule as a stepped chart, because dose magnitude is information too. |
| **The disclosure table** | `src/components/sections/Roles.astro` · six jobs, four parties, no overlap. Every competitor puts this in §14 of their Terms. |
| **The receipt** | `src/components/sections/Receipt.astro` and `/pricing/` · every line item with its destination, instead of one bundled price and an asterisk. |
| **The intake** | `src/components/islands/IntakeForm.tsx` · a complete multi-step questionnaire that computes BMI and the running itemised cost entirely client-side, and says plainly that nothing is submitted. |
| **Three palettes** | The switcher in the header. `Specimen` is the recommendation; `Clay` is deliberately the warm apothecary look the reference sites use, so the two can be compared rather than argued about. |
| **Dark mode** | None of the three reference sites has one. |

## The design system

`docs/DESIGN-SYSTEM.md` is the contract — not a style guide to consult, but the
list of values a section is allowed to use. `src/styles/global.css` is the
implementation, and its comments carry the reasoning. Five decisions explain
the rest:

**Two hues, and one of them is a surface.** A structural deep petrol for the
full-bleed slab bands and the inverted cards, and amber as the single loud
signal. Amber is a *ground*, not a text colour: `#e8a33d` type on the paper
ground is 1.9:1 and fails, while near-black ink on an amber plate clears 8.7:1.
So amber-coloured type is `text-signal-700 dark:text-signal-500`, and the amber
plate always carries ink. The focus ring follows the same logic and is ink
rather than the accent, which is the one accessibility bug the reference
template ships.

**The type roles are inverted from the first build.** Fraunces used to set
every heading; now Instrument Sans carries the headlines at 500 with tight
tracking, and Fraunces survives as *one italic accent word* — WONK 1, once per
page, inside the `h1`. Demoting a display serif from "all headings" to "one
word" is what makes it read as a decision. IBM Plex Mono still sets every
figure on the site, which is unchanged and still the thing the brand rests on.

**One container, two rhythms.** `.shell` is 64rem and is the only outer width
on all fourteen routes; `.section` is the only vertical rhythm, with
`.section-tight` as the single exception for a band that reads as attached to
the thing above it. A page that invents a third of either is the clearest tell
of an assembled rather than a designed page. Two radius families — 12px for
controls, 24px for surfaces — plus a 40px furniture radius used only by the
frame, the header sweep and the slab tops.

**The site frame and the overlap.** Four fixed rails and four corner fillets
mount the page like a specimen on a card, with the floating header cut from the
same sheet; the frame hides below 850px, where a 10px rail is only a bezel.
At the foot of the page the CTA plate straddles the top edge of the compliance
band, so the last ask and the legal ground read as one object. Both are in
`global.css` (`.site-frame`, `.band-overlap`), which is why no page component
does overlap arithmetic.

**Motion is CSS, and mostly absent.** One reveal, `.reveal`, defined once as a
scroll-driven animation inside `@supports` and `prefers-reduced-motion:
no-preference` — so the base state is the final state and a browser without
scroll timelines, a crawler, or a reader with reduced motion sees finished
content rather than an element stuck at opacity 0. Mount animation belongs to
the header and the `h1` and to nothing else.

## React Bits Pro, and why almost none of it ships

The licence is Ultimate; the catalogue is in `docs/react-bits/CATALOG.md`.
One component ships: `blur-highlight`, on the homepage's thesis section, at
`client:visible`, because a word-by-word scroll blur-up with a real
reduced-motion path is not something CSS does today.

Everything else was read rather than installed. A marketing block is hardcoded
English inside a Next.js client component, and this site's copy lives in
`src/i18n/` and its numbers in `src/config/pricing.ts` — so a block is a
structural reference (the arrangement, the grid, the hover) transcribed into an
`.astro` section that reads the dictionary. Two rejections are worth reading as
worked examples: `src/components/LearnPage.astro` closes with why `scroll-stack`
was offered, read, and left out, and `docs/DESIGN-SYSTEM.md` §6 records why no
WebGL component ships at all.

The licensed sources themselves — the reference template in `references/` and
the block cache in `.rb-source/` — are not redistributable and are gitignored.

## Where things live

```
src/
  config/
    site.ts        business facts, schema.org type, anchor ids
    pricing.ts     EVERY price, dose, duration, threshold and partner name
    locales.ts     language declaration (currently English only)
  i18n/en/         one copy module per page + common/meta/programs
  components/
    *Page.astro    one per route; composes Layout + SeoHead + sections
    sections/      the section library
    islands/       stateful React, one file per island
    react-bits/    vendored React Bits components (one of two is used)
    ui/            shadcn primitives
  styles/global.css  the entire design system
docs/
  DESIGN-SYSTEM.md   the contract every section is built to
  react-bits/        catalogue and the harmonization method
scripts/
  make-icons.mjs   favicons, PWA icons, og-image from the four-step mark
  verify-dist.mjs  asserts on built output; fails on placeholders
```

`CLAUDE.md` documents the architecture, the compliance contract, and the two
deliberate divergences from the upstream template (the dictionary is a
directory; every number lives in `pricing.ts`). Read it before changing copy or
adding a page — and where it and `docs/DESIGN-SYSTEM.md` disagree on a visual
token, the design system wins; where they touch compliance, `CLAUDE.md` wins
absolutely. `CREDITS.md` covers the photography licences.

## Ship gate

`pnpm verify` must exit 0. `scripts/verify-dist.mjs` reads the built output,
because that is the only place these defects exist — each of them renders,
typechecks and passes a unit test on the way in:

- one canonical per page, reciprocal hreflang including `x-default`, parseable
  JSON-LD with resolvable `@id` references, a complete sitemap, no internal
  links to unbuilt routes, and no leftover placeholders (a hard error now that
  the domain is set);
- every page carries all eight compliance footnotes, read from
  `src/i18n/en/common.ts` rather than copied — a route that drops the band is a
  route where a superscript in the copy above resolves nowhere;
- no structured data that contradicts the pages: no `Pharmacy` or
  `MedicalBusiness` entity, and no offer whose description has lost the
  clinician-decides condition;
- no page text hidden behind an inline `opacity: 0` outside a hydrated island —
  the failure mode of pasting a motion-driven React block into `.astro` without
  a `client:*` directive;
- no class string the rebuild retired (`max-w-6xl`, `rounded-[3px]`, `glow-*`).

## Before this could go live

See the checklist at the end of `CLAUDE.md`. The short version: replace the
fictional entities, have counsel rewrite the legal pages, replace the
demonstration testimonials, confirm the state-availability count against real
licensure, and wire `/start/` to a real backend.

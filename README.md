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
| **Three palettes** | The switcher in the header. `saline` is the recommendation; `clay` is deliberately the warm apothecary look the reference sites use, so the two can be compared rather than argued about. |
| **Dark mode** | None of the three reference sites has one. |

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
    ui/            shadcn primitives
  styles/global.css  the entire design system
scripts/
  make-icons.mjs   favicons, PWA icons, og-image from the four-step mark
  verify-dist.mjs  asserts on built output; fails on placeholders
```

`CLAUDE.md` documents the architecture, the design system, the compliance
contract, and the two deliberate divergences from the upstream template (the
dictionary is a directory; every number lives in `pricing.ts`). Read it before
changing copy or adding a page. `CREDITS.md` covers the photography licences.

## Ship gate

`pnpm verify` must exit 0. `scripts/verify-dist.mjs` checks the built output
for one canonical per page, reciprocal hreflang, parseable JSON-LD with
resolvable `@id` references, a complete sitemap, no internal links to unbuilt
routes, and no leftover placeholders — the last of which is a hard error now
that the domain is set.

## Before this could go live

See the checklist at the end of `CLAUDE.md`. The short version: replace the
fictional entities, have counsel rewrite the legal pages, replace the
demonstration testimonials, confirm the state-availability count against real
licensure, and wire `/start/` to a real backend.

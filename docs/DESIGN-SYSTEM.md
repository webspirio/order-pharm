# The rebuilt design system — the contract

Every section on this site is built to this document. It is not a style guide
to consult; it is a list of the values you are allowed to use. If a value you
want is not here, the answer is to use the nearest one that is, not to invent a
neighbour.

The rebuild takes its structural language from the premium SaaS landing
template in `references/saas` and its content, compliance posture and
information design from the site that was already here. Where the two
disagree, the compliance contract in `CLAUDE.md` wins, then this document,
then the reference.

---

## 1. What must never change

Read `CLAUDE.md` → **The compliance contract** before writing any string.
Restated, because it is the reason this site is shaped the way it is:

- **Never a possessive** over clinicians or pharmacies. Not "our doctors",
  not "our pharmacy", not "our clinical team".
- **Never** "we prescribe" / "we'll get you a prescription" / "we ship your
  medication". Ellery routes.
- **Never promise or imply a prescription.** Every surface that shows a price
  or asks for the click carries `d.gating.short` or `d.gating.long` verbatim.
- **"Compounded" always adjacent to the molecule.** Never a brand name on a
  compounded product. Never "FDA-approved" near one.
- **Longevity claims hedge**: "may support", "is studied for".
- **All eight footnote symbols** (`*` `†` `‡` `§` `¶` `◆` `‖` `◇`) render on
  every route, from `common.ts`'s `compliance.notes`. Never invent a ninth.
  Never a bare asterisk that resolves nowhere.
- **Never type a figure into markup.** Import it from `src/config/pricing.ts`.
- **Copy lives in `src/i18n/en/*.ts`.** A React Bits block's hardcoded English
  is a structural reference, never shipped text.

---

## 2. Colour

Two hues. A structural deep petrol, and one loud signal.

| Role | Token | Light | Dark |
|---|---|---|---|
| Page ground | `bg-background` | `#f1f3f2` | `#0b0f0e` |
| Raised surface | `bg-card` / `bg-frame` | `#ffffff` | `#141a18` |
| Ink | `text-foreground` | `#0c1412` | `#e8edeb` |
| Reading grey | `text-muted-foreground` | `#5a6663` | `#9aa5a2` |
| Container edge | `border-border` | `#dde3e1` | `#242e2b` |
| Row hairline | `border-hairline` | `#e9edec` | `#1a2220` |
| Structural dark | `.slab` (`bg-brand-800`) | `#0b2a31` both | |
| Signal | `signal-500` | `#e8a33d` both | |

### The signal rule, enforced by contrast rather than taste

`signal-500` is a **surface** and a **rule**, not a text colour on paper.

| Pairing | Ratio | Verdict |
|---|---|---|
| `#e8a33d` text on `#f1f3f2` | **1.9:1** | never |
| `#0c1412` on `#e8a33d` | **8.7:1** | the plate, always ink on amber |
| `signal-700` `#8a5510` on `#f1f3f2` | **5.6:1** | amber-coloured text on light |
| `#e8a33d` on the slab `#0b2a31` | **7.0:1** | amber text on the slab, fine |
| `#e8a33d` on dark `#0b0f0e` | **9.0:1** | amber text in dark mode, fine |

So: `text-signal-700 dark:text-signal-500` wherever amber-coloured type is
wanted, and `bg-signal-500` with `text-[#0c1412]` wherever an amber surface is.

**On `.slab`, `text-brand-50` has an opacity floor of `/60.`** `/40` is 3.4:1,
`/50` is 4.4:1, `/60` is 5.8:1. Borders and hairlines are decorative and exempt.

### Three text tones, and no fourth

- On paper: `text-foreground`, `text-muted-foreground`,
  `text-signal-700 dark:text-signal-500`.
- On the slab: `text-brand-50`, `text-brand-50/70`, `text-signal-500`.
- On the plate: `text-[#0c1412]`, `text-[#0c1412]/75`, `text-[#0c1412]/60`.

Every other opacity step is a bug. Do not write `text-foreground/50`,
`text-brand-50/55`, `text-brand-50/65`, `text-brand-50/75`.

### Two section backgrounds, alternating

`bg-background` and `bg-card`, and two recessed sections never touch. The
`.slab` band is furniture, not a third background: **exactly one per long
page**, in the middle or at the close. Never write raw `bg-brand-800` — write
`slab on-slab`, which also flips the focus and Fraunces tokens.

A `.panel` inside a `bg-card` band needs `bg-background` on the panel, or it
disappears.

---

## 3. Type

| Role | Class | What it is |
|---|---|---|
| Page headline (`h1`, **once**) | `display-1` | `clamp(2.75rem, 7.4vw, 5.5rem)`, sans 500 |
| Section heading (`h2`) | `display-2` | `clamp(2rem, 4.2vw, 3.25rem)`, sans 500 |
| Sub-cluster heading (`h3`) | `display-3` | `clamp(1.375rem, 2.4vw, 1.75rem)`, sans 500 |
| Card / row title | `subhead` | sans 600, 17px |
| Lead paragraph | `lead` | 17px, muted, `max-width: 40rem` |
| Body | *(none)* | inherited 16px, `text-muted-foreground` for prose |
| Eyebrow / micro-label | `label` | mono 600, 11px, `0.16em`, uppercase |
| Any figure | `figure` | mono, tabular, tight |
| One accent word | `wonk` | Fraunces italic WONK 1, in the signal colour |

**`display-2` is the ceiling.** Nothing outside an `<h1>` may be larger.
A big figure caps at `figure text-[1.75rem]`, or `text-[2.5rem]` where it is
genuinely the section's subject; never at `display-1`'s size.

**`wonk` appears at most once per page**, inside the `h1`, via
`Headline.astro`'s `{accent}` token. A pull quote may use it instead — never
both on one page.

**Every figure is mono.** Doses, hours, prices, cutoffs, step indices, USP
chapter references, dates, percentages, state counts. If a reader is meant to
trust the number, it is `.figure`.

---

## 4. Geometry

One container, two section rhythms, two radius families.

| Thing | Class | Value |
|---|---|---|
| Container | `shell` | `max-width: 64rem`, `1.25rem` / `2rem` gutters |
| Section rhythm | `section` | `py-20 / sm:py-28 / lg:py-34` |
| Attached band | `section-tight` | `py-12 / sm:py-14` — the ticker, a breadcrumb, a footnote strip |
| Header clearance | `page-top` | on the first in-flow section of every page except `/` |
| Reading measure | `measure` | `max-width: 42rem` |
| Control radius | `rounded-lg` | 12px — buttons, inputs, chips, badges |
| Surface radius | `rounded-2xl` / `.panel` | 24px — cards, tiles, media, tables |
| Furniture radius | `--radius-slab` | 40px — frame fillets, header sweep, slab tops |
| Circle | `rounded-full` | dots, ticks, avatar slots **only** |

Reject `max-w-6xl`, `py-16 sm:py-20`, `rounded-md`, `rounded-sm`,
`rounded-xl`, `rounded-3xl`, `rounded-[3px]`, `rounded-[28px]`. `max-w-3xl`
and `max-w-2xl` *inside* a `.shell` are reading measures and are fine.

### Surfaces

`.panel` (raised card) · `.panel-flat` (recessed card) · `.panel-invert` (card
on the slab) · `.plate` (amber) · `.plate-soft` (pale amber) · `.slab` +
`.on-slab` · `.on-plate`.

### Controls

`.btn-solid` · `.btn-outline` · `.btn-solid-invert` · `.btn-outline-invert` ·
`.btn-split` (the reference's split accent CTA — **at most twice per page**:
the header, and one in-page).

---

## 5. Motion

The whole site ships **zero animation-library bytes** except where this
document names a React Bits component. Everything else is CSS.

1. **Mount animation belongs to the header and the `h1`, and nothing else.**
   `.site-header`'s fade, and `Headline.astro`'s `reveal` prop. A section
   below the fold that animates on mount has already finished by the time the
   reader reaches it.
2. **Everything below the fold uses `.reveal`** — one scroll-driven CSS
   animation, defined once in `global.css`. Add the class to the section's
   content wrapper. Do not write a second reveal.
3. **At most ONE scroll-linked section per route**, and only where the content
   genuinely is a sequence in time: the custody rail on `/` and
   `/how-it-works/`, the table-of-contents rail on an article.
4. **The base state is the final state.** Never ship an element whose static
   CSS is `opacity: 0`. `.reveal` lives inside
   `@media (prefers-reduced-motion: no-preference)` and `@supports
   (animation-timeline: view())` for exactly this reason: without JS, without
   scroll-timeline support, or with reduced motion, the reader sees finished
   content.
5. **A React Bits block's `whileInView` motion is the trap.** Rendered in
   `.astro` without a `client:*` directive it becomes static HTML frozen at
   `opacity: 0`. Either hydrate it or strip the motion. Prefer stripping it and
   using `.reveal`.
6. **Reduced motion is a redefinition, not a shortening.** The global clamp
   only shortens duration; `animation-fill-mode: both` still latches the
   transform. Any new keyframe must be turned off explicitly.

---

## 6. React Bits Pro — where it is used, and why only there

The licence is Ultimate, so all 135 components, 238 marketing blocks, 300 App
UI blocks and 11 templates are available. Almost none of them ship.

**Marketing blocks are read, not installed.** A block is hardcoded English
copy in a Next.js client component; this site's copy lives in `src/i18n/` and
its numbers in `src/config/pricing.ts`. So a block is a structural and motion
reference — the arrangement, the grid, the hover behaviour — transcribed into
an `.astro` section that reads the dictionary. That is what
`docs/react-bits/SKILL.md` calls the harmonization pass, and it is the whole
job, not a workaround. Cached source for every candidate is in `.rb-source/`.

**Components ship where CSS genuinely cannot do the job:**

| Component | Where | Why it earns its keep |
|---|---|---|
| `blur-highlight` | `Thesis.astro` on `/` | The reference's word-by-word scroll blur-up, with per-word highlight and a real `respectReducedMotion` path. `client:visible`, below the fold. |
| `scroll-stack` | `/learn/` index | Pinned cards that stack and dissolve. Zero npm dependencies. |

Everything else was considered and rejected on cost or fit:

- **No WebGL, anywhere.** Every shader component pulls `three` (~600 KB). On a
  site whose pitch is that the numbers are checkable, an ambient shader behind
  the hero buys atmosphere and spends trust. The photograph wins.
- **`staggered-text`** was replaced by `Headline.astro`, which does the same
  word stagger in a CSS keyframe, keeps the `{accent}` span that a
  `text: string` prop cannot hold, and costs nothing.
- **Cursor effects, 3D carousels, text scramblers** — wrong register for a
  medical administrator.

---

## 7. Accessibility floor

- **AA in both themes and all three palettes.** Check the pairing, not the
  vibe. §2 has the numbers for the ones that are close.
- **Focus is ink, not amber.** One rule, `:focus-visible { outline: 2px solid
  var(--focus) }`; `.on-slab` and `.on-plate` flip the token. An amber ring on
  paper is 1.9:1 and fails WCAG 2.4.11 — the reference template ships that bug.
- **Real semantics.** Rows-of-pairs is a `<table>` with `.label` `<th>`s and a
  `sm:hidden` definition-list fallback (`Roles.astro` and `Receipt.astro` are
  the two patterns). Disclosure is a `<button aria-expanded>`; never a
  `div role="button"`. A footnote key is a `<dl>`.
- **One `h1` per page**, and the heading levels below it do not skip.
- **Named landmarks.** Four anonymous `<nav>`s in a footer announce as four
  "navigation" regions; each takes an `aria-label`.
- **Anything that moves for more than five seconds needs a pause** (WCAG
  2.2.2). The ticker's `sr-only`-until-focused checkbox is the pattern.
- **No dead links.** An `href="#"` or a social icon pointing nowhere is the
  defect this site was built to avoid.

---

## 8. Islands and the `.astro` / `.tsx` boundary

Unchanged from `CLAUDE.md`, and still the fastest way to ship something that
renders but does not work:

1. Stateful React lives in `src/components/islands/*.tsx`, one file per island.
2. **React context does not cross island boundaries.** Anything pairing a
   trigger with content — Select, DropdownMenu, RadioGroup, Popover, an
   accordion — sits entirely inside one `.tsx`.
3. **A `fixed` overlay inside a `filter` / `backdrop-filter` / `transform` /
   `will-change` ancestor needs a portal.** The floating header is opaque and
   uses an opacity-only mount animation precisely so it never becomes a
   containing block — but `MobileMenu.tsx` still portals, because that
   guarantee should not be load-bearing.
4. `class` on HTML elements in `.astro`; `className` on React components,
   including lucide icons used inside `.astro`.
5. **React without a `client:*` directive renders to static HTML at build
   time.** That is how lucide icons ship zero JS.
6. Islands never import from `src/assets`. The `.astro` optimises with
   `<Image />` and passes plain URLs and dimensions down.

---

## 9. The harmonization checklist

Count these on any page you finish. The expected number follows each.

| Check | Expected |
|---|---|
| Distinct section-heading sizes | **1** (`display-2`) |
| Distinct section paddings | **2** (`section`, `section-tight`) |
| Distinct outer container widths | **1** (`shell`) |
| Radius families | **2** (+ furniture) |
| Text tones | **3** per ground |
| Section backgrounds | **2** (+ one slab) |
| Elements at or above the `h1`'s size | **0** |
| Mount-animated sections below the fold | **0** |
| Scroll-linked sections | **≤ 1** |
| Animated elements with no reduced-motion fallback | **0** |
| Adjacent sections doing the same job | **0** |
| `.btn-split` instances | **≤ 2** |
| `wonk` instances | **≤ 1** |
| Bare figures not in `.figure` | **0** |
| Hand-typed numbers not from `pricing.ts` | **0** |

---
name: recipe-saas-homepage
description: "A tested 13-block arrangement that assembles a complete self-serve B2B SaaS homepage (navigation through footer) from React Bits Pro blocks in one prompt. Use when the user wants an entire self-serve SaaS homepage assembled in one pass, from navigation through footer, rather than composing sections one at a time. Works with the React Bits Pro blocks or with the plain-markup fallback described for every section."
---

# Recipe: SaaS Homepage

Assembles the complete homepage for a **self-serve B2B SaaS product**: the page a
buyer lands on from a search result or ad, where they must understand the value,
trust the product, price it, and start a trial without talking to sales.

Unlike a general prompt, a recipe declares its **bill of materials**. The structured
version lives in `plan.json` next to this file. That is the machine-readable
contract the Landing Builder consumes, and it is the source of truth for block
order. This document explains the reasoning and how to adapt it.

## 1. When to use this recipe

Use it when all of these are true:

- The product is **self-serve**: a visitor can sign up and get value without a demo.
- The homepage is the **primary conversion surface**, and the goal is **start a trial
  or signup**, not book a call.
- There is **real** proof to show: customer logos, a headline metric, or named quotes.
- You want the whole page in one pass rather than section by section.

React Bits Pro blocks are **optional**. With the `@reactbits-pro` and
`@reactbits-starter` registries configured you get the tested composition
straight away. Without them, every role below carries a `fallback` in
`plan.json` describing its minimum viable structure in plain markup, so the
page order, the content plan and the conversion logic all still apply. See §8.

Do **not** use it for a sales-led enterprise product whose homepage exists only to
book a demo (drop the pricing block and lead with `contact` instead), for a single
launch moment (use `recipe-product-launch`), or for a creative studio selling
qualified enquiries (use `recipe-agency-homepage`). For a bespoke section order,
reach for `prompt-saas` and compose it yourself.

## 2. The prompt

Give the agent this whole block, filling every bracketed field before you send it.
Do not leave a bracket unfilled. An empty field produces invented content.

```
Build a self-serve B2B SaaS homepage for [product name], a [one-line description]
for [audience: the exact role that signs up]. The single most important thing a
visitor must understand in the first screen is [the one idea]. The conversion goal
is [start free trial | create free account], and its button label is [exact CTA
label]. Use that same label verbatim in the navigation, the hero, the pricing
block, and the closing CTA. Nowhere else on the page may have a competing primary
button.

Use the React Bits Pro recipe-saas-homepage block plan. Install each block from the
@reactbits-pro registry in the declared order, then replace every placeholder string
with real copy written for this product. Do not add sections that are not in the
plan, and do not reorder them. If a block ships with demo logos, demo metrics, or
demo testimonials and I have not given you real ones below, delete that block rather
than keep the placeholders.

Write the page to this narrative spine, one block per beat: (1) name the audience and
the one idea in the hero; (2) prove adoption with the logo bar; (3) frame the problem
the buyer has today and how the product resolves it; (4) show the three-to-five
capabilities that deliver that outcome, ordered by buyer priority not by build effort;
(5) show how a new user gets from signup to value in three steps; (6) quantify the
outcome with real numbers; (7) let a named customer say it in their words; (8) contrast
the product against the status quo the buyer is comparing it to; (9) price it plainly;
(10) answer the real objections; (11) restate the offer and reduce the last friction;
(12) close with a complete, honest footer.

Apply the [skill name] skill for all visual, typographic, spacing and motion
decisions. Where the skill and a block's default styling disagree, the skill wins.
Edit the block. Keep exactly one <h1> (the hero). Every section gets a labelled
heading, every form field a visible label, and every interactive control a hover and
focus state. Verify AA contrast in both light and dark themes.

Facts you may use: invent nothing beyond this list. If a fact is missing, leave the
copy generic rather than fabricate it:
[paste real pricing, trial length, card-required yes/no, cancellation terms,
customer names, logos, the headline metric with its source, integrations, and the
name of the obvious alternative the buyer compares you to]
```

## 3. Block set and order

| # | Role | Block | Why this block |
|---|------|-------|----------------|
| 1 | Navigation | `navigation-1` | Product/Solutions mega-menu with room for one CTA; suits a multi-feature SaaS without hiding the trial button. |
| 2 | Hero | `hero-1` | Split layout: announcement pill, headline, subhead, primary CTA plus a product visual slot. Carries the value proposition. |
| 3 | Logo bar | `social-proof-1` | Quiet six-logo grid under one line of trust copy. **Omit entirely** if the logos are not recognisable. |
| 4 | Problem to solution | `features-2` | Auto-cycling tabs, each pairing a real pain with the product's answer. Frames the shift the buyer is making. |
| 5 | Core capabilities | `features-1` | Icon-and-description grid for three-to-five capabilities. Scannable; ordered by buyer priority. |
| 6 | How it works | `how-it-works-1` | Three numbered steps from signup to value, with a visual per step. |
| 7 | Quantified outcomes | `stats-3` | Animated value/label pairs for real metrics. **Omit** if the numbers are not real. |
| 8 | Testimonials | `social-proof-8` | Named quotes with role and company: the human proof after the numbers. **Omit** if quotes are not real. |
| 9 | Comparison | `comparison-1` | Feature checklist against the status quo the buyer is weighing. |
| 10 | Pricing | `pricing-1` | Tiered table with a highlighted plan; the conversion surface. |
| 11 | FAQ | `faq-1` | Sticky-header disclosure list for the real objections. |
| 12 | Closing CTA | `cta-1` | Restates the offer with the trial terms; the last chance to convert. |
| 13 | Footer | `footer-1` | Grouped, complete, real links. |

Install command:

```bash
npx shadcn@latest add @reactbits-pro/navigation-1 @reactbits-pro/hero-1 \
  @reactbits-pro/social-proof-1 @reactbits-pro/features-2 @reactbits-pro/features-1 \
  @reactbits-pro/how-it-works-1 @reactbits-pro/stats-3 @reactbits-pro/social-proof-8 \
  @reactbits-pro/comparison-1 @reactbits-pro/pricing-1 @reactbits-pro/faq-1 \
  @reactbits-pro/cta-1 @reactbits-pro/footer-1
```

Blocks ship with no props. Edit them directly. That is intentional: the recipe
gives you the arrangement, you own the content.

## 4. Content plan per block

**1: `navigation-1`**
Product name left. Collapse the mega-menu to the sections that exist. Do not keep
seven demo product links. One CTA on the right, matching the page-wide label. Make it
sticky so the trial button follows the scroll.

**2: `hero-1`**
- Announcement pill: one real, current fact (a launch, an integration, a number). Delete it if you have none.
- Headline: 4–8 words naming the one idea, not the product category.
- Subhead: one sentence naming who it is for and what changes for them.
- Primary CTA: the conversion action, labelled with what happens next.
- Visual: a real product screenshot or short loop. Never an abstract illustration.

**3: `social-proof-1`** *(omit if not genuinely available)*
Six recognisable logos under one line of copy. Four unknown logos read as filler and
hurt more than an absent block.

**4: `features-2`**
Three tabs. Each tab names a task the buyer does the hard way today and shows the
product doing it. This is the before/after. Write the pain in the buyer's language,
not yours. The rotating card should show a real state, not lorem.

**5: `features-1`**
Three to five capabilities as an icon grid. Each: outcome headline plus one sentence
of mechanism. Order by what the buyer cares about, not by what was hard to build.

**6: `how-it-works-1`**
Three steps from signup to first value. Step one must be true. If signup does need a
card, say so here rather than surprising them at pricing.

**7: `stats-3`** *(omit if numbers are not real)*
Three or four value/label pairs with units. Attach a source in the FAQ or a footnote.
Never invent these; a fabricated metric is the fastest way to lose a technical buyer.

**8: `social-proof-8`** *(omit if quotes are not real)*
Two to four quotes, each with a real name, role, and company. A quote about a specific
outcome beats a quote about how much they "love the product".

**9: `comparison-1`**
Compare against the **status quo** the buyer actually weighs: a spreadsheet, a manual
process, or the named incumbent. Every row must be defensible; one dishonest checkmark
discredits the table.

**10: `pricing-1`**
Real prices, real limits, one highlighted plan. State the trial length, whether a card
is required, and how cancellation works in plain text. Do not bury it.

**11: `faq-1`**
Answer the awkward questions: does trial need a card, what happens to my data, how do
you differ from `[the obvious alternative]`, is there a contract, how do I cancel.

**12: `cta-1`**
Restate the offer with the concrete terms: "Start free · no card · cancel anytime".
New information, not a copy of the hero.

**13: `footer-1`**
Real links only: product, company, legal, status, social. No dead routes.

## 5. The harmonization pass

Every block in this recipe is well made on its own, but each was authored
independently. Install thirteen of them and you get thirteen slightly different
design systems stacked vertically: four heading scales, four section paddings,
five radius vocabularies, and a mix of mount and scroll animation. The
harmonization pass is not optional polish. It is the step that turns a block dump
into a page. Run it **after** every block is installed and the content is in, and
**before** any review or the checklist in section 9.

Three problems in this exact set prove the pass is necessary:

1. **Hierarchy inversion.** `hero-1` tops out at `text-5xl`, but `features-1`,
   `stats-3`, `faq-1` and `cta-1` all reach `text-6xl`. Section headings render
   **larger** than the hero headline. Meanwhile `social-proof-8` is fixed at
   `text-3xl` and `pricing-1`/`comparison-1` sit at `text-4xl`, so on a desktop
   viewport the section headings step through roughly 60px, 48px, 36px and 30px
   with no logic. The most important line on the page is not the biggest.
2. **Broken vertical rhythm.** The set ships `py-8` (footer-1), `py-12` (most),
   `py-16` (social-proof-1, features-1) and `py-24` (social-proof-8). The gap
   between one section and the next jumps between 64px and 192px at random.
3. **Five radius vocabularies.** `pricing-1` leans `rounded-3xl`, `features-1`
   `rounded-xl`, `features-2` and `footer-1` `rounded-lg`,
   `stats-3`/`comparison-1`/`navigation-1` `rounded-md`, and
   `hero-1`/`how-it-works-1`/`social-proof-8`/`cta-1` use `rounded-full` pills.
   `social-proof-8` also narrows its inner container to `max-w-6xl` (1152px) while
   every other section uses `max-w-[1400px]`, so the page visibly pinches inward
   mid-scroll.

### 5.1 Type

One scale governs the whole page:

| Role | Class |
|------|-------|
| Hero headline (once only) | `text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight` |
| Section heading (h2) | `text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight` |
| Card, step or column title (h3) | `text-lg sm:text-xl font-medium` |
| Lead paragraph | `text-base sm:text-lg leading-relaxed` |
| Body and card copy | `text-sm sm:text-base leading-relaxed` |
| Eyebrow label | `text-xs font-medium uppercase tracking-[0.08em]` |

The hero headline is the largest type on the page. No section heading, footer
wordmark, statistic or CTA may match or exceed it. This raw set breaks that rule
in four places: `features-1`, `stats-3`, `faq-1` and `cta-1` all ship `text-6xl`
and must come down to the section-heading class. One weight family: `font-medium`
for all display type and headings, `font-semibold` only for emphasis inside
running copy, never `font-bold`. Apply `tracking-tight` on every heading at
`text-3xl` and above, default tracking below. One typeface for the page; if any
block ships a second family, remove it.

Before and after for this recipe:

| Block | Ships | Ends up |
|-------|-------|---------|
| `hero-1` | `text-5xl` | `text-4xl sm:text-5xl lg:text-6xl` (the one hero headline) |
| `features-2` | `text-5xl` | section heading |
| `features-1` | `text-6xl` | section heading |
| `how-it-works-1` | `text-5xl` | section heading |
| `stats-3` | `text-6xl` | section heading; figures cap below the hero |
| `social-proof-8` | `text-3xl` | section heading |
| `comparison-1` | `text-4xl` | section heading |
| `pricing-1` | `text-4xl` | section heading |
| `faq-1` | `text-6xl` | section heading |
| `cta-1` | `text-6xl` | section heading |
| `navigation-1` / `footer-1` | `text-2xl` / `text-xl` | wordmark, left below section headings |

### 5.2 Colour

Exactly two section backgrounds: base `bg-white dark:bg-neutral-950` and recessed
`bg-neutral-50 dark:bg-neutral-900`. Nothing else. Never place two recessed
sections back to back; use the recessed tone to group a cluster that argues one
point. For this order, alternate: hero and its logo bar base, `features-2`
recessed, `features-1` base, `how-it-works-1` recessed, `stats-3` base,
`social-proof-8` recessed, `comparison-1` base, `pricing-1` recessed, `faq-1`
base, `cta-1` recessed, footer base. That keeps each proof or mechanism cluster on
a recessed panel and never lets two recessed sections touch.

One card surface: `bg-neutral-100 dark:bg-neutral-800`. One border pair:
`border-neutral-200 dark:border-neutral-800`. Exactly three text tones: primary
`text-neutral-900 dark:text-white`, secondary `text-neutral-600 dark:text-neutral-400`,
tertiary `text-neutral-500`. One accent colour, on the primary CTA only, repeated
at most once (the highlighted plan in `pricing-1`). Everything else stays neutral.
Every colour class needs its `dark:` counterpart: check `pricing-1` and `cta-1`,
which ship the most coloured chrome.

### 5.3 Layout

One section rhythm: `py-16 sm:py-20 lg:py-24`. Two exceptions only: the nav at
`py-4`, and the `social-proof-1` logo bar directly under the hero at
`py-10 sm:py-12` so it reads as attached to the hero. Today the set is scattered
across `py-8` (footer-1), `py-12` (most blocks), `py-16` (social-proof-1,
features-1) and `py-24` (social-proof-8): normalise all of them to the one rhythm
plus the two exceptions.

Every section's outer container: `max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8`.
Fix `social-proof-8`, which constrains to `max-w-6xl` and pinches the page inward.
One inner measure for centered intro copy: `max-w-2xl`. Choose one header
alignment for the whole page and apply it everywhere; mixed alignment is the
clearest tell of an assembled page. Use **left-aligned** headers here, because
`hero-1` is a split layout with a left-aligned headline, so a left axis carries
straight down the page.

Two radius families maximum: `rounded-xl` for cards and panels, `rounded-lg` for
controls, inputs and buttons. `rounded-full` survives only for avatars, logo chips
and icon dots. Conversions: `pricing-1` `rounded-3xl` cards to `rounded-xl`;
`stats-3`, `comparison-1` and `navigation-1` `rounded-md` controls to `rounded-lg`;
the `rounded-full` buttons in `hero-1`, `how-it-works-1`, `social-proof-8` and
`cta-1` to `rounded-lg`, keeping `rounded-full` only on true avatars and icon dots.

### 5.4 Motion and scroll

Only the nav and the hero may animate on mount. Everything below the fold reveals
on scroll. The failure mode is concrete: a mount animation on a lower section
fires while the user is still reading the hero, so by the time they scroll to it
the reveal has already played and the section just sits there, static. In this
set the mount-only blocks below the fold are `how-it-works-1`, `social-proof-8`,
`pricing-1`, `faq-1` and `cta-1`. Convert each to a scroll reveal:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

Use that one reveal for the whole page. `y: 20` and `duration: 0.5` are already
the library's most common values, so this is the least invasive normalisation
available. Stagger with `delay: Math.min(index, 5) * 0.06` so any section finishes
revealing within 500ms; blocks shipping absolute delays up to 0.6s must be
rewritten to this, and never stagger a long grid item by item. One motion idea per
section: never combine parallax, stagger and a counter in one place. At most one
scroll-linked (`useScroll`) section on the page. `stats-3` counters animate once,
on enter, never on every intersection. Fewer than a third of the library's blocks
respect reduced motion, so add `useReducedMotion()` and collapse to an opacity-only
fade when it returns true.

### 5.5 Scroll opportunities worth taking

This is where these specific blocks can shine. Take **at most two** of these; the
value is in restraint:

- `navigation-1` gains a solid or blurred background once the hero has scrolled past.
- A sticky section header for the long list sections: `comparison-1`, `pricing-1`, `faq-1`.
- Progressive step reveal tied to scroll for `how-it-works-1`.
- `stats-3` counters trigger on enter rather than on mount.
- A small parallax on the `hero-1` product visual, 40px of travel at most.

Doing all five produces a page that feels busier, not better. Pick the two that
serve the narrative and leave the rest static.

### 5.6 Verifying the pass

Count these; the expected number follows each:

- Distinct section-heading sizes: **1**.
- Distinct section paddings: **2**, plus the nav.
- Distinct outer container widths: **1** (`max-w-[1400px]`).
- Radius families: **at most 2**.
- Text tones: **3**.
- Section backgrounds: **at most 2**.
- Type sizes at or above the hero headline: **0** other than the hero.
- Mount-animated sections below the fold: **0**.
- Animated elements with no reduced-motion fallback: **0**.

## 6. Adapting the result

**Product-led variant (the default)**
- Keep `pricing-1`; the CTA everywhere is `Start free trial` or `Create free account`.
- `how-it-works-1` describes the self-serve path from signup to value.

**Sales-assisted variant**
- Replace `pricing-1` with a `contact` block and change every CTA to `Book a demo`.
- Keep `comparison-1` and `faq-1`; enterprise buyers still self-educate first.

**Shortening the page**
Cut in this order: `stats-3`, `social-proof-8`, `features-2`. Never cut the hero, the
capabilities grid, pricing, the FAQ, or the closing CTA.

**Lengthening the page**
Add a second `features-1` group for a secondary persona, or a `showcase` block for a
flagship capability. Never a second hero and never a testimonial carousel.

## 7. Pairing with a skill

The block set defines *structure*; the skill defines *appearance*. Run both.

- `skill-swiss-grid`: expect to align every block to one shared column grid, flatten
  the pill badges and card shadows the stock blocks ship with, and tighten the type
  scale to a strict ratio. The grid-native `features-1`, `stats-3`, and `comparison-1`
  were chosen because they survive that discipline.
- `skill-corporate-trust`: expect a restrained palette, conservative motion, and
  proof placed early; the logo bar and testimonial block earn their keep here.
- Any skill's anti-pattern list overrides a block's default styling. When they
  conflict, edit the block.

After assembly, run the skill's self-verification loop **and** this recipe's checklist
(§9).

## 8. Working without React Bits Pro

If the registries are not configured, this recipe still works as a structural prompt:
build each numbered role as a hand-written section in the same order, with the same
content plan and conversion goal. The `fallback` field in `plan.json` describes each
role's minimum viable structure (a sticky bar, a split hero, an icon grid, a stat
row, a pricing table, a disclosure list, and so on) so the narrative spine survives
even without the blocks.

## 9. Completion checklist

- [ ] Block order matches `plan.json`. No sections added, none reordered.
- [ ] Every placeholder string from every block has been replaced.
- [ ] Nothing on the page is invented: no fake logos, metrics, quotes, or prices.
- [ ] `social-proof-1`, `stats-3`, and `social-proof-8` were removed if not real.
- [ ] One CTA label, used verbatim in nav, hero, pricing, and closing CTA.
- [ ] The hero states the audience and the one idea above the fold.
- [ ] The comparison table has zero indefensible checkmarks.
- [ ] Pricing states trial length, card requirement, and cancellation in plain text.
- [ ] The FAQ answers the card question, the data question, and the alternative.
- [ ] Every footer and nav link resolves.
- [ ] The applied skill's self-verification loop passes with zero anti-pattern hits.
- [ ] Verified at 375, 768, 1024, 1440.
- [ ] One `<h1>`; sections labelled; forms have labels and real validation messages.
- [ ] AA contrast in both themes.

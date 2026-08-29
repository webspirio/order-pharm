---
name: playful-motion
description: "Build energetic consumer product pages driven by real spring physics: staggered reveals, scroll-linked transforms, oversized rounded geometry and micro-interactions that stay purposeful and never fight the reader. Use when the user wants an animated, energetic, bouncy or lively page, mentions spring physics, scroll-linked animation, staggered reveals or micro-interactions, or is building a consumer app, game, or creative product page."
---

# Playful Motion

A landing-page system for energetic consumer products: a fitness app, a snack
brand, a kids' learning toy, a fintech card for teenagers. The style has a
personality and it moves, but the discipline that separates it from a chaotic mess
is a single rule: **every animation is purposeful, and no animation ever fights the
reader**. Motion guides attention, communicates cause and effect, and rewards
interaction. It never loops in the periphery, never blocks reading, and never makes
someone motion-sick.

The failure mode you are guarding against is the "playful-inspired" page where an
agent puts `transition-all duration-300 ease-in-out` on every element, drops in a
bouncing scroll-down arrow, applies a rainbow gradient, and calls it energetic. That
page has no spring physics, no stagger, no scroll linkage, and no reduced-motion
handling. It reads as a template with the animation slider turned up, not as a
product with a point of view. The difference is almost entirely in the *physics* and
the *timing*. Read the motion system (§6) and the anti-patterns (§11) first.

The second failure mode is accessibility: playful pages are the most common source of
vestibular-triggering motion. §14 makes `prefers-reduced-motion` a design deliverable,
not a `@media` afterthought.

## 1. The core idea

> Motion is the brand. Physics is the craft. Restraint is the discipline.

A playful page feels alive because elements have *weight and springiness*: they
overshoot slightly and settle, they respond to the pointer, they arrive in a
choreographed sequence rather than all at once. That aliveness comes from spring
physics, not from eased tweens. An `ease-in-out` tween is mechanical; a spring has
mass and bounce, so it feels physical.

Three consequences that drive every other rule:

1. **Springs, not tweens, for anything that should feel physical.** Reserve CSS eases
   for utilitarian state changes (colour, opacity of a tooltip). Everything with
   personality uses a spring.
2. **Choreography beats simultaneity.** Ten elements arriving together is noise. Ten
   elements arriving in a `60ms` stagger is a sentence.
3. **The reader is never blocked.** Content is readable the instant it is needed;
   motion enhances, it does not gate. Nothing important waits on a `2s` animation.

## 2. Page architecture

| # | Section | Height | Purpose |
|---|---------|--------|---------|
| 1 | Nav | `64–72px`, sticky | Wordmark, 4–6 links, one bright pill CTA. |
| 2 | Hero | `90–100vh` | Big friendly headline, one line, product visual with entrance spring. |
| 3 | Social proof | `auto` | A light, animated stat row or logo strip: brief, not a wall. |
| 4 | Feature A | `auto`, tall | One benefit, scroll-linked visual, staggered supporting points. |
| 5 | Interactive demo | `auto` | The one section where the product is touchable/draggable. |
| 6–7 | Feature B/C | `auto` | Alternating layout, each with its own entrance choreography. |
| 8 | Playful break | `70vh` | An oversized shape, a single line, one micro-interaction. |
| 9 | Pricing / plans | `auto` | Friendly cards with hover-spring lift (the one place cards are OK). |
| 10 | CTA | `60–80vh` | Big shape, big headline, one bright button with press feedback. |
| 11 | Footer | `auto` | Friendly, rounded, a small delightful hover somewhere. |

**Rule:** exactly one "interactive demo" and one "playful break" per page. More than
one of each turns the page into a toy box and buries the product.

## 3. Type scale

A rounded geometric sans carries the friendliness. The letterforms do the work the
colour and motion amplify.

**Use a rounded geometric sans:** Poppins, Nunito, Baloo 2, Gilroy, Satoshi. The
rounded terminals read as friendly without being childish. Pair with **nothing**:
one family, using weight and size for hierarchy. If a second face is unavoidable, a
monospace for numbers/labels only.

| Token | Desktop | Mobile | Weight | Tracking | Leading |
|-------|---------|--------|--------|----------|---------|
| `display-xl` | `clamp(48px, 8vw, 108px)` | `40px` | 700 | `-0.02em` | `1.0` |
| `display-l` | `clamp(36px, 5vw, 72px)` | `32px` | 700 | `-0.015em` | `1.05` |
| `display-m` | `clamp(26px, 3vw, 44px)` | `24px` | 600 | `-0.01em` | `1.1` |
| `lead` | `20px` | `18px` | 500 | `0` | `1.5` |
| `body` | `17px` | `16px` | 400 | `0` | `1.6` |
| `label` | `14px` | `13px` | 600 | `0.01em` | `1.3` |

**Hard rules:**

- **Headlines are `font-bold` (700), not `extrabold` (800+).** Rounded sans at 800
  gets heavy and loses the friendliness. 700 is the ceiling for display.
- **Body copy is weight 400 at `17px`, max `65ch`.** Playful does not mean
  unreadable. The reading experience stays calm even when the surroundings move.
- **One typeface.** Never pair the rounded sans with a serif or a script "fun" font.
  The playfulness comes from motion and shape, not from a novelty typeface.
- **Numbers in stats/pricing can be a heavier weight (700) and larger** to give the
  count-up its moment (§6); this is the only place emphasis via weight is encouraged.

## 4. Colour system

Bright but disciplined. The trap is a page that looks like a children's toy because
every hue appears at full saturation. Control comes from allocation, not from muting.

- **One dominant brand hue** + **one energetic accent** + neutrals. That is the whole
  palette. Two saturated hues, not five.
- **The 60/30/10 allocation:** 60% neutral (background, text, surfaces), 30% the
  brand hue (large surfaces, key sections), 10% the accent (CTAs, highlights, the one
  thing you want clicked). Break this and the page reads as a toy.
- **Saturate on purpose, not everywhere.** Full-saturation colour goes on small, high-
  intent elements (the button, an active pill). Large surfaces use a tint at `10–20%`
  of that colour, not the full-strength hue.

```
Example: energetic coral + lime accent
  Background        #FFFDF9   (warm off-white)
  Surface tint      #FFF0EA   (10% brand, section backgrounds)
  Brand             #FF5A3C   (coral: 30%, key surfaces, headings-on-tint)
  Accent            #C6F135   (lime: 10%, CTA, active states only)
  Ink primary       #1B1A17
  Ink secondary     #57534B
  Neutral surface   #F4F1EC
```

**Hard rules:**

- **Never a rainbow.** Three or more full-saturation hues on one screen reads as a
  children's app, not a confident brand.
- **The accent is scarce.** If the lime is everywhere, it stops meaning "click here".
- **No gradient soup.** A single soft brand-tint gradient on a hero shape is fine; a
  violet→cyan→pink mesh is not.
- **Dark mode** is a re-mapping: neutrals invert, brand and accent drop ~10%
  saturation so they do not vibrate on black. Never leave full-saturation lime on a
  `#0A0A0A` ground. It buzzes.

## 5. Shape language

Oversized, rounded, and systematic. Radii are a scale, not a random assortment.

- **Border-radius scale:** `--r-sm: 12px`, `--r-md: 20px`, `--r-lg: 32px`,
  `--r-xl: 48px`, `--r-pill: 9999px`. Pick from the scale; never a one-off `27px`.
- **Radius is proportional to element size.** A `48px`-tall button is `rounded-full`;
  a large `bg-brand` section block is `--r-xl`; a small chip is `--r-sm`. A giant
  card with a `12px` radius looks unfinished; a tiny tag with a `48px` radius looks
  like a mistake.
- **Blob and organic shapes are decoration, never structure.** A soft SVG blob behind
  the hero product is fine as a backdrop. Never lay text or a button *inside* a blob
  where the irregular edge crops or crowds the content. Structure stays on a grid.
- **Oversized geometry as section framing:** a section can sit inside one enormous
  `--r-xl` rounded rectangle in the brand tint. This is the signature "friendly
  container" of the style. Use it 2–3 times, not on every section.
- **Consistent corner smoothing:** if the design system supports squircle/`corner-
  smoothing`, apply it uniformly. Do not mix hard-rounded and squircle corners.

## 6. The motion system

This is the heart of the skill. Every value below is copy-pasteable into
`motion/react`. Springs are defined by `stiffness`, `damping` and `mass`; higher
stiffness is faster, higher damping removes bounce, higher mass adds weight and
slows settling.

**Spring configs by interaction class:**

| Class | `stiffness` | `damping` | `mass` | Feel | Used for |
|---|---|---|---|---|---|
| `snappy` | `500` | `30` | `0.8` | Quick, tiny overshoot | Button press, toggle, small UI |
| `bouncy` | `400` | `18` | `1` | Visible overshoot, playful | Entrance of a hero shape, badge pop-in |
| `smooth` | `260` | `26` | `1` | Almost no bounce, gentle | Section content arrival, layout shifts |
| `heavy` | `200` | `30` | `1.4` | Slow, weighty settle | Large product image, big card |

```tsx
import { motion } from "motion/react";

const spring = {
  snappy: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 },
  bouncy: { type: "spring", stiffness: 400, damping: 18, mass: 1 },
  smooth: { type: "spring", stiffness: 260, damping: 26, mass: 1 },
  heavy:  { type: "spring", stiffness: 200, damping: 30, mass: 1.4 },
} as const;
```

**Entrance choreography (stagger):** content in a group arrives in sequence via a
parent variant with `staggerChildren`.

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: spring.smooth },
};
```

- **Stagger step is `50–80ms`.** Below `40ms` the eye reads it as simultaneous; above
  `120ms` it drags. `60ms` is the default.
- **Travel is `16–24px`.** Big travel (`40px+`) reads as a cheap slide-up.
- **Entrances fire once** (`viewport={{ once: true, margin: "-15% 0px" }}`). Never
  re-trigger on scroll-back.

**Scroll-linked transforms:** tie a single property to scroll progress with
`useScroll` + `useTransform`, always clamped.

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], [40, -40]);      // gentle parallax
const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);   // playful tilt
```

- **Parallax range is `±40px` max**, on at most 2 elements per section. More is a
  layout-thrash and motion-sickness risk.
- **Scroll-linked rotation stays under `8°`.** A shape that spins as you scroll is
  fun once and nauseating twice.

**Hover and press micro-interactions:** every interactive element responds.

```tsx
<motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  transition={spring.snappy}
>
```

- **Hover scale `1.02–1.06`; press scale `0.94–0.97`.** Bigger than `1.08` looks
  cartoonish; press must dip below `1.0` to feel like a real button.
- **Count-up on stats fires once when the number enters view**, over `1.2–1.6s` with
  an ease-out, and **never re-runs on scroll-back**.

**The hard "never animate" rule set:**

- Never animate body paragraphs or long text blocks in. They must be readable
  instantly.
- Never loop anything in the periphery (a forever-bouncing arrow, a spinning badge, a
  pulsing glow). One-shot only, or on-interaction only.
- Never animate `width`, `height`, `top`, `left`, or `margin`. That causes layout
  thrash (§15).
- Never put a spring with visible bounce on nav, on a modal that must feel stable, or
  on anything a user reads while it settles.
- Never auto-advance a carousel; motion responds to the user, it does not perform at
  them.

## 7. `prefers-reduced-motion` as a design state

Reduced motion is not "turn animations off"; it is a **second, fully-designed
version** of the page. Decide what it becomes before you build the default.

| Default | Reduced-motion equivalent |
|---|---|
| Staggered spring entrance | Instant appearance, or a `150ms` opacity fade, no `y` travel |
| Scroll-linked parallax/tilt | Static; element sits at its mid-scroll position |
| Hover/press scale spring | Colour or shadow change only, no transform |
| Count-up number | Final number rendered immediately |
| Bouncy hero shape pop-in | Present on load, no motion |

```tsx
import { useReducedMotion } from "motion/react";

const reduce = useReducedMotion();
const item = reduce
  ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.15 } } }
  : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: spring.smooth } };
```

- **The reduced-motion page must still feel finished and branded:** friendly colour,
  shape, and copy carry it when motion is gone. It is never a broken or empty page.
- **Every scroll-linked and looping effect has a static fallback.** Disable the
  `useTransform`, render the mid-point value.

## 8. Navigation

- Sticky, `64–72px`, background is the page background at `90%` with a soft
  `backdrop-blur-md` and a `--r-lg` bottom-rounded floating bar, or full-width with a
  hairline. Appears on load, does not animate in on every scroll.
- Wordmark left; 4–6 links centre/right in `label` weight; one **bright accent pill
  CTA** far right with press feedback (`whileTap scale 0.96`).
- Links get a `snappy` underline or a background-pill on hover with a spring, not a
  `transition-all`.
- **Mobile:** hamburger opens a full-screen sheet that springs in (`smooth`), links
  stacked large, staggered `60ms` on open. Close is faster (`snappy`).

## 9. Hero

```
[optional playful eyebrow: a small pill or an animated word]
[display-xl headline: friendly, benefit-led, 4–8 words]
[one line: lead weight, secondary colour, max 50 chars]
[one bright pill CTA + one text link]
[product visual: enters with a bouncy spring, sits on a soft blob backdrop]
```

**Rules:**

- **The headline has personality but says something.** "Get moving. Actually enjoy
  it." not "The #1 fitness platform for everyone".
- **The product visual enters with the `bouncy` spring, once, on load:** a small pop
  with overshoot. Never a slow fade; never a loop.
- **One soft blob or oversized rounded shape** behind the product, in the brand tint.
  Decoration only. No text or button inside it.
- **One primary CTA** (bright accent pill) + one text link. Not two filled buttons.

## 10. Feature sections and imagery

- **Each feature is one benefit with an entrance choreography:** headline arrives
  `smooth`, then supporting points stagger in `60ms` apart, then the visual settles
  `heavy`.
- **The interactive demo section is the payoff:** the one place the product is
  draggable, tappable, or has a working toggle with real spring feedback. Build one
  genuine interaction, not five fake ones.
- **Imagery is bright product photography or flat vector illustration** in the brand
  palette. If using illustration, keep one consistent style; never mix a 3D render, a
  flat vector, and an emoji on one page.
- **Never fabricate a UI screenshot in markup.** Use a real screenshot or a clean
  placeholder at the right aspect ratio.
- **Icons are a single consistent set** (one library, one stroke weight), animated
  only on hover/interaction, never idle-looping.

## 11. Anti-patterns: what makes a page fail this style

Each is something an agent does by default. Any one alone can break the style.

**Motion**
1. `transition-all duration-300 ease-in-out` on every element. This is the signature
   of a fake-playful page. No physics, no intent.
2. A forever-bouncing scroll-down arrow in the hero.
3. Every element using the same animation, so nothing is choreographed.
4. Looping/pulsing glows, spinning badges, or infinite marquees in the periphery.
5. Auto-advancing carousels that move without the user.
6. Parallax on five elements at once; a page that lurches as you scroll.
7. Scroll-linked rotation beyond `8°` or parallax beyond `±40px`.
8. Entrances that re-trigger every time a section scrolls back into view.
9. Count-up numbers that re-run on every scroll-back.
10. Springs with heavy bounce (`damping < 12`) on nav or modals, making UI feel loose.
11. Animating `width`/`height`/`margin`/`top`/`left` (layout thrash).
12. Body text that fades or slides in, delaying reading.
13. No `prefers-reduced-motion` handling at all.
14. A `2s+` entrance that gates content the user is waiting to read.

**Colour**
15. A rainbow of 3+ full-saturation hues on one screen.
16. Full-saturation accent used everywhere, so the CTA no longer stands out.
17. A violet→cyan→pink mesh-gradient background.
18. Gradient text on the headline via `bg-clip-text`.
19. Full-strength lime/cyan on a near-black dark-mode ground (it vibrates).

**Typography**
20. `font-extrabold` (800+) rounded headlines that read as heavy, not friendly.
21. Pairing the rounded sans with a novelty/script "fun" font.
22. Body copy in a rounded display weight, hurting readability.
23. Positive letter-spacing on display headlines.

**Shape**
24. Random one-off radii (`27px`, `19px`) instead of a scale.
25. A giant card at `12px` radius, or a tiny chip at `48px`. The radius is not
    proportional.
26. Text or a button placed inside an irregular blob so the edge crops it.
27. Mixing hard-rounded and squircle corners on the same page.

**Composition**
28. Five "interactive" sections so the product is a toy box.
29. Oversized rounded brand containers on every single section (loses the accent).
30. A bento grid crammed with animated tiles.
31. Cards everywhere with hover-lift. Cards belong only on pricing here.

**Content**
32. Marketing-speak headlines ("Supercharge your workflow", "The #1 platform for…").
33. Emoji sprinkled as decoration to fake "fun" instead of designing it.
34. A fake "10,000+ happy users" stat with a count-up and no evidence.

## 12. Responsive behaviour and mobile motion budget

- **Mobile keeps the personality but cuts the motion budget.** Scroll-linked parallax
  and tilt are disabled below `lg` (they compete with native scroll and cause jank).
  Keep entrance staggers and press feedback.
- **Reduce simultaneous animations on mobile:** never more than ~3 springing
  elements at once; batch entrances so the main thread stays free for scrolling.
- Type drops ~30%; oversized rounded containers shrink their radius one step so they
  do not dominate a narrow viewport.
- CTAs go `w-full` on mobile; keep the press-scale feedback (it feels great on touch).
- Touch targets `44×44px` minimum. Hover-only micro-interactions must have a
  tap/active equivalent.
- Test at 375, 768, 1024, 1440, 1920. Verify scroll stays at 60fps on a mid-range
  phone with all sections mounted.

## 13. Accessibility: vestibular safety and focus

- **`prefers-reduced-motion` is mandatory, not optional** (§7). Large-travel,
  parallax, rotation, scale-bounce, and auto-playing motion are the exact triggers
  for vestibular disorders. All must have a static path.
- **Focus must stay visible during and after motion.** A moving element that holds
  focus needs a persistent `2px` focus ring that moves with it; never remove focus
  outlines because they "clash" with the playful look.
- **Never convey meaning by motion alone.** If an element springs to signal "active",
  it also changes colour/shape so non-motion users get the state.
- **Announce dynamic changes** (a count-up finishing, a toggle) via appropriate ARIA
  live regions or state, not just the visual spring.
- **Contrast holds under bright colour:** verify the accent-on-background and text-on-
  brand pairings at 4.5:1 (3:1 for large text). Bright coral text on a coral tint
  often fails. Darken the text, not the brand.
- One `<h1>`; sections are `<section>` with `aria-labelledby`; interactive elements
  are real `<button>`/`<a>`, never a `motion.div` with an onClick.

## 14. Performance

- **Animate only compositor-friendly properties: `transform` and `opacity`.** These
  run on the GPU and do not trigger layout. Animating `width`, `height`, `top`,
  `left`, `margin`, or `box-shadow` causes layout/paint thrash and drops frames.
- **Add `will-change: transform` to scroll-linked and frequently-animated elements,
  and remove it once idle.** Leaving `will-change` on everything wastes GPU memory.
- **One shared `useScroll` per section**, not one per animated child; derive all
  transforms from the single progress value.
- **Budget:** 60fps on scroll on a mid-range device; no single entrance over `1.2s`;
  main-thread long tasks under `50ms`. Lazy-load below-fold sections and any heavy
  animation library with `next/dynamic`.
- **LCP stays fast:** the hero visual is preloaded with explicit dimensions; its
  entrance spring animates `opacity`/`transform` only, so it never shifts layout
  (CLS < 0.05).

## 15. Implementation notes

Tailwind v4 tokens:

```css
@theme {
  --font-sans: "Satoshi", "Nunito", system-ui, sans-serif;

  --color-bg:      #FFFDF9;
  --color-tint:    #FFF0EA;
  --color-brand:   #FF5A3C;
  --color-accent:  #C6F135;
  --color-ink:     #1B1A17;
  --color-ink-2:   #57534B;

  --radius-sm: 12px;
  --radius-md: 20px;
  --radius-lg: 32px;
  --radius-xl: 48px;
}
```

Staggered entrance block:

```tsx
<motion.section
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-15% 0px" }}
  className="mx-auto max-w-[1200px] px-6 py-24"
>
  <motion.h2 variants={item} className="text-[length:var(--text-display-l)] font-bold tracking-[-0.015em]">
    Get moving. Actually enjoy it.
  </motion.h2>
  <motion.p variants={item} className="mt-4 max-w-[50ch] text-[17px] text-ink-2">
    Short, friendly sessions that fit a real day.
  </motion.p>
  <motion.div variants={item}>
    <motion.a
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={spring.snappy}
      className="mt-8 inline-flex rounded-full bg-accent px-8 py-4 font-semibold text-ink"
    >
      Start free
    </motion.a>
  </motion.div>
</motion.section>
```

Scroll-linked hero shape (clamped, reduced-motion aware):

```tsx
const ref = useRef<HTMLDivElement>(null);
const reduce = useReducedMotion();
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const yRaw = useTransform(scrollYProgress, [0, 1], [40, -40]);
const y = reduce ? 0 : yRaw;

<motion.div ref={ref} style={{ y }} className="will-change-transform">
  {/* product visual on a soft blob */}
</motion.div>
```

## 16. Pairs well with React Bits Pro (optional)

You do **not** need React Bits Pro to use this skill. Build from scratch if the
project has no registry configured. If the `@reactbits-pro` and `@reactbits-starter`
registries *are* configured, these accelerate the build without fighting the style:

- `@reactbits-starter/staggered-text-tw`: headline stagger reveals (§6). Re-time to
  the `60ms` / `smooth`-spring values here.
- `@reactbits-starter/blur-highlight-tw`: hover micro-interactions on links/cards.
- `@reactbits-pro/hero-7`, `@reactbits-pro/features-4`: energetic section shells.
  Swap any tween easing for the spring configs in §6 and add reduced-motion guards.

Ignore this section if the registries are not configured. Never add a dependency on
them just to satisfy the style.

## 17. Self-verification loop

Re-read the rendered output and check every item. If any fails, fix it and run the
loop again. Do not report completion with known failures.

**Motion physics**
- [ ] Every element with personality uses a spring from §6, not `transition-all`.
- [ ] Entrances are choreographed with a `50–80ms` stagger, not simultaneous.
- [ ] Travel is `16–24px`; parallax is `±40px` max; scroll rotation is under `8°`.
- [ ] Buttons have hover-scale `1.02–1.06` and press-scale below `1.0`.
- [ ] Nothing loops in the periphery; no auto-advancing carousel; no bouncing arrow.
- [ ] Entrances and count-ups fire once and never re-trigger on scroll-back.

**Reduced motion**
- [ ] `useReducedMotion` guards every spring, parallax, tilt, and count-up.
- [ ] The reduced-motion page is fully designed, branded, and complete, not empty.
- [ ] Every scroll-linked effect renders a static mid-point value when reduced.

**Colour and shape**
- [ ] At most two saturated hues; 60/30/10 allocation holds; accent stays scarce.
- [ ] No rainbow, no mesh gradient, no gradient headline text.
- [ ] Radii come from the `12/20/32/48/pill` scale and are proportional to size.
- [ ] Blobs are decoration only; no text or button cropped inside one.

**Typography**
- [ ] One rounded geometric sans; headlines at `700`, not `800+`.
- [ ] Body is weight 400, `17px`, max `65ch`, and never animates in.

**Performance and a11y**
- [ ] Only `transform`/`opacity` animate; no `width`/`height`/`margin` animation.
- [ ] Scroll stays 60fps on mid-range mobile; parallax disabled below `lg`.
- [ ] Focus rings stay visible during motion; state never conveyed by motion alone.
- [ ] Contrast passes AA including bright-colour pairings; one `<h1>`; real buttons.

**Anti-patterns (§11)**
- [ ] Re-read all 34 anti-patterns against the page. Zero hits.
- [ ] Specifically: no `transition-all` everywhere, no bouncing arrow, no emoji-as-fun,
      no fake count-up stat with no evidence.

**Generic-AI smell test**
- [ ] Turn off all motion. Is the page still clearly designed and on-brand? It must be.
- [ ] Does any headline say "supercharge", "seamless", or "#1 platform"? Rewrite it.
- [ ] Does the motion help the reader understand or act, or is it decoration for its
      own sake? If decoration, cut it.

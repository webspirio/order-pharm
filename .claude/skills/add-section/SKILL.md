---
name: add-section
description: Add a section to a page, following the .astro/.tsx island boundary rules and adding its copy to every dictionary. Use when adding new content blocks.
---

# Add Section

## 1. Gather

Ask what the section shows, which page it belongs on, where in the order it
goes, and whether it needs **real interactivity** (state, event handlers,
browser APIs) or is purely presentational.

## 2. Decide static or island — this is the load-bearing decision

**Presentational → `.astro` only.** React components without a `client:*`
directive render to static HTML at build time. This is how `lucide-react` icons
are used in `.astro` sections while shipping zero JavaScript. Most sections need
nothing more.

**Interactive → one `.astro` section plus one `.tsx` island.** The island goes in
`src/components/islands/`, and the section renders it with `client:load`,
`client:idle` or `client:visible`. Prefer `client:visible` for anything below the
fold.

## 3. Rules that produce silently-broken components if ignored

1. **React context does not cross island boundaries.** Anything pairing a trigger
   with content — Dialog, DropdownMenu, Popover, Sheet, Tooltip — must live
   entirely inside **one** `.tsx` file. Splitting the trigger and the content
   into two islands renders fine and does nothing.
2. **Attribute names follow the element, not the file.** `class` on HTML elements
   in `.astro`; `className` on React components, including React components used
   inside `.astro`.
3. **Islands never import from `src/assets`.** Optimize images in the `.astro`
   section with `getImage()` and pass plain URLs plus width and height down. See
   `src/components/sections/Gallery.astro`.
4. **Astro 7's compiler is strict.** Close every non-void element and do not nest
   invalidly. `compressHTML` defaults to `'jsx'`, so a literal space between two
   adjacent inline elements needs `{" "}`.

## 4. Create the section

`src/components/sections/<Name>.astro`, taking `{ locale: Locale }`. Read all
copy from `t(locale)` — never hardcode user-visible strings. If the section needs
an in-page anchor, add its id to `anchors` in `src/config/site.ts` rather than
inlining a string.

Match the spacing and container conventions of the existing sections:
`border-b border-border/60`, `py-20 sm:py-24`, `mx-auto max-w-6xl px-4 sm:px-6`.

## 5. Add copy to EVERY dictionary

Add the section's keys to every file in `src/i18n/`. A missing key in any
non-default language is a compile error, by design.

## 6. Mount it

Import and place the section in the page component (e.g.
`src/components/HomePage.astro`) at the requested position.

## 7. Verify

```sh
pnpm check
pnpm build
```

If the section is interactive, run `pnpm dev` and confirm the behaviour in a
browser. A section that renders but does not respond is the exact failure mode
the island rules exist to prevent.

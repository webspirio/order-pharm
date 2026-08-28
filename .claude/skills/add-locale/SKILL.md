---
name: add-locale
description: Add a language — dictionary, locale config, route shims for every existing page, and hreflang/sitemap wiring. Use when adding a translation to the site.
---

# Add Locale

Adding a language touches five places. `pnpm check` catches the dictionary, but
nothing catches a missing route shim except a 404, so work through this in order.

## 1. Gather

Ask for the BCP-47 code (e.g. `uk`), the URL segment (e.g. `ua` — these
deliberately may differ), and the native language name as speakers write it
(e.g. `Українська`).

## 2. Update `src/config/locales.ts`

Add the code to `locales`, then add one entry to each of `localeSegment`,
`htmlLang`, and `localeName`. This single file feeds both the i18n hub and the
sitemap config, so nothing else needs editing for hreflang or the sitemap —
`astro.config.ts` derives its `i18n` option from it.

## 3. Create the dictionary

Copy the default-locale dictionary to `src/i18n/<code>.ts` and translate every
value. Keep the key structure **byte-identical** — the default dictionary is the
type source of truth (`Dictionary = typeof <default>`), so any missing or extra
key is a compile error.

Translate the meaning, not the words. Meta descriptions, FAQ answers, and CTA
labels all need to read naturally to a native speaker; these are the strings
search engines and AI answer engines quote.

If you cannot translate a value faithfully, copy the source text and list it
explicitly at the end as needing human review. Never drop a key.

## 4. Register it

In `src/i18n/index.ts`, import the new dictionary and add it to the
`dictionaries` record.

## 5. Create a route shim for every existing page

List `src/pages/` first. For **each** existing default-locale route, create
`src/pages/<segment>/<same path>.astro`:

```astro
---
import HomePage from "@/components/HomePage.astro";
---

<HomePage locale="<code>" />
```

Missing one shim means that page 404s in the new language while its hreflang tag
still advertises it — `verify-dist.mjs` catches exactly this.

## 6. Verify

```sh
pnpm check      # fails on any dictionary key drift
pnpm build
node scripts/verify-dist.mjs
```

`verify-dist` must report zero errors. It checks that every hreflang target was
actually built and that the sitemap lists every route.

Then confirm in a browser (`pnpm dev`) that the language switcher now appears in
the header — it hides itself when there is only one locale — and that switching
language from a subpage lands on the **equivalent** subpage, not the homepage.

## 7. Report

List every file created or modified, and every string you copied rather than
translated.

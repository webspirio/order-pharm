---
name: add-page
description: Add a new page — page component, a route shim per locale, dictionary keys in every language, and optional nav wiring. Use when adding any new route to the site.
---

# Add Page

In this architecture one new page means **one page component plus one route shim
per locale plus dictionary keys in every dictionary**. Doing part of that
produces a page that 404s in some languages or fails typecheck.

## 1. Gather

Ask for the path (default-locale form, with a trailing slash — e.g.
`/services/`), the page title, and whether it belongs in the header nav.

## 2. Read the current locale set

Read `src/config/locales.ts`. You need `locales`, `localeSegment`, and
`defaultLocale`. Do not assume there is only one language.

## 3. Create the page component

`src/components/<Name>Page.astro`, modelled on `src/components/LegalPage.astro`:
it takes `{ locale: Locale }`, composes `Layout` + `SeoHead` (in the `head` slot,
with `path` set to the default-locale path) + `Header` + `main` + `Footer`.

The `path` passed to `SeoHead` must be the **default-locale-root** path with a
trailing slash. It is what generates this page's hreflang alternates; getting it
wrong silently breaks language switching for the page.

## 4. Create one route shim per locale

For the default locale: `src/pages/<path>.astro`.
For every other locale: `src/pages/<segment>/<path>.astro`.

Each file is two lines:

```astro
---
import ThingPage from "@/components/ThingPage.astro";
---

<ThingPage locale="<locale code>" />
```

Never fork markup per locale. The only difference between shims is the `locale`
prop.

## 5. Add dictionary keys to EVERY dictionary

Add a `meta.<page>` entry (`title`, `description`) plus whatever content keys the
page needs — to **every** file in `src/i18n/`, not just the default one. The
default-locale dictionary is the type source of truth, so a missing key in any
other language is a compile error.

For languages you cannot translate, add the key with the default-locale text and
flag it for translation. Do not skip the key.

## 6. Wire the nav, if asked

Add the link to `navLinks` in `src/components/sections/Header.astro` using
`localizedPath(locale, "<path>")`, plus a `nav.<key>` label in every dictionary.

## 7. Verify

```sh
pnpm check
pnpm build
node scripts/verify-dist.mjs
```

Confirm the built output contains one directory per locale for the new route,
and that `verify-dist` reports no hreflang or link errors.

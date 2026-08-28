---
name: new-site
description: Configure a fresh copy of this template into a real project — business details, languages, brand colour, copy, icons, and deploy config. Use when starting a new site from the template.
disable-model-invocation: true
---

# New Site

Turn this template into a configured project. Interview first, then rewrite
everything in one pass, then prove it builds.

## 0. Check whether this is actually a fresh template

Read `src/config/site.ts`. If `domain` is **not** `https://example.com`, this
site is already configured. Say so, show the current `name` and `domain`, and ask
whether to reconfigure (a rebrand) before changing anything. Do not proceed
silently.

## 1. Interview

Ask **one question at a time** and wait for each answer. Offer a recommended
default with every question.

1. Business name (brand name, as shown in the header).
2. Legal entity name, if different.
3. Domain, including scheme — e.g. `https://acme.com`.
4. What the business does, in one or two sentences. Use this to pick the
   schema.org type: `Organization` is the safe fallback; prefer the most
   specific fit — `LocalBusiness`, `ProfessionalService`,
   `HomeAndConstructionBusiness`, `Restaurant`, `MedicalBusiness`, `Store`.
   State which you picked and why.
5. Languages. For each: BCP-47 code, URL segment (the first is served from the
   root, so its segment is `""`), and native name. Note that a locale code and
   its URL segment may differ — e.g. `uk` served from `/ua/`.
6. Contact channels: email, phone (display + `tel:` form), messenger deep link.
   Any of these may be skipped; sections hide themselves when the field is empty.
7. Physical address and opening hours, or explicitly none. Structured data omits
   whatever is left empty.
8. Brand colour, as a hue 0–360, or a hex value to convert. Default 250.
9. Font: keep the system stack (fast, no download) or install a variable font
   from `@fontsource-variable/*`.
10. Legal jurisdiction, so the imprint and privacy placeholders name the right
    obligations. You are not writing legal text — you are labelling what the
    owner must supply.

## 2. Rewrite

Apply every change before running anything.

- `src/config/site.ts` — all fields. Leave genuinely-absent ones empty; they are
  dropped from JSON-LD rather than emitted as nulls.
- `src/config/locales.ts` — `locales`, `localeSegment`, `htmlLang`, `localeName`,
  `defaultLocale`.
- `src/i18n/<default>.ts` — rename from `en.ts` if the default locale changed,
  and rewrite **every** string as real copy for this business. Not lorem, not
  "First service". Concrete, specific, in the site's voice. Keep the key
  structure identical.
- `src/i18n/index.ts` — update the dictionary import and the `dictionaries`
  record if the default locale changed.
- `test/i18n.test.ts` — the path-helper tests are parameterized off
  `defaultLocale`, so a locale rename alone needs no edits here. Only check it
  if you add new assertions with a literal locale code.
- For each additional language, create its dictionary by translating the default
  one. The type system will reject any missing key.
- `src/styles/global.css` — regenerate all seven brand values from the chosen
  hue, keeping lightness and chroma as-is and updating the hue comment.
  Recompute `--color-brand-foreground` so text stays readable on `brand-500`.
- `astro.config.ts` — `site`.
- `wrangler.jsonc` — `name` (lowercase, hyphenated).
- `package.json` — `name`.
- `public/robots.txt` — the `Sitemap:` URL.
- `public/site.webmanifest` — `name`, `short_name`, `description`, and both
  colours to match the theme.
- `public/llms.txt` — rewrite entirely from the real facts. It duplicates
  `site.ts` in prose, so it must agree with it.
- `README.md` — title and the one-line description.
- `CLAUDE.md` — the opening line naming the project.
- `src/i18n/*` legal sections — keep `TODO(owner)` markers, but make each heading
  name the specific obligation for the stated jurisdiction.
- `src/data/gallery.ts` — rename the three categories to the real ones and update
  the dictionary's `gallery.categories` to match.

Then regenerate the visual assets:

```sh
pnpm icons --hue <chosen hue>
```

If the user chose a web font, add the `@fontsource-variable/<name>` dependency,
add its `@import` to the top of `src/styles/global.css`, and set `--font-sans`.

## 3. Remove the template's own development artifacts

These describe how the **template** was built, name the source project its
patterns came from, and must not ship inside a client site:

```sh
rm -rf .superpowers
rm -f docs/superpowers/specs/*.md docs/superpowers/plans/*.md
```

The directories themselves stay, with their `.gitkeep`, for **this project's**
future specs and plans. Do this on every path — `degit` and `git clone` carry
`docs/superpowers/` because it is tracked, and a plain `rsync` without the right
excludes carries `.superpowers/` too.

## 4. Prove it

```sh
pnpm install
pnpm verify
```

`pnpm verify` must exit 0. Placeholders are now **hard errors** because the
domain is set — any that survive will be reported by path. Fix them and re-run.

Then initialise history:

```sh
git init -b main    # only if this copy has no .git
git add -A
git commit -m "chore: configure <name> from static-website-template"
```

## 5. Hand over the checklist

Print what only the owner can supply:

- [ ] Real photographs in `src/assets/gallery/`, registered in `src/data/gallery.ts`
- [ ] Real logo and favicons in `public/` (replace the generated geometric mark)
- [ ] Real `og-image.jpg` (1200×630)
- [ ] Imprint and privacy content for the stated jurisdiction — replace every
      `TODO(owner)` in the dictionaries
- [ ] Cloudflare Pages project created; **set `NODE_VERSION` to 24** in its
      environment variables, or the first build fails on Astro's Node floor
- [ ] DNS pointed at the Pages project

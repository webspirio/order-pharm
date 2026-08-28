/**
 * The only place languages are declared. Imported by both `src/i18n/index.ts`
 * and `astro.config.ts`, so the sitemap and the site can never disagree.
 *
 * This site ships English only — it serves a US audience. The machinery for
 * more languages is intact: add a code here plus one entry in each record
 * below, and `pnpm check` fails until a matching dictionary exists in
 * `src/i18n/`. The `/add-locale` skill does all of it, including the route
 * shims. With a single locale the header's language switcher hides itself and
 * `astro.config.ts` omits the sitemap's i18n map.
 *
 * Pure data only — no `astro:*` imports. `astro.config.ts` loads this file.
 */
export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/**
 * URL path segment per locale. The default locale serves from the root ("").
 * A locale code and its URL segment are deliberately allowed to differ — e.g.
 * Ukrainian would be `uk` for `hreflang` but conventionally serve from `/ua/`.
 */
export const localeSegment: Record<Locale, string> = { en: "" };

/** BCP-47 codes for `<html lang>` and `hreflang`. */
export const htmlLang: Record<Locale, string> = { en: "en" };

/** Native language names, shown in the language switcher. */
export const localeName: Record<Locale, string> = { en: "English" };

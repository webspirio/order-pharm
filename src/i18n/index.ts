import en from "./en";

export {
  locales,
  defaultLocale,
  localeSegment,
  htmlLang,
  localeName,
  type Locale,
} from "@/config/locales";

import { locales, localeSegment, type Locale } from "@/config/locales";
import { site } from "@/config/site";

/**
 * The default-locale dictionary is the type source of truth. `en.ts` is
 * deliberately not `as const`, so leaf values widen to `string` and every
 * other dictionary added later must replicate its full key structure — drift
 * becomes a compile error.
 */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en };

export function t(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Build a localized in-site path. `path` is always the default-locale-root
 * path, e.g. "/" or "/pricing/". Paths carry trailing slashes; a mismatch
 * silently breaks language switching, which is why this is unit-tested.
 *
 * THE DEPLOYMENT BASE IS PREPENDED HERE, and only here. This site is served
 * from a GitHub Pages project path (`site.basePath`), so every internal link
 * has to carry the repo name. Astro's own `base` rewrites the assets it
 * generates but not a hand-written href, so routing it through this one
 * function is what makes the rule "build every internal link with
 * localizedPath()" load-bearing rather than a style preference.
 */
export function localizedPath(locale: Locale, path = "/"): string {
  const clean = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const segment = localeSegment[locale];
  const localized = segment === "" ? clean : clean === "/" ? `/${segment}/` : `/${segment}${clean}`;
  return `${site.basePath}${localized}`;
}

/**
 * Inverse of `localizedPath`: recover the default-locale-root path from a live
 * URL pathname, e.g. "/ua/pricing/" -> "/pricing/". Lets Header, Footer and the
 * language switcher link to the equivalent page in any locale without every
 * page declaring its own path.
 */
export function unlocalizedPath(pathname: string): string {
  // Strip the deployment base first, so the locale-prefix match below sees the
  // same shape it would on a domain-root deployment. Without this the whole
  // function is off by one segment on a project site and `aria-current` never
  // matches, which is silent — the nav simply stops marking the current page.
  const base = site.basePath;
  if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
    pathname = pathname.slice(base.length) || "/";
  }

  const prefixes = locales
    .map((locale) => localeSegment[locale])
    .filter((segment) => segment !== "");

  // The `(/|$)` group is what stops "/engineering/" being read as the "en"
  // segment followed by "gineering".
  const match = prefixes.length
    ? pathname.match(new RegExp(`^/(${prefixes.join("|")})(/|$)`))
    : null;

  const stripped = match ? pathname.slice(match[1].length + 1) : pathname;
  if (stripped === "") return "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

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
 */
export function localizedPath(locale: Locale, path = "/"): string {
  const clean = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const segment = localeSegment[locale];
  if (segment === "") return clean;
  return clean === "/" ? `/${segment}/` : `/${segment}${clean}`;
}

/**
 * Inverse of `localizedPath`: recover the default-locale-root path from a live
 * URL pathname, e.g. "/ua/pricing/" -> "/pricing/". Lets Header, Footer and the
 * language switcher link to the equivalent page in any locale without every
 * page declaring its own path.
 */
export function unlocalizedPath(pathname: string): string {
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

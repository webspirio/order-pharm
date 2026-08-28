import { describe, expect, it, vi } from "vitest";

/**
 * The shipped template declares one locale, which serves from the root. Under
 * that config the prefixed-locale branches of localizedPath and
 * unlocalizedPath never run — `prefixes` is empty and the boundary regex is
 * never built. Mock a realistic three-locale setup so those branches, and the
 * locale-code-vs-URL-segment split, are exercised on every test run.
 */
vi.mock("@/config/locales", () => ({
  locales: ["en", "uk", "pl"],
  defaultLocale: "en",
  // Ukrainian is locale `uk` but serves from /ua/ — the code/segment split.
  localeSegment: { en: "", uk: "ua", pl: "pl" },
  htmlLang: { en: "en", uk: "uk", pl: "pl" },
  localeName: { en: "English", uk: "Українська", pl: "Polski" },
}));

/**
 * `vi.mock` replaces the module's runtime values but NOT its types — TypeScript
 * still sees the shipped `Locale = "en"`, so passing "uk" here would be a
 * compile error under `astro check` even though the call is correct at runtime.
 * Widen the signatures for this file, where the module is deliberately backed
 * by a different locale set than the one the project ships.
 */
const { localizedPath, unlocalizedPath } = (await import("@/i18n")) as {
  localizedPath: (locale: string, path?: string) => string;
  unlocalizedPath: (pathname: string) => string;
};

describe("localizedPath with multiple locales", () => {
  it("leaves default-locale paths at the root", () => {
    expect(localizedPath("en", "/imprint/")).toBe("/imprint/");
    expect(localizedPath("en", "/")).toBe("/");
  });

  it("prefixes by URL segment, not by locale code", () => {
    // The whole point of the split: locale "uk" serves from "/ua/".
    expect(localizedPath("uk", "/imprint/")).toBe("/ua/imprint/");
    expect(localizedPath("uk", "/")).toBe("/ua/");
  });

  it("prefixes a locale whose segment equals its code", () => {
    expect(localizedPath("pl", "/imprint/")).toBe("/pl/imprint/");
    expect(localizedPath("pl", "/")).toBe("/pl/");
  });
});

describe("unlocalizedPath with multiple locales", () => {
  it("strips a locale segment", () => {
    expect(unlocalizedPath("/ua/imprint/")).toBe("/imprint/");
    expect(unlocalizedPath("/pl/imprint/")).toBe("/imprint/");
  });

  it("maps a bare locale root back to the site root", () => {
    expect(unlocalizedPath("/ua/")).toBe("/");
  });

  it("handles a locale segment with no trailing slash", () => {
    // Exercises the `$` alternative of the (/|$) boundary group.
    expect(unlocalizedPath("/ua")).toBe("/");
  });

  it("does not strip a segment that merely starts with a locale segment", () => {
    // THE case the boundary group exists for: "pl" is a real prefix here, and
    // "plaza" starts with it. Without (/|$) this would return "/aza/".
    expect(unlocalizedPath("/plaza/")).toBe("/plaza/");
    expect(unlocalizedPath("/uater/")).toBe("/uater/");
  });

  it("leaves an unprefixed path alone", () => {
    expect(unlocalizedPath("/imprint/")).toBe("/imprint/");
  });
});

describe("round trip with multiple locales", () => {
  const locales = ["en", "uk", "pl"] as const;
  const paths = ["/", "/imprint/", "/privacy/", "/deeply/nested/page/"];

  it("unlocalizedPath undoes localizedPath for every locale and path", () => {
    for (const locale of locales) {
      for (const path of paths) {
        expect(unlocalizedPath(localizedPath(locale, path))).toBe(path);
      }
    }
  });

  it("gives every non-default locale a distinct prefix", () => {
    const seen = new Set<string>();
    for (const locale of locales) {
      const built = localizedPath(locale, "/imprint/");
      expect(seen.has(built)).toBe(false);
      seen.add(built);
    }
    expect(seen.size).toBe(3);
  });
});

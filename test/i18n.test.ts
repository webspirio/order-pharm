import { describe, expect, it } from "vitest";
import { localizedPath, unlocalizedPath, locales, localeSegment, defaultLocale } from "@/i18n";

// Parameterized off `defaultLocale` rather than hardcoding "en": /new-site can
// change the default locale, and a literal "en" here would fail `astro check`
// (the type narrows to whatever `Locale` becomes) and break `pnpm verify` on
// the very first ship gate a renamed site runs.
describe("localizedPath", () => {
  it("returns the root path unchanged for the default locale", () => {
    expect(localizedPath(defaultLocale, "/")).toBe("/");
  });

  it("returns a nested path unchanged for the default locale", () => {
    expect(localizedPath(defaultLocale, "/imprint/")).toBe("/imprint/");
  });

  it("defaults to the root path when no path is given", () => {
    expect(localizedPath(defaultLocale)).toBe("/");
  });

  it("adds a leading slash to a path that lacks one", () => {
    expect(localizedPath(defaultLocale, "imprint/")).toBe("/imprint/");
  });

  it("treats an empty path as the root", () => {
    expect(localizedPath(defaultLocale, "")).toBe("/");
  });
});

describe("unlocalizedPath", () => {
  it("returns the root path unchanged", () => {
    expect(unlocalizedPath("/")).toBe("/");
  });

  it("returns a default-locale path unchanged", () => {
    expect(unlocalizedPath("/imprint/")).toBe("/imprint/");
  });

  it("does not strip a segment that merely resembles a locale segment", () => {
    // "engineering" starts with "en" but is not a locale segment.
    expect(unlocalizedPath("/engineering/")).toBe("/engineering/");
  });

  it("maps an empty pathname to the root", () => {
    expect(unlocalizedPath("")).toBe("/");
  });
});

describe("round trip", () => {
  const paths = ["/", "/imprint/", "/privacy/", "/deeply/nested/page/"];

  it("unlocalizedPath undoes localizedPath for every locale and path", () => {
    for (const locale of locales) {
      for (const path of paths) {
        expect(unlocalizedPath(localizedPath(locale, path))).toBe(path);
      }
    }
  });

  it("produces a distinct prefix for every non-default locale", () => {
    for (const locale of locales) {
      const segment = localeSegment[locale];
      if (segment === "") continue;
      expect(localizedPath(locale, "/imprint/")).toBe(`/${segment}/imprint/`);
    }
  });
});

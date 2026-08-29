import { describe, expect, it } from "vitest";
import { localizedPath, unlocalizedPath, locales, localeSegment, defaultLocale } from "@/i18n";
import { site } from "@/config/site";

// Every expectation is written against `site.basePath` rather than a literal
// "/order-pharm", for the same reason the suite is parameterized off
// `defaultLocale`: the deployment can move to a custom domain (basePath "")
// and these tests must then assert the NEW truth, not fail on the old one.
// What they are really pinning is that the base is applied exactly once and
// that `unlocalizedPath` is its exact inverse.
const B = site.basePath;

// Parameterized off `defaultLocale` rather than hardcoding "en": /new-site can
// change the default locale, and a literal "en" here would fail `astro check`
// (the type narrows to whatever `Locale` becomes) and break `pnpm verify` on
// the very first ship gate a renamed site runs.
describe("localizedPath", () => {
  it("returns the root path unchanged for the default locale", () => {
    expect(localizedPath(defaultLocale, "/")).toBe(`${B}/`);
  });

  it("returns a nested path unchanged for the default locale", () => {
    expect(localizedPath(defaultLocale, "/imprint/")).toBe(`${B}/imprint/`);
  });

  it("defaults to the root path when no path is given", () => {
    expect(localizedPath(defaultLocale)).toBe(`${B}/`);
  });

  it("adds a leading slash to a path that lacks one", () => {
    expect(localizedPath(defaultLocale, "imprint/")).toBe(`${B}/imprint/`);
  });

  it("treats an empty path as the root", () => {
    expect(localizedPath(defaultLocale, "")).toBe(`${B}/`);
  });
});

describe("unlocalizedPath", () => {
  it("returns the root path unchanged", () => {
    expect(unlocalizedPath(`${B}/`)).toBe("/");
  });

  it("returns a default-locale path unchanged", () => {
    expect(unlocalizedPath(`${B}/imprint/`)).toBe("/imprint/");
  });

  it("does not strip a segment that merely resembles a locale segment", () => {
    // "engineering" starts with "en" but is not a locale segment.
    expect(unlocalizedPath(`${B}/engineering/`)).toBe("/engineering/");
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
      expect(localizedPath(locale, "/imprint/")).toBe(`${B}/${segment}/imprint/`);
    }
  });
});

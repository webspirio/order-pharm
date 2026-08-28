// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { locales, defaultLocale, localeSegment, htmlLang } from "./src/config/locales";
import { site } from "./src/config/site";

/**
 * Derive the sitemap's i18n map from the shared locale config so the two can
 * never drift. Keys are URL path segments; the root-served default locale uses
 * its own code as the key. With a single locale there are no alternates, so the
 * option is omitted entirely.
 */
const sitemapI18n =
  locales.length > 1
    ? {
        defaultLocale,
        locales: Object.fromEntries(
          locales.map((locale) => [
            localeSegment[locale] === "" ? locale : localeSegment[locale],
            htmlLang[locale],
          ]),
        ),
      }
    : undefined;

export default defineConfig({
  site: site.domain,
  output: "static",
  // Every internal path is built with a trailing slash by localizedPath();
  // enforcing it here makes the dev server agree with the built output.
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap({
      ...(sitemapI18n ? { i18n: sitemapI18n } : {}),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

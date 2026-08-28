---
name: preflight
description: Ship gate — run the full verification suite plus a browser pass (console errors, Lighthouse, screenshots) and report the evidence. Use before deploying or when asked whether the site is ready.
---

# Preflight

The gate before shipping. Report **actual output**, never a bare verdict.

## 1. Static gate

```sh
pnpm verify
```

This runs `astro check`, the unit tests, the build, and `verify-dist.mjs`. If it
exits non-zero, stop and fix. Do not continue to the browser pass with a failing
build — you would be auditing something you are not going to ship.

Quote the real output: error counts, test counts, page count from `verify-dist`.

## 2. Browser pass

Start the preview server:

```sh
pnpm preview
```

Then use the `chrome-devtools` MCP server against `http://localhost:4321/`:

1. **Console** — navigate to every route, list console messages. Any error or
   warning is a finding. Hydration warnings usually mean an island is being
   given props it cannot serialize.
2. **Lighthouse** — run an audit for performance, accessibility, SEO and best
   practices. Report all four scores as numbers. For a static site with almost
   no JavaScript, anything below ~95 is worth explaining.
3. **Screenshots** — capture the home page at mobile (375px) and desktop
   (1440px) widths, plus each additional route. Look at them. Check for
   overflow, overlapping text, and unreadable contrast.
4. **Theme** — toggle dark mode and re-screenshot the home page. Both themes are
   first-class; check contrast in each.

If the `chrome-devtools` server is unavailable, **say so explicitly and report
the browser pass as SKIPPED**. Do not describe the static gate as a full
preflight — a skipped check is not a passed check.

Stop the preview server when finished.

## 3. Content check

- Every `TODO(owner)` marker resolved (`verify-dist` fails on these once the
  domain is configured).
- `public/llms.txt` agrees with `src/config/site.ts` — it duplicates those facts
  in prose and drifts silently.
- `public/robots.txt` `Sitemap:` URL matches the real domain.
- The OG image is real, not the generated placeholder.

## 4. Report

Produce a short table: check, result, evidence. Then a plain statement of whether
the site is ready to ship, and if not, exactly what blocks it.

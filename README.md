# Rechtsanwältin Olga Gatlin

Website for Olga Gatlin's solo legal practice in Munich (Steuerrecht,
Migrationsrecht, Arbeitsrecht, Zivilrecht). Astro 7, React 19 islands,
Tailwind v4, shadcn/ui, deployed to Cloudflare Workers; contact form backed by a
sidecar Cloudflare Worker (see `worker/`). Built from `static-website-template`.

## Start a new project

```sh
# from GitHub
npx degit <you>/static-website-template my-site && cd my-site

# or locally
rsync -a --exclude='.git' --exclude='node_modules' --exclude='dist' \
      --exclude='.astro' --exclude='.superpowers' --exclude='docs/superpowers' \
      --exclude='.envrc' --exclude='.env' --exclude='.env.local' --exclude='.wrangler' \
      path/to/static-website-template/ my-site/ && cd my-site
```

The `.superpowers` and `docs/superpowers` excludes matter: `docs/superpowers/`
holds the design spec and build plan for the **template itself**, and
`.superpowers/` is agent scratch. Neither is content your site should carry —
they name the project this template's patterns were extracted from. `/new-site`
clears them on the `degit` path too, where git tracking means they come along
regardless. The last four excludes keep local secrets and Wrangler state out
of the copy: `.envrc`, `.env` and `.env.local` may hold a real
`REACTBITS_LICENSE_KEY` or other local credentials, and `.wrangler/` holds
local Cloudflare state — none of it belongs in a new project. `.env.example`
and `.envrc.example` are deliberately *not* excluded — they're the templates
those files are copied from, and CLAUDE.md tells readers to consult them.

Then, in Claude Code:

```
/new-site
```

It interviews you, rewrites every config and every string, regenerates the icon
set from your brand colour, runs the full verification gate, and initialises git.

Prefer to do it by hand? Everything `/new-site` touches is listed at the bottom
of `CLAUDE.md`.

## Stack

- **Astro 7** — `output: 'static'`. No adapter; pure prerendered HTML/CSS/JS.
- **React 19** — interactive islands only, in `src/components/islands/*.tsx`.
- **Tailwind CSS v4** — via `@tailwindcss/vite` and `@theme` in
  `src/styles/global.css`. No `tailwind.config.*`.
- **shadcn/ui** — `radix-nova` style, components in `src/components/ui`.
- **TypeScript** — strict, with `@/*` → `./src/*`.
- **pnpm** — `pnpm-workspace.yaml` allowlists native builds (`esbuild`, `sharp`).

## What you get

- Ten genericized sections (header, hero, services, gallery, texture band, why,
  about, FAQ, contact, footer) assembled into a working home page plus imprint
  and privacy pages, with four hydrated React islands (language switcher,
  theme toggle, mobile menu, gallery filter) — plus one more React component
  used purely for its static SVG output, shipping zero JS by design.
- Multi-language routing that scales from one language to many, driven by a
  single config file, with hreflang and sitemap derived from it.
- SEO: canonical, full hreflang set with `x-default`, OG/Twitter, and schema.org
  JSON-LD that omits fields your business doesn't have.
- AI-crawler surface: `robots.txt` with explicit answer-engine allows,
  `llms.txt`, and an RFC 8288 `Link` header.
- A real ship gate: typecheck, unit tests, build, and assertions on the built
  output.

## Commands

| Command | Action |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server at `http://localhost:4321` |
| `pnpm build` | Build to `./dist/` |
| `pnpm preview` | Preview the built site |
| `pnpm check` | Typecheck (catches translation key drift) |
| `pnpm test` | Unit tests for the i18n path helpers |
| `pnpm verify` | check + test + build + built-output assertions |
| `pnpm icons [--hue N]` | Regenerate favicons, PWA icons, OG image |
| `pnpm placeholders [n]` | Regenerate placeholder gallery images |

## Claude Code skills

Five skills are specific to this template:

| Skill | What it does |
| --- | --- |
| `/new-site` | Configure a fresh copy into a real project |
| `/add-page` | Page component + a route shim per locale + dictionary keys |
| `/add-section` | New section, respecting the island boundary rules |
| `/add-locale` | New language: dictionary, config, shims, hreflang |
| `/preflight` | Ship gate: full verify + Lighthouse, console, screenshots |

Three more ship vendored from elsewhere, not specific to this template:
`/grilling` (aliased as `/grill-me`) interviews you about a plan before you
build it, and `shadcn` is invoked automatically whenever a task touches
shadcn/ui components.

Three MCP servers are wired in `.mcp.json`: `shadcn` (registry components),
`chrome-devtools` (Lighthouse, screenshots, console), and `astro-docs`.

## Project structure

```
public/              served as-is: icons, robots.txt, llms.txt, _headers
scripts/             icon + placeholder generators, dist verifier
src/
  assets/gallery/    images registered in src/data/gallery.ts
  components/
    islands/         React islands (.tsx) — the only place client JS lives
    sections/        page sections (.astro)
    ui/              shadcn primitives
    *Page.astro      page components — the real structure
    SeoHead.astro    canonical, hreflang + x-default, OG/Twitter, JSON-LD
  config/
    locales.ts       languages — single source, also read by astro.config.ts
    site.ts          business data, schema.org type, anchor ids
  data/              typed content registries, e.g. gallery.ts
  i18n/              dictionaries; the default one is the type source of truth
  layouts/           HTML shell
  lib/               small shared helpers (shadcn's cn())
  pages/             route shims (two lines each)
  styles/global.css  Tailwind entry, brand ramp, shadcn tokens
test/                unit tests
```

## Adding a contact form

The template ships **no** form endpoint on purpose — the site is fully static,
with no server and no third-party dependency. Contact is phone, mail and
messenger links. If a project genuinely needs a form, the usual options are:

1. **Formspree / Web3Forms** — point a plain `<form action>` at their endpoint.
   No build changes; adds a third-party dependency and a privacy-policy entry.
2. **Cloudflare Worker** — a second Worker beside this site's, called with
   `fetch` from an island. Keeps everything on one platform.
3. **Astro Actions with an adapter** — the most integrated, but it ends the
   "pure static" property and changes the deploy model.

Whichever you pick, update the privacy policy — you are now processing personal
data.

## Deploy to Cloudflare Workers

Pick **one** — running both causes double builds on every push.

### Option A — Cloudflare Git integration (recommended)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** →
   **Connect to Git**, and pick this repository.
2. Build settings: build command `pnpm run build`, deploy command
   `npx wrangler deploy`, root directory `/`.
3. **Save and Deploy**.

Node needs no configuration — the build image defaults to Node 24.18.0 and
honors this repository's `.nvmrc`. `wrangler.jsonc` supplies the rest: the
Worker name (currently `swt`, serving at `swt.<account-subdomain>.workers.dev`
until the real domain is live — see `CLAUDE.md`'s domain/email test-config
note) and `assets.directory` pointing at `dist/`.

Push to `main` deploys production. Leave `deploy.yml.disabled` alone (or
delete it).

### Option B — GitHub Actions (Cloudflare Pages)

Use this if you need build steps Cloudflare's container can't run, or want CI
gates before deploy. Note this path targets **Pages**, not Workers:
`deploy.yml.disabled` still uses `wrangler pages deploy`, and `wrangler.jsonc`
is Workers-shaped, so Pages ignores it and the output directory is passed on
the command line instead.

**Create the Pages project as a Direct Upload project, not Git-connected.**
Otherwise both Cloudflare and the Action deploy on every push.

1. Rename `.github/workflows/deploy.yml.disabled` → `deploy.yml`.
2. Edit `--project-name=CHANGE-ME` to your Pages project name.
3. Add repository secrets `CLOUDFLARE_API_TOKEN` (Account · Cloudflare Pages ·
   Edit) and `CLOUDFLARE_ACCOUNT_ID`.

## Before launch

- [ ] Real photographs in `src/assets/gallery/`, registered in `src/data/gallery.ts`
- [ ] Real logo and favicons in `public/`
- [ ] Real `og-image.jpg` (1200×630)
- [ ] Imprint and privacy content — replace every `TODO(owner)` in `src/i18n/`
- [ ] `public/llms.txt` matches `src/config/site.ts`
- [ ] `/preflight` passes

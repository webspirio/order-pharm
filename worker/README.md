# gatlin (contact-form Worker)

Sidecar Cloudflare Worker for the `/kontakt/` contact form on the main site.
Deployed independently from the static site — see the main repo's `CLAUDE.md`
for why (the Workers Email API only works from a real Worker, not from Pages
Functions or an Astro adapter, and the site is deliberately kept fully static).

## What it does

Receives a POST from `ContactForm.tsx`, verifies the Cloudflare Turnstile
token, and sends the message by email via the
[Workers Email API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/)
(`send_email` binding), with `Reply-To` set to the visitor's own address so
replying in the inbox reaches them directly.

## One-time setup

```sh
cd worker
pnpm install          # or npm install
wrangler login         # once per machine
wrangler secret put TURNSTILE_SECRET_KEY
```

For `TURNSTILE_SECRET_KEY` before the real Turnstile widget exists, Cloudflare
publishes a permanent test key that always passes verification:
`1x0000000000000000000000000000000AA`. Swap it for the real secret key from
the Cloudflare dashboard once Turnstile is set up for the real domain.

## Deploy

```sh
pnpm run deploy   # wrangler deploy — publishes to the workers.dev subdomain
```

## Still placeholder — fill in once the domain is chosen

In `wrangler.toml`:
- `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` — `CONTACT_FROM_EMAIL` must be on a
  domain verified for sending in Cloudflare Email Routing, or every send fails
  with `E_SENDER_NOT_VERIFIED`.
- `ALLOWED_ORIGIN` — must exactly equal the site's real origin (no trailing
  slash). A mismatch silently breaks the form: the browser blocks the response
  with no server-side error to point at.

And in the main site's `.env`:
- `PUBLIC_CONTACT_WORKER_URL` — this Worker's deployed URL.
- `PUBLIC_TURNSTILE_SITE_KEY` — the Turnstile site key matching the real
  domain (site keys are registered per-hostname in the dashboard).

## Local dev

Deliberately not set up — the site's dev server always points at the deployed
`workers.dev` Worker (see `.env.example`), since this form is tested
episodically rather than iterated on constantly. Run `wrangler dev` manually
here if that ever changes.

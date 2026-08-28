/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** URL of the deployed sidecar Cloudflare Worker; see worker/README.md. */
  readonly PUBLIC_CONTACT_WORKER_URL: string;
  /** Cloudflare Turnstile site key, registered per-hostname in the dashboard. */
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Shared between CookieConsent.tsx (writes the choice) and ContactForm.tsx
 * (reads it to decide whether Turnstile may load) — two independent islands,
 * so this constant is what keeps them from drifting apart on the key/event
 * name instead of each hardcoding its own copy.
 */
export const COOKIE_CONSENT_KEY = "cookie-consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-changed";

export type CookieConsentChoice = "accepted" | "declined";

export function getCookieConsent(): CookieConsentChoice | null {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function setCookieConsent(choice: CookieConsentChoice) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  } catch {
    /* localStorage unavailable — the choice just will not persist. */
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: choice }));
}

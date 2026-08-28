import { useEffect, useState } from "react";
import { getCookieConsent, setCookieConsent } from "@/lib/cookieConsent";

interface Props {
  message: string;
  accept: string;
  decline: string;
}

/**
 * Gates the Turnstile script on /kontakt/ (ContactForm.tsx reads the same
 * localStorage key via getCookieConsent()). Deliberately minimal — no
 * granular category toggles, just accept/decline for the one technical
 * cookie this site sets.
 */
export default function CookieConsent({ message, accept, decline }: Props) {
  const [visible, setVisible] = useState(false);

  // No stored choice yet -> show the banner. Runs after mount so SSR/hydration
  // never disagrees with localStorage.
  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  function choose(choice: "accepted" | "declined") {
    setCookieConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="max-w-prose text-sm text-muted-foreground">{message}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-accent"
          >
            {decline}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            {accept}
          </button>
        </div>
      </div>
    </div>
  );
}

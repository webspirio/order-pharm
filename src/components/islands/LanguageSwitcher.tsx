import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

export interface LanguageOption {
  code: string;
  name: string;
  href: string;
}

export default function LanguageSwitcher({
  current,
  currentLabel,
  options,
  label = "Language",
}: {
  current: string;
  /**
   * Shown on the trigger itself (e.g. "UA" for Ukrainian) — distinct from
   * `current` (the BCP-47 code used to match the active option below)
   * because Ukrainian's BCP-47 code is "uk" but the site's own convention
   * (matching its /ua/ URL segment) displays it as "UA".
   */
  currentLabel: string;
  options: LanguageOption[];
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // A switcher with one language is just noise.
  if (options.length < 2) return null;

  return (
    <div className="relative" ref={root}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-2 text-xs font-bold uppercase text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
      >
        {currentLabel}
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={label}
          className="absolute right-0 z-50 mt-2 min-w-40 overflow-hidden rounded-md border border-border bg-popover p-1 shadow-lg"
        >
          {options.map((option) => (
            <li key={option.code} role="none">
              <a
                role="menuitem"
                href={option.href}
                hrefLang={option.code}
                className="flex items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-accent"
              >
                {option.name}
                {option.code === current && <Check className="size-4" />}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

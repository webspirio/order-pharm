import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

export type PaletteKey = "original" | "indigo" | "clay";

const PALETTE_KEYS: PaletteKey[] = ["original", "indigo", "clay"];

// Swatch colours are hardcoded on purpose — each dot has to show what THAT
// palette looks like, so it cannot read the live tokens (which are the
// *current* palette for every dot). Each is split in half: the structural
// brand on the left, the signal on the right, because the rebuilt system is a
// two-hue system and a single dot would hide the half that changes most.
const SWATCH: Record<PaletteKey, { brand: string; signal: string }> = {
  original: { brand: "#245f6c", signal: "#e8a33d" },
  indigo: { brand: "#3c4491", signal: "#ec7f62" },
  clay: { brand: "#8a4a32", signal: "#9fb469" },
};

const swatchStyle = (key: PaletteKey) => ({
  backgroundImage: `linear-gradient(105deg, ${SWATCH[key].brand} 0 50%, ${SWATCH[key].signal} 50% 100%)`,
});

/**
 * Writes the same `palette` localStorage key (and `data-palette` attribute
 * on <html>) that the inline no-flash script in Layout.astro reads. Change
 * one, change the other. Mirrors ThemeToggle.tsx's persistence approach and
 * LanguageSwitcher.tsx's dropdown-menu structure — three choices don't fit
 * a single on/off toggle.
 */
export default function PaletteSwitcher({
  label,
  options,
}: {
  label: string;
  options: Record<PaletteKey, string>;
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<PaletteKey>("original");
  const root = useRef<HTMLDivElement>(null);

  // The server render has no DOM, so read the real state after mount.
  useEffect(() => {
    const attr = document.documentElement.dataset.palette;
    if (attr && (PALETTE_KEYS as string[]).includes(attr)) setCurrent(attr as PaletteKey);
  }, []);

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

  function choose(key: PaletteKey) {
    setCurrent(key);
    setOpen(false);
    // "original" has no [data-palette] CSS selector to match — removing the
    // attribute (rather than writing "original") is what actually falls
    // back to it, same as the no-flash script's own default-means-absent
    // convention.
    if (key === "original") delete document.documentElement.dataset.palette;
    else document.documentElement.dataset.palette = key;
    try {
      localStorage.setItem("palette", key);
    } catch (_) {
      /* localStorage unavailable — the choice just will not persist. */
    }
  }

  return (
    <div className="relative" ref={root}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        title={label}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
      >
        <span
          aria-hidden="true"
          className="size-4 rounded-full border border-black/10"
          style={swatchStyle(current)}
        />
      </button>

      {open && (
        <ul
          role="menu"
          aria-label={label}
          className="absolute right-0 z-50 mt-2 min-w-40 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
        >
          {PALETTE_KEYS.map((key) => (
            <li key={key} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={key === current}
                onClick={() => choose(key)}
                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-muted"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="size-3.5 shrink-0 rounded-full border border-black/10"
                    style={swatchStyle(key)}
                  />
                  {options[key]}
                </span>
                {key === current && <Check className="size-4 shrink-0" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

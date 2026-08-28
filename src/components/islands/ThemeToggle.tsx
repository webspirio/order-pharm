import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Writes the same `theme` localStorage key that the inline no-flash script in
 * Layout.astro reads. Change one, change the other.
 */
export default function ThemeToggle({ label = "Toggle theme" }: { label?: string }) {
  const [dark, setDark] = useState(false);

  // The server render has no DOM, so read the real state after mount.
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (_) {
      /* localStorage unavailable — the choice just will not persist. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

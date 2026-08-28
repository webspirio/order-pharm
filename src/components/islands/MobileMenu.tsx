import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

/** Elements the Tab-trap cycles through. Excludes the tabIndex={-1} backdrop button. */
const FOCUSABLE_SELECTOR = 'a[href], button:not([tabindex="-1"])';

export interface MenuLink {
  label: string;
  href: string;
}

export default function MobileMenu({
  links,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  menuLabel,
  navLabel,
  sheetLabel,
  closeLabel,
}: {
  links: MenuLink[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Names the trigger button. */
  menuLabel: string;
  /** Names the <nav> inside the sheet. */
  navLabel: string;
  /** Names the dialog itself — without it the sheet announced as "Primary",
      the name of the nav it contains. */
  sheetLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  // Trigger and close-button refs drive focus management: move focus into
  // the sheet on open, and back to whatever opened it on close.
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Everything that only matters while the sheet is open: lock body scroll,
  // move focus in, trap Tab inside the panel, close on Escape, and close if
  // the viewport crosses into the desktop breakpoint (the trigger is
  // `md:hidden`, so past 768px the sheet would otherwise be stuck open with
  // no visible control — an iPhone-Pro-Max-in-landscape-width problem). The
  // effect body only runs when `open` is true, so its cleanup — which runs
  // the instant `open` flips back to false — doubles as "on close" logic,
  // including restoring focus to the trigger. That also means this never
  // fires on first mount (open starts false), so it never steals focus.
  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // Wrap Tab at the panel's edges so focus can never walk out into the
      // page behind the overlay — this is the only modal in the template.
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const desktop = window.matchMedia("(min-width: 768px)");
    function onBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={menuLabel}
        aria-expanded={open}
        className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground/80 transition-colors hover:bg-accent hover:text-foreground md:hidden"
      >
        <Menu className="size-4" />
      </button>

      {/*
        Portalled to document.body on purpose. This island renders inside
        `<header class="... backdrop-blur ...">`, and `backdrop-filter`
        establishes a containing block for `position: fixed` descendants — so
        `fixed inset-0` would resolve against the 64px header box instead of the
        viewport, clipping the overlay to a sliver. A portal escapes that while
        keeping the trigger and the sheet in ONE component, so React context is
        preserved (splitting them into two islands would break it).
        `open` is false during SSR, so createPortal never runs on the server.
      */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] md:hidden">
            <button
              type="button"
              aria-label={closeLabel}
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
            />
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={sheetLabel}
              className="absolute inset-y-0 right-0 flex w-4/5 max-w-sm flex-col gap-6 border-l border-border bg-background p-6 shadow-2xl"
            >
              <div className="flex justify-end">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={closeLabel}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground/80 transition-colors hover:bg-accent"
                >
                  <X className="size-4" />
                </button>
              </div>

              <nav aria-label={navLabel} className="flex flex-col gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-lg font-medium transition-colors hover:bg-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                {primaryHref && primaryLabel && (
                  <a
                    href={primaryHref}
                    className="btn-solid justify-center"
                  >
                    {primaryLabel}
                  </a>
                )}
                {secondaryHref && secondaryLabel && (
                  <a
                    href={secondaryHref}
                    className="btn-outline justify-center"
                  >
                    {secondaryLabel}
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

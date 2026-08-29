import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling, ported from the reference template.
 *
 * Three deliberate constraints, because scroll hijacking is the fastest way
 * to make a site feel worse rather than better:
 *
 * 1. It never runs for a reader who has asked for reduced motion. That is
 *    checked once at mount AND subscribed to, so toggling the OS setting
 *    tears the instance down rather than requiring a reload.
 * 2. It never runs on coarse pointers. Touch scrolling already has momentum
 *    from the platform, and a second momentum model layered on top is what
 *    makes smooth-scroll libraries feel laggy on phones.
 * 3. It is mounted `client:idle`, so it is never in the critical path.
 *
 * `html.lenis` gets `scroll-behavior: auto` in global.css: with Lenis running,
 * the CSS smooth-scroll and Lenis's own anchor handling fight each other and
 * the page lands short of the target.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");

    let lenis: Lenis | null = null;
    let frame = 0;

    function start() {
      if (lenis || reduced.matches || coarse.matches) return;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    function stop() {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    }

    /**
     * Anchor links go through Lenis so they land at the same place the CSS
     * `scroll-margin-top` would have put them. The offset clears the floating
     * header (72px) plus the frame rail plus a little air.
     */
    function onClick(event: MouseEvent) {
      if (!lenis) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only same-document fragments. A link to /pricing/#membership from
      // another page must navigate, not scroll.
      const url = new URL(href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash || url.hash === "#") return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -120 });
      // Keep the URL and the focus ring honest: a fragment link should still
      // move keyboard focus, or the next Tab starts from the top of the page.
      window.history.pushState(null, "", url.hash);
      (target as HTMLElement).setAttribute("tabindex", "-1");
      (target as HTMLElement).focus({ preventScroll: true });
    }

    function onPreferenceChange() {
      if (reduced.matches || coarse.matches) stop();
      else start();
    }

    start();
    document.addEventListener("click", onClick);
    reduced.addEventListener("change", onPreferenceChange);
    coarse.addEventListener("change", onPreferenceChange);

    return () => {
      document.removeEventListener("click", onClick);
      reduced.removeEventListener("change", onPreferenceChange);
      coarse.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, []);

  return null;
}

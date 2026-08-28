/**
 * Decorative hero backdrop. Purely presentational and aria-hidden.
 *
 * Seam: to swap in an animated background (e.g. a React Bits Pro component),
 * replace the returned SVG here and give the island a `client:visible`
 * directive in Hero.astro. Nothing else needs to change.
 */
export default function HeroMotif() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="absolute right-[-10%] top-[-20%] h-[140%] w-[70%] opacity-[0.18]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="200" cy="200" r="160" stroke="var(--color-brand-500)" strokeWidth="1" />
        <circle cx="200" cy="200" r="120" stroke="var(--color-brand-500)" strokeWidth="1" />
        <circle cx="200" cy="200" r="80" stroke="var(--color-brand-500)" strokeWidth="1" />
        <circle cx="200" cy="200" r="40" stroke="var(--color-brand-500)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/**
 * LOCALLY EDITED shadcn primitive. Re-running `shadcn add input` reverts the
 * two edits below, and both are contract, not taste — see docs/DESIGN-SYSTEM.md.
 *
 * 1. RADIUS. Two families and no third: `rounded-lg` (12px, `--radius`) for
 *    controls, `rounded-2xl` (24px, `--radius-card`) for surfaces. The registry
 *    ships four more — `rounded-md`, `rounded-xl`, `rounded-4xl` and a
 *    `min(var(--radius-md), 10px)` ladder — which is what made the intake read
 *    as a different site from the page around it.
 * 2. FOCUS. The registry pattern is `outline-none` plus a soft `ring-ring/50`
 *    halo. It is removed here so the site's single focus rule applies:
 *    `:focus-visible { outline: 2px solid var(--focus) }` in global.css, which
 *    is INK and flips to the signal colour on `.on-slab` / `.on-plate`. A ring
 *    token cannot follow that flip, and a 50%-opacity halo does not clear the
 *    3:1 that WCAG 2.4.11 asks of a focus indicator. `aria-invalid` keeps its
 *    destructive border and halo, which is what keeps an invalid control
 *    visually distinct from a focused one now that focus is not a ring.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

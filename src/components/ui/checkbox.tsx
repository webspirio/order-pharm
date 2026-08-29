"use client"

/**
 * LOCALLY EDITED shadcn primitive. Re-running `shadcn add checkbox` reverts the
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
 *
 * The 4px box is deliberate and is NOT a third radius family: at 12px an 18px
 * square renders as a circle, and a checkbox that looks like a radio is a lost
 * affordance. Treat it as the indicator geometry the radio's dot also uses.
 */
import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-sm border border-input transition-colors group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

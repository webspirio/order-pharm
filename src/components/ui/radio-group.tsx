/**
 * LOCALLY EDITED shadcn primitive. Re-running `shadcn add radio-group` reverts the
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
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

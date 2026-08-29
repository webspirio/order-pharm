"use client"

/**
 * LOCALLY EDITED shadcn primitive. Re-running `shadcn add toggle` reverts the
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
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted",
      },
      size: {
        default:
          "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-7 min-w-7 rounded-lg px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

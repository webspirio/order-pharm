"use client";

import React, { useRef, useState, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";
import { cn } from "@/lib/utils";

export interface HighlightBit {
  /** Text to highlight */
  text: string;
  /** Which occurrence to highlight (1-based index, or undefined for all) */
  occurrence?: number;
}

export interface BlurHighlightProps {
  /** Text content to display */
  children?: React.ReactNode;

  /**
   * LOCAL EDIT (Ellery). Plain-text content, taking precedence over
   * `children`.
   *
   * The upstream component only reads `children` and only understands a
   * string or a one-level-deep element. Astro serialises an island's children
   * as `<astro-slot>` markup, so the text extraction returns "" and the
   * paragraph renders empty and zero-height — which is silent, because
   * nothing throws. Passing the sentence as a prop is the fix, and it is also
   * the honest shape: this component highlights substrings of a string.
   */
  text?: string;

  /** Array of text strings or objects to highlight */
  highlightedBits?: (string | HighlightBit)[];

  /** Color for highlighted text */
  highlightColor?: string;

  /** Additional class name for highlighted text */
  highlightClassName?: string;

  /** Initial blur amount in pixels */
  blurAmount?: number;

  /** Opacity when not in view */
  inactiveOpacity?: number;

  /** Blur animation delay in seconds */
  blurDelay?: number;

  /** Blur animation duration in seconds */
  blurDuration?: number;

  /** Highlight animation delay in seconds */
  highlightDelay?: number;

  /** Highlight animation duration in seconds */
  highlightDuration?: number;

  /** Direction of highlight animation */
  highlightDirection?: "left" | "right" | "top" | "bottom";

  /** Viewport intersection options */
  viewportOptions?: {
    once?: boolean;
    amount?: number;
  };

  /** Additional class name */
  className?: string;
}

export interface BlurHighlightRef {
  /** Manually trigger animation */
  trigger: () => void;
  /** Reset to initial state */
  reset: () => void;
}

export const BlurHighlight = React.forwardRef<
  BlurHighlightRef,
  BlurHighlightProps
>(
  (
    {
      children,
      text,
      highlightedBits = [],
      highlightColor = "hsl(80, 100%, 50%)",
      highlightClassName,
      blurAmount = 8,
      inactiveOpacity = 0.3,
      blurDelay = 0,
      blurDuration = 0.8,
      highlightDelay = 0.4,
      highlightDuration = 1,
      highlightDirection = "left",
      viewportOptions = {
        once: false,
        amount: 0.5,
      },
      className,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const [manualTrigger, setManualTrigger] = useState(false);
    const inViewport = useInView(containerRef, {
      ...viewportOptions,
      margin: "-20%",
    });

    /**
     * LOCAL EDIT (Ellery). The component as shipped animates regardless of
     * `prefers-reduced-motion`: the site-wide CSS clamp in global.css only
     * shortens CSS transitions and does nothing to a JS-driven animation. A
     * word-by-word blur-up over a whole paragraph is exactly the kind of
     * motion that setting exists to switch off, so when it is set the text
     * renders finished and the highlight is painted rather than swept.
     */
    const reduced = useReducedMotion();
    const isActive = reduced || manualTrigger || inViewport;

    React.useImperativeHandle(ref, () => ({
      trigger: () => setManualTrigger(true),
      reset: () => setManualTrigger(false),
    }));

    const processedContent = useMemo(() => {
      const textContent =
        typeof text === "string"
          ? text
          : typeof children === "string"
          ? children
          : React.Children.toArray(children)
              .map((child) => {
                if (typeof child === "string") return child;
                if (React.isValidElement(child)) {
                  const props = child.props as { children?: unknown };
                  if (props.children) {
                    return typeof props.children === "string"
                      ? props.children
                      : "";
                  }
                }
                return "";
              })
              .join(" ");

      if (!textContent || highlightedBits.length === 0) {
        return { parts: [{ text: textContent, highlight: false }] };
      }

      const normalizedBits = highlightedBits.map((bit) => {
        if (typeof bit === "string") {
          return { text: bit, occurrence: undefined };
        }
        return bit;
      });

      const matches: Array<{
        start: number;
        end: number;
        text: string;
        occurrence: number;
      }> = [];

      normalizedBits.forEach((bit) => {
        const searchText = bit.text;
        let position = 0;
        let occurrence = 0;

        while (position < textContent.length) {
          const index = textContent.indexOf(searchText, position);
          if (index === -1) break;

          occurrence++;

          if (bit.occurrence === undefined || bit.occurrence === occurrence) {
            matches.push({
              start: index,
              end: index + searchText.length,
              text: searchText,
              occurrence,
            });
          }

          position = index + 1;
        }
      });

      matches.sort((a, b) => a.start - b.start);

      const parts: Array<{ text: string; highlight: boolean }> = [];
      let currentPos = 0;

      matches.forEach((match, index) => {
        if (match.start > currentPos) {
          parts.push({
            text: textContent.slice(currentPos, match.start),
            highlight: false,
          });
        }

        if (index > 0 && match.start < matches[index - 1].end) {
          if (match.end > matches[index - 1].end) {
            parts.push({
              text: textContent.slice(matches[index - 1].end, match.end),
              highlight: true,
            });
            currentPos = match.end;
          }
        } else {
          parts.push({
            text: textContent.slice(match.start, match.end),
            highlight: true,
          });
          currentPos = match.end;
        }
      });

      if (currentPos < textContent.length) {
        parts.push({
          text: textContent.slice(currentPos),
          highlight: false,
        });
      }

      return { parts };
    }, [children, text, highlightedBits]);

    const getBackgroundMetrics = () => {
      switch (highlightDirection) {
        case "left":
          return {
            initial: "0% 100%",
            animated: "100% 100%",
            position: "0% 0%",
          };
        case "right":
          return {
            initial: "0% 100%",
            animated: "100% 100%",
            position: "100% 0%",
          };
        case "top":
          return {
            initial: "100% 0%",
            animated: "100% 100%",
            position: "0% 0%",
          };
        case "bottom":
          return {
            initial: "100% 0%",
            animated: "100% 100%",
            position: "0% 100%",
          };
        default:
          return {
            initial: "0% 100%",
            animated: "100% 100%",
            position: "0% 0%",
          };
      }
    };

    const metrics = getBackgroundMetrics();

    const highlightTransition: Transition = reduced
      ? { duration: 0 }
      : {
          type: "spring",
          duration: highlightDuration,
          delay: highlightDelay,
          bounce: 0,
        };

    return (
      <motion.span
        ref={containerRef}
        style={{ display: "block" }}
        initial={
          reduced
            ? { opacity: 1, filter: "blur(0px)" }
            : {
                opacity: 0,
                filter: `blur(${blurAmount}px)`,
              }
        }
        animate={
          isActive
            ? { opacity: 1, filter: "blur(0px)" }
            : {
                opacity: inactiveOpacity,
                filter: `blur(${blurAmount * 0.75}px)`,
              }
        }
        transition={{
          duration: blurDuration,
          delay: isActive ? blurDelay : 0,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={cn("will-change-[filter,opacity]", className)}
      >
        {processedContent.parts.map((part, index) => {
          if (!part.highlight) {
            return <React.Fragment key={index}>{part.text}</React.Fragment>;
          }

          const HighlightWrapper = ({
            children,
          }: {
            children: React.ReactNode;
          }) => {
            const highlightRef = useRef<HTMLSpanElement>(null);
            const inView = useInView(highlightRef, {
              once: false,
              initial: false,
              amount: 0.1,
            });
            // LOCAL EDIT (Ellery): painted, not swept, under reduced motion.
            const highlightInView = reduced || inView;

            const highlightStyles: React.CSSProperties = {
              backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: metrics.position,
              backgroundSize: highlightInView
                ? metrics.animated
                : metrics.initial,
              boxDecorationBreak: "clone",
              WebkitBoxDecorationBreak: "clone",
            };

            return (
              <span ref={highlightRef} className="inline">
                <motion.span
                  className={cn("inline", highlightClassName)}
                  style={highlightStyles}
                  animate={{
                    backgroundSize: highlightInView
                      ? metrics.animated
                      : metrics.initial,
                  }}
                  initial={{
                    backgroundSize: metrics.initial,
                  }}
                  transition={highlightTransition}
                >
                  {children}
                </motion.span>
              </span>
            );
          };

          return <HighlightWrapper key={index}>{part.text}</HighlightWrapper>;
        })}
      </motion.span>
    );
  },
);

BlurHighlight.displayName = "BlurHighlight";

export default BlurHighlight;

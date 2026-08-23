"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-to-top control. Hidden until the visitor is a viewport or so down the
 * page, so it never covers content on short pages. Rendered as a real <button>
 * (never a bare div) and skipped entirely for reduced-motion smooth scrolling.
 */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }}
      // Stays mounted and fades in, rather than being added to the DOM on
      // scroll: no layout churn, and the control is present for assistive tech
      // and crawlers from the first paint. hidden:* keeps it out of the tab
      // order while invisible.
      className={`fixed bottom-6 end-6 z-40 rounded-full border bg-background px-4 py-3 text-sm font-semibold shadow-lg transition-opacity hover:underline ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      aria-label={label}
    >
      ↑ <span className="sr-only sm:not-sr-only">{label}</span>
    </button>
  );
}

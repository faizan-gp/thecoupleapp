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
      // and crawlers from the first paint. The invisible state also leaves the
      // tab order, so it can't be focused while it cannot be seen.
      className={`fixed bottom-6 end-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-surface text-ink shadow-lg transition-opacity hover:border-ink ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      aria-label={label}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
        <path
          d="M8 13V3.4M8 3.4L3.6 7.8M8 3.4l4.4 4.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

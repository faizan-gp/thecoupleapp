"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";

// Hour ranges, 0–23. "Together" is the morning and evening most couples
// already share; "apart" is the workday in between — the part a shared
// evening never shows you.
const TOGETHER: [number, number][] = [
  [6, 9],
  [18, 24],
];
const APART: [number, number] = [9, 18];

function inRange(hour: number, ranges: [number, number][]) {
  return ranges.some(([start, end]) => hour >= start && hour < end);
}

/**
 * Married couples: toggle "with HourStory" and watch the workday — the part
 * of the day a shared evening never covers — fill in without changing a
 * single hour of the schedule you already keep.
 */
export function MissingMiddle({ dict }: { dict: Dictionary }) {
  const t = dict.blog.useCases.middle;
  const [withApp, setWithApp] = useState(false);

  return (
    <figure className="usecase-card">
      <figcaption className="usecase-head">
        <span className="eyebrow">{dict.blog.useCases.tryIt}</span>
        <span className="usecase-caption">{t.caption}</span>
      </figcaption>

      <div className="middle-rail">
        {Array.from({ length: 24 }, (_, hour) => {
          const together = inRange(hour, TOGETHER);
          const apart = inRange(hour, [APART]);
          const cls = together ? "middle-cell-together" : apart ? (withApp ? "middle-cell-filled" : "middle-cell-apart") : "";
          return <span key={hour} className={`middle-cell ${cls}`} />;
        })}
      </div>

      <div className="middle-legend">
        <span className="overlap-legend-item">
          <span className="overlap-dot middle-dot-together" aria-hidden="true" />
          {t.together}
        </span>
        <span className="overlap-legend-item">
          <span className="overlap-dot middle-dot-apart" aria-hidden="true" />
          {t.apart}
        </span>
      </div>

      <div className="usecase-toggle-row" role="group">
        <button
          type="button"
          className={`chip chip-control${!withApp ? " chip-live" : ""}`}
          onClick={() => setWithApp(false)}
          aria-pressed={!withApp}
        >
          {t.before}
        </button>
        <button
          type="button"
          className={`chip chip-control${withApp ? " chip-live" : ""}`}
          onClick={() => setWithApp(true)}
          aria-pressed={withApp}
        >
          {t.withApp}
        </button>
      </div>
    </figure>
  );
}

"use client";

import { useMemo, useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";

const HOURS = 24;
const PARTNER_START = 8;
const PARTNER_LEN = 9; // Fixed day shift, 08:00–17:00.
const YOUR_LEN = 8;

function awakeHours(start: number, len: number): Set<number> {
  const hours = new Set<number>();
  for (let i = 0; i < len; i++) hours.add((start + i) % HOURS);
  return hours;
}

/**
 * Opposite shifts: drag your shift's start hour against a partner fixed on
 * days, and watch how little the two awake windows actually touch. The
 * point isn't the exact overlap count — it's how fast it drops to zero.
 */
export function OverlapMeter({ dict }: { dict: Dictionary }) {
  const t = dict.blog.useCases.overlap;
  const [yourStart, setYourStart] = useState(22); // Default: a night shift.

  const yours = useMemo(() => awakeHours(yourStart, YOUR_LEN), [yourStart]);
  const partners = useMemo(() => awakeHours(PARTNER_START, PARTNER_LEN), []);
  const overlapCount = useMemo(
    () => [...yours].filter((hour) => partners.has(hour)).length,
    [yours, partners]
  );

  return (
    <figure className="usecase-card">
      <figcaption className="usecase-head">
        <span className="eyebrow">{dict.blog.useCases.tryIt}</span>
        <span className="usecase-caption">{t.caption}</span>
      </figcaption>

      <div className="overlap-rail">
        {Array.from({ length: HOURS }, (_, hour) => {
          const you = yours.has(hour);
          const partner = partners.has(hour);
          const cls = you && partner ? "overlap-cell-both" : you ? "overlap-cell-you" : partner ? "overlap-cell-partner" : "";
          return <span key={hour} className={`overlap-cell ${cls}`} />;
        })}
      </div>

      <div className="overlap-legend">
        <span className="overlap-legend-item">
          <span className="overlap-dot overlap-dot-you" aria-hidden="true" />
          {t.youAwake}
        </span>
        <span className="overlap-legend-item">
          <span className="overlap-dot overlap-dot-partner" aria-hidden="true" />
          {t.partnerAwake}
        </span>
        <span className="overlap-legend-item">
          <span className="overlap-dot overlap-dot-both" aria-hidden="true" />
          {t.bothAwake}
        </span>
      </div>

      <div className="usecase-control">
        <label className="usecase-control-label" htmlFor="overlap-shift">
          {t.shiftControl}
        </label>
        <input
          id="overlap-shift"
          type="range"
          min={0}
          max={23}
          value={yourStart}
          onChange={(event) => setYourStart(Number(event.target.value))}
          className="usecase-slider"
        />
        <span className="usecase-control-value">
          {overlapCount > 0 ? interpolate(t.overlapCount, { hours: String(overlapCount) }) : t.noOverlap}
        </span>
      </div>
    </figure>
  );
}

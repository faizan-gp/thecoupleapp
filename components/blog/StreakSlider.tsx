"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";

/** One threshold per detail chip — day 1 unlocks the first, day 100 the last. */
const THRESHOLDS = [1, 7, 25, 55, 100];

/**
 * New relationships: drag from day one to day one hundred and watch the
 * small, specific things accumulate — not because anyone performed them,
 * but because an hourly habit quietly built the texture up.
 */
export function StreakSlider({ dict }: { dict: Dictionary }) {
  const t = dict.blog.useCases.streak;
  const [day, setDay] = useState(1);

  return (
    <figure className="usecase-card">
      <figcaption className="usecase-head">
        <span className="eyebrow">{dict.blog.useCases.tryIt}</span>
        <span className="usecase-caption">{t.caption}</span>
      </figcaption>

      <ul className="streak-chips">
        {t.details.map((label, index) => (
          <li key={label} className={`streak-chip${day >= THRESHOLDS[index] ? " streak-chip-unlocked" : ""}`}>
            {label}
          </li>
        ))}
      </ul>

      <div className="usecase-control">
        <input
          type="range"
          min={1}
          max={100}
          value={day}
          onChange={(event) => setDay(Number(event.target.value))}
          className="usecase-slider"
          aria-label={interpolate(t.day, { n: String(day) })}
        />
        <span className="usecase-control-value">{interpolate(t.day, { n: String(day) })}</span>
      </div>
    </figure>
  );
}

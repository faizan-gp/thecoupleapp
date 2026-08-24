"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";

const BASE_HOUR = 9; // "You" sit at a fixed illustrative hour; the slider moves theirs.

function formatHour(hour: number) {
  return `${String(((hour % 24) + 24) % 24).padStart(2, "0")}:00`;
}

function isDaylight(hour: number) {
  const h = ((hour % 24) + 24) % 24;
  return h >= 6 && h < 19;
}

/**
 * Long-distance relationships: drag the offset and watch the partner's clock
 * move while yours holds still — the personal-time model in miniature. Two
 * honest hours side by side, never forced onto one shared clock.
 */
export function TimeZoneSplit({ dict }: { dict: Dictionary }) {
  const { youLabel, partnerLabel } = dict.home.timeline;
  const t = dict.blog.useCases;
  const [offset, setOffset] = useState(6);
  const partnerHour = BASE_HOUR + offset;

  return (
    <figure className="usecase-card">
      <figcaption className="usecase-head">
        <span className="eyebrow">{t.tryIt}</span>
        <span className="usecase-caption">{t.timeZone.caption}</span>
      </figcaption>

      <div className="tz-split">
        <div className={`tz-panel ${isDaylight(BASE_HOUR) ? "tz-panel-day" : "tz-panel-night"}`}>
          <span className="tz-label">{youLabel}</span>
          <span className="tz-time">{formatHour(BASE_HOUR)}</span>
        </div>
        <div className={`tz-panel ${isDaylight(partnerHour) ? "tz-panel-day" : "tz-panel-night"}`}>
          <span className="tz-label">{partnerLabel}</span>
          <span className="tz-time">{formatHour(partnerHour)}</span>
        </div>
      </div>

      <div className="usecase-control">
        <input
          type="range"
          min={0}
          max={12}
          value={offset}
          onChange={(event) => setOffset(Number(event.target.value))}
          className="usecase-slider"
          aria-label={interpolate(t.timeZone.hoursApart, { hours: String(offset) })}
        />
        <span className="usecase-control-value">
          {interpolate(t.timeZone.hoursApart, { hours: String(offset) })}
        </span>
      </div>
    </figure>
  );
}

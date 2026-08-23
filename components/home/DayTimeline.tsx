"use client";

import { useEffect, useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";

const ADVANCE_MS = 3200;

/**
 * The day timeline — HourStory's actual mechanic, live in the hero rather
 * than described next to it. An hour surfaces every few seconds on its own;
 * every hour is also a real button, so a visitor can click straight to the
 * one that catches their eye. Hovering or focusing anywhere inside holds the
 * current hour rather than racing past it while they're reading.
 *
 * Entries alternate you/partner by position (even = you, odd = partner) —
 * that alternation is structural, not translated content, so it lives here
 * rather than in the dictionary.
 */
export function DayTimeline({ dict }: { dict: Dictionary }) {
  const { entries, youLabel, partnerLabel, liveLabel } = dict.home.timeline;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Read once at mount rather than reacting to later OS-setting changes — a
  // hero illustration doesn't need to be that dynamic, and a plain state
  // initializer (unlike an effect) never causes a hydration mismatch here
  // since `autoplay` never affects the rendered markup, only the timer below.
  const [autoplay] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % entries.length);
    }, ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [autoplay, paused, entries.length]);

  return (
    <figure
      className="rise timeline"
      style={{ animationDelay: "160ms" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <figcaption className="timeline-head">
        <span className="eyebrow">HourStory · Today</span>
        <span className="timeline-live">
          <span className="timeline-dot-live" aria-hidden="true" />
          {liveLabel}
        </span>
      </figcaption>

      <div>
        {entries.map((entry, index) => {
          const isActive = index === active;
          const who = index % 2 === 0 ? "you" : "partner";
          const whoLabel = who === "you" ? youLabel : partnerLabel;

          return (
            <button
              key={`${entry.time}-${index}`}
              type="button"
              className={`timeline-row${isActive ? " timeline-row-active" : ""}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActive(index)}
            >
              <span className="timeline-marker-col" aria-hidden="true">
                <span className="timeline-dot" />
              </span>
              <span className="timeline-content">
                <span className="timeline-row-head">
                  <span className="timeline-time">{entry.time}</span>
                  <span className={`timeline-who timeline-who-${who}`}>{whoLabel}</span>
                </span>
                <span className="timeline-caption">
                  <span className="timeline-emoji" aria-hidden="true">
                    {entry.emoji}
                  </span>
                  {entry.caption}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </figure>
  );
}

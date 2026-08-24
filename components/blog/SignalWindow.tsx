"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";

const SLOT_COUNT = 12;
const ATTEMPT_SLOTS = [2, 5, 9];
const INITIAL_DOWN = new Set([1, 2, 3, 6, 7, 10]);

function randomPattern(): Set<number> {
  const down = new Set<number>();
  for (let slot = 0; slot < SLOT_COUNT; slot++) {
    if (Math.random() < 0.4) down.add(slot);
  }
  return down;
}

/**
 * Deployment: a day's connectivity, rendered as bars that drop out at
 * random. A message queued when the signal is down waits; one queued when
 * it's up gets through. Press the button for a different day's odds.
 */
export function SignalWindow({ dict }: { dict: Dictionary }) {
  const t = dict.blog.useCases.signal;
  const [down, setDown] = useState<Set<number>>(INITIAL_DOWN);

  return (
    <figure className="usecase-card">
      <figcaption className="usecase-head">
        <span className="eyebrow">{dict.blog.useCases.tryIt}</span>
        <span className="usecase-caption">{t.caption}</span>
      </figcaption>

      <div className="signal-row">
        {Array.from({ length: SLOT_COUNT }, (_, slot) => (
          <span key={slot} className={`signal-bar ${down.has(slot) ? "signal-bar-down" : "signal-bar-up"}`} />
        ))}
      </div>

      <ul className="signal-attempts">
        {ATTEMPT_SLOTS.map((slot) => {
          const ok = !down.has(slot);
          return (
            <li key={slot} className={`signal-attempt ${ok ? "signal-attempt-sent" : "signal-attempt-waiting"}`}>
              {ok ? t.sent : t.waiting}
            </li>
          );
        })}
      </ul>

      <button type="button" className="btn btn-quiet usecase-toggle" onClick={() => setDown(randomPattern())}>
        {t.simulate}
      </button>
    </figure>
  );
}

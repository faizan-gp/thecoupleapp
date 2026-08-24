"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";

const MOMENTS = ["☕", "🛫", "🏙️", "🧳"];

/**
 * Frequent travel: a handful of moments sit queued in airplane mode until
 * you press Land, then all of them send at once — the offline-first queue
 * that makes a six-hour flight the normal case, not an outage.
 */
export function OfflineQueue({ dict }: { dict: Dictionary }) {
  const t = dict.blog.useCases.offline;
  const [landed, setLanded] = useState(false);

  return (
    <figure className="usecase-card">
      <figcaption className="usecase-head">
        <span className="eyebrow">{dict.blog.useCases.tryIt}</span>
        <span className="usecase-caption">{t.caption}</span>
      </figcaption>

      <ul className="queue-row">
        {MOMENTS.map((emoji, index) => (
          <li
            key={emoji}
            className={`queue-chip${landed ? " queue-chip-sent" : ""}`}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <span className="queue-emoji" aria-hidden="true">
              {emoji}
            </span>
            <span className="queue-status">{landed ? t.sent : t.queued}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="btn btn-quiet usecase-toggle"
        onClick={() => setLanded((value) => !value)}
        aria-pressed={landed}
      >
        {landed ? t.queueEmpty : t.land}
      </button>
    </figure>
  );
}

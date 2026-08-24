"use client";

import { useMemo, useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The HourStory phone — the app's actual mechanic, working, rather than a
 * still of it. Your hours are tappable: tap one and it fills in, the count
 * moves, the bar grows. Sam's hours arrive already captured, because that is
 * what receiving someone's day looks like from your side of the pair.
 *
 * Deliberately not a checklist. HourStory's own copy promises "no streak to
 * protect" and an hour you can skip, so there is nothing here to complete and
 * no streak counter to contradict it — the stat card counts what the two of
 * you shared, which is the number the product actually cares about.
 *
 * Row content is reused from home.dayDial.moments so the hours are already
 * translated everywhere; only the chrome lives in home.phone.
 */

/** Which of the day's moments the phone shows, and who starts out captured. */
const ROWS = [
  { hour: 8, startsCaptured: true },
  { hour: 10, startsCaptured: true },
  { hour: 12, startsCaptured: false },
  { hour: 14, startsCaptured: false },
  { hour: 18, startsCaptured: true },
];

export function HourStoryPhone({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const p = dict.home.phone;
  const { youLabel, partnerLabel } = dict.home.timeline;

  const rows = useMemo(() => {
    const byHour = new Map(dict.home.dayDial.moments.map((m) => [m.hour, m]));
    return ROWS.flatMap(({ hour, startsCaptured }) => {
      const moment = byHour.get(hour);
      return moment ? [{ ...moment, startsCaptured }] : [];
    });
  }, [dict.home.dayDial.moments]);

  // Only your own hours are yours to capture; Sam's arrive already filled in.
  const [captured, setCaptured] = useState<number[]>(() =>
    rows.filter((r) => r.startsCaptured || r.who === "partner").map((r) => r.hour)
  );

  const formatHour = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(lang, { hour: "numeric" });
    return (h: number) => fmt.format(new Date(2024, 0, 1, h));
  }, [lang]);

  const done = captured.length;
  const total = rows.length;

  return (
    <div className="phone-stage">
      <p className="phone-hint" aria-hidden="true">
        <span className="phone-hint-emoji">👆</span>
        {p.tapHint}
      </p>

      <div className="phone phone-live">
        <div className="phone-screen">
          <div className="phone-status" aria-hidden="true">
            <span className="phone-status-time">9:41</span>
            <span className="phone-island" />
            <span className="phone-status-dots">•••</span>
          </div>

          <div className="phone-head">
            <div className="min-w-0">
              <p className="eyebrow">{p.eyebrow}</p>
              <p className="phone-title">{p.title}</p>
            </div>
            <span className="phone-avatars" aria-hidden="true">
              <span className="phone-avatar phone-avatar-you">{youLabel.slice(0, 1)}</span>
              <span className="phone-avatar phone-avatar-partner">{partnerLabel.slice(0, 1)}</span>
            </span>
          </div>

          <p className="phone-progress-label" aria-live="polite">
            {interpolate(p.progress, { done: String(done), total: String(total) })}
          </p>
          <span className="phone-progress" aria-hidden="true">
            <span className="phone-progress-fill" style={{ width: `${(done / total) * 100}%` }} />
          </span>

          <ul className="phone-rows list-none">
            {rows.map((row) => {
              const isCaptured = captured.includes(row.hour);
              const mine = row.who === "you";
              const label = `${formatHour(row.hour)} · ${
                isCaptured ? row.caption : p.empty
              }`;

              const inner = (
                <>
                  <span className={`phone-check${isCaptured ? " phone-check-on" : ""}`} aria-hidden="true">
                    {isCaptured ? "✓" : null}
                  </span>
                  <span className="phone-row-emoji" aria-hidden="true">
                    {isCaptured ? row.emoji : "＋"}
                  </span>
                  <span className="phone-row-text">
                    <span className="phone-row-hour">{formatHour(row.hour)}</span>
                    <span className={`phone-row-caption${isCaptured ? "" : " phone-row-caption-empty"}`}>
                      {isCaptured ? row.caption : p.empty}
                    </span>
                  </span>
                  <span className={`phone-pill phone-pill-${row.who}`}>
                    {mine ? youLabel : partnerLabel}
                  </span>
                </>
              );

              // Sam's hours are received, not actionable — a plain row, not a
              // button, so nothing offers an interaction that does nothing.
              return (
                <li key={row.hour}>
                  {mine && !isCaptured ? (
                    <button
                      type="button"
                      className="phone-row-live"
                      aria-label={label}
                      onClick={() => setCaptured((c) => [...c, row.hour])}
                    >
                      {inner}
                    </button>
                  ) : (
                    <span className="phone-row-live phone-row-static">{inner}</span>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="phone-foot">{interpolate(p.footer, { partner: partnerLabel })}</p>
        </div>
      </div>

      <div className="phone-stat" aria-hidden="true">
        <p className="eyebrow">{p.statLabel}</p>
        <p className="phone-stat-value">
          {interpolate(p.statValue, { n: String(done) })} <span>📸</span>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The light of one day, hour by hour.
 *
 * Deliberately a third palette, separate from the brand's two accents: candy
 * and ember belong to the product and are never blended (see the header of
 * globals.css), while these are the sky — dawn, noon, dusk, night. Keeping
 * them apart is what lets the panel change colour for 24 straight hours
 * without ever looking like the brand is drifting.
 */
/* Deep and saturated rather than literal daylight: the hue has to carry the
   hour while cream text stays readable on top of it, so every step is a night
   version of its time of day. The arc is the point — indigo, violet, rose,
   amber, gold, and back down again. */
const SKY = [
  "#16173a", "#141534", "#131430", "#14172f", "#1a2140", "#2a2450",
  "#4a2a55", "#7a3348", "#93412e", "#8a4a22", "#7a4f1e", "#6d541f",
  "#625520", "#6b5220", "#75491f", "#7f3f22", "#8a3628", "#922d2f",
  "#7d2740", "#5c2547", "#43214a", "#2f1d45", "#21193d", "#1a173a",
];

const HOURS = 24;
const ADVANCE_MS = 1100;

export function DayDial({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const d = dict.home.dayDial;
  const { youLabel, partnerLabel } = dict.home.timeline;

  const [hour, setHour] = useState(8);
  // Autoplay is a first impression, not a feature: it walks the day once the
  // section is on screen and stops for good the moment someone takes over.
  const [playing, setPlaying] = useState(false);
  const [touched, setTouched] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const moments = d.moments;
  const byHour = useMemo(() => {
    const map = new Map<number, (typeof moments)[number]>();
    for (const moment of moments) map.set(moment.hour, moment);
    return map;
  }, [moments]);

  const formatHour = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(lang, { hour: "numeric" });
    return (h: number) => fmt.format(new Date(2024, 0, 1, h));
  }, [lang]);

  useEffect(() => {
    if (touched) return;
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [touched]);

  useEffect(() => {
    if (!playing || touched) return;
    const id = window.setInterval(() => setHour((h) => (h + 1) % HOURS), ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [playing, touched]);

  function takeOver(next: number) {
    setTouched(true);
    setPlaying(false);
    setHour(next);
  }

  const moment = byHour.get(hour);
  const captured = d.moments.length;

  return (
    <section aria-labelledby="day-dial-heading" className="wrap py-14 sm:py-20">
      <div className="mx-auto max-w-152 text-center">
        <p className="eyebrow">{d.eyebrow}</p>
        <h2 id="day-dial-heading" className="t-section prose-tight mt-4">
          {(() => {
            const i = d.title.indexOf(d.accent);
            if (i === -1) return d.title;
            return (
              <>
                {d.title.slice(0, i)}
                <em className="t-accent">{d.accent}</em>
                {d.title.slice(i + d.accent.length)}
              </>
            );
          })()}
        </h2>
        <p className="t-lead mt-5">{d.subtitle}</p>
      </div>

      <div
        ref={sectionRef}
        className="dial mt-12 sm:mt-16"
        style={{ ["--sky" as string]: SKY[hour] }}
      >
        <div className="dial-sky" aria-hidden="true" />

        <div className="dial-stage">
          <div className="dial-readout">
            <span className="dial-clock">{formatHour(hour)}</span>
            <span className="dial-count">{interpolate(d.captured, { n: String(captured) })}</span>
          </div>

          {/* aria-live so a screen reader hears each hour's moment as it changes,
              rather than silently re-rendering underneath the slider. */}
          <div className="dial-moment" aria-live="polite">
            {moment ? (
              <div className={`dial-card dial-card-${moment.who}`}>
                <span className="dial-emoji" aria-hidden="true">
                  {moment.emoji}
                </span>
                <span className="dial-card-text">
                  <span className="dial-who">
                    {moment.who === "you" ? youLabel : partnerLabel}
                  </span>
                  <span className="dial-caption">{moment.caption}</span>
                </span>
              </div>
            ) : (
              <p className="dial-quiet">{d.quiet}</p>
            )}
          </div>
        </div>

        <div className="dial-rail" style={{ ["--h" as string]: hour }}>
          {/* The playhead is drawn from `hour`, not from the slider thumb, so it
              lands dead-centre on a tick at every width. The input itself is
              transparent and only supplies dragging and keyboard control. */}
          <span className="dial-playhead" aria-hidden="true" />

          {(["you", "partner"] as const).map((who) => (
            <div key={who} className={`dial-lane dial-lane-${who}`}>
              <span className="dial-lane-label">
                {who === "you" ? youLabel : partnerLabel}
              </span>
              <span className="dial-lane-track" aria-hidden="true">
                {Array.from({ length: HOURS }, (_, h) => {
                  const has = byHour.get(h)?.who === who;
                  return (
                    <span
                      key={h}
                      className={[
                        "dial-tick",
                        has ? "dial-tick-on" : "",
                        h === hour ? "dial-tick-now" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {has ? byHour.get(h)?.emoji : null}
                    </span>
                  );
                })}
              </span>
            </div>
          ))}

          <input
            type="range"
            min={0}
            max={HOURS - 1}
            step={1}
            value={hour}
            aria-label={d.scrubLabel}
            aria-valuetext={`${formatHour(hour)} — ${moment ? moment.caption : d.quiet}`}
            className="dial-scrub"
            onChange={(event) => takeOver(Number(event.target.value))}
            onPointerDown={() => setTouched(true)}
          />
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

import type { CoupleApp } from "@/content/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";

function AccentedTitle({ title, accent }: { title: string; accent: string }) {
  const index = accent ? title.indexOf(accent) : -1;
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <em className="t-accent">{accent}</em>
      {title.slice(index + accent.length)}
    </>
  );
}

/** One mark per step. Structural, so it stays out of the dictionaries. */
const STEP_EMOJI = ["📲", "💌", "📸"];

/**
 * The three real steps to using HourStory — download, pair with an invite
 * code, capture hours — not a generic "how it works" filler section.
 */
export function GettingStarted({ app, dict }: { app: CoupleApp; dict: Dictionary }) {
  const { gettingStarted: gs } = dict.home;
  const storeUrl = app.stores.appStore ?? app.stores.playStore ?? app.stores.web;

  return (
    <section aria-labelledby="getting-started-heading" className="wrap border-t border-line py-14 sm:py-20">
      <div className="mx-auto max-w-152 text-center">
        <p className="eyebrow">{gs.eyebrow}</p>
        <h2 id="getting-started-heading" className="t-section prose-tight mt-4">
          <AccentedTitle title={gs.title} accent={gs.accent} />
        </h2>
        <p className="t-lead mt-5">{gs.subtitle}</p>
      </div>

      <ol className="mt-12 grid list-none grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-3">
        {gs.steps.map((step, index) => (
          <li key={step.title} className="card step-card p-6">
            <span className="step-emoji" aria-hidden="true">
              {STEP_EMOJI[index]}
            </span>
            <p className="eyebrow mt-4">{interpolate(gs.stepLabel, { n: String(index + 1) })}</p>
            <p className="t-card mt-2">{step.title}</p>
            <p className="mt-2 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12">
        {storeUrl && (
          <Link href={storeUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
            {gs.cta}
          </Link>
        )}
        <ul className="flex list-none flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {gs.badges.map((badge) => (
            <li key={badge} className="getting-started-badge">
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

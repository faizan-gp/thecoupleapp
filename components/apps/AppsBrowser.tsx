"use client";

import { useId, useMemo, useState } from "react";

import { AppCard, AppRow } from "@/components/apps/AppCard";
import type { CoupleApp } from "@/content/apps";
import { localized } from "@/lib/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Search over the app catalog. Progressive enhancement: the full, unfiltered
 * catalog is server-rendered into the HTML (this component SSRs with an empty
 * query), so crawlers and no-JS visitors still get every app and every link.
 * Typing only ever narrows what is already there.
 */
export function AppsBrowser({
  released,
  upcoming,
  lang,
  dict,
}: {
  released: CoupleApp[];
  upcoming: CoupleApp[];
  lang: Locale;
  dict: Dictionary;
}) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return null;
    const test = (app: CoupleApp) =>
      [app.name, localized(app.tagline, lang), dict.categories[app.category]]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    return { released: released.filter(test), upcoming: upcoming.filter(test) };
  }, [query, released, upcoming, lang, dict]);

  const shownReleased = matches ? matches.released : released;
  const shownUpcoming = matches ? matches.upcoming : upcoming;
  const total = shownReleased.length + shownUpcoming.length;
  const nothingFound = total === 0;

  return (
    <>
      <div className="mt-10 max-w-md">
        <label htmlFor={inputId} className="eyebrow">
          {dict.appsIndex.searchLabel}
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={dict.appsIndex.searchPlaceholder}
          // 1rem exactly: anything smaller makes iOS Safari zoom the page on focus.
          className="mt-2 w-full rounded-full border border-line bg-surface px-5 py-3 text-[1rem] text-ink placeholder:text-muted focus:border-iris"
        />
      </div>

      {/* Announces the result count to screen readers as the query changes. */}
      <p aria-live="polite" className="sr-only">
        {nothingFound
          ? dict.appsIndex.noResults
          : interpolate(dict.appsIndex.resultCount, { count: String(total) })}
      </p>

      {nothingFound && (
        <p className="prose mt-10 rounded-[14px] border border-dashed border-line-strong p-8 text-muted">
          {dict.appsIndex.noResults}
        </p>
      )}

      {shownReleased.length > 0 && (
        <section
          aria-labelledby="released-list-heading"
          className="mt-12 border-t border-line pt-10"
        >
          <h2 id="released-list-heading" className="t-section">
            {dict.appsIndex.released}
          </h2>
          <ul className="mt-8 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shownReleased.map((app) => (
              <li key={app.slug}>
                <AppCard app={app} lang={lang} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {shownUpcoming.length > 0 && (
        <section
          aria-labelledby="upcoming-list-heading"
          className="mt-12 border-t border-line pt-10"
        >
          <h2 id="upcoming-list-heading" className="t-section">
            {dict.appsIndex.comingSoon}
          </h2>
          <ul className="mt-6 list-none border-t border-line">
            {shownUpcoming.map((app) => (
              <li key={app.slug}>
                <AppRow app={app} lang={lang} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

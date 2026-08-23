"use client";

import { useId, useMemo, useState } from "react";

import { AppCard, ComingSoonCard } from "@/components/apps/AppCard";
import type { CoupleApp } from "@/content/apps";
import { localized } from "@/lib/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
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
  const nothingFound = shownReleased.length === 0 && shownUpcoming.length === 0;

  return (
    <>
      <div className="mt-8">
        <label htmlFor={inputId} className="block text-sm font-semibold">
          {dict.appsIndex.searchLabel}
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={dict.appsIndex.searchPlaceholder}
          className="mt-2 w-full max-w-md rounded border px-3 py-2"
        />
      </div>

      {/* Announces result counts to screen readers as the query changes. */}
      <p aria-live="polite" className="sr-only">
        {shownReleased.length + shownUpcoming.length}
      </p>

      {nothingFound && <p className="mt-8">{dict.appsIndex.noResults}</p>}

      {shownReleased.length > 0 && (
        <section aria-labelledby="released-list-heading" className="mt-10">
          <h2 id="released-list-heading" className="text-2xl font-bold">
            {dict.appsIndex.released}
          </h2>
          <ul className="mt-6 grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
            {shownReleased.map((app) => (
              <li key={app.slug}>
                <AppCard app={app} lang={lang} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {shownUpcoming.length > 0 && (
        <section aria-labelledby="upcoming-list-heading" className="mt-10">
          <h2 id="upcoming-list-heading" className="text-2xl font-bold">
            {dict.appsIndex.comingSoon}
          </h2>
          <ul className="mt-6 grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
            {shownUpcoming.map((app) => (
              <li key={app.slug}>
                <ComingSoonCard app={app} lang={lang} dict={dict} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

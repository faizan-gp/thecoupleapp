import Image from "next/image";
import Link from "next/link";

import { DuoMark } from "@/components/brand/Mark";
import { getAppForCategory, getCategories } from "@/lib/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The library board — the landing page's one bold element.
 *
 * Six cells, one for each part of a relationship the library sets out to cover.
 * A cell either holds the app that occupies it or is drawn as an open shelf.
 * Showing the empty slots is the point: the product's whole thesis is one small
 * app per problem, released when it is ready, so the gaps are the roadmap
 * rather than something to hide. Everything here is derived from the catalog,
 * so it stays true as apps ship — no copy to update.
 */
export function LibraryBoard({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const categories = getCategories();
  const cells = categories.map((category) => ({ category, app: getAppForCategory(category) }));
  const filled = cells.filter((cell) => cell.app).length;

  return (
    <section
      aria-labelledby="library-heading"
      className="wrap border-t border-line pt-6 pb-12 sm:pb-16"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id="library-heading" className="t-section">
          {dict.home.libraryTitle}
        </h2>
        <p className="prose-tight text-[0.95rem] text-muted">
          {interpolate(dict.home.libraryNote, {
            filled: String(filled),
            total: String(categories.length),
          })}
        </p>
      </div>

      <ul className="mt-6 grid list-none grid-cols-2 gap-3 sm:grid-cols-3">
        {cells.map(({ category, app }, index) => (
          <li
            key={category}
            className="rise"
            style={{ animationDelay: `${120 + index * 45}ms` }}
          >
            {app ? (
              <Link
                href={`/${lang}/apps/${app.slug}`}
                className="card h-full p-4 sm:p-5"
                aria-label={`${app.name} — ${dict.categories[category]}`}
              >
                <span className="eyebrow">{dict.categories[category]}</span>
                <span className="mt-4 flex items-center gap-2.5">
                  <Image
                    src={app.icon}
                    alt=""
                    width={28}
                    height={28}
                    unoptimized
                    className="rounded-lg"
                  />
                  <span className="t-card">{app.name}</span>
                </span>
                <span className="mt-auto flex items-center gap-2 pt-4 text-[0.8rem] text-muted">
                  <DuoMark state={app.status === "released" ? "available" : "soon"} />
                  {app.status === "released"
                    ? dict.statuses.released
                    : dict.home.comingSoonTag}
                </span>
              </Link>
            ) : (
              <div className="slot flex h-full flex-col p-4 sm:p-5">
                <span className="eyebrow">{dict.categories[category]}</span>
                <span className="mt-auto flex items-center gap-2 pt-10 text-[0.8rem] text-muted">
                  <DuoMark state="open" />
                  {dict.home.librarySlotOpen}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

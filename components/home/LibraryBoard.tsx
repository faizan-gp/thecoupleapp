import Image from "next/image";
import Link from "next/link";

import { DuoMark } from "@/components/brand/Mark";
import { getAppForCategory, getCategories, localized } from "@/lib/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import type { Locale } from "@/lib/i18n/locales";

/**
 * One emoji per area of a relationship. Structural, not copy — the same mark
 * stands for "memories" in every language — so it lives here rather than in
 * the dictionaries. It also gives the open rows something warm to hold: an
 * area that hasn't shipped yet should still read as a part of a life, not as
 * a blank line in a spreadsheet.
 */
const CATEGORY_EMOJI: Record<string, string> = {
  communication: "💬",
  planning: "🗓️",
  memories: "📸",
  finance: "💸",
  wellness: "🌿",
  fun: "🎲",
};

function ArrowGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
      className="shelf-arrow"
    >
      <path
        d="M2.5 8h11m0 0L9.5 4m4 4l-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The library board — an index of the areas the library sets out to cover.
 *
 * One row per part of a relationship. A row either holds the app that occupies
 * it or states that the area is still open. Showing the open ones is the point:
 * the product's whole thesis is one small app per problem, released when it is
 * ready, so the gaps are the roadmap rather than something to hide. But an open
 * area is a promise, not a product, so it costs one dim line while the area
 * that shipped gets the icon, the name, the tagline and the link. Everything
 * here is derived from the catalog, so it stays true as apps ship — no copy to
 * update.
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

      <ul className="shelf mt-8 list-none">
        {cells.map(({ category, app }, index) => (
          <li key={category} className="rise" style={{ animationDelay: `${120 + index * 45}ms` }}>
            {app ? (
              <Link
                href={`/${lang}/apps/${app.slug}`}
                className="shelf-row shelf-row-filled"
                aria-label={`${app.name} — ${dict.categories[category]}`}
              >
                <span className="shelf-area">
                  <span className="shelf-emoji" aria-hidden="true">
                    {CATEGORY_EMOJI[category]}
                  </span>
                  {dict.categories[category]}
                </span>

                <span className="shelf-body shelf-app">
                  <Image
                    src={app.icon}
                    alt=""
                    width={38}
                    height={38}
                    unoptimized
                    className="shrink-0 rounded-[10px]"
                  />
                  <span className="shelf-app-text">
                    <span className="shelf-app-name">{app.name}</span>
                    <span className="shelf-tagline">{localized(app.tagline, lang)}</span>
                  </span>
                </span>

                <span className="shelf-status">
                  <DuoMark state={app.status === "released" ? "available" : "soon"} />
                  {app.status === "released" ? dict.statuses.released : dict.home.comingSoonTag}
                  <ArrowGlyph />
                </span>
              </Link>
            ) : (
              <div className="shelf-row">
                <span className="shelf-area">
                  <span className="shelf-emoji" aria-hidden="true">
                    {CATEGORY_EMOJI[category]}
                  </span>
                  {dict.categories[category]}
                </span>
                <span className="shelf-status">
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

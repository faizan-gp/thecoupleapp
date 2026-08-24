import Link from "next/link";

import type { CoupleApp } from "@/content/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";

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

function StatusMark({ yes }: { yes: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={yes ? "comparison-mark comparison-mark-yes" : "comparison-mark comparison-mark-no"}
    >
      {yes ? "✓" : "✕"}
    </span>
  );
}

export function ComparisonTable({ app, lang, dict }: { app: CoupleApp; lang: Locale; dict: Dictionary }) {
  const { comparison: c } = dict.home;

  return (
    <section aria-labelledby="comparison-heading" className="border-y border-line bg-sunken">
      <div className="wrap py-14 sm:py-20">
        <div className="mx-auto max-w-152 text-center">
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 id="comparison-heading" className="t-section prose-tight mt-4">
            <AccentedTitle title={c.title} accent={c.accent} />
          </h2>
          <p className="t-lead mt-5">{c.subtitle}</p>
        </div>

        <div className="comparison-table-wrap mt-12 sm:mt-16">
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col" className="comparison-app-col">
                  {c.appLabel}
                </th>
                <th scope="col">{c.altLabel}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  <td className="comparison-app-col">
                    <StatusMark yes />
                  </td>
                  <td>
                    <StatusMark yes={row.altYes} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link href={`/${lang}/apps/${app.slug}`} className="btn btn-primary">
            {c.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

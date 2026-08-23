import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The frame every page below the landing page shares: one gutter, one measure,
 * one heading treatment. The landing page opts out so its bands can run
 * full-bleed — which is why the gutter lives here and not on <main>.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return <div className="wrap py-12 sm:py-16">{children}</div>;
}

export type Crumb = { name: string; href?: string };

/**
 * Visible breadcrumbs, mirroring the BreadcrumbList JSON-LD on the same page.
 * The last crumb is the current page and is not a link.
 */
export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav aria-label={label} className="mb-7">
      <ol className="flex list-none flex-wrap items-center gap-x-2 gap-y-1 text-[0.85rem] text-muted">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="link-quiet">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Page heading block: the single h1, an optional lead, and an optional line of
 * metadata (a date, a category) that sits above the title.
 */
export function PageTitle({
  title,
  lead,
  meta,
}: {
  title: ReactNode;
  lead?: string;
  meta?: ReactNode;
}) {
  return (
    <header className="border-b border-line pb-8">
      {meta ? <div className="mb-4">{meta}</div> : null}
      <h1 className="t-page prose">{title}</h1>
      {lead ? <p className="t-lead prose mt-5">{lead}</p> : null}
    </header>
  );
}

/**
 * A section of a text page, set as a two-column spread: the heading holds the
 * left rail (and stays with you while you read on tall screens), the prose runs
 * in a single measured column beside it. Collapses to one column on mobile.
 */
export function ArticleSection({
  id,
  title,
  paragraphs,
  children,
}: {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  children?: ReactNode;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-t border-line py-10 sm:grid sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-x-10"
    >
      <h2
        id={headingId}
        className="font-display text-[1.2rem] font-semibold sm:sticky sm:top-24 sm:self-start sm:text-[1.1rem]"
      >
        {title}
      </h2>
      <div className="prose mt-4 sm:mt-0">
        {paragraphs?.map((paragraph) => (
          <p key={paragraph} className="mt-4 first:mt-0">
            {paragraph}
          </p>
        ))}
        {children}
      </div>
    </section>
  );
}

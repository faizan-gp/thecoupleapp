import Link from "next/link";

import { localized } from "@/lib/apps";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { getPostBySlug } from "@/lib/posts";

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

/**
 * Three real scenarios from the blog, standing in for customer testimonials
 * we don't have yet — grounded in actual post content rather than invented
 * quotes, so nothing here claims to be a real person's words.
 */
const SLUGS = [
  "couple-app-long-distance-relationships",
  "couple-app-different-shifts",
  "couple-app-frequent-travel",
] as const;

/** One mark per scenario, in the same order. Structural, not translated. */
const SCENARIO_EMOJI = ["🌍", "🌙", "✈️"];

export function WhoItsFor({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const { whoItsFor: w } = dict.home;

  const cards = SLUGS.map((slug, index) => {
    const post = getPostBySlug(slug);
    if (!post) return null;
    return {
      slug,
      emoji: SCENARIO_EMOJI[index],
      tag: w.tags[index],
      title: localized(post.title, lang),
      summary: localized(post.summary, lang),
    };
  }).filter((card): card is NonNullable<typeof card> => card !== null);

  return (
    <section aria-labelledby="who-its-for-heading" className="wrap border-t border-line py-14 sm:py-20">
      <div className="mx-auto max-w-152 text-center">
        <p className="eyebrow">{w.eyebrow}</p>
        <h2 id="who-its-for-heading" className="t-section prose-tight mt-4">
          <AccentedTitle title={w.title} accent={w.accent} />
        </h2>
        <p className="t-lead mt-5">{w.subtitle}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-3">
        {cards.map((card) => (
          <article key={card.slug} className="card scenario-card p-6">
            <span className="scenario-emoji" aria-hidden="true">
              {card.emoji}
            </span>
            <span className="chip mt-4 self-start">{card.tag}</span>
            <p className="t-card mt-4">{card.title}</p>
            <p className="mt-2 text-muted">{card.summary}</p>
            <Link href={`/${lang}/blog/${card.slug}`} className="mt-5 inline-block text-sm font-semibold text-candy">
              {w.cardCta} →
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10 flex justify-center sm:mt-12">
        <Link href={`/${lang}/blog`} className="btn btn-quiet">
          {w.cta}
        </Link>
      </div>
    </section>
  );
}

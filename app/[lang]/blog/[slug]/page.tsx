import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType, ReactNode } from "react";

import { StoreBadges } from "@/components/apps/StoreBadges";
import { ArticlePromo } from "@/components/blog/ArticlePromo";
import { MissingMiddle } from "@/components/blog/MissingMiddle";
import { OfflineQueue } from "@/components/blog/OfflineQueue";
import { OverlapMeter } from "@/components/blog/OverlapMeter";
import { SignalWindow } from "@/components/blog/SignalWindow";
import { StreakSlider } from "@/components/blog/StreakSlider";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { TimeZoneSplit } from "@/components/blog/TimeZoneSplit";
import { Breadcrumbs, PageShell } from "@/components/layout/Page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getReleasedApps, localized } from "@/lib/apps";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import { hasLocale, locales } from "@/lib/i18n/locales";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { blogPostingLd, breadcrumbLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";

/**
 * One interactive visual per post, keyed by slug — each a small working
 * model of that post's actual mechanic rather than a stock illustration.
 * A post without a match (a future one, say) simply runs without a visual;
 * nothing here is required for the page to render.
 */
const USE_CASE_VISUALS: Record<string, ComponentType<{ dict: Dictionary }>> = {
  "couple-app-long-distance-relationships": TimeZoneSplit,
  "couple-app-different-shifts": OverlapMeter,
  "couple-app-frequent-travel": OfflineQueue,
  "couple-app-military-deployment": SignalWindow,
  "couple-app-new-relationships": StreakSlider,
  "couple-app-married-couples": MissingMiddle,
};

/** Pre-render every post × every locale at build time. */
export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllPosts().map((post) => ({ lang: locale.code, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return {
    title: { absolute: localized(post.title, lang) },
    description: localized(post.summary, lang),
    alternates: localeAlternates(lang, `/blog/${post.slug}`),
    openGraph: {
      title: localized(post.title, lang),
      description: localized(post.summary, lang),
      type: "article",
      publishedTime: post.publishedDate,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);
  const title = localized(post.title, lang);
  const body = localized(post.body, lang);
  // The app a post's advice actually points to. With one app in the library
  // there is only one candidate; once a second ships this should read from
  // the post itself rather than always taking the first release.
  const [featuredApp] = getReleasedApps();
  const UseCaseVisual = USE_CASE_VISUALS[post.slug];

  const tocItems = body
    .filter((block) => block.type === "h2")
    .map((block) => ({ id: block.id, text: block.text }));

  // Every post lands an inline promo between its second and third section —
  // the reader who's already sold partway through shouldn't have to reach
  // the bottom of the page to act on it.
  let h2Count = 0;
  const bodyNodes: ReactNode[] = [];
  body.forEach((block, index) => {
    if (block.type === "h2") {
      h2Count += 1;
      if (h2Count === 3 && featuredApp) {
        bodyNodes.push(
          <ArticlePromo key="promo" app={featuredApp} lang={lang} dict={dict} />
        );
      }
      bodyNodes.push(
        <h2 key={block.id} id={block.id} className="article-h2">
          {block.text}
        </h2>
      );
    } else if (block.type === "tip") {
      bodyNodes.push(
        <p key={`tip-${index}`} className="article-tip">
          {block.text}
        </p>
      );
    } else {
      bodyNodes.push(
        <p key={`p-${index}`} className="mt-5 first:mt-0">
          {block.text}
        </p>
      );
    }
  });

  return (
    <>
      <JsonLd
        data={blogPostingLd({
          title,
          summary: localized(post.summary, lang),
          slug: post.slug,
          publishedDate: post.publishedDate,
          lang,
          coverImage: post.coverImage,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.blog.title, path: `/${lang}/blog` },
          { name: title, path: `/${lang}/blog/${post.slug}` },
        ])}
      />

      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[
            { name: dict.nav.home, href: `/${lang}` },
            { name: dict.blog.title, href: `/${lang}/blog` },
            { name: title },
          ]}
        />

        <header className="border-b border-line pb-8">
          <p className="eyebrow">
            <time dateTime={post.publishedDate}>
              {new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(
                new Date(post.publishedDate)
              )}
            </time>
          </p>
          <h1 className="t-page prose mt-4">{title}</h1>
          <p className="t-lead prose mt-5">{localized(post.summary, lang)}</p>
        </header>

        {UseCaseVisual && (
          <div className="mt-10">
            <UseCaseVisual dict={dict} />
          </div>
        )}

        <div className="article-layout mt-10">
          <article className="prose">
            {bodyNodes}

            {featuredApp && (
              <div className="card mt-12 gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
                <Image
                  src={featuredApp.icon}
                  alt=""
                  width={48}
                  height={48}
                  unoptimized
                  className="shrink-0 rounded-[14px]"
                />
                <div className="min-w-0 flex-1">
                  <p className="t-card">{featuredApp.name}</p>
                  <p className="mt-1 text-muted">{localized(featuredApp.tagline, lang)}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-0 sm:shrink-0">
                  <Link href={`/${lang}/apps/${featuredApp.slug}`} className="btn btn-primary">
                    {interpolate(dict.home.glimpseCta, { name: featuredApp.name })}
                  </Link>
                  {featuredApp.status === "released" && (
                    <StoreBadges app={featuredApp} dict={dict} size="compact" />
                  )}
                </div>
              </div>
            )}
          </article>

          <TableOfContents items={tocItems} label={dict.blog.onThisPage} />
        </div>
      </PageShell>
    </>
  );
}

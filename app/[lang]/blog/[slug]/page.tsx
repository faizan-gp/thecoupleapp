import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs, PageShell } from "@/components/layout/Page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getReleasedApps, localized } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
import { hasLocale, locales } from "@/lib/i18n/locales";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { blogPostingLd, breadcrumbLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";

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

        <article>
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

          <div className="prose mt-10">
            {body.map((paragraph) => (
              <p key={paragraph} className="mt-5 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>

          {featuredApp && (
            <div className="card prose mt-12 gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
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
              <Link
                href={`/${lang}/apps/${featuredApp.slug}`}
                className="btn btn-primary mt-5 shrink-0 sm:mt-0"
              >
                {interpolate(dict.home.glimpseCta, { name: featuredApp.name })}
              </Link>
            </div>
          )}
        </article>
      </PageShell>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { localized } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/dictionaries";
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

      <nav aria-label={dict.blog.backToBlog} className="mb-6 text-sm">
        <Link href={`/${lang}/blog`} className="hover:underline">
          ← {dict.blog.backToBlog}
        </Link>
      </nav>

      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-sm">
        <time dateTime={post.publishedDate}>
          {new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(
            new Date(post.publishedDate)
          )}
        </time>
      </p>

      {body.map((paragraph) => (
        <p key={paragraph} className="mt-4 max-w-2xl">
          {paragraph}
        </p>
      ))}
    </>
  );
}

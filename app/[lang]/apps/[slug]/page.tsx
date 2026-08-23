import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StoreBadges } from "@/components/apps/StoreBadges";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllApps, getAppBySlug, localized } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale, locales } from "@/lib/i18n/locales";
import { breadcrumbLd, faqLd, softwareApplicationLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";

/** Pre-render every app × every locale at build time. */
export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllApps().map((app) => ({ lang: locale.code, slug: app.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const app = getAppBySlug(slug);
  if (!app) notFound();

  const seo = localized(app.seo, lang);
  return {
    // Per-app SEO titles are complete on their own — no template suffix.
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: localeAlternates(lang, `/apps/${app.slug}`),
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
    },
  };
}

export default async function AppDetailPage({ params }: PageProps<"/[lang]/apps/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const app = getAppBySlug(slug);
  if (!app) notFound();

  const dict = await getDictionary(lang);
  const tagline = localized(app.tagline, lang);
  const description = localized(app.description, lang);
  const features = localized(app.features, lang);
  const faqs = app.faq ? localized(app.faq, lang) : [];

  return (
    <>
      <JsonLd data={softwareApplicationLd(app, lang)} />
      {faqs.length > 0 && <JsonLd data={faqLd(faqs)} />}
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.meta.apps.title, path: `/${lang}/apps` },
          { name: app.name, path: `/${lang}/apps/${app.slug}` },
        ])}
      />

      <nav aria-label={dict.appDetail.backToApps} className="mb-6 text-sm">
        <Link href={`/${lang}/apps`} className="hover:underline">
          ← {dict.appDetail.backToApps}
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex items-start gap-5">
        <Image src={app.icon} alt="" width={80} height={80} priority className="rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold">
            {app.name} — {tagline}
          </h1>
          <p className="mt-2 text-sm">
            {dict.categories[app.category]} · {dict.statuses[app.status]}
          </p>
        </div>
      </section>

      <p className="mt-6 max-w-2xl text-lg">{description}</p>

      {/* Store links / coming-soon note */}
      <section aria-labelledby="get-heading" className="mt-8">
        <h2 id="get-heading" className="text-2xl font-bold">
          {dict.appDetail.getTheApp}
        </h2>
        <div className="mt-4">
          {app.status === "released" ? (
            <StoreBadges app={app} dict={dict} />
          ) : (
            <p>{dict.appDetail.comingSoonNote}</p>
          )}
          {/* Future: newsletter "get notified" capture slot for unreleased apps (§12). */}
        </div>
      </section>

      {/* Screenshots (lazy — below the fold) */}
      {app.screenshots.length > 0 && (
        <section aria-labelledby="screenshots-heading" className="mt-10">
          <h2 id="screenshots-heading" className="text-2xl font-bold">
            {dict.appDetail.screenshotsTitle}
          </h2>
          <ul className="mt-4 flex list-none gap-4 overflow-x-auto">
            {app.screenshots.map((shot) => (
              <li key={shot.src}>
                <Image
                  src={shot.src}
                  alt={localized(shot.alt, lang)}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  className="rounded-lg border"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Features */}
      <section aria-labelledby="features-heading" className="mt-10">
        <h2 id="features-heading" className="text-2xl font-bold">
          {dict.appDetail.featuresTitle}
        </h2>
        <ul className="mt-4 grid list-none grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature.title}>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-1">{feature.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ — mirrors the FAQPage JSON-LD above */}
      {faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="mt-10">
          <h2 id="faq-heading" className="text-2xl font-bold">
            {dict.appDetail.faqTitle}
          </h2>
          <dl className="mt-4 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <dt className="font-semibold">{faq.q}</dt>
                <dd className="mt-1">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </>
  );
}

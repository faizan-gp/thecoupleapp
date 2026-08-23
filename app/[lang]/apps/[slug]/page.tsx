import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AppRow } from "@/components/apps/AppCard";
import { StoreBadges } from "@/components/apps/StoreBadges";
import { DuoMark } from "@/components/brand/Mark";
import { Breadcrumbs, PageShell } from "@/components/layout/Page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllApps, getAppBySlug, localized } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/interpolate";
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
  const released = app.status === "released";
  const otherApps = getAllApps().filter((entry) => entry.slug !== app.slug);

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

      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[
            { name: dict.nav.home, href: `/${lang}` },
            { name: dict.meta.apps.title, href: `/${lang}/apps` },
            { name: app.name },
          ]}
        />

        {/* Hero. The h1 carries the name and the tagline — the tagline is set
            smaller inside it rather than split off, so the page's one heading
            still says what the app is. */}
        <header className="flex flex-wrap items-start gap-x-6 gap-y-5 border-b border-line pb-10">
          <Image
            src={app.icon}
            alt={interpolate(dict.appDetail.iconAlt, { name: app.name })}
            width={80}
            height={80}
            priority
            unoptimized
            className="rounded-[18px]"
          />

          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-2">
              <span className={`chip ${released ? "chip-live" : "chip-soon"}`}>
                <DuoMark state={released ? "available" : "soon"} />
                {released ? dict.statuses.released : dict.home.comingSoonTag}
              </span>
              <span className="chip">{dict.categories[app.category]}</span>
            </p>

            <h1 className="t-page mt-4">
              {app.name}
              <span className="mt-3 block font-body text-[1.1rem] font-normal leading-snug tracking-normal text-muted sm:text-[1.3rem]">
                {tagline}
              </span>
            </h1>

            <p className="prose mt-7 text-[1.1rem]">{description}</p>

            <div className="mt-8">
              {released ? (
                <StoreBadges app={app} dict={dict} />
              ) : (
                <p className="chip">{dict.appDetail.comingSoonNote}</p>
              )}
              {/* Future: newsletter "get notified" capture slot for unreleased apps (§12). */}
            </div>
          </div>
        </header>

        {/* Screenshots (lazy — below the fold) */}
        {app.screenshots.length > 0 && (
          <section aria-labelledby="screenshots-heading" className="border-b border-line py-12">
            <h2 id="screenshots-heading" className="t-section">
              {dict.appDetail.screenshotsTitle}
            </h2>
            <ul className="mt-8 flex list-none gap-4 overflow-x-auto pb-2">
              {app.screenshots.map((shot) => (
                <li key={shot.src} className="shrink-0">
                  <Image
                    src={shot.src}
                    alt={localized(shot.alt, lang)}
                    width={shot.width}
                    height={shot.height}
                    loading="lazy"
                    className="rounded-[18px] border border-line"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Features */}
        <section aria-labelledby="features-heading" className="border-b border-line py-12">
          <h2 id="features-heading" className="t-section">
            {dict.appDetail.featuresTitle}
          </h2>
          <ul className="mt-8 grid list-none grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <li key={feature.title} className="border-t border-line-strong pt-5">
                <h3 className="font-display text-[1.12rem] font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted">{feature.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ — mirrors the FAQPage JSON-LD above */}
        {faqs.length > 0 && (
          <section aria-labelledby="faq-heading" className="py-12">
            <h2 id="faq-heading" className="t-section">
              {dict.appDetail.faqTitle}
            </h2>
            <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-t border-line pt-5">
                  <dt className="font-display text-[1.05rem] font-semibold">{faq.q}</dt>
                  <dd className="mt-2 text-muted">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {otherApps.length > 0 && (
          <section aria-labelledby="more-heading" className="border-t border-line py-12">
            <h2 id="more-heading" className="t-section">
              {dict.appDetail.moreApps}
            </h2>
            <ul className="mt-6 list-none border-t border-line">
              {otherApps.map((other) => (
                <li key={other.slug}>
                  <AppRow app={other} lang={lang} dict={dict} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </PageShell>
    </>
  );
}

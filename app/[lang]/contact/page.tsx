import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs, PageShell, PageTitle } from "@/components/layout/Page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale } from "@/lib/i18n/locales";
import { breadcrumbLd } from "@/lib/seo/json-ld";
import { localeAlternates } from "@/lib/seo/metadata";
import { supportEmail } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: localeAlternates(lang, "/contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: dict.nav.home, path: `/${lang}` },
          { name: dict.meta.contact.title, path: `/${lang}/contact` },
        ])}
      />
      <PageShell>
        <Breadcrumbs
          label={dict.nav.breadcrumb}
          items={[{ name: dict.nav.home, href: `/${lang}` }, { name: dict.meta.contact.title }]}
        />
        <PageTitle title={dict.contact.title} lead={dict.contact.body} />

        {/* One address, stated once. There is no form to fill in and no ticket
            number to wait for — the mail goes to the person who builds the apps. */}
        <div className="mt-10 max-w-xl rounded-[14px] border border-line bg-surface p-6 sm:p-8">
          <p className="eyebrow">{dict.contact.emailCta}</p>
          <p className="mt-3">
            <a
              href={`mailto:${supportEmail}`}
              className="font-display text-[1.35rem] font-semibold tracking-tight text-candy underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              {supportEmail}
            </a>
          </p>
        </div>
      </PageShell>
    </>
  );
}

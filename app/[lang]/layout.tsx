import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { fontVariables } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { hasLocale, localeDir, locales } from "@/lib/i18n/locales";
import { organizationLd, siteNavigationLd, webSiteLd } from "@/lib/seo/json-ld";
import { siteUrl } from "@/lib/site";

import "../globals.css";

/** Pre-render every locale; unknown locales 404 instead of rendering. */
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale.code }));
}

/** Browser chrome follows the page ground in both themes. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0f6" },
    { media: "(prefers-color-scheme: dark)", color: "#131020" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: dict.meta.titleTemplate,
      default: dict.meta.home.title,
    },
    description: dict.meta.home.description,
    openGraph: {
      siteName: dict.meta.siteName,
      type: "website",
      locale: lang,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} dir={localeDir(lang)} className={`${fontVariables} antialiased`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <JsonLd data={organizationLd()} />
        <JsonLd data={webSiteLd(lang)} />
        <JsonLd
          data={siteNavigationLd([
            { name: dict.nav.home, path: `/${lang}` },
            { name: dict.nav.apps, path: `/${lang}/apps` },
            { name: dict.nav.blog, path: `/${lang}/blog` },
            { name: dict.nav.about, path: `/${lang}/about` },
            { name: dict.nav.contact, path: `/${lang}/contact` },
          ])}
        />
        <a
          href="#main"
          className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50"
        >
          {dict.nav.skipToContent}
        </a>
        <Header lang={lang} dict={dict} />
        {/* Pages own their own gutter (.wrap) so a section can run full-bleed. */}
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <BackToTop label={dict.ui.backToTop} />
      </body>
    </html>
  );
}

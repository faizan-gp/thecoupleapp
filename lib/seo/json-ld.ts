import type { CoupleApp } from "@/content/apps";
import { localized } from "@/lib/apps";
import type { Locale } from "@/lib/i18n/locales";
import { absoluteUrl, author, siteUrl, socialLinks, supportEmail } from "@/lib/site";

/**
 * schema.org builders. Rendered server-side via <JsonLd /> so structured data
 * is present in the initial HTML (Organization, WebSite, SoftwareApplication,
 * BreadcrumbList, FAQPage — the types Google's Rich Results support).
 */

const SITE_NAME = "TheCoupleApp";

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    logo: absoluteUrl("/icon.svg"),
    email: supportEmail,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: supportEmail,
      availableLanguage: "English",
    },
    // Omitted entirely while socialLinks is empty — an empty sameAs array is
    // worse than no sameAs at all.
    ...(socialLinks.length > 0 ? { sameAs: socialLinks.map((link) => link.url) } : {}),
  };
}

/**
 * The header/footer navigation, expressed as SiteNavigationElement so search
 * engines can surface the site's main sections as sitelinks.
 */
export function siteNavigationLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function webSiteLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl(`/${lang}`),
    inLanguage: lang,
  };
}

/**
 * The person who builds the library. `sameAs` carries only genuinely public,
 * verifiable profiles — an unverifiable sameAs is worse than none.
 */
export function personLd(lang: Locale, jobTitle: string, alumniOf: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle,
    url: absoluteUrl(`/${lang}/author`),
    sameAs: [author.github],
    alumniOf: alumniOf.map((name) => ({ "@type": "EducationalOrganization", name })),
    knowsAbout: [...author.stack],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

const CATEGORY_TO_SCHEMA: Record<CoupleApp["category"], string> = {
  communication: "SocialNetworkingApplication",
  planning: "LifestyleApplication",
  memories: "LifestyleApplication",
  finance: "FinanceApplication",
  wellness: "HealthApplication",
  fun: "EntertainmentApplication",
};

export function softwareApplicationLd(app: CoupleApp, lang: Locale) {
  const stores = [app.stores.appStore, app.stores.playStore, app.stores.web].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: localized(app.description, lang),
    applicationCategory: CATEGORY_TO_SCHEMA[app.category],
    operatingSystem: ["iOS", "Android"].join(", "),
    url: absoluteUrl(`/${lang}/apps/${app.slug}`),
    image: absoluteUrl(app.icon),
    inLanguage: lang,
    ...(app.releaseDate ? { datePublished: app.releaseDate } : {}),
    ...(stores.length > 0 ? { installUrl: stores[0], sameAs: stores } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

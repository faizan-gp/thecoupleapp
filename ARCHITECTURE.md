# Architecture

Marketing / catalog hub for the TheCoupleApp library. Next.js 16 (App Router), React 19 Server
Components, Tailwind 4, TypeScript strict. Every page is statically generated per locale — full
HTML on first byte, zero JS required to read anything. See [requirement.md](requirement.md) for
the product spec.

## File structure

```
thecoupleapp/
├── proxy.ts                    # Next 16 middleware: locale detection → one-hop 307 (/apps → /en/apps)
├── next.config.ts              # Security headers (CSP compatible with inline JSON-LD)
├── .env.example                # NEXT_PUBLIC_SITE_URL — the only place the domain lives
│
├── content/
│   └── apps.ts                 # App catalog: typed, single source of truth. Adding an app = one entry + assets
│
├── dictionaries/               # One JSON per locale; en.json is the schema
│   ├── en.json  es.json  fr.json  de.json  pt.json  hi.json  ar.json
│
├── lib/
│   ├── site.ts                 # siteUrl / absoluteUrl (from NEXT_PUBLIC_SITE_URL)
│   ├── apps.ts                 # ONLY sanctioned reader of content/apps.ts (+ localized() fallback)
│   ├── i18n/
│   │   ├── locales.ts          # THE locale array (code/label/dir) — add a language here + one dictionary
│   │   └── dictionaries.ts     # server-only getDictionary(lang), deep en-fallback with build warnings
│   └── seo/
│       ├── metadata.ts         # localeAlternates(): self-canonical + hreflang for all locales + x-default
│       └── json-ld.ts          # Organization, WebSite, SoftwareApplication, BreadcrumbList, FAQPage builders
│
├── components/
│   ├── layout/                 # Header (no-JS <details> mobile nav), Footer, LanguageSwitcher (client island)
│   ├── apps/                   # AppCard, ComingSoonCard, StoreBadges
│   └── seo/JsonLd.tsx          # Sanitized server-rendered <script type="application/ld+json">
│
├── app/
│   ├── globals.css             # Tailwind + design tokens (CSS variables; design pass edits only this)
│   ├── favicon.ico
│   ├── sitemap.ts              # all pages × all locales, each with full hreflang alternates
│   ├── robots.ts               # allow all + sitemap reference
│   ├── manifest.ts
│   ├── opengraph-image.tsx     # site-wide default OG (next/og)
│   └── [lang]/                 # ALL pages are locale-prefixed; root layout lives here (Next 16 i18n pattern)
│       ├── layout.tsx          # <html lang dir>, metadataBase, title template, Org+WebSite JSON-LD,
│       │                       #   generateStaticParams (7 locales), dynamicParams=false
│       ├── page.tsx            # Landing: hero(h1) → released grid → coming-soon → why-a-library
│       ├── not-found.tsx       # Localized 404 (real HTTP 404; locale via next/root-params)
│       ├── apps/
│       │   ├── page.tsx        # Full catalog in HTML (filters later = progressive enhancement)
│       │   └── [slug]/
│       │       ├── page.tsx    # Per-app SEO surface: SoftwareApplication + FAQPage + Breadcrumb JSON-LD
│       │       └── opengraph-image.tsx   # per-app, per-locale OG image
│       ├── about/page.tsx  contact/page.tsx  privacy/page.tsx  terms/page.tsx
│
└── public/
    ├── icon.svg                # brand icon (placeholder)
    └── apps/<slug>/            # per-app assets: icon.svg, screenshots/
```

## How indexing works (Google alignment)

- **Static HTML per locale.** `generateStaticParams` pre-renders every page for all 7 locales
  (`●` SSG in the build output). View-source shows complete localized content; no client fetching.
- **One canonical URL per page per language**, self-referencing, plus `hreflang` link tags for all
  locales and `x-default` → English. Emitted by every page via `localeAlternates()` and mirrored in
  `sitemap.xml` (`xhtml:link` alternates), exactly as Google's localized-versions guidance asks.
- **Locale routing**: sub-path (`/en/...`), negotiated in `proxy.ts` (cookie → `Accept-Language` →
  `en`) with a single 307 hop and no redirect chains. Locale-prefixed URLs are never redirected, so
  Googlebot (which crawls without cookies) reaches every language version directly.
- **Each app = its own indexable page** at `/{lang}/apps/{slug}` with unique title/description/
  keywords per locale (from the catalog's `seo` field), unique descriptive copy, `SoftwareApplication`
  + `FAQPage` + `BreadcrumbList` structured data, and a generated OG image. Slugs are permanent.
- **Semantics**: one `h1` per page, ordered headings, `<header>/<nav aria-label>/<main>/<footer>`
  landmarks, apps as `<article>` in `<ul>` grids, store links as real `<a>` with descriptive names,
  skip-link, RTL via `dir="rtl"` + logical properties (`ms-*/me-*/start/end`).
- **404s are real 404s**; unknown locales are rejected (`dynamicParams = false`).

## Conventions

- **Add a language**: one entry in `lib/i18n/locales.ts` + one `dictionaries/<code>.json`. Missing
  keys fall back to English with a build-log warning — never an empty string in HTML.
- **Add an app**: one entry in `content/apps.ts` + assets in `public/apps/<slug>/`. No layout code.
- **Read the catalog only through `lib/apps.ts`** so a future CMS/DB swap (→ ISR, never client
  fetching) touches one file.
- **Client components are islands only** (currently just `LanguageSwitcher`); everything else is a
  Server Component. The mobile menu is a native `<details>` — works with JS disabled.
- **No hardcoded domain** — everything derives from `NEXT_PUBLIC_SITE_URL`.
- **Future room** (design-for, per spec §12): `app/[lang]/blog/[slug]` slots in beside `apps/`;
  the newsletter capture slot is marked in the app-detail template.

## Pending milestones

- **M4 — design**: run the `frontend-design` skill (tokens in `globals.css`, real typefaces incl.
  Devanagari/Arabic subsets via `next/font`), then audit with `web-design-guidelines`. Current UI is
  a deliberately unstyled semantic skeleton.
- **M5 — launch**: finalize legal copy + store URLs, Lighthouse ≥ 95 verification, deploy, submit
  sitemap in Search Console.

## CI gates

`npm run build` (fails on type errors and missing routes), `npx tsc --noEmit`, `npm run lint` —
all currently clean.

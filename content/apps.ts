import type { Locale } from "@/lib/i18n/locales";

/**
 * App catalog — the single source of truth for every app in the library.
 *
 * Adding a new app = one entry here + assets under /public/apps/<slug>/.
 * No layout code changes. Never rename a released slug (URLs are the contract);
 * if forced, add a redirect in next.config.ts.
 *
 * Read this file only through the accessors in lib/apps.ts so a future move to
 * a DB/CMS touches one file.
 */

/** English is mandatory; other locales fall back to it (with a build warning). */
export type Localized<T> = { en: T } & Partial<Record<Locale, T>>;

export type AppCategory =
  | "communication"
  | "planning"
  | "memories"
  | "finance"
  | "wellness"
  | "fun";

export type AppStatus = "released" | "coming-soon" | "beta";

/**
 * The parts of a relationship the library sets out to cover, in the order they
 * are presented. Every category has at most one app for now and most have none
 * — the landing page's library board reads this list to show which areas are
 * filled and which are still open.
 */
export const appCategories: AppCategory[] = [
  "communication",
  "planning",
  "memories",
  "finance",
  "wellness",
  "fun",
];

export type CoupleApp = {
  /** URL segment. Stable, English, lowercase-kebab. */
  slug: string;
  /** Brand name — not translated. */
  name: string;
  category: AppCategory;
  status: AppStatus;
  /** ISO date, set when released. */
  releaseDate?: string;
  /** Path under /public. */
  icon: string;
  screenshots: { src: string; width: number; height: number; alt: Localized<string> }[];
  stores: { appStore?: string; playStore?: string; web?: string };
  tagline: Localized<string>;
  /** 1–2 unique paragraphs per app — its long-tail SEO surface. */
  description: Localized<string>;
  features: Localized<{ title: string; body: string }[]>;
  faq?: Localized<{ q: string; a: string }[]>;
  seo: Localized<{ title: string; description: string; keywords?: string[] }>;
};

export const apps: CoupleApp[] = [
  {
    slug: "hourstory",
    name: "HourStory",
    category: "memories",
    status: "released",
    icon: "/apps/hourstory/icon.svg",
    screenshots: [],
    stores: {
      appStore: "https://apps.apple.com/us/app/hourstory-couples-journal/id6787663620",
    },
    tagline: {
      en: "Your day has a story — shared with them, one hour at a time",
    },
    description: {
      en: "By evening, the details fade — not because you don't care, but because memory is unkind to the small things, and it's the small things that make a day feel real. HourStory gently asks what's around you once an hour: a photo, a five-second video, a voice note. Answer or skip — there's no streak to protect. By evening, you and your partner have watched each other's whole day unfold instead of trading one flat \"how was your day?\"",
    },
    features: {
      en: [
        {
          title: "One nudge an hour",
          body: "A gentle prompt asks what's around you right now — a photo, a five-second video, or a voice note. No feed to fill, no streak to protect.",
        },
        {
          title: "Watch each other's day",
          body: "Every hour you both capture unlocks on a shared timeline, so you watch your partner's day replay like a film instead of asking about it after the fact.",
        },
        {
          title: "Private, just the two of you",
          body: "No public feed, no algorithm, no strangers — everything you capture stays between you and the one person you're paired with.",
        },
      ],
    },
    faq: {
      en: [
        { q: "Is HourStory free?", a: "HourStory is free to download, with an optional premium upgrade." },
        {
          q: "Does my partner need the app too?",
          a: "Yes — HourStory is built for two. You each capture your own hours, and you both watch the other's day unfold.",
        },
      ],
    },
    seo: {
      en: {
        title: "HourStory — A shared journal for couples apart during the day",
        description: "HourStory asks what's around you once an hour — a photo, a video, a voice note — so your partner can watch your day unfold instead of asking how it went. Free on the App Store.",
        keywords: [
          "couples journal app",
          "long distance couples app",
          "hourly photo journal for couples",
          "shared journal for partners",
        ],
      },
    },
  },
];

/**
 * Canonical site origin. Drives metadataBase, sitemap, robots, and JSON-LD —
 * never hardcode the domain elsewhere.
 *
 * Falls back to the production domain (not localhost) when NODE_ENV is
 * "production" so a missing NEXT_PUBLIC_SITE_URL in a deploy env can't
 * silently bake localhost into canonical/metadataBase URLs.
 */
const fallbackSiteUrl =
  process.env.NODE_ENV === "production" ? "https://thecoupleapp.com" : "http://localhost:3000";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Public support address — shown in the footer and on the contact page. */
export const supportEmail = "hello@thecoupleapp.com";

/**
 * The person behind the library. Proper nouns live here rather than in the
 * dictionaries because they are not translated — only the prose around them
 * is. Everything here is supplied by the person it describes.
 */
export const author = {
  name: "Faizan Gillani",
  linkedin: "https://www.linkedin.com/in/fyizan/",
  /** Feeds the Person schema's knowsAbout; also rendered as the stack list. */
  stack: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Java Spring Boot",
    "Node.js",
    "Flutter",
    "MySQL",
    "MongoDB",
    "Kafka",
    "Docker",
  ],
} as const;

/**
 * Live social profiles, rendered in the footer and published as Organization
 * `sameAs`. Deliberately empty: there are no profiles yet, and linking to
 * ones that don't exist creates dead links and an invalid sameAs graph.
 * Add a real, live profile URL here and it appears in both places.
 */
export const socialLinks: { label: string; url: string }[] = [];

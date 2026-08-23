import type { Localized } from "./apps";

/**
 * Blog post catalog — the single source of truth for every post.
 *
 * Adding a post = one entry here + an image under /public/blog/<slug>/ if it
 * has one. No layout code changes. Never rename a published slug (URLs are
 * the contract); if forced, add a redirect in next.config.ts.
 *
 * Read this file only through the accessors in lib/posts.ts so a future move
 * to a DB/CMS touches one file.
 *
 * Empty on purpose: there is no post content yet. The blog index and post
 * pages both render correctly with zero entries — see app/[lang]/blog.
 */

export type BlogPost = {
  /** URL segment. Stable, English, lowercase-kebab. */
  slug: string;
  /** ISO date. Posts are listed newest first. */
  publishedDate: string;
  /** Path under /public, or omitted for a text-only post. */
  coverImage?: string;
  title: Localized<string>;
  /** One or two sentences — used as the index teaser and the meta description. */
  summary: Localized<string>;
  /** Paragraphs, in order. Keep each paragraph plain text — no embedded markup. */
  body: Localized<string[]>;
};

export const posts: BlogPost[] = [];

import { posts, type BlogPost } from "@/content/posts";

/**
 * The only sanctioned way to read the post catalog. If it later moves to a
 * DB/CMS, only this file changes.
 */

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

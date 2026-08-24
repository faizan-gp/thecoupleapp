"use client";

import { useEffect, useState } from "react";

/**
 * Sticky "on this page" rail. Tracks which section heading is closest to the
 * top of the viewport via IntersectionObserver and highlights it — the
 * headings themselves stay the single source of truth (this reads their ids
 * off the DOM rather than duplicating scroll math per link).
 */
export function TableOfContents({
  items,
  label,
}: {
  items: { id: string; text: string }[];
  label: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(top.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={label} className="article-toc">
      <p className="eyebrow article-toc-title">{label}</p>
      <ul className="article-toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={
                item.id === activeId
                  ? "article-toc-link article-toc-link-active"
                  : "article-toc-link"
              }
              aria-current={item.id === activeId ? "true" : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLink = { href: string; label: string };

/**
 * Navigation links that know which one you are on.
 *
 * A client island for two reasons: the current page carries
 * `aria-current="page"`, and following a link closes the <details> disclosure
 * it sits in — client-side navigation keeps the DOM, so without this the
 * mobile menu would stay open over the page you just moved to. The links
 * themselves are real anchors, server-rendered and crawlable, and navigate
 * correctly with JavaScript switched off (where no disclosure survives the
 * page load anyway).
 */
export function closeEnclosingDisclosure(target: EventTarget & Element) {
  target.closest("details[open]")?.removeAttribute("open");
}

export function NavLinks({
  links,
  orientation = "row",
}: {
  links: NavLink[];
  orientation?: "row" | "column";
}) {
  const pathname = usePathname();

  return (
    <ul className={orientation === "row" ? "flex items-center gap-1" : "flex flex-col gap-1"}>
      {links.map((link) => {
        const current = pathname === link.href || pathname?.startsWith(`${link.href}/`);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={current ? "page" : undefined}
              onClick={(event) => closeEnclosingDisclosure(event.currentTarget)}
              className={`block rounded-full px-3 py-2 font-display text-[0.95rem] font-medium transition-colors ${
                current ? "bg-iris-wash text-iris" : "text-muted hover:bg-sunken hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

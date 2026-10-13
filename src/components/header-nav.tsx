"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import type { NavItem } from "@/components/site-header";
import { cn } from "@/lib/utils";

/** "/#about" → "about"; anything else is not a section on the home page. */
function sectionId(href: string): string | null {
  return href.startsWith("/#") ? href.slice(2) : null;
}

/**
 * Desktop section links. The link for the section being read is highlighted,
 * and an accent underline slides between links as the page scrolls.
 */
export function HeaderNav({ items }: { items: NavItem[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string | null>(null);
  // Kept after the highlight clears so the underline fades out where it was.
  const [bar, setBar] = useState({ x: 0, width: 0 });
  const { scrollY } = useScroll();

  // Sections are looked up on every scroll rather than once, because the
  // header outlives the home page: on other routes none are found.
  useMotionValueEvent(scrollY, "change", () => {
    const line = window.innerHeight * 0.35;
    const current =
      items.find((item) => {
        const id = sectionId(item.href);
        const box = id ? document.getElementById(id)?.getBoundingClientRect() : null;
        return box ? box.top <= line && box.bottom > line : false;
      })?.href ?? null;

    if (current === active) return;
    setActive(current);

    const link = current
      ? listRef.current?.querySelector<HTMLElement>(`a[href="${current}"]`)
      : null;
    if (link) setBar({ x: link.offsetLeft, width: link.offsetWidth });
  });

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul ref={listRef} className="relative flex items-center gap-8 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="link py-2 text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                aria-current={item.href === active ? "location" : undefined}
                className={cn(
                  "py-2 transition-colors hover:text-foreground",
                  item.href === active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
        <motion.li
          aria-hidden="true"
          className="absolute -bottom-1.5 left-0 h-px bg-ink"
          initial={false}
          animate={{ x: bar.x, width: bar.width, opacity: active ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 38 }}
        />
      </ul>
    </nav>
  );
}

/** Accent line along the bottom of the header that fills as the page is read. */
export function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  // Stays empty at the top, including on pages too short to scroll.
  const scaleX = useTransform(scrollYProgress, (value) => (scrollY.get() > 0 ? value : 0));

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-px h-px origin-left bg-ink"
      style={{ scaleX }}
    />
  );
}

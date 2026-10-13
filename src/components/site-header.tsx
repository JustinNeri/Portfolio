import Link from "next/link";
import { HeaderNav, ScrollProgress } from "@/components/header-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, site } from "@/data/portfolio";

export type NavItem = { label: string; href: string; external?: boolean };

/** Section links, plus the CV once a real file is configured. */
function getNavItems(): NavItem[] {
  const items: NavItem[] = [...navLinks];
  if (site.cvUrl) {
    items.push({ label: "CV", href: site.cvUrl, external: true });
  }
  return items;
}

export function SiteHeader() {
  const items = getNavItems();

  return (
    <header
      // Named so page transitions leave it in place; see globals.css.
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 border-b border-rule bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8 2xl:max-w-[100rem] 2xl:px-14">
        <Link
          href="/"
          className="group flex items-baseline gap-3"
          aria-label={`${site.name} — home`}
        >
          <span className="font-display text-xl leading-none transition-colors group-hover:text-ink">
            {site.initials}
          </span>
          <span aria-hidden="true" className="label hidden sm:inline">
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-5">
          <HeaderNav items={items} />

          <ThemeToggle />
          <MobileNav items={items} />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}

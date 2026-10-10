import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
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
    <header className="sticky top-0 z-40 border-b border-rule bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
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

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
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
                    className="py-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav items={items} />
      </div>
    </header>
  );
}

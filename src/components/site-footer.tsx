import { ArrowUp } from "lucide-react";
import { site } from "@/data/portfolio";

/** Cached so the page stays static; the year refreshes when the cache does. */
async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-8 text-sm text-muted-foreground sm:px-8">
        <p>
          © <CurrentYear /> {site.name}
        </p>
        <a href="#top" className="link inline-flex items-center gap-1.5 py-1">
          Back to top
          <ArrowUp aria-hidden="true" className="size-4" />
        </a>
      </div>
    </footer>
  );
}

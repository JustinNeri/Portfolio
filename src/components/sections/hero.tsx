import Link from "next/link";
import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { featuredProjects, site } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Hero() {
  const words = site.name.split(" ");
  const surname = words.pop();
  const givenNames = words.join(" ");

  return (
    <section aria-labelledby="hero-title" className="page-grid">
      <div aria-hidden="true" className="hidden lg:block" />
      <div className="min-w-0 pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-28">
        <p className="label">
          {site.school} <span className="text-ink">/</span> {site.location}
        </p>

        <h1
          id="hero-title"
          className="mt-6 font-display text-[clamp(2.5rem,10.5vw,7.5rem)] leading-[0.95]"
        >
          <span className="block">{givenNames}</span>
          <span className="block text-muted-foreground">{surname}</span>
        </h1>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xl font-medium leading-snug sm:text-2xl">{site.role}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{site.intro}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/#projects"
                className={cn(buttonVariants(), "h-12 rounded-md px-6 text-base")}
              >
                View Projects
                <ArrowDown aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/#contact"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 rounded-md bg-transparent px-6 text-base",
                )}
              >
                Contact Me
              </Link>
              {site.cvUrl ? (
                <a
                  href={site.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link inline-flex h-12 items-center gap-2 px-3"
                >
                  <FileText aria-hidden="true" className="size-4" />
                  View CV
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>

          {featuredProjects.length > 0 ? (
            <nav aria-label="Selected work">
              <p className="label pb-3">Selected work</p>
              <ol className="border-t border-border">
                {featuredProjects.map((project, i) => (
                  <li key={project.slug} className="border-b border-border">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group flex items-baseline gap-4 py-3.5"
                    >
                      <span aria-hidden="true" className="label w-5 shrink-0 text-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{project.title}</span>
                        <span className="block text-sm text-muted-foreground">
                          {project.tagline}
                        </span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-all group-hover:text-ink motion-safe:group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
}

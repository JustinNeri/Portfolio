import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { InkUnderline } from "@/components/ink-underline";
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
      <div className="margin-line min-w-0 pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-28">
        <p className="label">
          {site.school} <span className="text-ink">/</span> {site.location}
        </p>

        <h1
          id="hero-title"
          className="mt-6 font-serif text-[clamp(3.25rem,12.5vw,9.5rem)] leading-[0.9] tracking-[-0.02em]"
        >
          <span className="block">{givenNames}</span>
          <span className="relative inline-block pb-[0.08em]">
            {surname}
            <InkUnderline className="absolute bottom-[-0.04em] left-0 h-[0.16em] w-full text-ink" />
          </span>
        </h1>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xl font-medium leading-snug sm:text-2xl">{site.role}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{site.intro}</p>

            <div className="mt-9 flex flex-wrap gap-3">
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

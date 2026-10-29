import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { featuredProjects, site } from "@/data/portfolio";
import { revealOrder } from "@/lib/reveal";
import { cn } from "@/lib/utils";

/**
 * Opening poster: name and actions on the left, the cut-out portrait on the
 * right in front of a soft purple glow. Type and photo step up at xl and 2xl.
 */
function HeroPoster() {
  const portrait = site.portrait;
  const words = site.name.split(" ");
  const surname = words.pop();
  const givenNames = words.join(" ");

  return (
    <div className="relative isolate overflow-hidden border-b border-rule">
      {/* Purple glow behind the portrait: centred on phones, right on desktop. */}
      <div
        aria-hidden="true"
        className="hero-glow absolute inset-0 -z-10 bg-[radial-gradient(75%_45%_at_50%_24%,var(--hero-glow),transparent_72%)] lg:bg-[radial-gradient(40%_76%_at_84%_50%,var(--hero-glow),transparent_72%)]"
      />

      <div className="mx-auto grid w-full max-w-6xl items-end 2xl:max-w-[100rem] 2xl:px-14 gap-x-8 px-5 sm:px-8 lg:min-h-[min(90svh,60rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="relative z-10 order-2 pb-14 pt-8 lg:order-1 lg:self-center lg:py-20">
          <p className="hero-in label lg:text-xs 2xl:text-sm" style={revealOrder(0)}>
            {site.school} <span className="text-ink">/</span> {site.location}
          </p>

          <h1 id="hero-title" className="mt-5 whitespace-nowrap font-poster uppercase lg:mt-6">
            <span className="hero-in block text-[min(10.5vw,4.25rem)] leading-none xl:text-[5rem] 2xl:text-[6rem]" style={revealOrder(1)}>{givenNames}</span>
            <span className="hero-in mt-1 block w-max bg-gradient-to-b from-(--name-from) to-(--name-to) bg-clip-text text-[min(19vw,7.5rem)] leading-[0.95] text-transparent xl:text-[8.75rem] 2xl:text-[9.75rem]" style={revealOrder(2)}>
              {surname}
            </span>
          </h1>

          <p className="hero-in mt-6 max-w-md text-lg font-medium leading-snug sm:text-xl xl:max-w-lg xl:text-2xl 2xl:mt-8 2xl:max-w-xl 2xl:text-[1.75rem]" style={revealOrder(3)}>{site.role}</p>

          <div className="hero-in mt-8 flex flex-wrap items-center gap-3 2xl:mt-10" style={revealOrder(4)}>
            <Link
              href="/#projects"
              className={cn(buttonVariants(), "h-12 rounded-md px-6 text-base xl:h-14 xl:px-8 xl:text-lg")}
            >
              View Projects
              <ArrowDown aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-md bg-transparent px-6 text-base xl:h-14 xl:px-8 xl:text-lg",
              )}
            >
              Contact Me
            </Link>
            {site.cvUrl ? (
              <a
                href={site.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="link inline-flex h-12 items-center gap-2 px-3 xl:h-14 xl:text-lg"
              >
                <FileText aria-hidden="true" className="size-4" />
                View CV
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>

        {portrait ? (
          <div className="order-1 flex justify-center pt-8 lg:order-2 lg:justify-end lg:pt-4">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              priority
              sizes="(min-width: 1536px) 930px, (min-width: 1024px) 700px, 94vw"
              className="hero-portrait h-auto w-[min(94vw,28rem)] max-w-none select-none lg:-mr-8 lg:w-[34rem] xl:-mr-20 xl:w-[min(44rem,86svh)] 2xl:mr-[min(-3rem,calc((100rem-100vw)/2-2rem))] 2xl:w-[min(58rem,94svh)]"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <HeroPoster />

      <div className="page-grid">
        <div aria-hidden="true" className="hidden lg:block" />
        <div className="min-w-0 pb-20 pt-14 lg:pb-28 lg:pt-20">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center lg:gap-16">
            <p className="max-w-xl text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">
              {site.intro}
            </p>

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
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrowserFrame, hostOf } from "@/components/browser-frame";
import { ProjectLinks } from "@/components/project-links";
import { TechList } from "@/components/tech-list";
import { getProject, publishedProjects, site } from "@/data/portfolio";

// Every case study is prerendered from the data file, so there is no instant
// shell to stream into; unknown slugs render the not-found page.
export const instant = false;

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.tagline}`;
  const images = project.cover
    ? [
        {
          url: project.cover.src,
          width: project.cover.width,
          height: project.cover.height,
          alt: project.cover.alt,
        },
      ]
    : undefined;

  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      siteName: site.name,
      title,
      description: project.description,
      images,
    },
    twitter: { card: "summary_large_image", title, description: project.description, images },
  };
}

/** A labelled row of the case study: the label in a side column, content beside it. */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-border py-10 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 lg:py-12">
      <h2 className="label pt-1.5 text-foreground">{label}</h2>
      <div className="min-w-0 max-w-2xl">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const position = publishedProjects.findIndex((p) => p.slug === project.slug);
  const next =
    publishedProjects.length > 1
      ? publishedProjects[(position + 1) % publishedProjects.length]
      : null;

  return (
    <article aria-labelledby="project-title" className="page-grid">
      <div aria-hidden="true" className="hidden pt-[4.3rem] lg:block">
        <span className="label text-ink">{String(position + 1).padStart(2, "0")}</span>
      </div>

      <div className="min-w-0 pb-20 pt-10 lg:pb-28 lg:pt-16">
        <Link href="/#projects" className="link inline-flex items-center gap-1.5 py-1 text-sm">
          <ArrowLeft aria-hidden="true" className="size-4" />
          All projects
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="label">
            Case study{project.year ? <> — {project.year}</> : null}
          </p>
          <h1
            id="project-title"
            className="mt-4 font-display text-[clamp(2.25rem,9vw,5.5rem)] leading-[0.95]"
          >
            {project.title}
          </h1>
          <p className="mt-4 text-xl font-medium sm:text-2xl">{project.tagline}</p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-7">
            <ProjectLinks project={project} />
          </div>
        </header>

        {project.cover ? (
          <figure className="mt-12 lg:mt-16">
            <BrowserFrame
              image={project.cover}
              host={hostOf(project.liveUrl)}
              sizes="(min-width: 1152px) 960px, 100vw"
              priority
            />
          </figure>
        ) : null}

        <div className="mt-14 lg:mt-20">
          <Row label="The problem">
            <p className="text-lg leading-relaxed">{project.problem}</p>
          </Row>

          {project.features.length > 0 ? (
            <Row label="What it does">
              <ul className="space-y-3.5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-4 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-px w-4 shrink-0 bg-ink"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Row>
          ) : null}

          {project.decisions && project.decisions.length > 0 ? (
            <Row label="Engineering decisions">
              <dl className="space-y-8">
                {project.decisions.map((decision) => (
                  <div key={decision.title}>
                    <dt className="font-display text-xl leading-tight">{decision.title}</dt>
                    <dd className="mt-2 leading-relaxed text-muted-foreground">
                      {decision.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Row>
          ) : null}

          {project.contribution ? (
            <Row label="My contribution">
              <p className="text-lg leading-relaxed">{project.contribution}</p>
            </Row>
          ) : null}

          {project.technologies.length > 0 ? (
            <Row label="Technologies">
              <TechList
                items={project.technologies}
                label={`Technologies used in ${project.title}`}
              />
            </Row>
          ) : null}

          {project.gallery.length > 0 ? (
            <Row label="Screens">
              <ul className="space-y-10">
                {project.gallery.map((image) => (
                  <li key={image.src}>
                    <figure>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 768px) 672px, 100vw"
                        className="h-auto w-full rounded-lg border border-border"
                      />
                      {image.caption ? (
                        <figcaption className="mt-3 text-sm text-muted-foreground">
                          {image.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  </li>
                ))}
              </ul>
            </Row>
          ) : null}

          {project.nextSteps && project.nextSteps.length > 0 ? (
            <Row label="What I'd do next">
              <ul className="space-y-3.5">
                {project.nextSteps.map((step) => (
                  <li key={step} className="flex gap-4 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-[0.7em] h-px w-4 shrink-0 bg-ink"
                    />
                    {step}
                  </li>
                ))}
              </ul>
            </Row>
          ) : null}
        </div>

        {next && next.slug !== project.slug ? (
          <nav aria-label="More projects" className="border-t border-border pt-10">
            <Link href={`/projects/${next.slug}`} className="group inline-block">
              <span className="label block">Next project</span>
              <span className="mt-2 flex items-center gap-3 font-display text-3xl leading-none transition-colors group-hover:text-ink sm:text-4xl">
                {next.title}
                <ArrowRight
                  aria-hidden="true"
                  className="size-7 transition-transform motion-safe:group-hover:translate-x-1"
                />
              </span>
            </Link>
          </nav>
        ) : null}
      </div>
    </article>
  );
}

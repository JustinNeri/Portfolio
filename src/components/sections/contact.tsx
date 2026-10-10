import type { ReactNode } from "react";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { sectionCopy, site } from "@/data/portfolio";

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external: boolean;
};

/** Strips the protocol so a profile URL reads as "github.com/name". */
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/** Only the channels that have real details in the data file. */
function getChannels(): Channel[] {
  const { email, github, linkedin } = site.contact;
  const channels: Channel[] = [];

  if (email) {
    channels.push({
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: <Mail aria-hidden="true" className="size-5" />,
      external: false,
    });
  }
  if (github) {
    channels.push({
      label: "GitHub",
      value: displayUrl(github),
      href: github,
      icon: <GitHubIcon className="size-5" />,
      external: true,
    });
  }
  if (linkedin) {
    channels.push({
      label: "LinkedIn",
      value: displayUrl(linkedin),
      href: linkedin,
      icon: <LinkedInIcon className="size-5" />,
      external: true,
    });
  }
  if (site.resumeUrl) {
    channels.push({
      label: "Résumé",
      value: "View or download",
      href: site.resumeUrl,
      icon: <FileText aria-hidden="true" className="size-5" />,
      external: true,
    });
  }
  return channels;
}

export function Contact() {
  const channels = getChannels();
  if (channels.length === 0) return null;

  return (
    <Section
      id="contact"
      index="04"
      title="Contact"
      lede={sectionCopy.contact}
    >
      <Reveal className="mt-12">
        <ul className="max-w-3xl border-t border-border">
          {channels.map((channel) => (
            <li key={channel.label} className="border-b border-border">
              <a
                href={channel.href}
                {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex items-center gap-4 py-5 sm:gap-6"
              >
                <span className="text-muted-foreground transition-colors group-hover:text-ink">
                  {channel.icon}
                </span>
                <span className="min-w-0 flex-1 sm:flex sm:items-baseline sm:gap-6">
                  <span className="label block sm:w-24 sm:shrink-0">{channel.label}</span>
                  <span className="block break-words font-serif text-2xl leading-tight transition-colors group-hover:text-ink sm:text-3xl">
                    {channel.value}
                  </span>
                </span>
                {channel.external ? (
                  <span className="sr-only">(opens in a new tab)</span>
                ) : null}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-muted-foreground transition-all group-hover:text-ink motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

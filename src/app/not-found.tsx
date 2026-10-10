import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="page-grid">
      <div aria-hidden="true" className="hidden lg:block" />
      <div className="margin-line min-w-0 py-24 lg:py-36">
        <p className="label text-ink">404</p>
        <h1 className="mt-4 font-serif text-6xl leading-none tracking-tight sm:text-7xl">
          No entry on this page.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="link mt-8 inline-flex items-center gap-1.5 py-1">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to the home page
        </Link>
      </div>
    </div>
  );
}

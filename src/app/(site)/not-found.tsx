import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Button } from "@/components/ui";

// A 404 always returns a real 404 HTTP status regardless of this metadata,
// but explicitly marking it noindex/nofollow keeps it out of search results
// and stops link equity from flowing through 404 pages, per SEO best practice.
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-grid">
      <Container className="flex flex-col items-center text-center">
        <span className="font-display text-8xl font-semibold text-indigo/20">404</span>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-ink-soft">
          The page you&apos;re looking for may have been moved or never existed. Try searching, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to homepage</Button>
          <Button href="/search" variant="secondary">Search the site</Button>
        </div>
        <p className="mt-8 text-xs text-ink-soft">
          Looking for a service or city page?{" "}
          <Link href="/services" className="text-indigo underline">Browse services</Link> or{" "}
          <Link href="/locations" className="text-indigo underline">browse locations</Link>.
        </p>
      </Container>
    </section>
  );
}

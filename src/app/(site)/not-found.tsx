import Link from "next/link";
import type { Metadata } from "next";
import { Search, Home, Briefcase, MapPin, ArrowRight } from "lucide-react";
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
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-grid">
      <div
        className="absolute -top-32 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "linear-gradient(120deg, #4338CA, #0891A8)" }}
      />
      <Container className="relative flex flex-col items-center py-16 text-center">
        <span className="animate-fade-up font-display text-[10rem] font-bold leading-none tracking-tight text-indigo/10 sm:text-[14rem]">
          404
        </span>

        <h1
          className="animate-fade-up -mt-8 max-w-lg text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          style={{ animationDelay: "0.05s" }}
        >
          This page took a wrong turn.
        </h1>
        <p
          className="animate-fade-up mt-4 max-w-md text-pretty text-base leading-7 text-ink-soft"
          style={{ animationDelay: "0.1s" }}
        >
          The page you&apos;re looking for may have been moved, renamed, or never existed. Let&apos;s get you
          back on track.
        </p>

        <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.15s" }}>
          <Button href="/">
            <Home className="mr-1 size-3.5" /> Back to homepage
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>

      
      </Container>
    </section>
  );
}
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";

export type Result = { title: string; type: string; href: string; description: string };

export function SearchClient({ index }: { index: Result[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return index.filter((r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)).slice(0, 20);
  }, [query, index]);

  return (
    <section className="min-h-[70vh] py-20 sm:py-28">
      <Container className="max-w-2xl">
        <Eyebrow>Search</Eyebrow>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Search DevelopX Web</h1>
        <div className="relative mt-8">
          <SearchIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, cities, or articles…"
            className="w-full rounded-full border border-line bg-paper py-3.5 pl-11 pr-4 text-sm text-ink outline-none focus:border-indigo"
          />
        </div>

        <div className="mt-8 flex flex-col divide-y divide-line">
          {query.trim() && results.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink-soft">No results for &ldquo;{query}&rdquo;. Try a service name or city.</p>
          ) : null}
          {results.map((r) => (
            <Link key={r.href} href={r.href} className="group flex items-center justify-between gap-4 py-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-indigo">{r.type}</span>
                <h2 className="font-display text-sm font-semibold text-ink">{r.title}</h2>
                <p className="mt-1 text-xs leading-5 text-ink-soft">{r.description}</p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-indigo" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

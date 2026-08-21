import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { getProjects } from "@/lib/content";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Case Studies | ${site.name}`,
  description: "In-depth case studies covering the challenges, solutions and measurable results behind DevelopX Web's client projects.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const projects = await getProjects();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Case studies</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            The numbers behind the projects.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            Every project starts with a specific business problem. Here&apos;s how we approached each one, and what
            changed after launch.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container className="flex flex-col divide-y divide-line border-y border-line">
          {projects.map((p) => (
            <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <span className="font-mono text-xs uppercase tracking-wider text-indigo">{p.industry.replace("-", " & ")} · {p.city}</span>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">{p.name}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{p.summary}</p>
              </div>
              <div className="flex shrink-0 gap-8">
                {p.results.slice(0, 2).map((r) => (
                  <div key={r.label}>
                    <p className="font-display text-lg font-semibold text-indigo">{r.value}</p>
                    <p className="text-xs text-ink-soft">{r.label}</p>
                  </div>
                ))}
              </div>
              <ArrowRight className="hidden size-5 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-indigo sm:block" />
            </Link>
          ))}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}

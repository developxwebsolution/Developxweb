import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { getTechnologies } from "@/lib/content";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Technologies We Use | ${site.name}`,
  description: "The frameworks, languages and tools DevelopX Web uses to build fast, secure, maintainable websites and software: Next.js, React, Node.js, PostgreSQL and more.",
  path: "/technologies",
});

export default async function TechnologiesPage() {
  const technologies = await getTechnologies();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Technologies", path: "/technologies" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Technologies</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Modern tools, chosen for the job.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            We pick the stack based on what your project actually needs — not what&apos;s trending, and not a single
            &ldquo;one tool fits everything&rdquo; default.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((cat) => (
            <div key={cat.category} className="rounded-2xl border border-line p-6">
              <h2 className="font-mono text-xs uppercase tracking-wider text-indigo">{cat.category}</h2>
              <ul className="mt-4 space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-ink-soft">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}

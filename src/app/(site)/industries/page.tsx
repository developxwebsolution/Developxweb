import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { getProjects, getIndustries } from "@/lib/content";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Industries We Serve | ${site.name}`,
  description: "DevelopX Web builds industry-aware websites and software for healthcare, real estate, education, e-commerce, fintech, hospitality, manufacturing and more.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const [projects, industries] = await Promise.all([getProjects(), getIndustries()]);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Industries</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Domain-aware development, not generic templates.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            A hospital website and a D2C storefront solve completely different problems. We build for the specifics
            of your industry, not a one-size-fits-all layout.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => {
            const example = projects.find((p) => p.industry === ind.slug);
            return (
              <div key={ind.slug} className="flex flex-col gap-3 rounded-2xl border border-line p-6">
                <h2 className="font-display text-lg font-semibold text-ink">{ind.name}</h2>
                <p className="text-sm leading-6 text-ink-soft">{ind.summary}</p>
                {example ? (
                  <p className="mt-auto pt-3 text-xs text-ink-soft">
                    Example: <span className="text-indigo">{example.name}</span>
                  </p>
                ) : null}
              </div>
            );
          })}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}

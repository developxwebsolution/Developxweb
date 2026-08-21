import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { ProjectCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { getProjects } from "@/lib/content";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Portfolio | Websites & Software We've Built | ${site.name}`,
  description: "Browse DevelopX Web's portfolio of websites, web applications, e-commerce stores and custom software delivered for clients across India.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Portfolio</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Real projects, real results.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            A selection of websites, web applications and software we&apos;ve shipped for clients across India — with
            the actual outcomes, not just screenshots.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}

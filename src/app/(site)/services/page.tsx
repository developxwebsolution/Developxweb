import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { ServiceCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { getServices } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Website Development & Software Services in India",
  description:
    "Explore all DevelopX Web services: website development, Next.js and React development, custom software, CRM/ERP builds, SEO, and more — each with fixed pricing and timelines.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Services</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            One senior team, every service you need.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            From a first business website to a full custom platform, every service below is delivered by the same
            in-house engineering team — with a fixed quote and timeline before work begins.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

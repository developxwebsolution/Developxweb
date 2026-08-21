import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { getFaqs } from "@/lib/content";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `FAQ | ${site.name}`,
  description: "Answers to common questions about pricing, timelines, process and support for DevelopX Web's website and software development services.",
  path: "/faq",
});

export default async function FaqPage() {
  const globalFaqs = await getFaqs();

  return (
    <>
      <JsonLd data={[faqSchema(globalFaqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Questions we get asked the most.
          </h1>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <FaqAccordion items={globalFaqs} />
        </Container>
      </section>
      <CtaSection title="Still have a question?" description="Send it over — we'd rather answer directly than make you dig through an FAQ page." />
    </>
  );
}

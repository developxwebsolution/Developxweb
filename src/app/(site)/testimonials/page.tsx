import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { TestimonialCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { getTestimonials } from "@/lib/content";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Client Testimonials | ${site.name}`,
  description: "What clients across India say about working with DevelopX Web on their website, web application and software projects.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Testimonials", path: "/testimonials" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Testimonials</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            What it&apos;s like to work with us.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            Unedited feedback from clients across industries and cities — including the pushback we&apos;ve gotten
            right, not just the praise.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}

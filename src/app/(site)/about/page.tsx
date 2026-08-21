import { Container } from "@/components/container";
import { SectionHeading, Eyebrow, Badge } from "@/components/ui";
import { TestimonialCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";
import { getTestimonials } from "@/lib/content";

export const metadata = buildMetadata({
  title: "About DevelopX Web — Website Development Company in India",
  description:
    "DevelopX Web is a Noida-based full-stack website design and software development company. Learn about our team, principles and how we work.",
  path: "/about",
});

const values = [
  { title: "Ship, don't just design", detail: "A beautiful comp that never becomes a working, indexed, fast website has delivered nothing. We measure success in launched, ranking, converting sites." },
  { title: "Say the hard thing early", detail: "If a request will hurt your site speed or SEO, we tell you before we build it, not after you've paid for it." },
  { title: "Own your stack", detail: "You should never be locked into an agency to update your own website. Every handover includes full source and access." },
  { title: "Plain-language reporting", detail: "No jargon-padded status updates. You get plain explanations of what's done, what's next and what we need from you." },
];

const timeline = [
  { year: "2018", detail: "Founded in Noida as a two-person WordPress shop building sites for local businesses." },
  { year: "2020", detail: "Moved fully to custom development on React and Node.js as client needs outgrew page builders." },
  { year: "2022", detail: "Added a dedicated web application and custom software practice for CRM, ERP and dashboard builds." },
  { year: "2024", detail: "Standardised on Next.js and TypeScript across all new projects; crossed 200 shipped projects." },
  { year: "2026", detail: "Serving clients across 18 countries, with a core team based in Noida and the wider Delhi-NCR region." },
];

export default async function AboutPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Eyebrow>About us</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            We build the websites we&apos;d want to be judged by.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            {site.name} is a full-stack website design and software development company headquartered in{" "}
            {site.addressLocality}, working with businesses across India and beyond. We build custom-coded
            websites, web applications and software — not page-builder templates — because that&apos;s what holds
            up as a business grows.
          </p>
        </Container>
      </section>

      <section className="border-b border-line py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="What we believe" title="A short list of things we won't compromise on." />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{v.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-raised py-20 sm:py-28">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Our story" title="From a two-person shop to a full-stack studio." />
          <div className="mt-12 space-y-8 border-l border-line pl-6">
            {timeline.map((t) => (
              <div key={t.year} className="relative">
                <span className="absolute -left-[29px] top-1 flex size-3 items-center justify-center rounded-full bg-indigo" />
                <Badge className="mb-2">{t.year}</Badge>
                <p className="text-sm leading-6 text-ink-soft">{t.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="In their words" title="Trusted by teams who've been burnt by agencies before." align="center" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection title="Want to work with us?" description="Tell us about your project and we'll get back to you within one business day." />
    </>
  );
}

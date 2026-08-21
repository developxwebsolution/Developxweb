import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, Clock, IndianRupee } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow, Button, Badge } from "@/components/ui";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { ICONS } from "@/components/icon-map";
import { JsonLd } from "@/components/json-ld";
import { buildMetadataWithOverride, serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { getServices, getServiceBySlug, getCities } from "@/lib/content";
import { site } from "@/data/site";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadataWithOverride({
    title: `${service.name} Company in India | ${site.name}`,
    description: `${service.summary} Starting at ${service.startingPrice}, typical delivery in ${service.timeline}.`,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [services, cities] = await Promise.all([getServices(), getCities()]);


  const Icon = ICONS[service.icon];
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: service.name, description: service.description, url: `${site.url}/services/${service.slug}` }),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Eyebrow>Services / {service.name}</Eyebrow>
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-indigo-soft text-indigo">
              <Icon className="size-7" />
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">{service.name} Company in India</h1>
          </div>
          <p className="mt-6 text-base leading-7 text-ink-soft">{service.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Badge>
              <IndianRupee className="mr-1 inline size-3" /> Starting {service.startingPrice}
            </Badge>
            <Badge>
              <Clock className="mr-1 inline size-3" /> {service.timeline}
            </Badge>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Get a quote for {service.shortName}</Button>
            <Button href="/portfolio" variant="secondary">See related work</Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">What&apos;s included</h2>
            <ul className="mt-6 space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-indigo" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Deliverables</h2>
            <ul className="mt-6 space-y-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-cyan" /> {d}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink">Our process for {service.shortName.toLowerCase()}</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-2">
                <span className="font-mono text-sm text-indigo">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-base font-semibold text-ink">{step.title}</h3>
                <p className="text-sm leading-6 text-ink-soft">{step.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">Frequently asked questions</h2>
          <div className="mt-8">
            <FaqAccordion items={service.faqs} />
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink">Available in your city</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/web-development-company-${c.slug}`}
                className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft hover:border-indigo hover:text-indigo"
              >
                {service.shortName} in {c.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink">Related services</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center justify-between rounded-2xl border border-line p-5 hover:border-indigo">
                <span className="text-sm font-medium text-ink">{s.shortName}</span>
                <ArrowRight className="size-4 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-indigo" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection title={`Ready to start your ${service.shortName.toLowerCase()} project?`} />
    </>
  );
}

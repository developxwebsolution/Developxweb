import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow, Button, Badge, SectionHeading } from "@/components/ui";
import { ProjectCard, TestimonialCard, CityCard } from "@/components/cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { ContactForm } from "@/components/contact-form";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { buildMetadataWithOverride, localBusinessSchema, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { cityFaqs, cityIntroExtra, cityProcessNote, cityServiceNote, cityLocalSeoNote, cityWhyLocalMatters } from "@/lib/city-content";
import { getCities, getCityBySlug, getServices, getProjects, getTestimonials, getIndustries, getTechnologies } from "@/lib/content";
import { site } from "@/data/site";

const CITY_PREFIX = "web-development-company-";

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return {};
  return buildMetadataWithOverride({
    title: `Best Website Development Company in ${city.name} | ${site.name}`,
    description: `Top-rated website development company in ${city.name}. Custom website design, Next.js & React development, e-commerce and web applications for ${city.name} businesses. Get a fixed quote.`,
    path: `/${CITY_PREFIX}${city.slug}`,
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();

  const [cities, services, projects, testimonials, industries, technologies] = await Promise.all([
    getCities(),
    getServices(),
    getProjects(),
    getTestimonials(),
    getIndustries(),
    getTechnologies(),
  ]);

  const nearbyCities = city.nearby.map((slug) => cities.find((c) => c.slug === slug)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const cityIndustries = industries.filter((i) => city.localIndustries.includes(i.slug));
  const otherIndustries = industries.filter((i) => !city.localIndustries.includes(i.slug)).slice(0, 4);
  const cityTestimonials = testimonials.filter((t) => t.city === city.name);
  const featuredTestimonials = cityTestimonials.length >= 2 ? cityTestimonials : testimonials.slice(0, 3);
  const featuredProjects = projects.slice(0, 3);
  const faqs = cityFaqs(city);
  const primaryServices = services.slice(0, 9);
  const mapEmbedSrc = `https://www.google.com/maps?q=${city.lat},${city.lng}&z=11&output=embed`;

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema({
            city: city.name,
            region: city.state,
            description: `${site.name} is a website development company serving ${city.name}, ${city.state}, offering custom website design, web application development and software development.`,
            url: `${site.url}/${CITY_PREFIX}${city.slug}`,
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: city.name, path: `/${CITY_PREFIX}${city.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Eyebrow>
            <MapPin className="mr-1 inline size-3" /> {city.name}, {city.state}
          </Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Website Development Company in {city.name}
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">{city.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">Get a fixed quote</Button>
            <Button href="/portfolio" variant="secondary">See our work</Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {city.businessHubs.map((hub) => (
              <Badge key={hub}>{hub}</Badge>
            ))}
          </div>
        </Container>
      </section>

      {/* Local landscape */}
      <section className="border-b border-line py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Website design and development built for {city.name}&apos;s market
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{city.landscape}</p>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{cityIntroExtra(city)}</p>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <h3 className="font-display text-base font-semibold text-ink">Why {city.name} businesses choose us</h3>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{city.whyUs}</p>
            <div className="mt-5 rounded-xl bg-indigo-soft p-4">
              <p className="text-xs font-medium text-indigo">Recent {city.name} project</p>
              <p className="mt-1 text-sm leading-5 text-ink">
                We worked with {city.caseStudy.client} and {city.caseStudy.result}.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Services in city */}
      <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={`Services in ${city.name}`}
            title={`Website development and website designing services in ${city.name}`}
            description={`Every service below is available for businesses across ${city.name} and nearby ${city.state}, delivered by our in-house team, not outsourced freelancers.`}
          />
          <p className="mt-6 max-w-3xl text-sm leading-7 text-ink-soft">{cityServiceNote(city)}</p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {primaryServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-line p-5 transition-colors hover:border-indigo"
              >
                <h3 className="font-display text-sm font-semibold text-ink">
                  {s.shortName} in {city.name}
                </h3>
                <p className="text-xs leading-5 text-ink-soft">{s.summary}</p>
                <span className="mt-auto flex items-center gap-1 pt-1 text-xs font-medium text-indigo opacity-0 transition-opacity group-hover:opacity-100">
                  View service <ArrowRight className="size-3" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="border-b border-line py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Benefits of a custom website for your {city.name} business</h2>
            <ul className="mt-6 space-y-3">
              {[
                `Faster load times than the WordPress or Wix template most local ${city.name} competitors are still running`,
                "A site structured for search visibility from day one, not bolted on after launch",
                "A design system your team can extend without hiring a developer for every small change",
                "Analytics and conversion tracking wired in at launch, so you can see what's actually working",
                "Full ownership of source code, hosting and domain — nothing locked to our accounts",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-indigo" /> {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Our process for {city.name} clients</h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{cityProcessNote(city)}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                ["Discover", "Scoping call + written brief"],
                ["Design", "Wireframes → Figma UI"],
                ["Build", "Coded by senior engineers"],
                ["Launch", "QA, audit, monitored go-live"],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-xl border border-line p-4">
                  <p className="font-display text-sm font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-ink-soft">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Local SEO & performance */}
      <section className="border-b border-line py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Built for how {city.name} actually searches</h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{cityLocalSeoNote(city)}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">What actually earns trust on a {city.name} website</h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">{cityWhyLocalMatters(city)}</p>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink">Industries we serve in {city.name}</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...cityIndustries, ...otherIndustries].slice(0, 8).map((ind) => (
              <div key={ind.slug} className="rounded-2xl border border-line p-5">
                <h3 className="font-display text-sm font-semibold text-ink">{ind.name}</h3>
                <p className="mt-2 text-xs leading-5 text-ink-soft">{ind.summary}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Technologies */}
      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink">Technologies our {city.name} team works in</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {technologies.flatMap((t) => t.items).map((item) => (
              <span key={item} className="rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-soft">
                {item}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio */}
      <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold text-ink">Work our clients have shipped</h2>
            <Button href="/portfolio" variant="ghost">Full portfolio</Button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink">
            {cityTestimonials.length >= 2 ? `What ${city.name} clients say` : "What our clients say"}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {featuredTestimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">Frequently asked questions — {city.name}</h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>

      {/* Map + Contact */}
      <section id="contact" className="border-b border-line py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Talk to our {city.name} team</h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Send us your project details and we&apos;ll get back within one business day with a scoped, fixed quote.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-line">
              <iframe
                title={`Map of ${city.name}`}
                src={mapEmbedSrc}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <ContactForm context={`${city.name} landing page`} />
        </Container>
      </section>

      {/* Related services + nearby cities */}
      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">More services</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {services.slice(6, 14).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-soft hover:border-indigo hover:text-indigo">
                  {s.shortName}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Nearby cities we serve</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {nearbyCities.map((c) => (
                <CityCard key={c.slug} city={c} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaSection title={`Ready to build your ${city.name} website?`} />
    </>
  );
}

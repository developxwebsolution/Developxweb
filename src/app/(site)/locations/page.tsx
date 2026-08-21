import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { CityCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { getCities } from "@/lib/content";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Website Development Company Locations | ${site.name}`,
  description:
    "DevelopX Web serves businesses across major Indian cities including Noida, Delhi, Gurgaon, Jaipur, Mumbai, Bengaluru, Pune, Hyderabad, Ahmedabad, Chennai, Lucknow and Chandigarh.",
  path: "/locations",
});

export default async function LocationsPage() {
  const cities = await getCities();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Locations</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Website development company, wherever your business is.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            We&apos;re headquartered in Noida and work with clients across India&apos;s major business hubs, remotely
            and in person. Pick your city below for local case studies, pricing context and a dedicated point of contact.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((c) => (
              <CityCard key={c.slug} city={c} />
            ))}
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}

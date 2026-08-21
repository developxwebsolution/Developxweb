import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow, Button } from "@/components/ui";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Pricing | Website Development Packages | ${site.name}`,
  description: "Transparent starting prices for website development, web applications and custom software from DevelopX Web. Fixed quotes, no hidden hourly billing.",
  path: "/pricing",
});

const plans = [
  {
    name: "Starter",
    price: "₹35,000",
    detail: "For businesses that need a fast, professional site to establish credibility online.",
    features: ["Up to 6 custom-designed pages", "Mobile-first responsive build", "On-page SEO setup", "Contact form & analytics", "2 rounds of revisions", "2-week warranty on launch"],
  },
  {
    name: "Growth",
    price: "₹95,000",
    detail: "For businesses that need a larger site, blog or light e-commerce functionality.",
    features: ["Up to 15 pages + CMS for blog", "Custom design system in Figma", "Advanced SEO structure + schema", "Booking/quote forms with logic", "4 rounds of revisions", "30-day warranty + 1 month support"],
    featured: true,
  },
  {
    name: "Platform",
    price: "Custom",
    detail: "For web applications, e-commerce platforms and custom software with real backend logic.",
    features: ["Web app or full e-commerce build", "Custom backend, database & auth", "Admin dashboard included", "Third-party integrations (CRM, payments)", "Dedicated project manager", "90-day warranty + ongoing SLA option"],
  },
];

const pricingFaqs = [
  { q: "Is the starting price the final price?", a: "The starting price reflects the minimum scope for that tier. After a short discovery call, we send a fixed quote for your exact scope — you'll never see an hourly invoice creep past what was agreed." },
  { q: "What's not included in these prices?", a: "Domain registration, hosting costs, premium stock photography or licensed fonts, and any third-party software subscriptions (like a paid CRM) are billed separately at cost." },
  { q: "Do you offer payment in milestones?", a: "Yes. Most projects are split into 2-3 milestone payments tied to design approval, development completion and launch, rather than one lump sum upfront." },
  { q: "What if my project doesn't fit neatly into a tier?", a: "Most don't. These tiers are a starting reference point — every quote is scoped individually based on your actual requirements." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Fixed quotes. No hourly surprises.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            Starting prices below give you a realistic reference point. Every project gets a written, fixed quote
            before work begins — scoped to what you actually need.
          </p>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col gap-6 rounded-2xl border p-8 ${plan.featured ? "border-indigo bg-indigo-soft/40 shadow-xl" : "border-line"}`}
            >
              <div>
                {plan.featured ? <span className="mb-3 inline-block rounded-full bg-indigo px-3 py-1 text-xs font-medium text-white">Most popular</span> : null}
                <h2 className="font-display text-xl font-semibold text-ink">{plan.name}</h2>
                <p className="mt-2 font-display text-3xl font-semibold text-ink">
                  {plan.price} <span className="text-sm font-normal text-ink-soft">starting</span>
                </p>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{plan.detail}</p>
              </div>
              <ul className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm leading-6 text-ink-soft">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-indigo" /> {f}
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant={plan.featured ? "primary" : "secondary"} className="mt-auto">
                Get a quote
              </Button>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">Pricing FAQ</h2>
          <div className="mt-8">
            <FaqAccordion items={pricingFaqs} />
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Contact Us | ${site.name}`,
  description: "Get in touch with DevelopX Web for a fixed quote on your website, web application or custom software project. We reply within one business day.",
  path: "/contact",
});

const details = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: site.phoneHref },
  { icon: MapPin, label: "Office", value: `${site.addressLocality}, ${site.addressRegion}, India` },
  { icon: Clock, label: "Response time", value: "Within one business day" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            Tell us what you&apos;re building. We&apos;ll reply within one business day with a clear scope and a fixed quote.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-5">
            {details.map((d) => (
              <div key={d.label} className="flex items-start gap-4 rounded-2xl border border-line p-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-soft text-indigo">
                  <d.icon className="size-4" />
                </div>
                <div>
                  <p className="text-xs text-ink-soft">{d.label}</p>
                  {d.href ? (
                    <a href={d.href} className="text-sm font-medium text-ink hover:text-indigo">{d.value}</a>
                  ) : (
                    <p className="text-sm font-medium text-ink">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <ContactForm context="Contact page" />
        </Container>
      </section>
    </>
  );
}

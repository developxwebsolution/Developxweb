import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Terms of Service | ${site.name}`,
  description: `The terms governing use of ${site.name}'s website and services.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])} />
      <section className="border-b border-line py-20 sm:py-24">
        <Container className="max-w-2xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Terms of Service</h1>
          <p className="mt-3 text-sm text-ink-soft">Last updated: January 1, 2026</p>
        </Container>
      </section>
      <section className="py-16">
        <Container className="max-w-2xl space-y-8">
          <Section title="1. Agreement to terms">
            By accessing this website or engaging {site.name} for services, you agree to be bound by these terms.
            If you don&apos;t agree, please don&apos;t use our website or services.
          </Section>
          <Section title="2. Services and scope">
            All project work is governed by a separate written proposal or contract specifying deliverables,
            timelines and pricing. These general terms apply to website usage and supplement, not replace, any
            signed project agreement.
          </Section>
          <Section title="3. Payments">
            Projects are typically billed in milestones as outlined in your proposal. Late payments beyond 15 days
            of an invoice due date may result in paused work until the account is brought current.
          </Section>
          <Section title="4. Intellectual property">
            Upon full payment, ownership of custom-developed code and design assets created specifically for your
            project transfers to you. Reusable internal frameworks, tools and pre-existing components remain our
            property and are licensed to you for use within your project.
          </Section>
          <Section title="5. Revisions and change requests">
            Each project includes a defined number of revision rounds as specified in your proposal. Requests beyond
            the agreed scope may be quoted as additional work.
          </Section>
          <Section title="6. Warranty">
            We provide a bug-fix warranty period after launch as specified in your project agreement. This covers
            defects in delivered functionality, not new feature requests or changes in requirements.
          </Section>
          <Section title="7. Limitation of liability">
            {`${site.name} is not liable for indirect, incidental or consequential damages arising from use of delivered software, to the maximum extent permitted by applicable law.`}
          </Section>
          <Section title="8. Termination">
            Either party may terminate an active project agreement with written notice as specified in the signed
            proposal. Work completed up to the termination date is payable.
          </Section>
          <Section title="9. Governing law">
            {`These terms are governed by the laws of India, with courts in ${site.addressLocality}, ${site.addressRegion} having jurisdiction over any disputes.`}
          </Section>
          <Section title="10. Contact">
            {`Questions about these terms can be sent to ${site.email}.`}
          </Section>
        </Container>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-ink-soft">{children}</p>
    </div>
  );
}

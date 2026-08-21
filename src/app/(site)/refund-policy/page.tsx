import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Refund Policy | ${site.name}`,
  description: `${site.name}'s refund and cancellation policy for website and software development projects.`,
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Refund Policy", path: "/refund-policy" }])} />
      <section className="border-b border-line py-20 sm:py-24">
        <Container className="max-w-2xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Refund Policy</h1>
          <p className="mt-3 text-sm text-ink-soft">Last updated: January 1, 2026</p>
        </Container>
      </section>
      <section className="py-16">
        <Container className="max-w-2xl space-y-8">
          <Section title="1. Milestone-based billing">
            Projects are billed in milestones tied to specific deliverables (e.g., design approval, development
            completion, launch). This structure limits your exposure — you&apos;re never paying significantly ahead of
            work delivered.
          </Section>
          <Section title="2. Cancellation before work begins">
            If you cancel before any work has started on a paid milestone, we refund that milestone payment in full,
            minus any non-refundable third-party costs already incurred on your behalf.
          </Section>
          <Section title="3. Cancellation mid-milestone">
            If a project is cancelled partway through an active milestone, you&apos;re billed for work completed on a
            pro-rata basis; any remaining balance from that milestone payment is refunded.
          </Section>
          <Section title="4. Completed milestones">
            Payments for milestones already delivered and approved are non-refundable, as they represent work
            completed and accepted.
          </Section>
          <Section title="5. Dissatisfaction with delivered work">
            If you&apos;re unsatisfied with a delivered milestone, we&apos;ll work through the revision rounds included in
            your proposal before any refund conversation. Most concerns are resolved at this stage.
          </Section>
          <Section title="6. Refund timeline">
            Approved refunds are processed within 10 business days to the original payment method.
          </Section>
          <Section title="7. Contact">
            {`To request a refund or discuss a project concern, email ${site.email} with your project details.`}
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

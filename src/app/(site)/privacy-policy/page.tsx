import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Privacy Policy | ${site.name}`,
  description: `How ${site.name} collects, uses and protects your personal information.`,
  path: "/privacy-policy",
  noindex: false,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }])} />
      <section className="border-b border-line py-20 sm:py-24">
        <Container className="max-w-2xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-ink-soft">Last updated: January 1, 2026</p>
        </Container>
      </section>
      <section className="py-16">
        <Container className="max-w-2xl space-y-8">
          <Section title="1. Information we collect">
            We collect information you provide directly, such as your name, email address, phone number and project
            details when you submit a contact form or email us. We also collect standard analytics data (pages
            visited, device type, approximate location from IP address) through privacy-respecting analytics tools.
          </Section>
          <Section title="2. How we use your information">
            We use the information you provide to respond to enquiries, prepare quotes, deliver contracted services,
            and — only with your consent — send occasional updates about our work. We do not sell your personal
            information to third parties.
          </Section>
          <Section title="3. Data storage and security">
            Client project data is stored on secured infrastructure with access limited to team members working on
            your project. We use industry-standard encryption for data in transit and follow secure development
            practices to protect against unauthorized access.
          </Section>
          <Section title="4. Cookies and analytics">
            Our website may use cookies for essential functionality (such as remembering your theme preference) and
            for anonymous analytics to understand how visitors use the site. You can disable cookies through your
            browser settings.
          </Section>
          <Section title="5. Third-party services">
            We may use third-party tools for hosting, analytics, email delivery and payment processing. Each of
            these providers has its own privacy policy governing how they handle data.
          </Section>
          <Section title="6. Your rights">
            You may request access to, correction of, or deletion of your personal information at any time by
            emailing {site.email}. We will respond to verified requests within 30 days.
          </Section>
          <Section title="7. Changes to this policy">
            We may update this policy periodically. Material changes will be reflected with an updated &ldquo;last
            updated&rdquo; date at the top of this page.
          </Section>
          <Section title="8. Contact">
            {`Questions about this policy can be sent to ${site.email} or by phone at ${site.phone}.`}
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

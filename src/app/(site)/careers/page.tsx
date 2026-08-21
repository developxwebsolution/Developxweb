import { Container } from "@/components/container";
import { Eyebrow, Badge } from "@/components/ui";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Careers | Join ${site.name}`,
  description: "Open roles at DevelopX Web. We're a small, senior team building websites and software for clients across India.",
  path: "/careers",
});

const openings = [
  { title: "Senior Next.js Developer", type: "Full-time · Remote / Noida", summary: "Own front-end architecture for client projects, from component systems to performance budgets." },
  { title: "Backend Engineer (Node.js)", type: "Full-time · Remote / Noida", summary: "Build APIs, database schemas and integrations for web applications and custom software projects." },
  { title: "UI/UX Designer", type: "Full-time · Noida", summary: "Design interfaces in Figma for client websites and dashboards, from wireframe through hi-fi." },
];

const perks = [
  "Work directly with clients — no account-management layer between you and real feedback",
  "A small team where your code ships to production within weeks, not quarters",
  "Flexible hours built around deep work, not hours logged",
  "Learning budget for courses, books and conference tickets",
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Careers</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Build things that ship, with people who care.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            We&apos;re a small, senior team — every hire raises the bar rather than filling a seat. Here&apos;s what
            we&apos;re looking for right now.
          </p>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">Open roles</h2>
          <div className="mt-8 flex flex-col divide-y divide-line border-y border-line">
            {openings.map((o) => (
              <div key={o.title} className="flex flex-col gap-2 py-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-ink">{o.title}</h3>
                  <Badge>{o.type}</Badge>
                </div>
                <p className="text-sm leading-6 text-ink-soft">{o.summary}</p>
                <a href={`mailto:${site.email}?subject=Application: ${o.title}`} className="mt-1 text-sm font-medium text-indigo">
                  Apply via email →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink">Why work here</h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {perks.map((p) => (
              <li key={p} className="rounded-xl border border-line p-4 text-sm leading-6 text-ink-soft">{p}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-6 text-ink-soft">
            Don&apos;t see a fit but think you&apos;d add value anyway? Email us at{" "}
            <a href={`mailto:${site.email}`} className="text-indigo underline">{site.email}</a> with what you&apos;d want to work on.
          </p>
        </Container>
      </section>
    </>
  );
}

import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Eyebrow, Badge } from "@/components/ui";
import { ProjectCard } from "@/components/cards";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { buildMetadataWithOverride, breadcrumbSchema } from "@/lib/seo";
import { getProjects, getProjectBySlug } from "@/lib/content";
import { site } from "@/data/site";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadataWithOverride({
    title: `${project.name} Case Study | ${site.name}`,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getProjects();
  const more = allProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: project.name, path: `/portfolio/${project.slug}` },
        ])}
      />
      <section className="border-b border-line py-20 sm:py-28" style={{ background: `linear-gradient(180deg, ${project.color}14, transparent)` }}>
        <Container className="max-w-3xl">
          <Eyebrow>{project.industry.replace("-", " & ")} · {project.city}</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{project.name}</h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">The challenge</h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{project.challenge}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">What we built</h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">{project.solution}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-line p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-soft">Results</h3>
            <div className="mt-4 space-y-4">
              {project.results.map((r) => (
                <div key={r.label}>
                  <p className="font-display text-xl font-semibold text-indigo">{r.value}</p>
                  <p className="text-xs text-ink-soft">{r.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-ink-soft">Client: {project.client} · {project.year}</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink">More projects</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection title="Want results like this for your business?" />
    </>
  );
}

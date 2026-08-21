import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading, Button, Badge } from "@/components/ui";
import { ServiceCard, ProjectCard, TestimonialCard, CityCard } from "@/components/cards";
import { FaqAccordion } from "@/components/faq-accordion";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { getServices, getProjects, getTestimonials, getCities, getFaqs, getBlogPosts, getIndustries, getTechnologies } from "@/lib/content";

export const metadata = buildMetadata({
  title: `${site.name} | Website Development Company in India`,
  description: site.description,
  path: "/",
});

const processSteps = [
  { title: "Discover", detail: "We map goals, audience and competitors on a scoping call, then send a written project brief within 48 hours." },
  { title: "Design", detail: "Wireframes first, then a full visual design system in Figma — reviewed with you at every stage, not just at the end." },
  { title: "Build", detail: "Senior engineers write the code. No outsourced middlemen, no junior-only teams learning on your project." },
  { title: "Launch & grow", detail: "QA, performance audit, monitored go-live, and an optional retainer for ongoing updates and support." },
];

const differentiators = [
  { title: "Senior team only", detail: "Every project is built by the same engineers from kickoff to launch — no bait-and-switch to junior staff." },
  { title: "Fixed, written quotes", detail: "You get a scoped, fixed price before work starts. No hourly meter running in the background." },
  { title: "Code you fully own", detail: "Source code, design files and infrastructure access are handed over. Nothing stays locked to our accounts." },
  { title: "Built for Core Web Vitals", detail: "Every site ships with a performance budget, not just a design mockup that gets slow once it's built." },
];

export default async function HomePage() {
  const [services, projects, testimonials, cities, globalFaqs, blogPosts, industries, technologies] = await Promise.all([
    getServices(),
    getProjects(),
    getTestimonials(),
    getCities(),
    getFaqs(),
    getBlogPosts(),
    getIndustries(),
    getTechnologies(),
  ]);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url }} />

      <section className="relative overflow-hidden bg-grid">
        <div
          className="absolute -top-40 left-1/2 h-96 w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "linear-gradient(120deg, #4338CA, #0891A8)" }}
        />
        <Container className="relative flex flex-col items-center gap-8 py-24 text-center sm:py-32">
          <Badge className="animate-fade-up">
            <span className="mr-2 inline-block size-1.5 rounded-full bg-emerald-500" /> Now booking projects for Q4 2026
          </Badge>
          <h1
            className="animate-fade-up max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl"
            style={{ animationDelay: "0.05s" }}
          >
            Websites and software, <span className="text-gradient">engineered to ship.</span>
          </h1>
          <p className="animate-fade-up max-w-xl text-pretty text-base leading-7 text-ink-soft sm:text-lg" style={{ animationDelay: "0.1s" }}>
            DevelopX Web designs and builds fast, secure, revenue-focused websites, web apps and custom software for
            businesses across India — on code we hand over in full, with a team you can actually reach.
          </p>
          <div className="animate-fade-up flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.15s" }}>
            <Button href="/contact">Get a fixed quote</Button>
            <Button href="/portfolio" variant="secondary">
              See our work
            </Button>
          </div>
          <div className="animate-fade-up grid w-full max-w-3xl grid-cols-2 gap-6 pt-8 sm:grid-cols-4" style={{ animationDelay: "0.2s" }}>
            {site.stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="font-display text-2xl font-semibold text-ink sm:text-3xl">{s.value}</span>
                <span className="mt-1 text-xs text-ink-soft">{s.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why DevelopX Web"
            title="A studio built around outcomes, not hours billed."
            description="We've structured how we work specifically to remove the frustrations businesses usually run into with agencies and freelancers."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <div key={d.title} className="flex flex-col gap-3 rounded-2xl border border-line p-6">
                <CheckCircle2 className="size-5 text-indigo" />
                <h3 className="font-display text-base font-semibold text-ink">{d.title}</h3>
                <p className="text-sm leading-6 text-ink-soft">{d.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-raised py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Services"
              title="Everything you need, under one senior team."
              description="From a five-page brochure site to a full custom platform — one team, one point of contact."
            />
            <Button href="/services" variant="ghost">
              View all {services.length} services
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 9).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="How we work" title="A process that keeps you informed, not waiting." align="center" />
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div key={step.title} className="relative flex flex-col gap-3">
                <span className="font-mono text-sm text-indigo">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                <p className="text-sm leading-6 text-ink-soft">{step.detail}</p>
                {i < processSteps.length - 1 && <span className="absolute right-[-1rem] top-2 hidden h-px w-8 bg-line lg:block" />}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-raised py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="Domain-aware, not generic."
            description="We build differently for a hospital than we do for a D2C brand. Here's where we spend most of our time."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div key={ind.slug} className="rounded-2xl border border-line p-6 transition-colors hover:border-indigo">
                <h3 className="font-display text-base font-semibold text-ink">{ind.name}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{ind.summary}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Stack" title="Modern tools, chosen for the job — not the resume." align="center" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((cat) => (
              <div key={cat.category} className="rounded-2xl border border-line p-6">
                <h3 className="font-mono text-xs uppercase tracking-wider text-indigo">{cat.category}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-raised py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Selected work" title="Recent projects, real results." />
            <Button href="/portfolio" variant="ghost">
              View full portfolio
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Client feedback" title="What it's like to work with us." align="center" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 6).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-raised py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Where we work"
            title="Serving businesses across India."
            description="We're headquartered in Noida and work with clients across every major Indian business hub, remotely and on-site."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((c) => (
              <CityCard key={c.slug} city={c} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="From the blog" title="Notes on building better websites." />
            <Button href="/blog" variant="ghost">
              Read the blog
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-line p-6 transition-colors hover:border-indigo"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-indigo">{post.category}</span>
                <h3 className="font-display text-base font-semibold leading-snug text-ink">{post.title}</h3>
                <p className="line-clamp-3 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
                <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-indigo opacity-0 transition-opacity group-hover:opacity-100">
                  Read more <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper-raised py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions, answered directly." align="center" />
          <div className="mt-10">
            <FaqAccordion items={globalFaqs.slice(0, 6)} />
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

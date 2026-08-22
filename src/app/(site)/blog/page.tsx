import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { CtaSection } from "@/components/cta-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { getBlogPosts } from "@/lib/content";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `Blog | Website & Software Development Insights | ${site.name}`,
  description: "Practical, no-fluff articles on website performance, SEO, web development and software from the DevelopX Web team.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <section className="border-b border-line bg-grid py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Notes on building better websites.
          </h1>
          <p className="mt-6 text-base leading-7 text-ink-soft">
            Practical write-ups from the projects we ship — performance, SEO, and the decisions that actually move
            business outcomes.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col gap-3 rounded-2xl border border-line p-6 transition-colors hover:border-indigo">
              {post.featuredImage ? (
  <img src={post.featuredImage} alt={post.title} className="mb-3 h-40 w-full rounded-xl object-cover" />
) : null}
              <span className="font-mono text-xs uppercase tracking-wider text-indigo">{post.category}</span>
              <h2 className="font-display text-lg font-semibold leading-snug text-ink">{post.title}</h2>
              <p className="line-clamp-3 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-3 text-xs text-ink-soft">
                <span>{post.readTime}</span>
                <span className="flex items-center gap-1 font-medium text-indigo opacity-0 transition-opacity group-hover:opacity-100">
                  Read <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </Container>
      </section>
      <CtaSection />
    </>
  );
}

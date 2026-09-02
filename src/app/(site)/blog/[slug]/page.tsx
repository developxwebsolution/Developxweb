import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/ui";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import {
  buildMetadataWithOverride,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { sanitizeBlogParagraph } from "@/lib/render-links";
import { site } from "@/data/site";
export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadataWithOverride({
    title: `${post.title} | ${site.name} Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const more = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            date: post.date,
            author: post.author,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="border-b border-line py-20 sm:py-28">
        <Container className="max-w-2xl">
          <Eyebrow>{post.category}</Eyebrow>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="mt-6 w-full rounded-2xl object-cover"
              style={{ maxHeight: 400 }}
            />
          ) : null}
          <div className="mt-4 flex items-center gap-3 text-xs text-ink-soft">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <div className="prose-content mt-10 flex flex-col gap-5">
            {/* {post.content.map((para, i) => (
              <p key={i} className="text-base leading-7 text-ink-soft">
                {para}
              </p>
            ))} */}

            {post.content.map((para, i) => (
              <p
                key={i}
                className="text-base leading-7 text-ink-soft"
                dangerouslySetInnerHTML={{
                  __html: sanitizeBlogParagraph(para),
                }}
              />
            ))}
          </div>
        </Container>
      </article>

      <section className="border-b border-line bg-paper-raised py-16 sm:py-20">
        <Container className="max-w-2xl">
          <h2 className="font-display text-lg font-semibold text-ink">
            More from the blog
          </h2>
          <div className="mt-6 flex flex-col gap-4">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-xl border border-line p-5 hover:border-indigo"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-indigo">
                  {p.category}
                </span>
                <h3 className="mt-1 font-display text-base font-semibold text-ink">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

import { getServices, getCities, getBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { SearchClient, type Result } from "./search-client";

// Search results are user-query-dependent and low-value for organic search
// to index directly (thin/duplicate-content risk), so this page is noindex
// while still being fully crawlable and linkable for visitors.
export const metadata = buildMetadata({
  title: `Search | ${site.name}`,
  description: "Search DevelopX Web's services, city pages and blog articles.",
  path: "/search",
  noindex: true,
});

export default async function SearchPage() {
  const [services, cities, blogPosts] = await Promise.all([getServices(), getCities(), getBlogPosts()]);

  const index: Result[] = [
    ...services.map((s) => ({ title: s.name, type: "Service", href: `/services/${s.slug}`, description: s.summary })),
    ...cities.map((c) => ({
      title: `Website Development Company in ${c.name}`,
      type: "Location",
      href: `/web-development-company-${c.slug}`,
      description: c.intro.slice(0, 120) + "…",
    })),
    ...blogPosts.map((p) => ({ title: p.title, type: "Blog", href: `/blog/${p.slug}`, description: p.excerpt })),
  ];

  return <SearchClient index={index} />;
}

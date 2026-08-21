import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getServices, getCities, getProjects, getBlogPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [services, cities, projects, blogPosts] = await Promise.all([
    getServices(),
    getCities(),
    getProjects(),
    getBlogPosts(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/case-studies",
    "/industries",
    "/technologies",
    "/pricing",
    "/blog",
    "/testimonials",
    "/faq",
    "/contact",
    "/careers",
    "/locations",
    "/privacy-policy",
    "/terms",
    "/refund-policy",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const cityRoutes = cities.map((c) => ({
    url: `${site.url}/web-development-company-${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const portfolioRoutes = projects.map((p) => ({
    url: `${site.url}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes, ...portfolioRoutes, ...blogRoutes];
}

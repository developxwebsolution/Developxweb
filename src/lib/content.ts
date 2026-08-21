import "server-only";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  services as servicesTable,
  cities as citiesTable,
  blogPosts as blogPostsTable,
  portfolioProjects as portfolioProjectsTable,
  testimonials as testimonialsTable,
  faqs as faqsTable,
  industries as industriesTable,
  technologyCategories as techTable,
  seoOverrides as seoOverridesTable,
  menuItems as menuItemsTable,
} from "@/db/schema";
import type { Service } from "@/data/services";
import type { City } from "@/data/cities";
import type { BlogPost } from "@/data/blog";
import type { Project } from "@/data/portfolio";
import type { Testimonial } from "@/data/testimonials";
import type { Industry } from "@/data/industries";
import type { TechCategory } from "@/data/technologies";

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export async function getServices(): Promise<Service[]> {
  const rows = await db.select().from(servicesTable).where(eq(servicesTable.status, "published")).orderBy(asc(servicesTable.name));
  return rows.map(rowToService);
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  const [row] = await db.select().from(servicesTable).where(eq(servicesTable.slug, slug)).limit(1);
  return row ? rowToService(row) : undefined;
}

function rowToService(row: typeof servicesTable.$inferSelect): Service {
  return {
    slug: row.slug,
    name: row.name,
    shortName: row.shortName,
    icon: row.icon as Service["icon"],
    summary: row.summary,
    description: row.description,
    features: row.features,
    deliverables: row.deliverables,
    process: row.process,
    faqs: row.faqs,
    startingPrice: row.startingPrice,
    timeline: row.timeline,
  };
}

// ---------------------------------------------------------------------------
// Cities
// ---------------------------------------------------------------------------

export async function getCities(): Promise<City[]> {
  const rows = await db.select().from(citiesTable).where(eq(citiesTable.status, "published")).orderBy(asc(citiesTable.name));
  return rows.map(rowToCity);
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  const [row] = await db.select().from(citiesTable).where(eq(citiesTable.slug, slug)).limit(1);
  return row ? rowToCity(row) : undefined;
}

function rowToCity(row: typeof citiesTable.$inferSelect): City {
  return {
    slug: row.slug,
    name: row.name,
    state: row.state,
    population: row.population ?? "",
    lat: Number(row.lat),
    lng: Number(row.lng),
    businessHubs: row.businessHubs,
    localIndustries: row.localIndustries,
    intro: row.intro,
    landscape: row.landscape,
    whyUs: row.whyUs,
    caseStudy: row.caseStudy ?? { client: "", industry: "", result: "" },
    nearby: row.nearby,
  };
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.status, "published"))
    .orderBy(desc(blogPostsTable.publishedAt));
  return rows.map(rowToBlogPost);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const [row] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.slug, slug)).limit(1);
  return row ? rowToBlogPost(row) : undefined;
}

function rowToBlogPost(row: typeof blogPostsTable.$inferSelect): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: (row.publishedAt ?? row.createdAt).toISOString(),
    readTime: row.readTime,
    author: row.author,
    content: row.content,
  };
}

// ---------------------------------------------------------------------------
// Portfolio
// ---------------------------------------------------------------------------

export async function getProjects(): Promise<Project[]> {
  const rows = await db
    .select()
    .from(portfolioProjectsTable)
    .where(eq(portfolioProjectsTable.status, "published"))
    .orderBy(desc(portfolioProjectsTable.year));
  return rows.map(rowToProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const [row] = await db.select().from(portfolioProjectsTable).where(eq(portfolioProjectsTable.slug, slug)).limit(1);
  return row ? rowToProject(row) : undefined;
}

function rowToProject(row: typeof portfolioProjectsTable.$inferSelect): Project {
  return {
    slug: row.slug,
    name: row.name,
    client: row.client,
    industry: row.industry,
    service: row.service,
    city: row.city,
    summary: row.summary,
    challenge: row.challenge,
    solution: row.solution,
    results: row.results,
    stack: row.stack,
    year: row.year,
    color: row.color,
  };
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await db
    .select()
    .from(testimonialsTable)
    .where(eq(testimonialsTable.status, "published"))
    .orderBy(desc(testimonialsTable.createdAt));
  return rows.map((r) => ({ name: r.name, role: r.role, company: r.company, city: r.city, quote: r.quote, rating: r.rating }));
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

export async function getFaqs(): Promise<{ q: string; a: string }[]> {
  const rows = await db.select().from(faqsTable).where(eq(faqsTable.status, "published")).orderBy(asc(faqsTable.sortOrder));
  return rows.map((r) => ({ q: r.question, a: r.answer }));
}

// ---------------------------------------------------------------------------
// SEO overrides
// ---------------------------------------------------------------------------

export async function getSeoOverride(path: string) {
  const [row] = await db.select().from(seoOverridesTable).where(eq(seoOverridesTable.path, path)).limit(1);
  return row ?? null;
}

// ---------------------------------------------------------------------------
// Menu items (Navbar / Footer)
// ---------------------------------------------------------------------------

export async function getMenuItems(menu: "primary" | "footer_company" | "footer_resources"): Promise<{ href: string; label: string }[]> {
  const rows = await db.select().from(menuItemsTable).where(eq(menuItemsTable.menu, menu)).orderBy(asc(menuItemsTable.sortOrder));
  return rows.map((r) => ({ href: r.href, label: r.label }));
}

// ---------------------------------------------------------------------------
// Industries & Technologies
// ---------------------------------------------------------------------------

export async function getIndustries(): Promise<Industry[]> {
  const rows = await db.select().from(industriesTable).where(eq(industriesTable.status, "published")).orderBy(asc(industriesTable.sortOrder));
  return rows.map((r) => ({ slug: r.slug, name: r.name, summary: r.summary }));
}

export async function getTechnologies(): Promise<TechCategory[]> {
  const rows = await db.select().from(techTable).orderBy(asc(techTable.sortOrder));
  return rows.map((r) => ({ category: r.category, items: r.items }));
}

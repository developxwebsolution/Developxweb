/**
 * Seeds the database with:
 *  1. A first admin user (so you can log into /admin at all)
 *  2. The existing content from src/data/*.ts, so the admin panel has real
 *     rows to show instead of an empty table on first run.
 *
 * Usage:
 *   npm run db:seed -- --email you@company.com --password "at-least-10-chars" --name "Your Name"
 *
 * Safe to re-run: content is upserted by slug/email, so running it twice
 * won't create duplicates.
 */
import "dotenv/config";
import { db } from "../src/db";
import { user, services as servicesTable, cities as citiesTable, blogPosts, portfolioProjects, testimonials as testimonialsTable, faqs as faqsTable, industries as industriesTable, technologyCategories as techTable, menuItems as menuItemsTable } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../src/lib/auth";
import { services } from "../src/data/services";
import { cities } from "../src/data/cities";
import { blogPosts as blogData } from "../src/data/blog";
import { projects } from "../src/data/portfolio";
import { testimonials } from "../src/data/testimonials";
import { globalFaqs } from "../src/data/faqs";
import { industries } from "../src/data/industries";
import { technologies } from "../src/data/technologies";

function arg(name: string, fallback?: string) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1 || !process.argv[i + 1]) return fallback;
  return process.argv[i + 1];
}

async function seedAdmin() {
  const email = arg("email", "admin@developxweb.com")!;
  const password = arg("password", "ChangeThisPassword123!")!;
  const name = arg("name", "Admin")!;

  const existing = await db.select().from(user).where(eq(user.email, email)).limit(1);
  if (existing.length > 0) {
    console.log(`✓ Admin user ${email} already exists — skipping creation, ensuring role=admin`);
    await db.update(user).set({ role: "admin" }).where(eq(user.email, email));
    return;
  }

  const result = await auth.api.signUpEmail({ body: { email, password, name } });
  if (!result?.user?.id) throw new Error("Failed to create admin user via auth.api.signUpEmail");

  await db.update(user).set({ role: "admin", emailVerified: true }).where(eq(user.id, result.user.id));
  console.log(`✓ Created admin user: ${email} (password: ${password === "ChangeThisPassword123!" ? "default — CHANGE THIS" : "as provided"})`);
}

async function seedServices() {
  for (const s of services) {
    await db
      .insert(servicesTable)
      .values({
        slug: s.slug,
        name: s.name,
        shortName: s.shortName,
        summary: s.summary,
        description: s.description,
        icon: s.icon,
        startingPrice: s.startingPrice,
        timeline: s.timeline,
        features: s.features,
        deliverables: s.deliverables,
        process: s.process,
        faqs: s.faqs,
        status: "published",
      })
      .onConflictDoUpdate({
        target: servicesTable.slug,
        set: { name: s.name, summary: s.summary, description: s.description, updatedAt: new Date() },
      });
  }
  console.log(`✓ Seeded ${services.length} services`);
}

async function seedCities() {
  for (const c of cities) {
    await db
      .insert(citiesTable)
      .values({
        slug: c.slug,
        name: c.name,
        state: c.state,
        population: c.population,
        lat: String(c.lat),
        lng: String(c.lng),
        businessHubs: c.businessHubs,
        localIndustries: c.localIndustries,
        intro: c.intro,
        landscape: c.landscape,
        whyUs: c.whyUs,
        caseStudy: c.caseStudy,
        nearby: c.nearby,
        status: "published",
      })
      .onConflictDoUpdate({
        target: citiesTable.slug,
        set: { intro: c.intro, landscape: c.landscape, whyUs: c.whyUs, updatedAt: new Date() },
      });
  }
  console.log(`✓ Seeded ${cities.length} cities`);
}

async function seedBlog() {
  for (const p of blogData) {
    await db
      .insert(blogPosts)
      .values({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        author: p.author,
        readTime: p.readTime,
        status: "published",
        publishedAt: new Date(p.date),
      })
      .onConflictDoUpdate({
        target: blogPosts.slug,
        set: { title: p.title, excerpt: p.excerpt, content: p.content, updatedAt: new Date() },
      });
  }
  console.log(`✓ Seeded ${blogData.length} blog posts`);
}

async function seedPortfolio() {
  for (const p of projects) {
    await db
      .insert(portfolioProjects)
      .values({
        slug: p.slug,
        name: p.name,
        client: p.client,
        industry: p.industry,
        service: p.service,
        city: p.city,
        summary: p.summary,
        challenge: p.challenge,
        solution: p.solution,
        results: p.results,
        stack: p.stack,
        year: p.year,
        color: p.color,
        status: "published",
      })
      .onConflictDoUpdate({
        target: portfolioProjects.slug,
        set: { summary: p.summary, challenge: p.challenge, solution: p.solution, updatedAt: new Date() },
      });
  }
  console.log(`✓ Seeded ${projects.length} portfolio projects`);
}

async function seedTestimonials() {
  const existing = await db.select({ count: testimonialsTable.id }).from(testimonialsTable);
  if (existing.length > 0) {
    console.log(`✓ Testimonials already seeded (${existing.length} rows) — skipping`);
    return;
  }
  for (const t of testimonials) {
    await db.insert(testimonialsTable).values({
      name: t.name,
      role: t.role,
      company: t.company,
      city: t.city,
      quote: t.quote,
      rating: t.rating,
      status: "published",
    });
  }
  console.log(`✓ Seeded ${testimonials.length} testimonials`);
}

async function seedFaqs() {
  const existing = await db.select({ count: faqsTable.id }).from(faqsTable);
  if (existing.length > 0) {
    console.log(`✓ FAQs already seeded (${existing.length} rows) — skipping`);
    return;
  }
  let i = 0;
  for (const f of globalFaqs) {
    await db.insert(faqsTable).values({ question: f.q, answer: f.a, sortOrder: i++, status: "published" });
  }
  console.log(`✓ Seeded ${globalFaqs.length} FAQs`);
}

async function seedIndustries() {
  const existing = await db.select({ count: industriesTable.id }).from(industriesTable);
  if (existing.length > 0) {
    console.log(`✓ Industries already seeded (${existing.length} rows) — skipping`);
    return;
  }
  let i = 0;
  for (const ind of industries) {
    await db.insert(industriesTable).values({ slug: ind.slug, name: ind.name, summary: ind.summary, sortOrder: i++, status: "published" });
  }
  console.log(`✓ Seeded ${industries.length} industries`);
}

async function seedTechnologies() {
  const existing = await db.select({ count: techTable.id }).from(techTable);
  if (existing.length > 0) {
    console.log(`✓ Technology categories already seeded (${existing.length} rows) — skipping`);
    return;
  }
  let i = 0;
  for (const cat of technologies) {
    await db.insert(techTable).values({ category: cat.category, items: cat.items, sortOrder: i++ });
  }
  console.log(`✓ Seeded ${technologies.length} technology categories`);
}

async function seedMenus() {
  const primary = [
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Work" },
    { href: "/industries", label: "Industries" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
  ];
  const footerCompany = [
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];
  const footerResources = [
    { href: "/faq", label: "FAQ" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/technologies", label: "Technologies" },
    { href: "/pricing", label: "Pricing" },
    { href: "/search", label: "Search" },
  ];

  // Checked and seeded per-category, not globally — so a fresh menu
  // category added in a later version of this script (or one an admin
  // emptied out on purpose) doesn't get silently skipped just because
  // *some* menu already has rows.
  const menus: { name: string; items: { href: string; label: string }[] }[] = [
    { name: "primary", items: primary },
    { name: "footer_company", items: footerCompany },
    { name: "footer_resources", items: footerResources },
  ];

  for (const { name, items } of menus) {
    const existing = await db.select({ count: menuItemsTable.id }).from(menuItemsTable).where(eq(menuItemsTable.menu, name));
    if (existing.length > 0) {
      console.log(`✓ Menu "${name}" already seeded (${existing.length} rows) — skipping`);
      continue;
    }
    let i = 0;
    for (const item of items) await db.insert(menuItemsTable).values({ menu: name, label: item.label, href: item.href, sortOrder: i++ });
    console.log(`✓ Seeded ${items.length} items for menu "${name}"`);
  }
}

async function main() {
  console.log("Seeding database...\n");
  await seedAdmin();
  await seedServices();
  await seedCities();
  await seedBlog();
  await seedPortfolio();
  await seedTestimonials();
  await seedFaqs();
  await seedIndustries();
  await seedTechnologies();
  await seedMenus();
  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

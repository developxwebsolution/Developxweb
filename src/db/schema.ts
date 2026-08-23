import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  jsonb,
  uuid,
  index,
} from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const roleEnum = pgEnum("role", ["admin", "editor", "viewer"]);
export const leadStatusEnum = pgEnum("lead_status", ["new", "contacted", "qualified", "won", "lost"]);
export const contentStatusEnum = pgEnum("content_status", ["draft", "published", "archived"]);

// ---------------------------------------------------------------------------
// Auth (Better Auth core tables — names/shape follow Better Auth's expected schema)
// ---------------------------------------------------------------------------

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: roleEnum("role").notNull().default("viewer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  password: text("password"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// Leads / Contact Messages
// ---------------------------------------------------------------------------

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    service: text("service"),
    message: text("message").notNull(),
    source: text("source"), // e.g. "Jaipur landing page", "Contact page"
    status: leadStatusEnum("status").notNull().default("new"),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [index("leads_status_idx").on(t.status), index("leads_created_idx").on(t.createdAt)]
);

// ---------------------------------------------------------------------------
// Newsletter
// ---------------------------------------------------------------------------

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").notNull().defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

// ---------------------------------------------------------------------------
// Content: Services, Cities, Blog, Portfolio, Testimonials, FAQs
// (mirrors the shape of src/data/*.ts so the static site can be migrated
//  from file-based content to DB-driven content incrementally)
// ---------------------------------------------------------------------------

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  summary: text("summary").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  startingPrice: text("starting_price").notNull(),
  timeline: text("timeline").notNull(),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  deliverables: jsonb("deliverables").$type<string[]>().notNull().default([]),
  process: jsonb("process").$type<{ title: string; detail: string }[]>().notNull().default([]),
  faqs: jsonb("faqs").$type<{ q: string; a: string }[]>().notNull().default([]),
  status: contentStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const cities = pgTable("cities", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  state: text("state").notNull(),
  population: text("population"),
  lat: text("lat").notNull(),
  lng: text("lng").notNull(),
  businessHubs: jsonb("business_hubs").$type<string[]>().notNull().default([]),
  localIndustries: jsonb("local_industries").$type<string[]>().notNull().default([]),
  intro: text("intro").notNull(),
  landscape: text("landscape").notNull(),
  whyUs: text("why_us").notNull(),
  caseStudy: jsonb("case_study").$type<{ client: string; industry: string; result: string }>(),
  nearby: jsonb("nearby").$type<string[]>().notNull().default([]),
  status: contentStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  featuredImage: text("featured_image"),
  content: jsonb("content").$type<string[]>().notNull().default([]),
  category: text("category").notNull(),
  author: text("author").notNull(),
  readTime: text("read_time").notNull(),
  authorId: text("author_id").references(() => user.id),
  status: contentStatusEnum("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const portfolioProjects = pgTable("portfolio_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  client: text("client").notNull(),
  industry: text("industry").notNull(),
  service: text("service").notNull(),
  city: text("city").notNull(),
  summary: text("summary").notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  results: jsonb("results").$type<{ label: string; value: string }[]>().notNull().default([]),
  stack: jsonb("stack").$type<string[]>().notNull().default([]),
  year: text("year").notNull(),
   image: text("image"),
  color: text("color").notNull(),
  status: contentStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  city: text("city").notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull().default(5),
  status: contentStatusEnum("status").notNull().default("published"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: uuid("id").primaryKey().defaultRandom(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  status: contentStatusEnum("status").notNull().default("published"),
});

// ---------------------------------------------------------------------------
// Industries & Technologies — small reference/taxonomy tables
// ---------------------------------------------------------------------------

export const industries = pgTable("industries", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  summary: text("summary").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  status: contentStatusEnum("status").notNull().default("published"),
});

export const technologyCategories = pgTable("technology_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: text("category").notNull(),
  items: jsonb("items").$type<string[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ---------------------------------------------------------------------------
// Media Library
// ---------------------------------------------------------------------------

export const media = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull(), // Cloudinary secure_url
  publicId: text("public_id").notNull(), // Cloudinary public_id, needed for deletes
  filename: text("filename").notNull(),
  altText: text("alt_text"),
  mimeType: text("mime_type").notNull(),
  size: integer("size_bytes").notNull(),
  width: integer("width"),
  height: integer("height"),
  uploadedById: text("uploaded_by_id").references(() => user.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// SEO Manager — per-path metadata overrides (falls back to code defaults
// in src/lib/seo.ts when no row exists for a path)
// ---------------------------------------------------------------------------

export const seoOverrides = pgTable("seo_overrides", {
  id: uuid("id").primaryKey().defaultRandom(),
  path: text("path").notNull().unique(), // e.g. "/web-development-company-jaipur"
  title: text("title"),
  description: text("description"),
  ogImage: text("og_image"),
  noindex: boolean("noindex").notNull().default(false),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Menu Builder
// ---------------------------------------------------------------------------

export const menuItems = pgTable("menu_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  menu: text("menu").notNull().default("primary"), // "primary" | "footer" | ...
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  parentId: uuid("parent_id"),
  openInNewTab: boolean("open_in_new_tab").notNull().default(false),
});

// ---------------------------------------------------------------------------
// Settings — single-row key/value style app configuration
// ---------------------------------------------------------------------------

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ---------------------------------------------------------------------------
// Audit Log — records admin actions for accountability
// ---------------------------------------------------------------------------

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").references(() => user.id),
    action: text("action").notNull(), // e.g. "lead.status_changed", "blog.published"
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id"),
    metadata: jsonb("metadata"),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("audit_logs_user_idx").on(t.userId), index("audit_logs_created_idx").on(t.createdAt)]
);

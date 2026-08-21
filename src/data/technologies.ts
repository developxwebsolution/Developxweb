export type TechCategory = {
  category: string;
  items: string[];
};

export const technologies: TechCategory[] = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "Laravel", "PHP", "Python"] },
  { category: "Database", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  { category: "CMS & Commerce", items: ["WordPress", "Shopify", "Sanity", "WooCommerce"] },
  { category: "Cloud & DevOps", items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Cloudflare"] },
  { category: "Tools", items: ["Figma", "Drizzle ORM", "GraphQL", "Zod", "TanStack Query"] },
];

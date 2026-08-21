import { desc } from "drizzle-orm";
import { db } from "@/db";
import { seoOverrides } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { SeoManager } from "./seo-manager";

export default async function AdminSeoPage() {
  await requireSession();
  const rows = await db.select().from(seoOverrides).orderBy(desc(seoOverrides.updatedAt));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">SEO Manager</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Per-path metadata overrides. Every page already generates strong defaults (title, description, canonical,
          Open Graph, JSON-LD) directly from its content — use this only when a specific page needs something
          different.
        </p>
      </div>
      <SeoManager overrides={rows} />
    </div>
  );
}

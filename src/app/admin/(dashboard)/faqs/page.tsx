import { asc } from "drizzle-orm";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { FaqsManager } from "./faqs-manager";

export default async function AdminFaqsPage() {
  await requireSession();
  const rows = await db.select().from(faqs).orderBy(asc(faqs.sortOrder));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">FAQs</h1>
        <p className="mt-1 text-sm text-ink-soft">{rows.length} FAQs shown on the site-wide FAQ page.</p>
      </div>
      <FaqsManager faqs={rows} />
    </div>
  );
}

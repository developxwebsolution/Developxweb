import { desc } from "drizzle-orm";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { TestimonialsManager } from "./testimonials-manager";

export default async function AdminTestimonialsPage() {
  await requireSession();
  const rows = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Testimonials</h1>
        <p className="mt-1 text-sm text-ink-soft">{rows.length} testimonials.</p>
      </div>
      <TestimonialsManager testimonials={rows} />
    </div>
  );
}

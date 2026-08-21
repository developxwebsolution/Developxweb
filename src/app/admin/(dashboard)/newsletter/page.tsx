import { desc } from "drizzle-orm";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { requireSession } from "@/lib/session";

export default async function AdminNewsletterPage() {
  await requireSession();
  const rows = await db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.subscribedAt));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Newsletter</h1>
        <p className="mt-1 text-sm text-ink-soft">
          {rows.length} subscribers. The `newsletter_subscribers` table is live — you&apos;ll see rows here once a
          signup form is added to the public site (not built yet; this section shows the admin side is ready).
        </p>
      </div>
      <div className="card-raised divide-y divide-line">
        {rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink-soft">No subscribers yet.</p>
        ) : (
          rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 p-5">
              <p className="text-sm text-ink">{r.email}</p>
              <p className="text-xs text-ink-soft">{new Date(r.subscribedAt).toLocaleDateString("en-IN")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

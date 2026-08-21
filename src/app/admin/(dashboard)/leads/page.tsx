import { desc } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { LeadsTable } from "./leads-table";

export default async function AdminLeadsPage() {
  await requireSession();
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Leads</h1>
        <p className="mt-1 text-sm text-ink-soft">
          {allLeads.length} total — submitted from the contact page and every city landing page.
        </p>
      </div>
      <div className="card-raised overflow-hidden">
        <LeadsTable leads={allLeads} />
      </div>
    </div>
  );
}

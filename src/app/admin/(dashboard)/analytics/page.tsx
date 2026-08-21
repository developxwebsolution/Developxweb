import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { leads, services, cities, blogPosts, portfolioProjects, testimonials, auditLogs } from "@/db/schema";
import { requireSession } from "@/lib/session";

export default async function AdminAnalyticsPage() {
  await requireSession();

  const [totalLeads] = await db.select({ n: count() }).from(leads);
  const statuses = ["new", "contacted", "qualified", "won", "lost"] as const;
  const leadsByStatus = await Promise.all(
    statuses.map(async (s) => {
      const [row] = await db.select({ n: count() }).from(leads).where(eq(leads.status, s));
      return { status: s, n: row.n };
    })
  );
  const [servicesCount] = await db.select({ n: count() }).from(services);
  const [citiesCount] = await db.select({ n: count() }).from(cities);
  const [blogCount] = await db.select({ n: count() }).from(blogPosts);
  const [portfolioCount] = await db.select({ n: count() }).from(portfolioProjects);
  const [testimonialsCount] = await db.select({ n: count() }).from(testimonials);
  const [auditCount] = await db.select({ n: count() }).from(auditLogs);

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Analytics</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Content and lead metrics computed directly from the database. This is not a visitor-traffic analytics
          integration (Plausible, GA4, etc.) — wiring one of those in is a separate, small follow-up.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {[
          ["Total leads", totalLeads.n],
          ["Services", servicesCount.n],
          ["Cities", citiesCount.n],
          ["Blog posts", blogCount.n],
          ["Portfolio", portfolioCount.n],
          ["Testimonials", testimonialsCount.n],
          ["Admin actions logged", auditCount.n],
        ].map(([label, value]) => (
          <div key={label as string} className="card-raised p-5">
            <p className="font-display text-2xl font-semibold text-ink">{value as number}</p>
            <p className="text-xs text-ink-soft">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 card-raised p-5">
        <h2 className="font-display text-base font-semibold text-ink">Leads by status</h2>
        <div className="mt-4 flex flex-col gap-3">
          {leadsByStatus.map(({ status, n }) => (
            <div key={status} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs capitalize text-ink-soft">{status}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper-raised">
                <div
                  className="h-full rounded-full bg-indigo"
                  style={{ width: totalLeads.n > 0 ? `${(n / totalLeads.n) * 100}%` : "0%" }}
                />
              </div>
              <span className="w-6 shrink-0 text-right text-xs text-ink-soft">{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

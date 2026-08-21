import Link from "next/link";
import { Inbox, Briefcase, MapPin, FileText, ArrowRight } from "lucide-react";
import { db } from "@/db";
import { leads, services, cities, blogPosts } from "@/db/schema";
import { eq, count, desc } from "drizzle-orm";
import { requireSession } from "@/lib/session";

export default async function AdminDashboardPage() {
  const session = await requireSession();

  const [leadCount] = await db.select({ n: count() }).from(leads);
  const [newLeadCount] = await db.select({ n: count() }).from(leads).where(eq(leads.status, "new"));
  const [serviceCount] = await db.select({ n: count() }).from(services);
  const [cityCount] = await db.select({ n: count() }).from(cities);
  const [postCount] = await db.select({ n: count() }).from(blogPosts);
  const recentLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(5);

  const stats = [
    { label: "Total leads", value: leadCount.n, icon: Inbox, href: "/admin/leads" },
    { label: "New leads", value: newLeadCount.n, icon: Inbox, href: "/admin/leads?status=new" },
    { label: "Services", value: serviceCount.n, icon: Briefcase, href: "/admin/services" },
    { label: "City pages", value: cityCount.n, icon: MapPin, href: "/admin/cities" },
    { label: "Blog posts", value: postCount.n, icon: FileText, href: "/admin/blog" },
  ];

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-ink">Welcome back, {session.user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-ink-soft">Here&apos;s what&apos;s happening across the site.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card-raised flex flex-col gap-3 p-5 transition-colors hover:border-indigo">
            <s.icon className="size-4 text-indigo" />
            <div>
              <p className="font-display text-2xl font-semibold text-ink">{s.value}</p>
              <p className="text-xs text-ink-soft">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 card-raised">
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 className="font-display text-base font-semibold text-ink">Recent leads</h2>
          <Link href="/admin/leads" className="flex items-center gap-1 text-sm font-medium text-indigo">
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="p-5 text-sm text-ink-soft">No leads yet — they&apos;ll show up here as soon as someone submits the contact form.</p>
        ) : (
          <div className="divide-y divide-line">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <p className="text-sm font-medium text-ink">{lead.name}</p>
                  <p className="text-xs text-ink-soft">{lead.email} · {lead.service ?? "General enquiry"}</p>
                </div>
                <span className="rounded-full border border-line px-2.5 py-1 text-xs capitalize text-ink-soft">{lead.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

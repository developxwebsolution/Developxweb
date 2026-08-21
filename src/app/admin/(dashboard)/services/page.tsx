import Link from "next/link";
import { asc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { services } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { DeleteServiceButton } from "./delete-service-button";

export default async function AdminServicesPage() {
  await requireSession();
  const rows = await db.select().from(services).orderBy(asc(services.name));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Services</h1>
          <p className="mt-1 text-sm text-ink-soft">{rows.length} services.</p>
        </div>
        <Link href="/admin/services/new" className="flex items-center gap-1.5 rounded-full bg-indigo px-4 py-2 text-sm font-medium text-white">
          <Plus className="size-3.5" /> New service
        </Link>
      </div>
      <div className="card-raised divide-y divide-line">
        {rows.map((s) => (
          <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="text-sm font-medium text-ink">{s.name}</p>
              <p className="mt-0.5 text-xs text-ink-soft">
                /services/{s.slug} · from {s.startingPrice} · {s.timeline} · <span className="capitalize">{s.status}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/services/${s.id}`} className="text-sm font-medium text-indigo">
                Edit
              </Link>
              <DeleteServiceButton id={s.id} name={s.name} />
            </div>
          </div>
        ))}
        {rows.length === 0 ? <p className="p-8 text-center text-sm text-ink-soft">No services yet.</p> : null}
      </div>
    </div>
  );
}

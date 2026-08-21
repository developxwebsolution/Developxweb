import Link from "next/link";
import { asc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { cities } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { DeleteCityButton } from "./delete-city-button";

export default async function AdminCitiesPage() {
  await requireSession();
  const rows = await db.select().from(cities).orderBy(asc(cities.name));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Cities</h1>
          <p className="mt-1 text-sm text-ink-soft">{rows.length} city landing pages.</p>
        </div>
        <Link href="/admin/cities/new" className="flex items-center gap-1.5 rounded-full bg-indigo px-4 py-2 text-sm font-medium text-white">
          <Plus className="size-3.5" /> New city
        </Link>
      </div>
      <div className="card-raised divide-y divide-line">
        {rows.map((c) => (
          <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="text-sm font-medium text-ink">{c.name}, {c.state}</p>
              <p className="mt-0.5 text-xs text-ink-soft">
                /web-development-company-{c.slug} · <span className="capitalize">{c.status}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/cities/${c.id}`} className="text-sm font-medium text-indigo">
                Edit
              </Link>
              <DeleteCityButton id={c.id} name={c.name} />
            </div>
          </div>
        ))}
        {rows.length === 0 ? <p className="p-8 text-center text-sm text-ink-soft">No cities yet.</p> : null}
      </div>
    </div>
  );
}

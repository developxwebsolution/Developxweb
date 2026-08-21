import Link from "next/link";
import { asc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { portfolioProjects } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { DeleteProjectButton } from "./delete-project-button";

export default async function AdminPortfolioPage() {
  await requireSession();
  const rows = await db.select().from(portfolioProjects).orderBy(asc(portfolioProjects.name));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Portfolio</h1>
          <p className="mt-1 text-sm text-ink-soft">{rows.length} case studies.</p>
        </div>
        <Link href="/admin/portfolio/new" className="flex items-center gap-1.5 rounded-full bg-indigo px-4 py-2 text-sm font-medium text-white">
          <Plus className="size-3.5" /> New project
        </Link>
      </div>
      <div className="card-raised divide-y divide-line">
        {rows.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="text-sm font-medium text-ink">{p.name}</p>
              <p className="mt-0.5 text-xs text-ink-soft">
                {p.industry.replace("-", " & ")} · {p.city} · {p.year} · <span className="capitalize">{p.status}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/portfolio/${p.id}`} className="text-sm font-medium text-indigo">
                Edit
              </Link>
              <DeleteProjectButton id={p.id} name={p.name} />
            </div>
          </div>
        ))}
        {rows.length === 0 ? <p className="p-8 text-center text-sm text-ink-soft">No projects yet.</p> : null}
      </div>
    </div>
  );
}

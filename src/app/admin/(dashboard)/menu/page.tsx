import { asc } from "drizzle-orm";
import { db } from "@/db";
import { menuItems } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { MenuBuilder } from "./menu-builder";

export default async function AdminMenuPage() {
  await requireSession();
  const rows = await db.select().from(menuItems).orderBy(asc(menuItems.sortOrder));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Menu Builder</h1>
        <p className="mt-1 text-sm text-ink-soft">Manage custom navigation and footer links stored in the database.</p>
      </div>
      <MenuBuilder items={rows} />
    </div>
  );
}

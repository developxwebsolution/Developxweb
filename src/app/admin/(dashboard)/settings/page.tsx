import { eq } from "drizzle-orm";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { SettingsForm } from "./settings-form";
import { site } from "@/data/site";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const [row] = await db.select().from(settings).where(eq(settings.key, "site_contact")).limit(1);

  const current = (row?.value as { contactEmail?: string; contactPhone?: string; officeAddress?: string } | undefined) ?? {
    contactEmail: site.email,
    contactPhone: site.phone,
    officeAddress: `${site.addressLocality}, ${site.addressRegion}, India`,
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Contact details stored here are separate from the code defaults in <code>src/data/site.ts</code> — this
          is the first piece of site config moved into the database. Wiring the public pages to read from here
          instead of the static file is the next step.
        </p>
      </div>
      <SettingsForm defaultValues={current} />
    </div>
  );
}

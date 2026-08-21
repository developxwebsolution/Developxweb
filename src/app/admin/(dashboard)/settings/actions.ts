"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { requireAdmin } from "@/lib/session";

const schema = z.object({
  contactEmail: z.string().trim().email(),
  contactPhone: z.string().trim().min(1).max(30),
  officeAddress: z.string().trim().min(1).max(300),
});

export type SettingsFormState = { ok: boolean; error?: string };

export async function updateSettings(_prev: SettingsFormState, formData: FormData): Promise<SettingsFormState> {
  await requireAdmin();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  await db
    .insert(settings)
    .values({ key: "site_contact", value: parsed.data })
    .onConflictDoUpdate({ target: settings.key, set: { value: parsed.data, updatedAt: new Date() } });

  revalidatePath("/admin/settings");
  return { ok: true };
}

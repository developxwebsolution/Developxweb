"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { seoOverrides } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";

const schema = z.object({
  path: z.string().trim().min(1).max(300).regex(/^\//, "Path must start with /"),
  title: z.string().trim().max(300).optional(),
  description: z.string().trim().max(500).optional(),
  noindex: z.coerce.boolean().optional(),
});

export type SeoFormState = { ok: boolean; error?: string };

export async function upsertSeoOverride(_prev: SeoFormState, formData: FormData): Promise<SeoFormState> {
  await requireEditor();
  const parsed = schema.safeParse({
    path: formData.get("path"),
    title: formData.get("title") || undefined,
    description: formData.get("description") || undefined,
    noindex: formData.get("noindex") === "on",
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  await db
    .insert(seoOverrides)
    .values({ path: parsed.data.path, title: parsed.data.title, description: parsed.data.description, noindex: parsed.data.noindex ?? false })
    .onConflictDoUpdate({
      target: seoOverrides.path,
      set: { title: parsed.data.title, description: parsed.data.description, noindex: parsed.data.noindex ?? false, updatedAt: new Date() },
    });

  revalidatePath("/admin/seo");
  return { ok: true };
}

export async function deleteSeoOverride(id: string) {
  await requireAdmin();
  await db.delete(seoOverrides).where(eq(seoOverrides.id, id));
  revalidatePath("/admin/seo");
}

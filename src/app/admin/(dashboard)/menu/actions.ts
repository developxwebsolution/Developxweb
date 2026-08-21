"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { menuItems } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";

const schema = z.object({
  menu: z.enum(["primary", "footer_company", "footer_resources"]),
  label: z.string().trim().min(1).max(100),
  href: z.string().trim().min(1).max(300),
  sortOrder: z.coerce.number().int().default(0),
});

export type MenuFormState = { ok: boolean; error?: string };

export async function createMenuItem(_prev: MenuFormState, formData: FormData): Promise<MenuFormState> {
  await requireEditor();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  await db.insert(menuItems).values(parsed.data);
  revalidatePath("/admin/menu");
  // The navbar/footer are rendered once in (site)/layout.tsx and shared by
  // every public page, so revalidating a single page path wouldn't refresh
  // them everywhere — revalidating the layout itself does.
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteMenuItem(id: string) {
  await requireAdmin();
  await db.delete(menuItems).where(eq(menuItems.id, id));
  revalidatePath("/admin/menu");
  revalidatePath("/", "layout");
}

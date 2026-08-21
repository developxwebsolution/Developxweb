"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";

const schema = z.object({
  question: z.string().trim().min(1).max(300),
  answer: z.string().trim().min(1).max(2000),
});

export type FaqFormState = { ok: boolean; error?: string };

export async function createFaq(_prev: FaqFormState, formData: FormData): Promise<FaqFormState> {
  await requireEditor();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  await db.insert(faqs).values({ question: parsed.data.question, answer: parsed.data.answer, status: "published" });
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  return { ok: true };
}

export async function updateFaq(id: string, _prev: FaqFormState, formData: FormData): Promise<FaqFormState> {
  await requireEditor();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  await db.update(faqs).set({ question: parsed.data.question, answer: parsed.data.answer }).where(eq(faqs.id, id));
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  return { ok: true };
}

export async function deleteFaq(id: string) {
  await requireAdmin();
  await db.delete(faqs).where(eq(faqs.id, id));
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
}

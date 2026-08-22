"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  role: z.string().trim().min(1).max(200),
  company: z.string().trim().min(1).max(200),
  city: z.string().trim().min(1).max(100),
  quote: z.string().trim().min(1).max(1000),
  rating: z.coerce.number().int().min(1).max(5),
});

export type TestimonialFormState = { ok: boolean; error?: string };

export async function createTestimonial(_prev: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
  await requireEditor();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  await db.insert(testimonials).values({ ...parsed.data, status: "published" });
    revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateTestimonial(id: string, _prev: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
  await requireEditor();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  await db.update(testimonials).set(parsed.data).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await db.delete(testimonials).where(eq(testimonials.id, id));
    revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
}

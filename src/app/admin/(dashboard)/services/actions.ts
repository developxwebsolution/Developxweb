"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { services, auditLogs } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";

const processStepSchema = z.object({ title: z.string().min(1), detail: z.string().min(1) });
const faqSchema = z.object({ q: z.string().min(1), a: z.string().min(1) });

const serviceSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens"),
  name: z.string().trim().min(1).max(300),
  shortName: z.string().trim().min(1).max(200),
  icon: z.string().trim().min(1).max(100),
  summary: z.string().trim().min(1).max(500),
  description: z.string().trim().min(1),
  startingPrice: z.string().trim().min(1).max(100),
  timeline: z.string().trim().min(1).max(100),
  features: z.string(),
  deliverables: z.string(),
  process: z.string(),
  faqs: z.string(),
  status: z.enum(["draft", "published", "archived"]),
});

export type ServiceFormState = { ok: boolean; error?: string };

function linesToArray(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseJsonField<T>(raw: string, schema: z.ZodType<T[]>, fieldLabel: string): T[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error(`${fieldLabel} must be valid JSON — check for a missing comma or bracket.`);
  }
  const result = schema.safeParse(parsed);
  if (!result.success) throw new Error(`${fieldLabel}: ${result.error.issues[0]?.message ?? "invalid format"}`);
  return result.data;
}

function parseFormFields(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = serviceSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");

  return {
    ...parsed.data,
    features: linesToArray(parsed.data.features),
    deliverables: linesToArray(parsed.data.deliverables),
    process: parseJsonField(parsed.data.process, z.array(processStepSchema), "Process steps"),
    faqs: parseJsonField(parsed.data.faqs, z.array(faqSchema), "FAQs"),
  };
}

export async function createService(_prev: ServiceFormState, formData: FormData): Promise<ServiceFormState> {
  const session = await requireEditor();

  let values;
  try {
    values = parseFormFields(formData);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Invalid input" };
  }

  const existing = await db.select().from(services).where(eq(services.slug, values.slug)).limit(1);
  if (existing.length > 0) return { ok: false, error: "A service with this slug already exists." };

  await db.insert(services).values(values);
  await db.insert(auditLogs).values({ userId: session.user.id, action: "service.created", entityType: "service", entityId: values.slug });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(id: string, _prev: ServiceFormState, formData: FormData): Promise<ServiceFormState> {
  const session = await requireEditor();

  let values;
  try {
    values = parseFormFields(formData);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Invalid input" };
  }

  await db.update(services).set({ ...values, updatedAt: new Date() }).where(eq(services.id, id));
  await db.insert(auditLogs).values({ userId: session.user.id, action: "service.updated", entityType: "service", entityId: id });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${values.slug}`);
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  const session = await requireAdmin();
  await db.delete(services).where(eq(services.id, id));
  await db.insert(auditLogs).values({ userId: session.user.id, action: "service.deleted", entityType: "service", entityId: id });
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

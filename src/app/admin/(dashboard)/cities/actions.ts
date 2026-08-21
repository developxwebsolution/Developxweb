"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { cities, auditLogs } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";

const caseStudySchema = z.object({ client: z.string().min(1), industry: z.string().min(1), result: z.string().min(1) });

const citySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens"),
  name: z.string().trim().min(1).max(200),
  state: z.string().trim().min(1).max(200),
  population: z.string().trim().max(100).optional(),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  businessHubs: z.string(),
  localIndustries: z.string(),
  intro: z.string().trim().min(1),
  landscape: z.string().trim().min(1),
  whyUs: z.string().trim().min(1),
  caseStudy: z.string(),
  nearby: z.string(),
  status: z.enum(["draft", "published", "archived"]),
});

export type CityFormState = { ok: boolean; error?: string };

function linesToArray(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseFormFields(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = citySchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");

  let caseStudy;
  try {
    caseStudy = caseStudySchema.parse(JSON.parse(parsed.data.caseStudy));
  } catch (e) {
    throw new Error(e instanceof z.ZodError ? `Case study: ${e.issues[0]?.message}` : "Case study must be valid JSON with client, industry and result.");
  }

  return {
    ...parsed.data,
    lat: String(parsed.data.lat),
    lng: String(parsed.data.lng),
    businessHubs: linesToArray(parsed.data.businessHubs),
    localIndustries: linesToArray(parsed.data.localIndustries),
    nearby: linesToArray(parsed.data.nearby),
    caseStudy,
  };
}

export async function createCity(_prev: CityFormState, formData: FormData): Promise<CityFormState> {
  const session = await requireEditor();

  let values;
  try {
    values = parseFormFields(formData);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Invalid input" };
  }

  const existing = await db.select().from(cities).where(eq(cities.slug, values.slug)).limit(1);
  if (existing.length > 0) return { ok: false, error: "A city with this slug already exists." };

  await db.insert(cities).values(values);
  await db.insert(auditLogs).values({ userId: session.user.id, action: "city.created", entityType: "city", entityId: values.slug });

  revalidatePath("/admin/cities");
  revalidatePath("/locations");
  redirect("/admin/cities");
}

export async function updateCity(id: string, _prev: CityFormState, formData: FormData): Promise<CityFormState> {
  const session = await requireEditor();

  let values;
  try {
    values = parseFormFields(formData);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Invalid input" };
  }

  await db.update(cities).set({ ...values, updatedAt: new Date() }).where(eq(cities.id, id));
  await db.insert(auditLogs).values({ userId: session.user.id, action: "city.updated", entityType: "city", entityId: id });

  revalidatePath("/admin/cities");
  revalidatePath("/locations");
  revalidatePath(`/web-development-company-${values.slug}`);
  redirect("/admin/cities");
}

export async function deleteCity(id: string) {
  const session = await requireAdmin();
  await db.delete(cities).where(eq(cities.id, id));
  await db.insert(auditLogs).values({ userId: session.user.id, action: "city.deleted", entityType: "city", entityId: id });
  revalidatePath("/admin/cities");
  revalidatePath("/locations");
}

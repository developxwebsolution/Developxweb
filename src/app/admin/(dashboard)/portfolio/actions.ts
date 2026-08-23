"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { portfolioProjects, auditLogs } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";

const resultSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens",
    ),
  name: z.string().trim().min(1).max(200),
  client: z.string().trim().min(1).max(200),
  industry: z.string().trim().min(1).max(100),
  service: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(100),
  summary: z.string().trim().min(1).max(500),
  challenge: z.string().trim().min(1),
  solution: z.string().trim().min(1),
  results: z.string(),
  stack: z.string(),
  year: z.string().trim().min(1).max(10),
  image: z.string().trim().url().optional().or(z.literal("")),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a hex code like #4338CA"),
  status: z.enum(["draft", "published", "archived"]),
});

export type ProjectFormState = { ok: boolean; error?: string };

function linesToArray(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function parseFormFields(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success)
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");

  let results;
  try {
    results = z.array(resultSchema).parse(JSON.parse(parsed.data.results));
  } catch (e) {
    throw new Error(
      e instanceof z.ZodError
        ? `Results: ${e.issues[0]?.message}`
        : "Results must be a valid JSON array of {label, value}.",
    );
  }

  return { ...parsed.data, results, stack: linesToArray(parsed.data.stack) };
}

export async function createProject(
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const session = await requireEditor();

  let values;
  try {
    values = parseFormFields(formData);
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Invalid input",
    };
  }

  const existing = await db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.slug, values.slug))
    .limit(1);
  if (existing.length > 0)
    return { ok: false, error: "A project with this slug already exists." };

  await db.insert(portfolioProjects).values(values);
  await db
    .insert(auditLogs)
    .values({
      userId: session.user.id,
      action: "portfolio.created",
      entityType: "portfolio_project",
      entityId: values.slug,
    });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function updateProject(
  id: string,
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const session = await requireEditor();

  let values;
  try {
    values = parseFormFields(formData);
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Invalid input",
    };
  }

  await db
    .update(portfolioProjects)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(portfolioProjects.id, id));
  await db
    .insert(auditLogs)
    .values({
      userId: session.user.id,
      action: "portfolio.updated",
      entityType: "portfolio_project",
      entityId: id,
    });

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${values.slug}`);
  redirect("/admin/portfolio");
}

export async function deleteProject(id: string) {
  const session = await requireAdmin();
  await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
  await db
    .insert(auditLogs)
    .values({
      userId: session.user.id,
      action: "portfolio.deleted",
      entityType: "portfolio_project",
      entityId: id,
    });
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}

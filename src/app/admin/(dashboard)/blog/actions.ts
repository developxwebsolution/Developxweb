"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { blogPosts, auditLogs } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";

const postSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers and hyphens"),
  title: z.string().trim().min(1).max(300),
  excerpt: z.string().trim().min(1).max(500),
  content: z.string().trim().min(1),
  category: z.string().trim().min(1).max(100),
  author: z.string().trim().min(1).max(200),
  readTime: z.string().trim().min(1).max(50),
  status: z.enum(["draft", "published", "archived"]),
  featuredImage: z.string().trim().url().optional().or(z.literal("")),
});

export type PostFormState = { ok: boolean; error?: string; slug?: string };

function toContentArray(raw: string): string[] {
  return raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function createPost(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const session = await requireEditor();
  const parsed = postSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  const existing = await db.select().from(blogPosts).where(eq(blogPosts.slug, parsed.data.slug)).limit(1);
  if (existing.length > 0) return { ok: false, error: "A post with this slug already exists." };

  await db.insert(blogPosts).values({
    ...parsed.data,
    content: toContentArray(parsed.data.content),
    authorId: session.user.id,
    publishedAt: parsed.data.status === "published" ? new Date() : null,
  });

  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: "blog.created",
    entityType: "blog_post",
    entityId: parsed.data.slug,
  });

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updatePost(id: string, _prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const session = await requireEditor();
  const parsed = postSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  const [current] = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  const wasPublished = current?.status === "published";
  const nowPublished = parsed.data.status === "published";

  await db
    .update(blogPosts)
    .set({
      ...parsed.data,
      content: toContentArray(parsed.data.content),
      updatedAt: new Date(),
      publishedAt: !wasPublished && nowPublished ? new Date() : current?.publishedAt,
    })
    .where(eq(blogPosts.id, id));

  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: "blog.updated",
    entityType: "blog_post",
    entityId: id,
  });

  revalidatePath("/admin/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  const session = await requireAdmin();
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  await db.insert(auditLogs).values({ userId: session.user.id, action: "blog.deleted", entityType: "blog_post", entityId: id });
  revalidatePath("/admin/blog");
}

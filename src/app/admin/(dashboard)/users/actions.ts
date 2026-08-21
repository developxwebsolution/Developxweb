"use server";

import { revalidatePath } from "next/cache";
import { eq, count } from "drizzle-orm";
import { db } from "@/db";
import { user as userTable, auditLogs } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { auth } from "@/lib/auth";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email(),
  password: z.string().min(10, "Password must be at least 10 characters"),
  role: z.enum(["admin", "editor", "viewer"]),
});

export type UserFormState = { ok: boolean; error?: string };

export async function createUser(_prev: UserFormState, formData: FormData): Promise<UserFormState> {
  const session = await requireAdmin();

  const parsed = createUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message };

  const existing = await db.select().from(userTable).where(eq(userTable.email, parsed.data.email)).limit(1);
  if (existing.length > 0) return { ok: false, error: "A user with this email already exists." };

  const result = await auth.api.signUpEmail({
    body: { email: parsed.data.email, password: parsed.data.password, name: parsed.data.name },
  });
  if (!result?.user?.id) return { ok: false, error: "Could not create the account. Please try again." };

  await db.update(userTable).set({ role: parsed.data.role, emailVerified: true }).where(eq(userTable.id, result.user.id));
  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: "user.created",
    entityType: "user",
    entityId: result.user.id,
    metadata: { email: parsed.data.email, role: parsed.data.role },
  });

  revalidatePath("/admin/users");
  return { ok: true };
}

export async function updateUserRole(userId: string, role: "admin" | "editor" | "viewer") {
  const session = await requireAdmin();

  if (userId === session.user.id && role !== "admin") {
    const [{ n: adminCount }] = await db.select({ n: count() }).from(userTable).where(eq(userTable.role, "admin"));
    if (adminCount <= 1) throw new Error("You're the last admin — promote someone else before stepping down.");
  }

  await db.update(userTable).set({ role, updatedAt: new Date() }).where(eq(userTable.id, userId));
  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: "user.role_changed",
    entityType: "user",
    entityId: userId,
    metadata: { role },
  });
  revalidatePath("/admin/users");
}

export async function deleteUser(userId: string) {
  const session = await requireAdmin();
  if (userId === session.user.id) throw new Error("You can't delete your own account while signed in.");

  await db.delete(userTable).where(eq(userTable.id, userId));
  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: "user.deleted",
    entityType: "user",
    entityId: userId,
  });
  revalidatePath("/admin/users");
}

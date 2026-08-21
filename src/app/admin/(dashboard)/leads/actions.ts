"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { leads, auditLogs } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";

const VALID_STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;

export async function updateLeadStatus(leadId: string, status: (typeof VALID_STATUSES)[number]) {
  const session = await requireEditor();
  if (!VALID_STATUSES.includes(status)) throw new Error("Invalid status");

  await db.update(leads).set({ status, updatedAt: new Date() }).where(eq(leads.id, leadId));
  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: "lead.status_changed",
    entityType: "lead",
    entityId: leadId,
    metadata: { status },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(leadId: string) {
  const session = await requireAdmin();
  await db.delete(leads).where(eq(leads.id, leadId));
  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: "lead.deleted",
    entityType: "lead",
    entityId: leadId,
  });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

import { desc } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { UsersManager } from "./users-manager";

export default async function AdminUsersPage() {
  const session = await requireAdmin();
  const users = await db
    .select({ id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt })
    .from(user)
    .orderBy(desc(user.createdAt));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Users</h1>
        <p className="mt-1 text-sm text-ink-soft">Manage who can access the admin panel and what they can do.</p>
      </div>
      <UsersManager users={users} currentUserId={session.user.id} />
    </div>
  );
}

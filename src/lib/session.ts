import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Use in admin server components. Redirects to /admin/login if not authenticated. */
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/**
 * Use for actions that create or edit content (blog posts, services, cities,
 * portfolio, testimonials, FAQs, menu items, SEO overrides). Viewers can see
 * the admin panel but shouldn't be able to write — only editors and admins
 * can.
 */
export async function requireEditor() {
  const session = await requireSession();
  if (session.user.role !== "admin" && session.user.role !== "editor") redirect("/admin?error=forbidden");
  return session;
}

/**
 * Use for actions that must be admin-only: deleting any content, Users,
 * Settings. Editors can create and edit content but not delete it or touch
 * account/settings-level configuration.
 */
export async function requireAdmin() {
  const session = await requireSession();
  if (session.user.role !== "admin") redirect("/admin?error=forbidden");
  return session;
}

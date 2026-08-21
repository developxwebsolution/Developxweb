import { requireSession } from "@/lib/session";
import { ChangePasswordForm } from "@/components/admin/change-password-form";

export default async function AccountPage() {
  const session = await requireSession();

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">My account</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Signed in as {session.user.name} ({session.user.email}) — role: {session.user.role}.
        </p>
      </div>
      <ChangePasswordForm />
    </div>
  );
}

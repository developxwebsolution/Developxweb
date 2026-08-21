"use client";

import { useActionState, useTransition, useState } from "react";
import { UserPlus, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { createUser, updateUserRole, deleteUser, type UserFormState } from "./actions";

type User = { id: string; name: string; email: string; role: "admin" | "editor" | "viewer"; createdAt: Date };

const initialState: UserFormState = { ok: false };

export function UsersManager({ users, currentUserId }: { users: User[]; currentUserId: string }) {
  const [formState, formAction, pending] = useActionState(createUser, initialState);
  const [formOpen, setFormOpen] = useState(false);
  const [rowPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-6">
      <div className="card-raised">
        <div className="flex items-center justify-between border-b border-line p-5">
          <h2 className="font-display text-base font-semibold text-ink">Team members ({users.length})</h2>
          <button
            onClick={() => setFormOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full bg-indigo px-4 py-2 text-xs font-medium text-white cursor-pointer"
          >
            <UserPlus className="size-3.5" /> New user
          </button>
        </div>

        {formOpen ? (
          <form action={formAction} className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-end sm:gap-3">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-xs font-medium text-ink-soft">Name</span>
              <input name="name" required className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo" />
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-xs font-medium text-ink-soft">Email</span>
              <input name="email" type="email" required className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo" />
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-xs font-medium text-ink-soft">Temporary password</span>
              <input name="password" type="text" required minLength={10} className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-ink-soft">Role</span>
              <select name="role" defaultValue="editor" className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </label>
            <button type="submit" disabled={pending} className="rounded-lg bg-indigo px-4 py-2 text-sm font-medium text-white disabled:opacity-60 cursor-pointer">
              {pending ? "Creating…" : "Create"}
            </button>
          </form>
        ) : null}

        {formState.error ? (
          <p className="mx-5 mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
            <AlertCircle className="size-4 shrink-0" /> {formState.error}
          </p>
        ) : null}
        {formState.ok ? (
          <p className="mx-5 mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 className="size-4 shrink-0" /> User created. Share the temporary password with them securely and ask them to change it after first login.
          </p>
        ) : null}

        <div className="divide-y divide-line">
          {users.map((u) => (
            <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="text-sm font-medium text-ink">
                  {u.name} {u.id === currentUserId ? <span className="text-xs text-ink-soft">(you)</span> : null}
                </p>
                <p className="text-xs text-ink-soft">{u.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={u.role}
                  disabled={rowPending}
                  onChange={(e) => startTransition(() => updateUserRole(u.id, e.target.value as User["role"]))}
                  className="rounded-full border border-line bg-paper px-3 py-1 text-xs capitalize text-ink outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
                {u.id !== currentUserId ? (
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${u.name}'s access?`)) startTransition(() => deleteUser(u.id));
                    }}
                    disabled={rowPending}
                    aria-label="Delete user"
                    className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

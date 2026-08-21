"use client";

import { useActionState, useTransition } from "react";
import { Trash2, AlertCircle } from "lucide-react";
import { createMenuItem, deleteMenuItem, type MenuFormState } from "./actions";

type MenuItem = { id: string; menu: string; label: string; href: string; sortOrder: number };

const MENUS = [
  { value: "primary", label: "Primary nav (top navbar)" },
  { value: "footer_company", label: "Footer — Company column" },
  { value: "footer_resources", label: "Footer — Resources column" },
] as const;

export function MenuBuilder({ items }: { items: MenuItem[] }) {
  const [state, formAction, pending] = useActionState<MenuFormState, FormData>(createMenuItem, { ok: false });
  const [rowPending, startTransition] = useTransition();
  const inputClass = "w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo";

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} className="card-raised flex flex-col gap-3 p-5 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-ink-soft">Menu</span>
          <select name="menu" defaultValue="primary" className={inputClass}>
            {MENUS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-ink-soft">Label</span>
          <input name="label" required className={inputClass} />
        </label>
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-ink-soft">Link</span>
          <input name="href" required placeholder="/pricing" className={inputClass} />
        </label>
        <label className="flex w-24 flex-col gap-1.5">
          <span className="text-xs font-medium text-ink-soft">Order</span>
          <input name="sortOrder" type="number" defaultValue={0} className={inputClass} />
        </label>
        <button type="submit" disabled={pending} className="rounded-full bg-indigo px-5 py-2 text-sm font-medium text-white disabled:opacity-60 cursor-pointer">
          {pending ? "Adding…" : "Add"}
        </button>
      </form>
      {state.error ? (
        <p className="-mt-3 flex items-center gap-2 text-sm text-red-600"><AlertCircle className="size-4" /> {state.error}</p>
      ) : null}

      {MENUS.map((menuDef) => (
        <div key={menuDef.value} className="card-raised">
          <h2 className="border-b border-line p-5 font-display text-sm font-semibold text-ink">{menuDef.label}</h2>
          <div className="divide-y divide-line">
            {items
              .filter((i) => i.menu === menuDef.value)
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 p-5">
                  <p className="text-sm text-ink">
                    {item.label} <span className="text-ink-soft">→ {item.href}</span>
                  </p>
                  <button
                    onClick={() => confirm("Remove this menu item?") && startTransition(() => deleteMenuItem(item.id))}
                    disabled={rowPending}
                    className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            {items.filter((i) => i.menu === menuDef.value).length === 0 ? (
              <p className="p-5 text-sm text-ink-soft">No items — the live site falls back to its built-in defaults for this menu until you add at least one item here.</p>
            ) : null}
          </div>
        </div>
      ))}

      <p className="text-xs text-ink-soft">
        Changes here are live immediately on the public site&apos;s navbar and footer — no redeploy needed.
        If a menu has zero items (e.g. right after a fresh install before seeding), the site falls back to
        sensible built-in defaults rather than showing an empty navbar.
      </p>
    </div>
  );
}

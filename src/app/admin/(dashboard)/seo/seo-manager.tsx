"use client";

import { useActionState, useTransition } from "react";
import { Trash2, AlertCircle } from "lucide-react";
import { upsertSeoOverride, deleteSeoOverride, type SeoFormState } from "./actions";

type Override = { id: string; path: string; title: string | null; description: string | null; noindex: boolean };

export function SeoManager({ overrides }: { overrides: Override[] }) {
  const [state, formAction, pending] = useActionState<SeoFormState, FormData>(upsertSeoOverride, { ok: false });
  const [rowPending, startTransition] = useTransition();
  const inputClass = "w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo";

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} className="card-raised flex flex-col gap-3 p-5">
        <h2 className="font-display text-sm font-semibold text-ink">Add or update a page override</h2>
        <p className="text-xs text-ink-soft">
          Overrides the auto-generated title/description for a specific path. Leave a field blank to keep the
          code-generated default for that field.
        </p>
        <input name="path" placeholder="/web-development-company-jaipur" required className={inputClass} />
        <input name="title" placeholder="Custom SEO title (optional)" className={inputClass} />
        <textarea name="description" placeholder="Custom meta description (optional)" rows={2} className={inputClass} />
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" name="noindex" /> Set this page to noindex
        </label>
        <button type="submit" disabled={pending} className="self-start rounded-full bg-indigo px-5 py-2 text-sm font-medium text-white disabled:opacity-60 cursor-pointer">
          {pending ? "Saving…" : "Save override"}
        </button>
        {state.error ? (
          <p className="flex items-center gap-2 text-sm text-red-600"><AlertCircle className="size-4" /> {state.error}</p>
        ) : null}
      </form>

      <div className="card-raised divide-y divide-line">
        {overrides.length === 0 ? (
          <p className="p-8 text-center text-sm text-ink-soft">No overrides yet — every page uses its code-generated metadata.</p>
        ) : (
          overrides.map((o) => (
            <div key={o.id} className="flex items-start justify-between gap-3 p-5">
              <div>
                <p className="text-sm font-medium text-ink">{o.path} {o.noindex ? <span className="ml-2 text-xs text-red-600">noindex</span> : null}</p>
                {o.title ? <p className="mt-1 text-xs text-ink-soft">Title: {o.title}</p> : null}
                {o.description ? <p className="mt-1 text-xs text-ink-soft">{o.description}</p> : null}
              </div>
              <button
                onClick={() => confirm("Delete this override?") && startTransition(() => deleteSeoOverride(o.id))}
                disabled={rowPending}
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

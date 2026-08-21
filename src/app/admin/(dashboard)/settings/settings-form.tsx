"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { updateSettings, type SettingsFormState } from "./actions";

const inputClass = "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-indigo";

export function SettingsForm({ defaultValues }: { defaultValues: { contactEmail?: string; contactPhone?: string; officeAddress?: string } }) {
  const [state, formAction, pending] = useActionState<SettingsFormState, FormData>(updateSettings, { ok: false });

  return (
    <form action={formAction} className="card-raised flex max-w-xl flex-col gap-4 p-6">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-ink-soft">Contact email</span>
        <input name="contactEmail" type="email" required defaultValue={defaultValues.contactEmail} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-ink-soft">Contact phone</span>
        <input name="contactPhone" required defaultValue={defaultValues.contactPhone} className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-ink-soft">Office address</span>
        <input name="officeAddress" required defaultValue={defaultValues.officeAddress} className={inputClass} />
      </label>

      {state.error ? (
        <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle className="size-4 shrink-0" /> {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <CheckCircle2 className="size-4 shrink-0" /> Saved.
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="self-start rounded-full bg-indigo px-6 py-2.5 text-sm font-medium text-white disabled:opacity-60 cursor-pointer">
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}

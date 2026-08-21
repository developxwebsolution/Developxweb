"use client";

import { useActionState, useState, useTransition } from "react";
import { Trash2, AlertCircle, Pencil, X } from "lucide-react";
import { updateFaq, deleteFaq, type FaqFormState } from "./actions";

type Faq = { id: string; question: string; answer: string };

const inputClass = "w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo";

export function FaqRow({ faq }: { faq: Faq }) {
  const [editing, setEditing] = useState(false);
  const [rowPending, startTransition] = useTransition();
  const boundUpdate = updateFaq.bind(null, faq.id);
  const [state, formAction, pending] = useActionState<FaqFormState, FormData>(boundUpdate, { ok: false });

  if (editing) {
    return (
      <form action={formAction} className="flex flex-col gap-3 p-5">
        <input name="question" defaultValue={faq.question} placeholder="Question" required className={inputClass} />
        <textarea name="answer" defaultValue={faq.answer} placeholder="Answer" required rows={3} className={inputClass} />
        <div className="flex items-center gap-3">
          <button type="submit" disabled={pending} className="rounded-full bg-indigo px-5 py-2 text-sm font-medium text-white disabled:opacity-60 cursor-pointer">
            {pending ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="flex items-center gap-1 rounded-full border border-line px-4 py-2 text-sm text-ink-soft hover:text-ink cursor-pointer"
          >
            <X className="size-3.5" /> Cancel
          </button>
        </div>
        {state.error ? (
          <p className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="size-4" /> {state.error}
          </p>
        ) : null}
        {state.ok ? <p className="text-sm text-emerald-600">Saved.</p> : null}
      </form>
    );
  }

  return (
    <div className="flex items-start justify-between gap-3 p-5">
      <div>
        <p className="text-sm font-medium text-ink">{faq.question}</p>
        <p className="mt-1 text-sm text-ink-soft">{faq.answer}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => setEditing(true)}
          aria-label="Edit FAQ"
          className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-paper-raised hover:text-ink cursor-pointer"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          onClick={() => confirm("Delete this FAQ?") && startTransition(() => deleteFaq(faq.id))}
          disabled={rowPending}
          aria-label="Delete FAQ"
          className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

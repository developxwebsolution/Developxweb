"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { createFaq, type FaqFormState } from "./actions";
import { FaqRow } from "./faq-row";

type Faq = { id: string; question: string; answer: string };

export function FaqsManager({ faqs }: { faqs: Faq[] }) {
  const [state, formAction, pending] = useActionState<FaqFormState, FormData>(createFaq, { ok: false });
  const inputClass = "w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo";

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} className="card-raised flex flex-col gap-3 p-5">
        <h2 className="font-display text-sm font-semibold text-ink">Add an FAQ</h2>
        <input name="question" placeholder="Question" required className={inputClass} />
        <textarea name="answer" placeholder="Answer" required rows={3} className={inputClass} />
        <button type="submit" disabled={pending} className="self-start rounded-full bg-indigo px-5 py-2 text-sm font-medium text-white disabled:opacity-60 cursor-pointer">
          {pending ? "Adding…" : "Add FAQ"}
        </button>
        {state.error ? (
          <p className="flex items-center gap-2 text-sm text-red-600"><AlertCircle className="size-4" /> {state.error}</p>
        ) : null}
      </form>

      <div className="card-raised divide-y divide-line">
        {faqs.map((f) => (
          <FaqRow key={f.id} faq={f} />
        ))}
        {faqs.length === 0 ? <p className="p-8 text-center text-sm text-ink-soft">No FAQs yet.</p> : null}
      </div>
    </div>
  );
}

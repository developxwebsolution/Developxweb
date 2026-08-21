"use client";

import { useActionState, useState, useTransition } from "react";
import { Trash2, AlertCircle, Pencil, X } from "lucide-react";
import { updateTestimonial, deleteTestimonial, type TestimonialFormState } from "./actions";

type Testimonial = { id: string; name: string; role: string; company: string; city: string; quote: string; rating: number };

const inputClass = "w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo";

export function TestimonialRow({ testimonial }: { testimonial: Testimonial }) {
  const [editing, setEditing] = useState(false);
  const [rowPending, startTransition] = useTransition();
  const boundUpdate = updateTestimonial.bind(null, testimonial.id);
  const [state, formAction, pending] = useActionState<TestimonialFormState, FormData>(boundUpdate, { ok: false });

  if (editing) {
    return (
      <form action={formAction} className="flex flex-col gap-3 p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <input name="name" defaultValue={testimonial.name} placeholder="Name" required className={inputClass} />
          <input name="role" defaultValue={testimonial.role} placeholder="Role" required className={inputClass} />
          <input name="company" defaultValue={testimonial.company} placeholder="Company" required className={inputClass} />
          <input name="city" defaultValue={testimonial.city} placeholder="City" required className={inputClass} />
        </div>
        <textarea name="quote" defaultValue={testimonial.quote} placeholder="Quote" required rows={2} className={inputClass} />
        <div className="flex items-center gap-3">
          <select name="rating" defaultValue={testimonial.rating} className={`${inputClass} w-24`}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} stars
              </option>
            ))}
          </select>
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
        <p className="text-sm font-medium text-ink">
          {testimonial.name} · {testimonial.role}, {testimonial.company}
        </p>
        <p className="mt-1 text-sm text-ink-soft">&ldquo;{testimonial.quote}&rdquo;</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          onClick={() => setEditing(true)}
          aria-label="Edit testimonial"
          className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-paper-raised hover:text-ink cursor-pointer"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          onClick={() => confirm("Delete this testimonial?") && startTransition(() => deleteTestimonial(testimonial.id))}
          disabled={rowPending}
          aria-label="Delete testimonial"
          className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

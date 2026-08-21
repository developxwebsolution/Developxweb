"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { createTestimonial, type TestimonialFormState } from "./actions";
import { TestimonialRow } from "./testimonial-row";

type Testimonial = { id: string; name: string; role: string; company: string; city: string; quote: string; rating: number };

export function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
  const [state, formAction, pending] = useActionState<TestimonialFormState, FormData>(createTestimonial, { ok: false });
  const inputClass = "w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo";

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} className="card-raised flex flex-col gap-3 p-5">
        <h2 className="font-display text-sm font-semibold text-ink">Add a testimonial</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <input name="name" placeholder="Name" required className={inputClass} />
          <input name="role" placeholder="Role" required className={inputClass} />
          <input name="company" placeholder="Company" required className={inputClass} />
          <input name="city" placeholder="City" required className={inputClass} />
        </div>
        <textarea name="quote" placeholder="Quote" required rows={2} className={inputClass} />
        <div className="flex items-center gap-3">
          <select name="rating" defaultValue="5" className={inputClass + " w-24"}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} stars</option>
            ))}
          </select>
          <button type="submit" disabled={pending} className="rounded-full bg-indigo px-5 py-2 text-sm font-medium text-white disabled:opacity-60 cursor-pointer">
            {pending ? "Adding…" : "Add testimonial"}
          </button>
        </div>
        {state.error ? (
          <p className="flex items-center gap-2 text-sm text-red-600"><AlertCircle className="size-4" /> {state.error}</p>
        ) : null}
      </form>

      <div className="card-raised divide-y divide-line">
        {testimonials.map((t) => (
          <TestimonialRow key={t.id} testimonial={t} />
        ))}
        {testimonials.length === 0 ? <p className="p-8 text-center text-sm text-ink-soft">No testimonials yet.</p> : null}
      </div>
    </div>
  );
}

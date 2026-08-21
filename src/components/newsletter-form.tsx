"use client";

import { useActionState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { subscribeToNewsletter, type NewsletterFormState } from "@/app/actions/newsletter";

const initialState: NewsletterFormState = { ok: false };

export function NewsletterForm({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  if (state.ok) {
    return (
      <p className={`flex items-center gap-2 text-sm text-ink-soft ${className ?? ""}`}>
        <CheckCircle2 className="size-4 shrink-0 text-indigo" /> You&apos;re subscribed.
      </p>
    );
  }

  return (
    <form action={formAction} className={className}>
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field blank
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          className="w-full min-w-0 rounded-full border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-indigo"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="Subscribe"
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-indigo px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60 cursor-pointer"
        >
          {pending ? "…" : <Send className="size-3.5" />}
        </button>
      </div>
      {state.error ? <p className="mt-2 text-xs text-red-600">{state.error}</p> : null}
    </form>
  );
}

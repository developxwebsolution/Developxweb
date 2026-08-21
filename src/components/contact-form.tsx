"use client";

import { useActionState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { site } from "@/data/site";
import { submitLead, type LeadFormState } from "@/app/actions/leads";

const services = [
  "Website Development",
  "Website Designing",
  "Web Application Development",
  "E-commerce Development",
  "Custom Software / CRM / ERP",
  "SEO Services",
  "Website Redesign",
  "Something else",
];

const initialState: LeadFormState = { ok: false };

export function ContactForm({ context }: { context?: string }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.ok) {
    return (
      <div className="card-raised flex flex-col items-center gap-3 p-10 text-center">
        <CheckCircle2 className="size-8 text-indigo" />
        <h3 className="font-display text-lg font-semibold text-ink">Thanks — we&apos;ve got it.</h3>
        <p className="text-sm leading-6 text-ink-soft">
          Your message has been sent to our team. We reply within one business day. If it&apos;s urgent, email{" "}
          <a href={`mailto:${site.email}`} className="text-indigo underline">
            {site.email}
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="card-raised flex flex-col gap-4 p-6 sm:p-8">
      <input type="hidden" name="source" value={context ?? "Contact form"} />
      {/* Honeypot: hidden from real users via CSS, bots often fill every field */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field blank
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input
            required
            name="name"
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-indigo"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            name="email"
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-indigo"
            placeholder="you@company.com"
          />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Phone (optional)">
          <input
            name="phone"
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-indigo"
            placeholder="+91"
          />
        </Field>
        <Field label="Service you need">
          <select
            name="service"
            defaultValue={services[0]}
            className="w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-indigo"
          >
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Project details">
        <textarea
          required
          rows={5}
          name="message"
          className="w-full resize-none rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-indigo"
          placeholder="Tell us what you're building, your timeline, and any budget range."
        />
      </Field>

      {state.error ? (
        <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle className="size-4 shrink-0" /> {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-indigo px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        {pending ? "Sending…" : "Send message"} <Send className="size-3.5" />
      </button>
      <p className="text-center text-xs text-ink-soft">We reply within one business day. No spam, ever.</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

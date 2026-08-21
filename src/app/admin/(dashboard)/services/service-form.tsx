"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import type { ServiceFormState } from "./actions";

type ServiceDefaults = {
  slug: string;
  name: string;
  shortName: string;
  icon: string;
  summary: string;
  description: string;
  startingPrice: string;
  timeline: string;
  features: string[];
  deliverables: string[];
  process: { title: string; detail: string }[];
  faqs: { q: string; a: string }[];
  status: "draft" | "published" | "archived";
};

const ICON_OPTIONS = [
  "code",
  "layout",
  "app-window",
  "server",
  "shopping-cart",
  "database",
  "search",
  "wrench",
  "refresh-cw",
  "layers",
  "gauge",
  "shield",
  "smartphone",
];

export function ServiceForm({
  action,
  defaultValues,
}: {
  action: (state: ServiceFormState, formData: FormData) => Promise<ServiceFormState>;
  defaultValues?: ServiceDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, { ok: false });

  return (
    <form action={formAction} className="card-raised flex flex-col gap-4 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input name="name" required defaultValue={defaultValues?.name} className={inputClass} />
        </Field>
        <Field label="Slug (used in the URL)">
          <input name="slug" required pattern="[a-z0-9-]+" defaultValue={defaultValues?.slug} className={inputClass} placeholder="nextjs-development" />
        </Field>
        <Field label="Short name (nav/cards)">
          <input name="shortName" required defaultValue={defaultValues?.shortName} className={inputClass} />
        </Field>
        <Field label="Icon">
          <select name="icon" defaultValue={defaultValues?.icon ?? ICON_OPTIONS[0]} className={inputClass}>
            {ICON_OPTIONS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Summary (one sentence, shown on cards)">
        <textarea name="summary" required rows={2} defaultValue={defaultValues?.summary} className={inputClass} />
      </Field>
      <Field label="Description (full text on the service page)">
        <textarea name="description" required rows={4} defaultValue={defaultValues?.description} className={inputClass} />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Starting price">
          <input name="startingPrice" required defaultValue={defaultValues?.startingPrice} className={inputClass} placeholder="₹35,000" />
        </Field>
        <Field label="Timeline">
          <input name="timeline" required defaultValue={defaultValues?.timeline} className={inputClass} placeholder="3-6 weeks" />
        </Field>
      </div>

      <Field label="Features — one per line">
        <textarea name="features" required rows={5} defaultValue={defaultValues?.features.join("\n")} className={`${inputClass} font-mono text-xs`} />
      </Field>
      <Field label="Deliverables — one per line">
        <textarea name="deliverables" required rows={4} defaultValue={defaultValues?.deliverables.join("\n")} className={`${inputClass} font-mono text-xs`} />
      </Field>
      <Field label='Process steps — JSON array of {"title","detail"}'>
        <textarea
          name="process"
          required
          rows={6}
          defaultValue={JSON.stringify(defaultValues?.process ?? [{ title: "Discover", detail: "..." }], null, 2)}
          className={`${inputClass} font-mono text-xs`}
        />
      </Field>
      <Field label='FAQs — JSON array of {"q","a"}'>
        <textarea
          name="faqs"
          required
          rows={6}
          defaultValue={JSON.stringify(defaultValues?.faqs ?? [{ q: "Question?", a: "Answer." }], null, 2)}
          className={`${inputClass} font-mono text-xs`}
        />
      </Field>

      <Field label="Status">
        <select name="status" defaultValue={defaultValues?.status ?? "draft"} className={inputClass}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </Field>

      {state.error ? (
        <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle className="size-4 shrink-0" /> {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="self-start rounded-full bg-indigo px-6 py-2.5 text-sm font-medium text-white disabled:opacity-60 cursor-pointer">
        {pending ? "Saving…" : "Save service"}
      </button>
    </form>
  );
}

const inputClass = "w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-indigo";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import type { ProjectFormState } from "./actions";
import { MediaPickerField } from "@/components/admin/media-picker-field";
import { ImageField } from "@/components/admin/image-field";

type ProjectDefaults = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  service: string;
  city: string;
  image?: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  stack: string[];
  year: string;
  color: string;
  status: "draft" | "published" | "archived";
};

export function ProjectForm({
  action,
  defaultValues,
}: {
  action: (state: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
  defaultValues?: ProjectDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, { ok: false });

  return (
    <form action={formAction} className="card-raised flex flex-col gap-4 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Project name">
          <input name="name" required defaultValue={defaultValues?.name} className={inputClass} />
        </Field>
        <Field label="Slug (used in the URL)">
          <input name="slug" required pattern="[a-z0-9-]+" defaultValue={defaultValues?.slug} className={inputClass} />
        </Field>
        <Field label="Client name">
          <input name="client" required defaultValue={defaultValues?.client} className={inputClass} />
        </Field>
        <Field label="Industry slug">
          <input name="industry" required defaultValue={defaultValues?.industry} className={inputClass} placeholder="healthcare" />
        </Field>
        <Field label="Service slug">
          <input name="service" required defaultValue={defaultValues?.service} className={inputClass} placeholder="website-development" />
        </Field>
        <Field label="City">
          <input name="city" required defaultValue={defaultValues?.city} className={inputClass} />
        </Field>
        <Field label="Year">
          <input name="year" required defaultValue={defaultValues?.year} className={inputClass} placeholder="2026" />
        </Field>
        <Field label="Accent color (hex)">
          <input name="color" required defaultValue={defaultValues?.color ?? "#4338CA"} className={inputClass} placeholder="#4338CA" />
        </Field>
        
<ImageField name="image" label="Project image" defaultValue={defaultValues?.image} />

      </div>

      <Field label="Summary">
        <textarea name="summary" required rows={2} defaultValue={defaultValues?.summary} className={inputClass} />
      </Field>
      <Field label="Challenge">
        <textarea name="challenge" required rows={3} defaultValue={defaultValues?.challenge} className={inputClass} />
      </Field>
      <Field label="Solution">
        <textarea name="solution" required rows={3} defaultValue={defaultValues?.solution} className={inputClass} />
      </Field>
      <Field label='Results — JSON array of {"label","value"}'>
        <textarea
          name="results"
          required
          rows={4}
          defaultValue={JSON.stringify(defaultValues?.results ?? [{ label: "Metric", value: "+40%" }], null, 2)}
          className={`${inputClass} font-mono text-xs`}
        />
      </Field>
      <Field label="Tech stack — one per line">
        <textarea name="stack" required rows={3} defaultValue={defaultValues?.stack.join("\n")} className={`${inputClass} font-mono text-xs`} />
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
        {pending ? "Saving…" : "Save project"}
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

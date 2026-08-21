"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import type { CityFormState } from "./actions";

type CityDefaults = {
  slug: string;
  name: string;
  state: string;
  population: string | null;
  lat: string;
  lng: string;
  businessHubs: string[];
  localIndustries: string[];
  intro: string;
  landscape: string;
  whyUs: string;
  caseStudy: { client: string; industry: string; result: string } | null;
  nearby: string[];
  status: "draft" | "published" | "archived";
};

export function CityForm({
  action,
  defaultValues,
}: {
  action: (state: CityFormState, formData: FormData) => Promise<CityFormState>;
  defaultValues?: CityDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, { ok: false });

  return (
    <form action={formAction} className="card-raised flex flex-col gap-4 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="City name">
          <input name="name" required defaultValue={defaultValues?.name} className={inputClass} />
        </Field>
        <Field label="Slug (used in the URL)">
          <input name="slug" required pattern="[a-z0-9-]+" defaultValue={defaultValues?.slug} className={inputClass} placeholder="jaipur" />
        </Field>
        <Field label="State">
          <input name="state" required defaultValue={defaultValues?.state} className={inputClass} />
        </Field>
        <Field label="Population (display text)">
          <input name="population" defaultValue={defaultValues?.population ?? ""} className={inputClass} placeholder="3.9 million" />
        </Field>
        <Field label="Latitude">
          <input name="lat" type="number" step="any" required defaultValue={defaultValues?.lat} className={inputClass} />
        </Field>
        <Field label="Longitude">
          <input name="lng" type="number" step="any" required defaultValue={defaultValues?.lng} className={inputClass} />
        </Field>
      </div>

      <Field label="Business hubs — one per line">
        <textarea name="businessHubs" required rows={4} defaultValue={defaultValues?.businessHubs.join("\n")} className={`${inputClass} font-mono text-xs`} />
      </Field>
      <Field label="Local industry slugs — one per line (must match src/data/industries.ts slugs)">
        <textarea
          name="localIndustries"
          required
          rows={3}
          defaultValue={defaultValues?.localIndustries.join("\n")}
          className={`${inputClass} font-mono text-xs`}
          placeholder="healthcare&#10;real-estate"
        />
      </Field>
      <Field label="Nearby city slugs — one per line">
        <textarea name="nearby" required rows={3} defaultValue={defaultValues?.nearby.join("\n")} className={`${inputClass} font-mono text-xs`} />
      </Field>

      <Field label="Intro paragraph">
        <textarea name="intro" required rows={4} defaultValue={defaultValues?.intro} className={inputClass} />
      </Field>
      <Field label="Local landscape paragraph">
        <textarea name="landscape" required rows={4} defaultValue={defaultValues?.landscape} className={inputClass} />
      </Field>
      <Field label="Why us paragraph">
        <textarea name="whyUs" required rows={3} defaultValue={defaultValues?.whyUs} className={inputClass} />
      </Field>
      <Field label='Case study — JSON {"client","industry","result"}'>
        <textarea
          name="caseStudy"
          required
          rows={4}
          defaultValue={JSON.stringify(defaultValues?.caseStudy ?? { client: "", industry: "", result: "" }, null, 2)}
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
        {pending ? "Saving…" : "Save city"}
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

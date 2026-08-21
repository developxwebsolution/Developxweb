"use client";

import { useActionState, useRef } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { uploadMedia, type MediaFormState } from "./actions";

export function MediaUploadForm() {
  const [state, formAction, pending] = useActionState<MediaFormState, FormData>(uploadMedia, { ok: false });
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="card-raised flex flex-col gap-3 p-5"
    >
      <h2 className="font-display text-sm font-semibold text-ink">Upload an image</h2>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-ink-soft">File (JPEG, PNG, WebP, GIF, SVG — up to 8MB)</span>
          <input
            type="file"
            name="file"
            required
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none file:mr-3 file:rounded-full file:border-0 file:bg-indigo-soft file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-indigo"
          />
        </label>
        <label className="flex flex-1 flex-col gap-1.5">
          <span className="text-xs font-medium text-ink-soft">Alt text (optional)</span>
          <input
            name="altText"
            placeholder="Describes the image for accessibility"
            className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-indigo"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-indigo px-5 py-2 text-sm font-medium text-white disabled:opacity-60 cursor-pointer"
        >
          <Upload className="size-3.5" /> {pending ? "Uploading…" : "Upload"}
        </button>
      </div>
      {state.error ? (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" /> {state.error}
        </p>
      ) : null}
    </form>
  );
}

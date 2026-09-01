"use client";
import { MediaPickerField } from "@/components/admin/media-picker-field";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import type { PostFormState } from "./actions";
import { ImageField } from "@/components/admin/image-field";
type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  readTime: string;
  status: "draft" | "published" | "archived";
  featuredImage?: string | null;  // ye line add karo agar missing hai
};

export function PostForm({
  action,
  defaultValues,
}: {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  defaultValues?: Post;
}) {
  const [state, formAction, pending] = useActionState(action, { ok: false });

  return (
    <form action={formAction} className="card-raised flex flex-col gap-4 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Title">
          <input name="title" required defaultValue={defaultValues?.title} className={inputClass} />
        </Field>
        
          {/* <MediaPickerField name="featuredImage" label="Featured image" defaultValue={defaultValues?.featuredImage ?? null} /> */}
<ImageField name="featuredImage" label="Featured image" defaultValue={defaultValues?.featuredImage} />
        <Field label="Slug (used in the URL)">
          <input name="slug" required pattern="[a-z0-9-]+" defaultValue={defaultValues?.slug} className={inputClass} placeholder="my-post-title" />
        </Field>
      </div>
      <Field label="Excerpt (shown on the blog index)">
        <textarea name="excerpt" required rows={2} defaultValue={defaultValues?.excerpt} className={inputClass} />
      </Field>
      <Field label="Content (separate paragraphs with a blank line)">
        <textarea
          name="content"
          required
          rows={12}
          defaultValue={defaultValues?.content.join("\n\n")}
          className={`${inputClass} font-mono text-xs leading-6`}
        />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Field label="Category">
          <input name="category" required defaultValue={defaultValues?.category} className={inputClass} />
        </Field>
        <Field label="Author">
          <input name="author" required defaultValue={defaultValues?.author ?? "DevelopX Web Team"} className={inputClass} />
        </Field>
        <Field label="Read time">
          <input name="readTime" required defaultValue={defaultValues?.readTime ?? "5 min read"} className={inputClass} />
        </Field>
        <Field label="Status">
          <select name="status" defaultValue={defaultValues?.status ?? "draft"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </Field>
      </div>

      {state.error ? (
        <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle className="size-4 shrink-0" /> {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="self-start rounded-full bg-indigo px-6 py-2.5 text-sm font-medium text-white disabled:opacity-60 cursor-pointer">
        {pending ? "Saving…" : "Save post"}
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

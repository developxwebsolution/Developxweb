"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteMedia } from "./actions";

export function DeleteMediaButton({ id, filename }: { id: string; filename: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${filename}"? This removes it from Cloudinary too.`)) startTransition(() => deleteMedia(id));
      }}
      aria-label="Delete media"
      className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
    >
      <Trash2 className="size-3.5" />
    </button>
  );
}

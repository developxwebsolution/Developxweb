"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deletePost } from "./actions";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${title}"? This can't be undone.`)) startTransition(() => deletePost(id));
      }}
      aria-label="Delete post"
      className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
    >
      <Trash2 className="size-3.5" />
    </button>
  );
}

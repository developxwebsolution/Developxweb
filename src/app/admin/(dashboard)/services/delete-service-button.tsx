"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteService } from "./actions";

export function DeleteServiceButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete "${name}"? This can't be undone.`)) startTransition(() => deleteService(id));
      }}
      aria-label="Delete service"
      className="flex size-7 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
    >
      <Trash2 className="size-3.5" />
    </button>
  );
}

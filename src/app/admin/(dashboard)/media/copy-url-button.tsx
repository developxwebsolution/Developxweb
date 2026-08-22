"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      aria-label="Copy image URL"
      className="flex size-7 items-center justify-center rounded-full bg-white/90 text-ink-soft hover:text-ink cursor-pointer"
    >
      {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
    </button>
  );
}
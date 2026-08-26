"use client";

import { useState } from "react";
import { X, ImagePlus, Check } from "lucide-react";
import { getMediaList } from "@/app/admin/(dashboard)/media/actions";

type MediaItem = { id: string; url: string; filename: string; altText: string | null };

export function ImageField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function openPicker() {
    setOpen(true);
    setLoading(true);
    try {
      setItems(await getMediaList());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-ink-soft">{label}</span>

      {value ? (
        <div className="flex items-center gap-3 rounded-xl border border-line p-2">
          <img src={value} alt="" className="size-16 shrink-0 rounded-lg object-cover" />
          <p className="min-w-0 flex-1 truncate text-xs text-ink-soft">{value}</p>
          <button
            type="button"
            onClick={() => setValue("")}
            aria-label="Remove image"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={openPicker}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-medium text-ink hover:border-indigo cursor-pointer"
        >
          <ImagePlus className="size-3.5" /> {value ? "Change image" : "Choose from Media Library"}
        </button>
        <input
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="or paste a URL directly"
          className="min-w-0 flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-xs text-ink outline-none focus:border-indigo"
        />
      </div>

      {open ? (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <button aria-label="Close" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/50" />
          <div className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-paper p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold text-ink">Choose an image</h3>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-ink-soft hover:text-ink cursor-pointer">
                <X className="size-4" />
              </button>
            </div>
            {loading ? (
              <p className="py-8 text-center text-sm text-ink-soft">Loading…</p>
            ) : items.length === 0 ? (
              <p className="py-8 text-center text-sm text-ink-soft">
                No images uploaded yet — go to Media Library to upload one first.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setValue(item.url);
                      setOpen(false);
                    }}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-line hover:border-indigo cursor-pointer"
                  >
                    <img src={item.url} alt={item.altText ?? item.filename} className="h-full w-full object-cover" />
                    {value === item.url ? (
                      <span className="absolute inset-0 flex items-center justify-center bg-indigo/40">
                        <Check className="size-5 text-white" />
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
"use client";

import { useState, useRef, useTransition } from "react";
import { X, ImagePlus, Check, UploadCloud, Loader2, AlertCircle } from "lucide-react";
import { getMediaList, uploadMedia } from "@/app/admin/(dashboard)/media/actions";

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
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, startUpload] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function openPicker() {
    setOpen(true);
    setLoading(true);
    try {
      setItems(await getMediaList());
    } finally {
      setLoading(false);
    }
  }

  function uploadFile(file: File) {
    setUploadError(null);

    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are supported.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError("File is larger than 8MB. Compress it and try again.");
      return;
    }

    const formData = new FormData();
    formData.set("file", file);
    formData.set("altText", "");

    startUpload(async () => {
      const result = await uploadMedia({ ok: false }, formData);
      if (!result.ok || !result.url) {
        setUploadError(result.error ?? "Upload failed. Try again.");
        return;
      }
      setValue(result.url);
    });
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
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
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
            dragActive ? "border-indigo bg-indigo-soft" : "border-line hover:border-indigo"
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="size-5 animate-spin text-indigo" />
              <p className="text-xs text-ink-soft">Uploading…</p>
            </>
          ) : (
            <>
              <UploadCloud className="size-5 text-ink-soft" />
              <p className="text-xs text-ink-soft">
                <span className="font-medium text-indigo">Drag & drop</span> an image here, or click to browse
              </p>
              <p className="text-[10px] text-ink-soft">JPEG, PNG, WebP, GIF, SVG — up to 8MB</p>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
              e.target.value = ""; // allow re-selecting the same file later
            }}
            className="hidden"
          />
        </div>
      )}

      {uploadError ? (
        <p className="flex items-center gap-2 text-xs text-red-600">
          <AlertCircle className="size-3.5 shrink-0" /> {uploadError}
        </p>
      ) : null}

      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        onClick={openPicker}
        className="flex w-fit items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-medium text-ink hover:border-indigo cursor-pointer"
      >
        <ImagePlus className="size-3.5" /> Choose from Media Library instead
      </button>

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
              <p className="py-8 text-center text-sm text-ink-soft">No images uploaded yet.</p>
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
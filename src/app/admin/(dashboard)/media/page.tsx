import Image from "next/image";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { cloudinaryConfigured } from "@/lib/cloudinary";
import { MediaUploadForm } from "./media-upload-form";
import { DeleteMediaButton } from "./delete-media-button";

export default async function AdminMediaPage() {
  await requireSession();
  const rows = await db.select().from(media).orderBy(desc(media.createdAt));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Media Library</h1>
        <p className="mt-1 text-sm text-ink-soft">
          {rows.length} files.{" "}
          {cloudinaryConfigured
            ? "Cloudinary is configured — uploads go live immediately."
            : "Cloudinary isn't configured yet — the upload form will show an error until CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are set (see .env.example)."}
        </p>
      </div>

      <MediaUploadForm />

      <div className="card-raised mt-6 grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-3 lg:grid-cols-4">
        {rows.length === 0 ? (
          <p className="col-span-full bg-paper p-8 text-center text-sm text-ink-soft">No media uploaded yet.</p>
        ) : (
          rows.map((m) => (
            <div key={m.id} className="group relative aspect-square bg-paper">
              {m.mimeType.startsWith("image/") ? (
                <Image src={m.url} alt={m.altText ?? m.filename} fill className="object-cover" unoptimized />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-ink-soft">{m.filename}</div>
              )}
              <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="truncate text-xs text-white">{(m.size / 1024).toFixed(0)} KB</span>
                <div className="rounded-full bg-white/90">
                  <DeleteMediaButton id={m.id} filename={m.filename} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

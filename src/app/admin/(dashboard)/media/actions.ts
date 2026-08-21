"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { media, auditLogs } from "@/db/schema";
import { requireEditor, requireAdmin } from "@/lib/session";
import { cloudinary, cloudinaryConfigured } from "@/lib/cloudinary";

export type MediaFormState = { ok: boolean; error?: string };

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

const altTextSchema = z.string().trim().max(300).optional();

export async function uploadMedia(_prev: MediaFormState, formData: FormData): Promise<MediaFormState> {
  const session = await requireEditor();

  if (!cloudinaryConfigured) {
    return {
      ok: false,
      error: "Cloudinary isn't configured yet. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your environment — see .env.example.",
    };
  }

  const file = formData.get("file");
  const altText = altTextSchema.safeParse(formData.get("altText") || undefined);

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose a file to upload." };
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return { ok: false, error: "Only JPEG, PNG, WebP, GIF and SVG images are supported." };
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { ok: false, error: "File is larger than 8MB. Compress it and try again." };
  }
  if (!altText.success) {
    return { ok: false, error: "Alt text is too long." };
  }

  let uploadResult;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    uploadResult = await new Promise<{ secure_url: string; public_id: string; bytes: number; width?: number; height?: number }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "developx-web" }, (err, result) => {
          if (err || !result) return reject(err ?? new Error("Upload failed"));
          resolve(result);
        });
        stream.end(buffer);
      }
    );
  } catch (e) {
    console.error("Cloudinary upload failed:", e);
    return { ok: false, error: "Upload failed. Check your Cloudinary credentials and try again." };
  }

  await db.insert(media).values({
    url: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    filename: file.name,
    altText: altText.data || null,
    mimeType: file.type,
    size: uploadResult.bytes,
    width: uploadResult.width ?? null,
    height: uploadResult.height ?? null,
    uploadedById: session.user.id,
  });

  await db.insert(auditLogs).values({
    userId: session.user.id,
    action: "media.uploaded",
    entityType: "media",
    entityId: uploadResult.public_id,
  });

  revalidatePath("/admin/media");
  return { ok: true };
}

export async function deleteMedia(id: string) {
  const session = await requireAdmin();

  const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);
  if (!row) return;

  if (cloudinaryConfigured) {
    try {
      await cloudinary.uploader.destroy(row.publicId);
    } catch (e) {
      // Log but don't block the DB delete on a Cloudinary-side failure —
      // an orphaned Cloudinary asset is a minor cleanup issue, not a reason
      // to leave a broken row in the media library.
      console.error("Cloudinary delete failed:", e);
    }
  }

  await db.delete(media).where(eq(media.id, id));
  await db.insert(auditLogs).values({ userId: session.user.id, action: "media.deleted", entityType: "media", entityId: id });
  revalidatePath("/admin/media");
}

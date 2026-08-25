import Image from "next/image";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { cloudinaryConfigured } from "@/lib/cloudinary";
import { MediaUploadForm } from "./media-upload-form";
import { DeleteMediaButton } from "./delete-media-button";
import { CopyUrlButton } from "./copy-url-button";
import { blogPosts, portfolioProjects } from "@/db/schema";
import Link from "next/link";
export default async function AdminMediaPage() {
  await requireSession();
  const rows = await db.select().from(media).orderBy(desc(media.createdAt));
  const allPosts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      featuredImage: blogPosts.featuredImage,
    })
    .from(blogPosts);
  const allProjects = await db
    .select({
      id: portfolioProjects.id,
      name: portfolioProjects.name,
      image: portfolioProjects.image,
    })
    .from(portfolioProjects);

  function getUsage(url: string) {
    const usages: { label: string; href: string }[] = [];
    for (const p of allPosts)
      if (p.featuredImage === url)
        usages.push({ label: `Blog: ${p.title}`, href: `/admin/blog/${p.id}` });
    for (const p of allProjects)
      if (p.image === url)
        usages.push({
          label: `Portfolio: ${p.name}`,
          href: `/admin/portfolio/${p.id}`,
        });
    return usages;
  }
  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Media Library
        </h1>
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
          <p className="col-span-full bg-paper p-8 text-center text-sm text-ink-soft">
            No media uploaded yet.
          </p>
        ) : (
          rows.map((m) => {
            const usage = getUsage(m.url);

            return (
              <div key={m.id} className="group relative aspect-square bg-paper">
                {m.mimeType.startsWith("image/") ? (
                  <Image
                    src={m.url}
                    alt={m.altText ?? m.filename}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-ink-soft">
                    {m.filename}
                  </div>
                )}

                {usage.length > 0 ? (
                  <div className="absolute left-1 top-1 flex max-w-[90%] flex-col gap-0.5">
                    {usage.map((u) => (
                      <Link
                        key={u.href}
                        href={u.href}
                        className="truncate rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white hover:bg-black/90"
                      >
                        {u.label}
                      </Link>
                    ))}
                  </div>
                ) : null}

                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="truncate text-xs text-white">
                    {(m.size / 1024).toFixed(0)} KB
                  </span>

                  <div className="flex items-center gap-1">
                    <div className="rounded-full bg-white/90">
                      <CopyUrlButton url={m.url} />
                    </div>

                    <div className="rounded-full bg-white/90">
                      <DeleteMediaButton id={m.id} filename={m.filename} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

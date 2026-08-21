import Link from "next/link";
import { desc } from "drizzle-orm";
import { Plus } from "lucide-react";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { DeletePostButton } from "./delete-post-button";

export default async function AdminBlogPage() {
  await requireSession();
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Blog</h1>
          <p className="mt-1 text-sm text-ink-soft">{posts.length} posts.</p>
        </div>
        <Link href="/admin/blog/new" className="flex items-center gap-1.5 rounded-full bg-indigo px-4 py-2 text-sm font-medium text-white">
          <Plus className="size-3.5" /> New post
        </Link>
      </div>

      <div className="card-raised divide-y divide-line">
        {posts.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="text-sm font-medium text-ink">{p.title}</p>
              <p className="mt-0.5 text-xs text-ink-soft">
                /{p.slug} · {p.category} · <span className="capitalize">{p.status}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/blog/${p.id}`} className="text-sm font-medium text-indigo">
                Edit
              </Link>
              <DeletePostButton id={p.id} title={p.title} />
            </div>
          </div>
        ))}
        {posts.length === 0 ? <p className="p-8 text-center text-sm text-ink-soft">No posts yet.</p> : null}
      </div>
    </div>
  );
}

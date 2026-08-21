import { requireSession } from "@/lib/session";
import { PostForm } from "../post-form";
import { createPost } from "../actions";

export default async function NewPostPage() {
  await requireSession();
  return (
    <div className="p-6 sm:p-8">
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink">New blog post</h1>
      <PostForm action={createPost} />
    </div>
  );
}

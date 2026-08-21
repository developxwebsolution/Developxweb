import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { portfolioProjects } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { ProjectForm } from "../project-form";
import { updateProject } from "../actions";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;
  const [project] = await db.select().from(portfolioProjects).where(eq(portfolioProjects.id, id)).limit(1);
  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, id);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink">Edit portfolio project</h1>
      <ProjectForm action={boundUpdate} defaultValues={project} />
    </div>
  );
}

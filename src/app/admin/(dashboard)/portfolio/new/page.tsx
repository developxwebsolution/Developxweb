import { requireSession } from "@/lib/session";
import { ProjectForm } from "../project-form";
import { createProject } from "../actions";

export default async function NewProjectPage() {
  await requireSession();
  return (
    <div className="p-6 sm:p-8">
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink">New portfolio project</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}

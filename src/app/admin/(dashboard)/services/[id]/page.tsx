import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { services } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { ServiceForm } from "../service-form";
import { updateService } from "../actions";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;
  const [service] = await db.select().from(services).where(eq(services.id, id)).limit(1);
  if (!service) notFound();

  const boundUpdate = updateService.bind(null, id);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink">Edit service</h1>
      <ServiceForm action={boundUpdate} defaultValues={service} />
    </div>
  );
}

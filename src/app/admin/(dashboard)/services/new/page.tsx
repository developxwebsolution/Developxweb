import { requireSession } from "@/lib/session";
import { ServiceForm } from "../service-form";
import { createService } from "../actions";

export default async function NewServicePage() {
  await requireSession();
  return (
    <div className="p-6 sm:p-8">
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink">New service</h1>
      <ServiceForm action={createService} />
    </div>
  );
}

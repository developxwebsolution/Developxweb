import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { cities } from "@/db/schema";
import { requireSession } from "@/lib/session";
import { CityForm } from "../city-form";
import { updateCity } from "../actions";

export default async function EditCityPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;
  const [city] = await db.select().from(cities).where(eq(cities.id, id)).limit(1);
  if (!city) notFound();

  const boundUpdate = updateCity.bind(null, id);

  return (
    <div className="p-6 sm:p-8">
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink">Edit city</h1>
      <CityForm action={boundUpdate} defaultValues={city} />
    </div>
  );
}

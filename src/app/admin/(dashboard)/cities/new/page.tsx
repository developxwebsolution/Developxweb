import { requireSession } from "@/lib/session";
import { CityForm } from "../city-form";
import { createCity } from "../actions";

export default async function NewCityPage() {
  await requireSession();
  return (
    <div className="p-6 sm:p-8">
      <h1 className="mb-6 font-display text-2xl font-semibold text-ink">New city</h1>
      <CityForm action={createCity} />
    </div>
  );
}

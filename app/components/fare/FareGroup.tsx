import { Ticket, CalendarDays } from "lucide-react";
import FareCard from "./FareCard";
import { Fare } from "@/app/types/fares";

type PendingChange = { newPrice: number };

type Props = {
  title: string;
  fares: Fare[];
  pendingChanges?: Record<string, PendingChange>;
};

export default function FareGroup({ title, fares, pendingChanges }: Props) {
  if (fares.length === 0) return null;

  return (
    <section>
      <h2 className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide text-sm">
        {title === "Călătorii" && <Ticket size={15} />}
        {title === "Abonamente" && <CalendarDays size={15} />}
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
        {fares.map((fare) => (
          <FareCard
            key={fare.id}
            fare={fare}
            pendingChange={pendingChanges?.[fare.id]}
          />
        ))}
      </div>
    </section>
  );
}

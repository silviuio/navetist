import type { Fare } from "../types/fares";
import FareCard from "./FareCard";

type Props = {
  title: string;
  fares: Fare[];
};

export default function FareGroup({ title, fares }: Props) {
  if (fares.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide text-sm">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {fares.map((fare) => (
          <FareCard key={fare.id} fare={fare} />
        ))}
      </div>
    </section>
  );
}

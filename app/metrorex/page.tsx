import type { Metadata } from "next";
import FareGroup from "../components/FareGroup";
import { getFaresByOperator } from "../lib/fares";

export const metadata: Metadata = {
  title: "Prețuri Metrorex 2026 — Bilete și abonamente metrou București | Navetist",
  description:
    "Tarife actuale Metrorex: bilet 1, 2 și 10 călătorii, abonamente 24h, 72h, săptămânal, lunar, 6 luni și anual pentru metroul din București.",
};

export default function MetrorexPage() {
  const fares = getFaresByOperator("metrorex");
  const trips = fares.filter((f) => f.category === "trip");
  const timePasses = fares.filter((f) => f.category === "time-pass");
  const subscriptions = fares.filter((f) => f.category === "subscription");

  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-semibold bg-sky-950 text-sky-100 px-2 py-1 rounded">
          Metrorex
        </span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3 mb-1">
          Metrorex S.A.
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm">
          Rețeaua de metrou din București cu 5 magistrale și 63 de stații. Fiecare
          validare reprezintă o călătorie individuală — nu există transfer între stații.
        </p>
      </div>

      <div className="space-y-8">
        <FareGroup title="Călătorii" fares={trips} />
        <FareGroup title="Abonamente timp" fares={timePasses} />
        <FareGroup title="Abonamente" fares={subscriptions} />
      </div>
    </div>
  );
}

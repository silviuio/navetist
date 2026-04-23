import type { Metadata } from "next";
import FareGroup from "../components/FareGroup";
import { getFaresByOperator } from "../lib/fares";
import upcomingChanges from "../data/upcoming-changes.json";

export const metadata: Metadata = {
  title: "Prețuri Metrorex 2026 — Scumpiri de la 1 mai, bilete și abonamente metrou București | Navetist",
  description:
    "Tarife actuale Metrorex și scumpirile anunțate de la 1 mai 2026: bilet 1, 2 și 10 călătorii, abonamente 24h, 72h, săptămânal, lunar, 6 luni și anual pentru metroul din București.",
};

const pendingChanges = Object.fromEntries(
  upcomingChanges.changes.map((c) => [c.fareId, { newPrice: c.newPrice }])
);

export default function MetrorexPage() {
  const fares = getFaresByOperator("metrorex");
  const trips = fares.filter((f) => f.category === "trip");
  const timePasses = fares.filter((f) => f.category === "time-pass");
  const subscriptions = fares.filter((f) => f.category === "subscription");

  return (
    <div>
      <div className="mb-6">
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

      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg px-4 py-3 mb-8 flex items-start gap-3">
        <span className="text-orange-400 text-lg">⚠</span>
        <div className="text-sm">
          <p className="font-semibold text-orange-300 mb-1">
            Majorare tarife Metrorex de la 1 mai 2026
          </p>
          <p className="text-orange-200/70">
            Tarifele marcate cu portocaliu vor crește. Elevii și studenții beneficiază
            în continuare de gratuitate și reducere 90%.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <FareGroup title="Călătorii" fares={trips} pendingChanges={pendingChanges} />
        <FareGroup title="Abonamente timp" fares={timePasses} pendingChanges={pendingChanges} />
        <FareGroup title="Abonamente" fares={subscriptions} pendingChanges={pendingChanges} />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { getFaresByOperator } from "../lib/fares";
import { getPendingChangesByOperator } from "../lib/upcomingChanges";
import IntegratedFareList from "./_components/IntegratedFareList";

export const metadata: Metadata = {
  title:
    "Tarife integrate STB + Metrorex 2026 — Bilete metropolitane București | Navetist",
  description:
    "Prețuri bilete și abonamente metropolitane valabile pe suprafață și metrou: 1, 2, 10 călătorii și abonamente 24h, 72h, 7 zile, lunar, 6 luni și 12 luni.",
};

export default function IntegratPage() {
  const fares = getFaresByOperator("integrated");
  const pendingChanges = getPendingChangesByOperator("integrated");
  const trips = fares.filter((f) => f.category === "trip");
  const subscriptions = fares.filter(
    (f) => f.category === "time-pass" || f.category === "subscription",
  );

  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tarife integrate
          </h1>
          <span className="text-xs font-semibold bg-emerald-900 text-emerald-100 px-2 py-1 rounded">
            STB
          </span>
          <span>+</span>
          <span className="text-xs font-semibold bg-sky-950 text-sky-100 px-2 py-1 rounded">
            Metrorex
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm">
          Bilete și abonamente comune valabile atât pe rețeaua de suprafață STB,
          cât și la metrou. Călătoriile sunt valabile 120 de minute cu validări
          nelimitate.
        </p>
      </div>

      <IntegratedFareList
        trips={trips}
        subscriptions={subscriptions}
        pendingChanges={pendingChanges}
      />
    </div>
  );
}

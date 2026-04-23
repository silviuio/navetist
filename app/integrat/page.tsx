import type { Metadata } from "next";
import FareGroup from "../components/FareGroup";
import { getFaresByOperator } from "../lib/fares";

export const metadata: Metadata = {
  title: "Tarife integrate STB + Metrorex 2026 — Bilete metropolitane București | Navetist",
  description:
    "Prețuri bilete și abonamente metropolitane valabile pe suprafață și metrou: 1, 2, 10 călătorii și abonamente 24h, 72h, 7 zile, lunar, 6 luni și 12 luni.",
};

export default function IntegratPage() {
  const fares = getFaresByOperator("integrated");
  const trips = fares.filter((f) => f.category === "trip");
  const timePasses = fares.filter((f) => f.category === "time-pass");
  const subscriptions = fares.filter((f) => f.category === "subscription");

  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-semibold bg-slate-700 text-slate-100 px-2 py-1 rounded">
          Integrat
        </span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3 mb-1">
          STB + Metrorex
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl text-sm">
          Bilete și abonamente comune valabile atât pe rețeaua de suprafață STB, cât
          și la metrou. Călătoriile sunt valabile 120 de minute cu validări nelimitate.
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
